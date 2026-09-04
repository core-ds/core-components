---
description: SSR/hydration, browser compatibility and performance checklist for core-components — read from SKILL.md step 7
---

# SSR/hydration, browser compatibility, performance

Библиотека обязана оставаться SSR-safe: любой компонент может быть отрендерен на сервере (`renderToString`), где нет `window`/`document`/`localStorage`/`matchMedia`. Ошибка здесь — не абстрактный риск, а реальный класс багов, регулярно всплывающий в истории проекта (см. примеры ниже).

## Прямой доступ к browser-only API в теле рендера

Ищи в diff обращения к `window`/`document`/`localStorage`/`matchMedia`/`navigator` **вне** `useEffect`/`useLayoutEffect`/обработчика события — то есть непосредственно в теле функции-компонента или в коде, который выполняется во время рендера (включая условие вида `if (!ref.current) { ... }`, которое исполняется при каждом рендере, а не только на клиенте).

Проектный guard для таких случаев — `isClient()` из `@alfalab/core-components-shared` (`typeof window !== 'undefined'`). Реальный пример (`fe2dc1ec0`, `fix(accordion): correct SSR`):

```diff
- if (!resizeObserver.current) {
+ if (isClient() && !resizeObserver.current) {
      const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
      resizeObserver.current = new ResizeObserver(...);
```

До фикса `window.ResizeObserver` читался безусловно при каждом рендере, включая серверный, — падение на SSR. Если diff добавляет похожий код (обращение к глобальному browser API при инициализации ref/state в теле компонента) без `isClient()`-guard'а (или без выноса в эффект) — finding.

Отдельный, менее очевидный источник SSR-краша — хуки вроде `useSyncExternalStore`: если не передан третий аргумент (`getServerSnapshot`), React не может получить снэпшот на сервере. Реальный пример (`06347dc91`, `fix(cdn-icon): fixed SSR`):

```diff
- const icons = useSyncExternalStore(iconsStore.subscribe, iconsStore.getSnapshot);
+ const icons = useSyncExternalStore(iconsStore.subscribe, iconsStore.getSnapshot, iconsStore.getSnapshot);
```

Если diff добавляет `useSyncExternalStore` (или похожий "внешний источник состояния" хук) без учёта серверного снэпшота — finding.

**Нюанс про `useLayoutEffect_SAFE_FOR_SSR`** (из `@alfalab/hooks`, используется, например, в `useMatchMedia`): это просто `typeof document !== 'undefined' ? useLayoutEffect : useEffect` — эффекты в принципе не выполняются во время `renderToString`, так что дело не в защите от падения на сервере, а в том, чтобы не словить React dev-warning про `useLayoutEffect` при SSR. Не путай эту причину с `isClient()`-guard'ом выше — это разные механизмы для разных проблем.

## Паттерн responsive-рендеринга: `client` prop + `useIsDesktop`/`useMatchMedia`

Для логики, зависящей от viewport (desktop/mobile-версия компонента), проект **не** использует прямой `window.matchMedia`/`window.innerWidth` в рендере — вместо этого:

```tsx
// packages/button/src/Component.responsive.tsx
const { children, breakpoint, client, defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop', ...restProps } = props;
const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);
const Component = isDesktop ? ButtonDesktop : ButtonMobile;
```

- `client?: 'desktop' | 'mobile'` — публичный prop (JSDoc: "Версия, которая будет использоваться при серверном рендеринге"), позволяющий потребителю, который заранее знает контекст (например, серверный User-Agent sniffing), передать корректное значение для первого (в т.ч. серверного) рендера и избежать несовпадения разметки при гидратации;
- `useMatchMedia` инициализирует `useState(defaultValue)` этим значением и обновляет его уже в `useLayoutEffect_SAFE_FOR_SSR` — то есть первый рендер (сервер и первый клиентский) детерминирован через `defaultValue`/`client`, а не через фактический `matchMedia`, который на сервере просто недоступен.

Если PR добавляет новую desktop/mobile-ветвящуюся логику — проверь, что она построена на `useIsDesktop`/`useMatchMedia` (или принимает `client`/`breakpoint` по аналогии), а не на прямом обращении к `window` в рендере.

## SSR-тесты проекта (`*.ssr.test.tsx`)

