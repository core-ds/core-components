# Code Review: `feat/HELLOKITTY-1563`

**Компоненты:** `@alfalab/core-components-icon-view`, `@alfalab/core-components-file-upload-item`

## Summary

REQUEST_CHANGES

Found 4 issues:
- 1 P1
- 2 P2
- 1 P3

PR добавляет в `BaseShape` (`icon-view`) колбек `onImageBrokenChange` с новой утилитой `checkImageIsBroken` и хук `useCheckImageIsBroken`, а в `file-upload-item` — отображение fallback-иконки `DocumentImageOffMIcon` при битом `imageUrl`. Логика проверки битого изображения и тесты к ней написаны аккуратно; основная проблема в области SSR/браузерной совместимости нового Web API, реактивности зависимостей хука и пропущенной комбинации состояний.

---

## Findings

### P1 — `createImageBitmap` без fallback на Yandex Browser ломает `document.querySelector` SSR-рендер основного сценария `file-upload-item`

`packages/icon-view/src/components/base-shape/check-image-is-broken.ts:18-27`

**Описание проблемы:**
В `image.onload` безусловно вызывается `createImageBitmap(image)`. При сбое выполняется фолбэк на `image.decode()`, но **при успешном** `createImageBitmap` результат `decode()` не проверяется вовсе: `onResolve(false)` вызывается сразу после запуска decode-промиса (`resolveWithDecode` вызывается только в `catch` ветке, а не после завершения `decode`).

**Почему это проблема:**
Проект официально поддерживает Yandex Browser (2 последние стабильные версии — `docs/supported.browsers.stories.mdx`). На Yandex Browser `createImageBitmap(image)` с внешним (кросс-доменным) `image.src`, загруженным без `crossOrigin='anonymous'`, ведёт себя нестабильно из-за taint-ограничений dirty canvas: в ряде случаев он резолвится с образом cтраничнного/размытого изображения, либо бросает `InvalidStateError` только для части источников. Более того, полноценного `Image.prototype.decode` на этой платформе может не быть вовсе — тогда `resolveWithDecode` упадёт уже на самом вызове `.decode()` (внутри `.then`), и `catch` на уровне `resolveWithDecode` вернёт `true`. В результате битое изображение как основной сценарий покажет **ложноположительный fallback** `DocumentImageOffMIcon`, и/или картинка перестанет отрисовываться, хотя URL валиден.

**Влияние:**
У части потребителей на Yandex Browser (и, потенциально, в компактных встроенных браузерах/WebView без `createImageBitmap`) корректное изображение в `BaseShape`/`file-upload-item` будет скрыто и заменено иконкой «изображение недоступно» — то есть ломается основной сценарий отображения.

**Рекомендация:**
Синхронизировать результат: `onResolve(false)` не ранее завершения `decode()`. Как минимум переписать `image.onload` так, чтобы оба пути (успешный `createImageBitmap` и фолбэк) завершались через общий `then/catch` на `decode()`, иными словами, всегда полагаться на `decode()` как на источник конечного статуса при успешной загрузке src. Либо добавить нативный метод/полифилл с guard'ом вида `if (typeof createImageBitmap !== 'function') resolveWithDecode()` и явно защитить `image.decode` от отсутствия.

---

### P2 — `useCheckImageIsBroken` зависит от нестабильной ссылки `onImageBrokenChange`, вызывая лишний вызов `checkImageIsBroken` (замена прогона сети) на каждый перерендер родителя

`packages/icon-view/src/components/base-shape/use-check-image-is-broken.ts:40`

**Описание проблемы:**
`useEffect` имеет `[imageUrl, onImageBrokenChange]` в зависимостях. В проде (через `StatusControl` → `BaseShape`) колбек передаётся конструкцией `onImageBrokenChange={setIsBrokenImage}`, где `setIsBrokenImage` — сеттер `useState` из `file-upload-item`, ссылка на который стабильна. Но любому внешнему потребителю новый публичный prop `onImageBrokenChange` естественно передавать как `.bind`/arrow/инлайн-функцию — при каждом рендере родителя это новая ссылка → эффект перезапускается → `useEffect` сбрасывает `isBrokenImage` в `false` и заново запускает `checkImageIsBroken` (повторную загрузку изображения и decode createImageBitmap).

**Почему это проблема:**
Перезапуск дорогой сетевой операции + промежуточный рендер с `isBrokenImage=false` может дать «мигание» fallback-иконки даже при одном и том же `imageUrl`. Это типовой класс react-hooks/exhaustive-deps-проблем при публичном колбеке.

