import {
    type PointerEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { spring } from 'motion';

import {
    clamp,
    composeDeform,
    EDGE_OVERFLOW,
    ICON_POP,
    LIFT_SCALE,
    LIFT_SPRING,
    PANEL_PULSE,
    PILL_SPRING,
    playKeyframes,
    REDUCED_MOTION_FADE,
    scaledSpring,
    type SpringTransition,
} from '@alfalab/core-components-tab-bar-island/physics';
import { type TabBarIslandItem } from '@alfalab/core-components-tab-bar-island/types';

/**
 * Потолок шага кадра. После долгого пропуска кадров (вкладка была в фоне)
 * пружина иначе перепрыгнула бы сразу к цели.
 */
const MAX_FRAME_DELTA = 64;

function readRate(_: HTMLElement | null) {
    return 1;
}

/**
 * Пружина на одно число: текущее значение, скорость, цель.
 *
 * Из motion берём только генератор пружины. Универсальный `animate()` умеет
 * анимировать что угодно и поэтому весит ~62 кб в бандле потребителя, а нам
 * нужен ровно один сценарий — гнать одно число к цели и знать его скорость.
 * Генератор при этом тот же самый, что `animate()` использует внутри, так что
 * физика не «похожая», а буквально та же.
 */
function createSpringValue(initial: number) {
    let value = initial;
    let velocity = 0;
    let target = initial;
    let generator: ReturnType<typeof spring> | null = null;
    let elapsed = 0;

    return {
        get: () => value,
        getVelocity: () => velocity,

        /** Мгновенно поставить значение и погасить движение. */
        jump(next: number) {
            value = next;
            target = next;
            velocity = 0;
            generator = null;
        },

        /**
         * Новая цель. Пружина стартует с текущей скорости, поэтому прерывание
         * на лету продолжает движение, а не дёргает значение с нуля.
         */
        to(next: number, transition: SpringTransition) {
            target = next;
            elapsed = 0;
            generator = spring({ keyframes: [value, next], velocity, ...transition });
        },

        stop() {
            generator = null;
        },

        /** Шаг на `delta` мс. Возвращает false, когда пружина уже стоит. */
        step(delta: number) {
            if (!generator) {
                return false;
            }

            elapsed += delta;

            const state = generator.next(elapsed);

            velocity = delta > 0 ? ((state.value - value) / delta) * 1000 : velocity;
            value = state.value;

            if (state.done) {
                /*
                 * Генератор резолвится по допуску скорости, а не строго на
                 * цели — доводим руками, чтобы не осесть в доле пикселя от неё.
                 */
                value = target;
                velocity = 0;
                generator = null;
            }

            return true;
        },
    };
}

type UsePillAnimationParams = {
    activeKeyIndex: number;
    items: TabBarIslandItem[];
    gap: number;
    /**
     * Класс иконки таба — по нему находим элемент для squash & stretch, не
     * прокидывая ref через пользовательский компонент таба.
     */
    iconClassName: string;
};

export function usePillAnimation({
    activeKeyIndex,
    items,
    gap,
    iconClassName,
}: UsePillAnimationParams) {
    const listRef = useRef<HTMLDivElement>(null);
    const underlayRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef(0);

    // x — позиция пилюли в px, lift — 0 в покое, 1 при полном нажатии.
    const [values] = useState(() => ({ x: createSpringValue(0), lift: createSpringValue(0) }));

    const state = useRef({
        baseWidth: 0,
        baseHeight: 0,
        trackWidth: 1,
        targetX: 0,
        landingPeak: 0,
        hasLanded: false,
        rate: 1,
        reduceMotion: false,
        mounted: false,
        pressed: false,
        activeIndex: activeKeyIndex,
    });

    const measure = useCallback(() => {
        const wrapper = wrapperRef.current;
        const frame = frameRef.current;

        if (!wrapper || !frame) {
            return;
        }

        const lastTab = wrapper.children[wrapper.children.length - 1] as HTMLElement | undefined;

        state.current.trackWidth = Math.max(1, lastTab ? lastTab.offsetLeft : 1);
        state.current.baseWidth = frame.offsetWidth;
        state.current.baseHeight = frame.offsetHeight;
    }, []);

    const targetXFor = useCallback((index: number) => {
        const tab = wrapperRef.current?.children[index] as HTMLElement | undefined;

        return tab ? tab.offsetLeft : 0;
    }, []);

    /** Возврат формы к значениям из CSS после того, как пружина улеглась. */
    const settle = useCallback(() => {
        state.current.landingPeak = 0;
        state.current.hasLanded = false;

        const tracker = trackerRef.current;

        if (!tracker) {
            return;
        }

        /*
         * Последний кадр может застать остаточную деформацию в доли процента.
         * Снимаем инлайновые стили — форму снова задаёт CSS.
         */
        tracker.style.width = '';
        tracker.style.height = '';
        tracker.style.left = '';
        tracker.style.top = '';
        tracker.style.borderRadius = '';
    }, []);

    const render = useCallback(() => {
        const frame = frameRef.current;
        const tracker = trackerRef.current;

        if (!frame || !tracker) {
            return;
        }

        const { current } = state;
        const x = values.x.get();

        if (current.reduceMotion) {
            frame.style.transform = `translateX(${x}px)`;

            return;
        }

        const liftScale = 1 + values.lift.get() * (LIFT_SCALE - 1);
        /*
         * Деформация считается по реальной, не зажатой позиции: пружина
         * недодемпфирована и естественно перелетает цель — именно это даёт
         * форме «спружинить» при подлёте.
         */
        const deform = composeDeform(
            values.x.getVelocity(),
            Math.abs(current.targetX - x),
            current.landingPeak,
            current.hasLanded,
            current.rate,
        );

        current.landingPeak = deform.landingPeak;
        current.hasLanded = deform.hasLanded;

        /*
         * Рисуем пилюлю зажатой в границах дорожки, но с небольшим запасом:
         * жёсткий стоп ровно на краю ощущается как затычка.
         */
        const renderX = clamp(x, -EDGE_OVERFLOW, current.trackWidth + EDGE_OVERFLOW);

        frame.style.transform = `translateX(${renderX}px) scale(${liftScale})`;

        /*
         * Меняем реальные width/height, а не transform: scale — так торцы
         * капсулы остаются полукругами, а не растягиваются в эллипс. Элемент
         * спозиционирован абсолютно, поэтому reflow за его пределы не выходит.
         */
        const shapeWidth = current.baseWidth * deform.scaleX;
        const shapeHeight = current.baseHeight * deform.scaleY;
        /*
         * По горизонтали у края дорожки растём только вовнутрь, в центре —
         * симметрично. По вертикали позиция от края не зависит.
         */
        const originX = clamp(renderX / current.trackWidth, 0, 1);

        tracker.style.width = `${shapeWidth}px`;
        tracker.style.height = `${shapeHeight}px`;
        tracker.style.left = `${originX * (current.baseWidth - shapeWidth)}px`;
        tracker.style.top = `${(current.baseHeight - shapeHeight) / 2}px`;
        tracker.style.borderRadius = `${Math.min(shapeWidth, shapeHeight) / 2}px`;
    }, [values]);

    const stopLoop = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        }
    }, []);

    /**
     * Один кадровый цикл на обе пружины: пока хоть одна едет — перерисовываем,
     * как только обе встали — возвращаем форму под CSS.
     */
    const startLoop = useCallback(() => {
        if (rafRef.current) {
            return;
        }

        let last = performance.now();

        const tick = (now: number) => {
            const delta = clamp(now - last, 0, MAX_FRAME_DELTA);

            last = now;

            // Шагаем обе пружины: `||` бы не выполнил вторую.
            const xMoving = values.x.step(delta);
            const liftMoving = values.lift.step(delta);

            render();

            if (xMoving || liftMoving) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                rafRef.current = 0;
                settle();
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    }, [render, settle, values]);

    /** Мгновенная установка пилюли на активный таб, без анимации. */
    const snap = useCallback(() => {
        const { current } = state;

        if (current.activeIndex < 0) {
            return;
        }

        measure();
        current.rate = readRate(listRef.current);
        current.targetX = targetXFor(current.activeIndex);
        values.x.jump(current.targetX);
        values.lift.jump(0);
        stopLoop();
        render();
        settle();
    }, [measure, render, settle, stopLoop, targetXFor, values]);

    // Перелёт пилюли на новый активный таб.
    useLayoutEffect(() => {
        const { current } = state;

        current.activeIndex = activeKeyIndex;

        if (activeKeyIndex < 0) {
            return;
        }

        if (!current.mounted) {
            current.mounted = true;
            snap();

            return;
        }

        measure();
        current.rate = readRate(listRef.current);
        current.targetX = targetXFor(activeKeyIndex);
        // Новое движение — забываем память подлёта предыдущего.
        current.landingPeak = 0;
        current.hasLanded = false;

        if (current.reduceMotion) {
            values.x.jump(current.targetX);
            render();

            if (frameRef.current) {
                playKeyframes(frameRef.current, REDUCED_MOTION_FADE, current.rate);
            }

            return;
        }

        values.x.to(current.targetX, scaledSpring(PILL_SPRING, current.rate));
        startLoop();

        const icon = (
            wrapperRef.current?.children[activeKeyIndex] as HTMLElement | undefined
        )?.querySelector<HTMLElement>(`.${iconClassName}`);

        if (icon) {
            playKeyframes(icon, ICON_POP, current.rate);
        }
    }, [activeKeyIndex, iconClassName, measure, render, snap, startLoop, targetXFor, values]);

    // Смена состава табов или отступа меняет геометрию — переставляем без анимации.
    useLayoutEffect(() => {
        snap();
    }, [gap, items.length, snap]);

    useEffect(() => {
        const list = listRef.current;

        if (!list || typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        const observer = new ResizeObserver(() => snap());

        observer.observe(list);

        return () => observer.disconnect();
    }, [snap]);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            state.current.reduceMotion = query.matches;
        };

        update();
        query.addEventListener('change', update);

        return () => query.removeEventListener('change', update);
    }, []);

    useEffect(
        () => () => {
            stopLoop();
            values.x.stop();
            values.lift.stop();
        },
        [stopLoop, values],
    );

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const { current } = state;
        const wrapper = wrapperRef.current;

        if (current.reduceMotion || !wrapper) {
            return;
        }

        const target = event.target as Node;
        const index = Array.prototype.findIndex.call(wrapper.children, (tab: Element) =>
            tab.contains(target),
        );

        if (index < 0 || items[index]?.disabled) {
            return;
        }

        current.rate = readRate(listRef.current);

        /*
         * Панель, табы и дорожка пульсируют вместе, чтобы пилюля не отрывалась
         * от подложки.
         */
        [underlayRef.current, wrapperRef.current, trackRef.current].forEach((element) => {
            if (element) {
                playKeyframes(element, PANEL_PULSE, current.rate);
            }
        });

        if (index !== current.activeIndex) {
            return;
        }

        current.pressed = true;
        values.lift.to(1, scaledSpring(LIFT_SPRING, current.rate));
        startLoop();
    };

    const handlePointerUp = () => {
        const { current } = state;

        /*
         * pointerleave прилетает на каждый увод курсора с таббара, а не только
         * после нажатия — без флага это гоняло бы пружину lift из 0 в 0.
         */
        if (current.reduceMotion || !current.pressed) {
            return;
        }

        current.pressed = false;
        values.lift.to(0, scaledSpring(LIFT_SPRING, current.rate));
        startLoop();
    };

    return {
        listRef,
        underlayRef,
        wrapperRef,
        trackRef,
        frameRef,
        trackerRef,
        handlePointerDown,
        handlePointerUp,
    };
}