В `jest.config.js` есть отдельный jest-project `ssr` (`testEnvironment: 'node'`, `testMatch: ['**/*.ssr.test.ts?(x)']`) — тесты в нём выполняются в окружении без DOM вообще (в отличие от обычного `csr`-project на `jsdom`). Паттерн теста (см. `packages/accordion/src/Component.ssr.test.tsx`, `packages/cdn-icon/src/Component.ssr.test.tsx`):

```tsx
import { renderToString } from 'react-dom/server';

test('ComponentName', () => {
    expect(() => renderToString(<ComponentName />)).not.toThrow();
});
```

Такой тест есть пока не у всех пакетов — его отсутствие в затронутом компоненте не является само по себе finding'ом. Но если PR трогает код, потенциально чувствительный к SSR (доступ к browser API, `useSyncExternalStore`, работа с ref в теле рендера) — стоит **предложить** добавить `*.ssr.test.tsx` как способ подтвердить фикс/защититься от регрессии, по аналогии с `fe2dc1ec0`/`06347dc91`.

## Поддерживаемые браузеры (`docs/supported.browsers.stories.mdx`)

Две последние стабильные версии популярных desktop-браузеров плюс отдельно оговорённые минимальные версии для Android и iOS — точные значения смотри в самом файле на момент ревью, здесь их сознательно не дублируем: файл может обновиться, а зафиксированные в скиле версии — устареть незаметно. Практическое следствие:

- новый браузерный API в коде компонента (не только dev/build-тулинг) должен быть доступен в актуальном поддерживаемом диапазоне — если есть сомнение, свериться с `docs/supported.browsers.stories.mdx`, это повод для finding или хотя бы вопроса в review;
- проект уже полифиллит там, где нативной поддержки недостаточно — например, `ResizeObserver` берётся как `window.ResizeObserver || ResizeObserverPolyfill` (см. пример выше, `@juggle/resize-observer`). Если PR использует относительно новый Web API без такой опоры на полифилл/фолбэк — проверь, действительно ли он покрыт поддерживаемым диапазоном браузеров, а не только последними версиями Chrome/десктопных браузеров, на которых обычно тестируют локально.

## Performance

Значимость performance-finding сильно зависит от того, насколько часто переиспользуется компонент:

- **base-компоненты** (`button`, `input`, `icon`, `typography` и т.п.) — используются десятки-сотни раз на одной странице; лишние аллокации на каждый рендер (новый объект/массив/inline-функция, передаваемые как prop дочернему `memo`-компоненту и ломающие мемоизацию), дорогие вычисления без мемоизации в коде, исполняемом на каждый рендер, — здесь заслуживают finding;
- **редко используемые/составные компоненты** (модалки, полноэкранные виджеты) — тот же паттерн обычно не заслуживает finding'а, если не показан конкретный измеримый эффект (например, PR сам демонстрирует деградацию или добавляет вычисление в цикле над потенциально большим списком).

Не отмечай микро-оптимизации (замена `.map().filter()` на `for`-цикл и т.п.) как finding без подтверждённого измеримого эффекта — это ближе к style preference, см. общий принцип "false positives" в `SKILL.md`.

## Severity

| Ситуация                                                                                                                                                                                                   | Severity |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|
| Безусловный доступ к `window`/`document`/`localStorage` в теле рендера (не в эффекте, без `isClient()`-guard'а)                                                                                            | **P1** (падение/некорректный рендер на SSR) |
| `useSyncExternalStore`/аналог без обработки серверного снэпшота                                                                                                                                            | **P1** |
| Новая desktop/mobile-логика на прямом `window.matchMedia`/`window.innerWidth` вместо `useIsDesktop`/`useMatchMedia`                                                                                        | **P2** (не всегда падает на SSR, но не соответствует проектному паттерну и может дать hydration mismatch) |
| Использование Web API, отсутствующего в поддерживаемом диапазоне браузеров (см. актуальный `docs/supported.browsers.stories.mdx`), без фолбэка/полифилла | **P2**–**P1** в зависимости от того, насколько API критичен для основного сценария |
| Дорогая аллокация/вычисление на каждый рендер в часто переиспользуемом base-компоненте                                                                                                                     | **P2**–**P3** в зависимости от измеримости эффекта |
| Отсутствие `*.ssr.test.tsx` у компонента с SSR-чувствительным изменением                                                                                                                                   | не finding — уместно как предложение, не как blocking-замечание |