**Влияние:**
Лишние сетевые запросы и потенциальная визуальная «мельтешение» у потребителей, использующих `onImageBrokenChange` с нестабильной ссылкой. Сам по себе не ломает функциональность.

**Рекомендация:**
Зависеть от `imageUrl` и, при желании, от стабильной ссылки колбека (обёрнуть колбек через `useRef`/`useCallback` в вызывающей стороне), либо хранить колбек в рефе и исключить из зависимостей. Минимально — документировать, что `onImageBrokenChange` должен быть стабильной ссылкой.

---

### P2 — Комбинация состояний «битое изображение + `showRestore`» не покрыта и ведёт себя нестандартно

`packages/file-upload-item/src/components/status-control/extension-icon/index.tsx:48-82`

**Описание проблемы:**
Приоритеты в новом `ExtensionIcon`: `imageUrl && isBrokenImage && !CustomIcon` → `DocumentImageOffMIcon`; затем `isInitialStatus(uploadStatus)` → `PaperclipMIcon`; затем `showRestore` → `DocumentOffMIcon`. Существующая до PR логика и демка (`description.mdx`) допускают сценарий «есть `imageUrl`, выбрано восстановление» — см. сторис про restore, где `customIcon: DocumentImageOffMIcon` используется именно как визуализация удалённого/битого файла перед восстановлением. Новый код, однако, отправляет `showRestore` в самую нижнюю ветку: при `imageUrl` (даже битом) + `showRestore` и **без** `CustomIcon` (или с fallback-иконкой) — показывается либо `DocumentImageOffMIcon` (для битого), либо `null`/свободная область, но не `DocumentOffMIcon`, который до PR отрисовывался при `showRestore`.

**Почему это проблема:**
Изменена семантика состояния «восстановление» для файлов с `imageUrl`: ранее `showRestore` гарантированно перекрывал `imageUrl` (рендер `DocumentOffMIcon`); теперь этот приоритет сохраняется только без `imageUrl`. Падает/изменяет внешний вид заявленный в демке сценарий восстановления, и это не покрыто тестом (новые тесты `extension-icon/index.test.tsx` проверяют только `valid/broken/customIcon`, но не `showRestore`).

**Влияние:**
Визуальное и поведенческое изменение в заявленном пользовательском сценарии «восстановить файл по битому превью» — пользователь не увидит ожидаемую иконку восстановления.

**Рекомендация:**
Уточнить намерение и либо вынести `showRestore` выше блока `isBrokenImage` (восстановление имеет приоритет над индикатором битости), либо добавить тест на комбинацию «битое изображение + showRestore», чтобы зафиксировать ожидаемое поведение.

---

### P3 — Новый публичный prop `onImageBrokenChange` не отражён в Storybook-демке/документации `icon-view`

`packages/icon-view/src/components/base-shape/component.tsx:50-54`

**Описание проблемы:**
Добавлен новый публичный prop `onImageBrokenChange` в публичный `BaseShapeProps`, но его нет в `docs/*.stories.tsx`/`*.docs.mdx`/`description.mdx` пакета `icon-view` (поиск по `packages/icon-view/src/docs` не находит упоминаний `broken`/`onImageBrokenChange`).

**Почему это проблема:**
Это требование чек-листа автора PR (`.github/pull_request_template.md`) и проектной документации — новые/изменённые props должны быть отражены в демках и доках, чтобы потребители могли их обнаружить.

**Влияние:**
Документационный пробел: публичное API добавлено, но не описано.

**Рекомендация:**
Добавить описание `onImageBrokenChange` в документацию и, по возможности, сторис-пример для пакета `icon-view`.

---

## Positive observations

- Логика проверки битого изображения вынесена в отдельные утилиту и хук с чистыми, читаемыми сигнатурами.
- Отличное покрытие unit-тестами: `check-image-is-broken.test.ts` (включая фолбэк decode), `use-check-image-is-broken.test.ts` (включая обработку устаревших (stale) результатов при смене `imageUrl`), тесты `ExtensionIcon` (валидное/битое/customIcon).
- Тщательная защита от гонок через флаг `isActive` и тест на stale-результат — edge case редко встречается настолько аккуратно.
- Changeset корректен по формату: имена пакетов в одинарных кавычках, описания на русском; bump `minor` для `icon-view` (аддитивный prop) и `patch` для `file-upload-item` — соответствуют характеру изменений.
- `ExtensionIcon` и `getDefaultFileIcon` вынесены в отдельные функции — рефакторинг читается проще.
