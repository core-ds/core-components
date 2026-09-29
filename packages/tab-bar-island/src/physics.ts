/**
 * Физика анимаций таббара.
 *
 * Все числа взяты из спецификации анимации компонента (разделы «Пружины»,
 * «Деформация формы», «Микро-анимации») и соответствуют эталонной реализации,
 * а не подобраны на глаз. Менять их стоит только вместе со спецификацией.
 */

export type SpringTransition = {
    stiffness: number;
    damping: number;
};

/**
 * Перелёт пилюли между табами: ζ ≈ 0.837, время посадки ≈ 296 мс,
 * overshoot ≈ 0.8%. Нативный эквивалент — SwiftUI
 * `.spring(response: 0.55, dampingFraction: 0.825)`.
 */
export const PILL_SPRING: SpringTransition = { stiffness: 260, damping: 27 };

/**
 * Нажатие (lift) на активный таб: ζ ≈ 0.854, время посадки ≈ 229 мс.
 * Нативный эквивалент — SwiftUI `.interactiveSpring(dampingFraction: 0.86)`.
 */
export const LIFT_SPRING: SpringTransition = { stiffness: 420, damping: 35 };

/** Во сколько раз пилюля увеличивается при удержании активного таба. */
export const LIFT_SCALE = 1.1;

/** Скорость (px/s), при которой растяжение по ширине в полёте максимально. */
const VELOCITY_RANGE = 650;

/** Максимальное растяжение ширины в полёте. */
const MAX_STRETCH_X = 0.36;

/** Расстояние до цели (px), с которого начинается фаза подлёта. */
const ARRIVAL_ZONE = 34;

/**
 * Доля `VELOCITY_RANGE`, на которой подлёт выходит на полную силу.
 *
 * Амплитуда подлёта откалибрована отдельно от полёта: на длинном прыжке через
 * весь ряд скорость у цели остаётся высокой дольше, чем на соседнем табе, и
 * если гнать подлёт от той же `VELOCITY_RANGE`, длинные прыжки «докручивают»
 * эффект сильнее коротких. С отдельным порогом подлёт одинаков на любой
 * дистанции.
 */
const LANDING_ACTIVATION = 0.12;

/** Сужение ширины перед посадкой. */
const LANDING_SQUEEZE_X = 0.92;

/** Вытягивание высоты перед посадкой. */
const LANDING_STRETCH_Y = 1.32;

/** Насколько быстро гаснет пик подлёта — за кадр. */
const LANDING_PEAK_DECAY = 0.85;

/** Близость к цели (0–1), после которой форма защёлкивается в затухание. */
const LANDING_LATCH_THRESHOLD = 0.9;

/** На сколько px пилюля может выйти за край дорожки на разгоне. */
export const EDGE_OVERFLOW = 3;

/**
 * Микро-анимации — обычные keyframes, их проигрывает нативный WAAPI
 * (`Element.animate`), см. `playKeyframes`.
 */
export type KeyframeAnimation = {
    keyframes: Keyframe[];
    /** Длительность на нормальной скорости, мс. */
    duration: number;
};

/** Пульс панели — на нажатие любого таба. */
export const PANEL_PULSE: KeyframeAnimation = {
    keyframes: [
        { transform: 'scale(1)', easing: 'ease-out' },
        { transform: 'scale(1.035)', offset: 0.4, easing: 'ease-out' },
        { transform: 'scale(1)' },
    ],
    duration: 350,
};

/** Squash & stretch иконки — на выбор нового таба. */
export const ICON_POP: KeyframeAnimation = {
    keyframes: [
        { transform: 'scale(1)', easing: 'ease-out' },
        { transform: 'scale(0.85)', offset: 0.3, easing: 'ease-out' },
        { transform: 'scale(1.12)', offset: 0.65, easing: 'ease-out' },
        { transform: 'scale(1)' },
    ],
    duration: 400,
};

/** `prefers-reduced-motion`: вместо перелёта — короткий линейный fade. */
export const REDUCED_MOTION_FADE: KeyframeAnimation = {
    keyframes: [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }],
    duration: 120,
};

/**
 * Проигрывает keyframes нативно. `rate` — то же замедление, что и у пружин.
 *
 * `Element.animate` есть во всех браузерах из browserslist, но не в jsdom,
 * поэтому вызываем через optional call — в тестах анимация просто не играет.
 */
