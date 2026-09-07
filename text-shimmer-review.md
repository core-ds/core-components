# Code Review: feat/text-shimmer

**Ветка:** `feat/text-shimmer`
**Коммит:** `2b7ddc669 feat(text-shimmer): добавить компонент TextShimmer`
**Тип изменения:** новый компонент (`packages/text-shimmer`)

## Summary

REQUEST_CHANGES

Найдено 2 проблемы:
- 1 P1
- 1 P2

## Findings

### P1 — Hydration mismatch: `useAnimationEnvironment` вычисляет `prefers-reduced-motion` синхронно из реального `matchMedia` на первом клиентском рендере

`packages/text-shimmer/src/hooks/use-animation-environment.ts:5-8, 14`

```ts
const getPrefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches;
...
const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);
```

**Почему это проблема:** инициализатор `useState` выполняется синхронно во время рендера — в том числе во время **первого клиентского рендера**, который должен совпасть с серверной разметкой для корректной гидратации. На сервере `typeof window === 'undefined'`, поэтому `getPrefersReducedMotion()` всегда возвращает `false`. На клиенте та же функция в этот момент уже читает реальное значение `window.matchMedia(...).matches`. Если у пользователя в системе включён `prefers-reduced-motion: reduce`, первый клиентский рендер вычислит `prefersReducedMotion = true`, тогда как серверная разметка была построена с `false`.

Это значение прямо влияет на выводимую разметку: `component.tsx` использует `shouldReduceMotion = prefersReducedMotion || !animate` для класса `motionDisabled` на корневом `span` и для условных классов `textRevealing`/`textPaused` — то есть className компонента в SSR-разметке и в первом клиентском рендере разойдётся.

Это прямое нарушение уже устоявшегося в проекте паттерна (см. `useMatchMedia`/`useIsDesktop`, `references/platform-and-performance.md`): первый рендер (сервер и первый клиентский) должен быть детерминирован через дефолтное значение, а обновление до фактического `matchMedia` — только в эффекте. Здесь эффект (`useEffect`) действительно обновляет состояние повторно после монтирования, но сам факт использования реального `matchMedia()` уже в инициализаторе `useState` ломает соответствие первого клиентского рендера серверному.

**Влияние:** для пользователей с включённым `prefers-reduced-motion` при SSR-рендере страницы (обычная практика для продуктов-потребителей библиотеки) React выдаст hydration mismatch warning, а className, применённый на первом кадре, будет отличаться от того, что был отрисован сервером — вплоть до "мигания" неверного состояния анимации до следующего ре-рендера.

**Рекомендация:** инициализировать оба стейта детерминированным значением, не зависящим от фактического `matchMedia` (например, `false`/`true` по аналогии с `useMatchMedia`), и переносить фактическое значение `matchMedia`/`document.visibilityState` в `useEffect`/`useLayoutEffect_SAFE_FOR_SSR`, а не в инициализатор `useState`. Также стоит добавить `*.ssr.test.tsx` (`renderToString` не должен падать и не должен провоцировать mismatch) — компонент такого теста сейчас не имеет.

**Confidence:** high

---

### P2 — Отсутствуют скриншот-тесты для основного визуального сценария компонента

`packages/text-shimmer/src/` (нет файла `*.screenshots.test.tsx`)

**Почему это проблема:** весь смысл `TextShimmer` — визуальный эффект (рассыпание текста на частицы и сборка обратно), реализованный через canvas. Unit-тесты (`component.test.tsx`) хорошо покрывают поведенческую сторону (классы `canvasVisible`/`textHidden`, атрибуты `aria-busy`/`data-state`, реакцию на `active`/`animate`/`color`), но ни один тест не фиксирует фактический визуальный результат рендера частиц. Другие компоненты библиотеки, тоже рисующие на canvas (`pattern-lock`, `pattern-lock-v1`), сопровождаются `component.screenshots.test.tsx` — то есть в проекте это ожидаемая практика именно для canvas-компонентов, а не факультативная опция.

**Влияние:** будущие изменения в `particle-engine.ts`/`particle-utils.ts` (масштабирование частиц, позиционирование облака, прозрачность) не будут защищены от визуальной регрессии автоматическим тестом — обнаружить проблему получится только вручную в Storybook-демке.

**Рекомендация:** добавить `component.screenshots.test.tsx` хотя бы для ключевых состояний (`idle`, `active` с застывшим кадром частиц, `assembling`, `animate={false}`/`prefers-reduced-motion`), по аналогии с покрытием `pattern-lock`. Если решение осознанно (например, canvas-рендер частиц признан недостаточно детерминированным/стабильным для пиксельного сравнения между прогонами CI) — стоит явно отразить это решение в PR, а не оставлять пробел молча.

**Confidence:** medium — не исключено, что отсутствие скриншотов здесь осознанно (шум/недетерминированность canvas-рендера между окружениями CI), но такое решение не объяснено в PR/коде.

## Проверено, замечаний не вызвало

- **Публичный API / changeset:** новый пакет `@alfalab/core-components-text-shimmer` — `major` bump, `version: "0.0.0"` в `package.json`, в тексте changeset присутствует обязательная фраза "новый компонент `TextShimmer`". Все три условия спецправила для нового компонента выполнены.
- **`index.module.css`** транзитивно импортирует `@alfalab/core-components-vars/src/index.css` (через `./vars.css`) — переменные резолвятся.
- **Импорты в Storybook** (`Component.stories.tsx`) идут из собранного `@alfalab/core-components-text-shimmer`, а не из `./component` — соответствует конвенции.
- **CSS custom property для цвета частиц** (`--text-shimmer-particle-color`) не используется в `calc()`/layout-вычислении и не резолвится статически: JS явно читает актуальное значение через `getComputedStyle`/`canvas.style.color` в рантайме — паттерн, который сам документ `platform-and-performance.md` рекомендует как безопасную альтернативу.
- **SSR-safety тела рендера:** прямых обращений к `window`/`document` в теле компонента нет, вся работа с DOM/canvas вынесена в `useLayoutEffect_SAFE_FOR_SSR` (см. проблему выше — она про инициализатор состояния хука, а не про сам компонент).
- Обработан деградационный сценарий отсутствия `CanvasRenderingContext2D`/Web Animations API — текст остаётся читаемым (тест "keeps text visible when Canvas is unavailable").
- Учтён `prefers-reduced-motion` отдельно от `animate` prop (независимое управление, задокументировано и покрыто тестами).

## Positive observations

- Хорошее покрытие unit-тестами: поведенческие переходы `active`/`animate`, гонки при повторных `assemble`/`scatter` (`transitionIdRef`), сохранение accessible-текста в DOM на всех стадиях анимации.
- `particle-utils.ts`/`particle-engine.ts` сопровождены точечными комментариями там, где решение неочевидно (масштабирование по кеглю, мутация частиц на месте по перформанс-причинам) — именно то место, где комментарий оправдан.
- Документация (`description.mdx`, `development.mdx`) явно проговаривает ограничения компонента (однострочный текст, один текстовый слой, диапазон `particleCount`), что снижает риск неправильного использования потребителями.