export function playKeyframes(
    element: Element,
    { keyframes, duration }: KeyframeAnimation,
    rate: number,
) {
    element.animate?.(keyframes, { duration: duration / rate });
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

/**
 * Замедление всей анимации в `1 / rate` раз.
 *
 * Чтобы замедление было честным — не просто «медленнее», а физически тем же
 * движением, растянутым по времени, — пружину масштабируем как
 * `stiffness × rate²`, `damping × rate`. Тогда ω₀ масштабируется на `rate`, а
 * ζ (форма отклика, % перелёта) остаётся прежним. Выведено из уравнения
 * пружины: `x'' + 2ζω₀x' + ω₀²x = ω₀²·target`.
 */
export function scaledSpring(transition: SpringTransition, rate: number): SpringTransition {
    return {
        stiffness: transition.stiffness * rate * rate,
        damping: transition.damping * rate,
    };
}

export type Deform = {
    scaleX: number;
    scaleY: number;
    landingPeak: number;
    hasLanded: boolean;
};

/**
 * Деформация пилюли в полёте — две фазы:
 *
 * 1. **Полёт**: далеко от цели и есть скорость — пилюля растягивается по
 *    ширине (`scaleX` вверх).
 * 2. **Подлёт**: рядом с целью — сужается по ширине и вытягивается по высоте,
 *    готовясь «упасть» на таб. Само приземление (небольшой перелёт и возврат)
 *    даёт `PILL_SPRING`: он недодемпфирован, поэтому естественно чуть
 *    проскакивает цель и пружинит назад.
 *
 * `landingPeak` / `hasLanded` — «память» о том, насколько близко пилюля уже
 * подлетала к цели в рамках текущего движения. Без неё недодемпфированная
 * пружина, качнувшись назад к цели после перелёта, повторно «прочитывала» бы
 * приближение и включала сужение с ростом высоты второй раз — заметный двойной
 * баунс. Как только пик впервые пересёк `LANDING_LATCH_THRESHOLD`, форма
 * защёлкивается в режим затухания и до конца этого движения может только
 * гаснуть.
 */
export function composeDeform(
    velocity: number,
    distanceRemaining: number,
    landingPeak = 0,
    hasLanded = false,
    rate = 1,
): Deform {
    /*
     * При замедлении скорость пропорционально ниже (та же пружина, растянутая
     * по времени) — делим на rate, чтобы пороги срабатывали так же, как на
     * нормальной скорости, а не слабее.
     */
    const speed = Math.abs(velocity) / rate;
    const flightT = clamp(speed / VELOCITY_RANGE, 0, 1);
    const arrive = 1 - clamp(distanceRemaining / ARRIVAL_ZONE, 0, 1);
    const landingT = clamp(speed / (VELOCITY_RANGE * LANDING_ACTIVATION), 0, 1);

    /*
     * LANDING_PEAK_DECAY задан «за кадр» в реальном времени. При замедлении то
     * же движение занимает больше реальных кадров, поэтому голое умножение на
     * decay каждый кадр угасило бы память подлёта сильнее относительно
     * движения — decay ** rate это компенсирует (при rate = 1 не меняется).
     */
    const decay = LANDING_PEAK_DECAY ** rate;

    let nextLandingPeak;
    let nextHasLanded = hasLanded;

    if (hasLanded) {
        nextLandingPeak = landingPeak * decay;
    } else {
        nextLandingPeak = Math.max(arrive, landingPeak * decay);

        if (nextLandingPeak >= LANDING_LATCH_THRESHOLD) {
            nextHasLanded = true;
        }
    }

    const landing = nextLandingPeak * landingT;

    /*
     * Раз уже всерьёз вошли в форму подлёта — не возвращаемся к растяжению
     * полёта до конца этого движения, даже когда пик почти затух. Иначе на
     * затухающей дрожи пружины растяжение может на миг включиться снова.
     */
    const flightActive = !nextHasLanded;

    return {
        scaleX: lerp(1 + (flightActive ? flightT : 0) * MAX_STRETCH_X, LANDING_SQUEEZE_X, landing),
        scaleY: lerp(1, LANDING_STRETCH_Y, landing),
        landingPeak: nextLandingPeak,
        hasLanded: nextHasLanded,
    };
}
