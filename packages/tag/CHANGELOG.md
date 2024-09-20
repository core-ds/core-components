# Change Log

## 8.4.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

<sup><time>13.09.2024</time></sup>

### [#1369](https://github.com/core-ds/core-components/pull/1369)

-   Заменили числовые значения скругления на переменные

## 8.4.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 8.3.1

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

## 8.3.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 8.2.1

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 8.2.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

-   Добавлены новые способы указать размеры - 32, 40, 48, 56, 64, 72. Буквенные значения размеров xxs, xs, s, m, l, xl теперь deprecated, используйте вместо них 32, 40, 48, 56, 64, 72 соответственно

## 8.1.0

### Minor Changes

### [#1080](https://github.com/core-ds/core-components/pull/1080)

-   Добавлен новый проп allowBackdropFilter, который включает размытие фона для некоторых вариантов кнопок (secondary, accent + disabled, primary + disabled) и тегов (filled, outlined + checked + disabled)

## 8.0.1

### Patch Changes

### [#1001](https://github.com/core-ds/core-components/pull/1001)

-   Изменен отступ до аддонов в размерах xxs, xs с 4px до 6px

## 8.0.0

### Major Changes

### [#979](https://github.com/core-ds/core-components/pull/979)

-   Прекращена поддержка IE

## 7.0.2

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 7.0.1

### Patch Changes

### [#961](https://github.com/core-ds/core-components/pull/961)

-   Добавлен блюр к полупрозрачным кнопкам

## 7.0.0

### Major Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компоненте Tag цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалены некоторые css переменные для мобильного компонента и темизация для intranet, click, mobile

## 6.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 6.0.1

### Patch Changes

### [#822](https://github.com/core-ds/core-components/pull/822)

-   Убрали свойство colorStylesMap из общего типа BaseTagProps

## 6.0.0

### Major Changes

### [#700](https://github.com/core-ds/core-components/pull/700)

-   Для компонента Tag добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   mq@4.2.0

## 5.4.1

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 5.4.0

### Minor Changes

### [#730](https://github.com/core-ds/core-components/pull/730)

-   Параметры `event` и `payload` в пропе `onClick` передаются всегда

## 5.3.2

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

## 5.3.1

### Patch Changes

### [#623](https://github.com/core-ds/core-components/pull/623)

-   Tокены 'dark' заменены на аналогичные 'light'

## 5.3.0

### Minor Changes

### [#558](https://github.com/core-ds/core-components/pull/558)

-   Добавлены пропсы childrenRef и childrenClassName, добавлен стиль white-space: nowrap;

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 5.2.0

### Minor Changes

### [#574](https://github.com/core-ds/core-components/pull/574)

-   Сброшена темизация скругления в теме intranet для shape: rounded

## 5.1.0

### Minor Changes

### [#498](https://github.com/core-ds/core-components/pull/498)

-   Добавлены новые пропс shape и view отвечающие за форму и стиль тега

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 5.0.4

### Patch Changes

### [#491](https://github.com/core-ds/core-components/pull/491)

-   Обновлены внутренние переменные (themes/default.css) для размеров кнопок (xxs добавлен, xs исправлен)

## 5.0.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 5.0.2

### Patch Changes

### [#292](https://github.com/core-ds/core-components/pull/292)

-   Новые стили кнопок в теме default
-   Новый вид состояния loading во всех темах (Loader заменён на Spinner)<br />
-   Исправлена высота кнопки ghost в размерах s/m/l/xl (увеличилась на 4px)<br />
-   Исправлена ширина кнопок secondary/tertiary (уменьшилась на 2px)<br />

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@5.0.0...@alfalab/core-components-tag@5.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-tag

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.4.1...@alfalab/core-components-tag@5.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [4.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.4.0...@alfalab/core-components-tag@4.4.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [4.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.3.3...@alfalab/core-components-tag@4.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [4.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.3.2...@alfalab/core-components-tag@4.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-tag

## [4.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.3.1...@alfalab/core-components-tag@4.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [4.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.3.0...@alfalab/core-components-tag@4.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-tag

# [4.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.2.4...@alfalab/core-components-tag@4.3.0) (2022-06-28)

### Bug Fixes

-   fixed launch storybook in IE ([#52](https://github.com/core-ds/core-components/issues/52)) ([379528b](https://github.com/core-ds/core-components/commit/379528b4ee24183dec38930ea15a31661b994085))

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [4.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.1.0...@alfalab/core-components-tag@4.2.0) (2022-03-28)

### Features

-   **filter-tag:** new component ([#1035](https://github.com/core-ds/core-components/issues/1035)) ([f97e9c5](https://github.com/core-ds/core-components/commit/f97e9c59062e56f3bafa855450a33b5f67497143))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.0.1...@alfalab/core-components-tag@4.1.0) (2022-03-24)

### Bug Fixes

-   imports for glyph icons ([#994](https://github.com/core-ds/core-components/issues/994)) ([8e807f2](https://github.com/core-ds/core-components/commit/8e807f26abf0f942fe8eadbd201caecb297b35dc))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@4.0.0...@alfalab/core-components-tag@4.0.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.4.0...@alfalab/core-components-tag@4.0.0) (2021-11-26)

### Features

-   **button:** добавлена кнопка размера 40px, изменены скругления ([#886](https://github.com/core-ds/core-components/issues/886)) ([88e657a](https://github.com/core-ds/core-components/commit/88e657a9f0f68b8b58f6e9437053954ee984f83c)), closes [#890](https://github.com/core-ds/core-components/issues/890)

### BREAKING CHANGES

-   **button:** Кнопка размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   feat(codemod): add button xs to xxs transformer

-   feat(tag): добавлен тэг размера 40px, изменены отступы

Добавлен тэг размером 40px, изменены отступы. Тем, кто использовал размер xs, надо заменить размер
на xxs.

-   **button:** Тэг размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   test: update screenshots

-   test: update screenshots

-   feat(button): linter fix

-   feat(button): fix min-width

-   feat(tag): remove vertical paddings

-   feat(tag): remove vertical paddings

-   feat(button): updates

# [3.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.3.0...@alfalab/core-components-tag@3.4.0) (2021-09-14)

### Features

-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.2.0...@alfalab/core-components-tag@3.3.0) (2021-08-23)

### Features

-   **tag:** add inverted colors ([#784](https://github.com/core-ds/core-components/issues/784)) ([d3681ae](https://github.com/core-ds/core-components/commit/d3681aeefe02e5f481d066013911a1877a165bb2))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.1.0...@alfalab/core-components-tag@3.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.0.1...@alfalab/core-components-tag@3.1.0) (2021-07-23)

### Features

-   add mobile theme for tag, radio, checkbox (PDS-244/247/248) ([#717](https://github.com/core-ds/core-components/issues/717)) ([36e2d99](https://github.com/core-ds/core-components/commit/36e2d99c716a03e7f319439df9ca47ec43ad4b71))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@3.0.0...@alfalab/core-components-tag@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-tag

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.2.0...@alfalab/core-components-tag@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.1.6...@alfalab/core-components-tag@2.2.0) (2021-06-04)

### Features

-   **tag:** adjusted colors ([#667](https://github.com/core-ds/core-components/issues/667)) ([ded4ac4](https://github.com/core-ds/core-components/commit/ded4ac4a4e02ee8ec4efdc6d990455caa3ab94bb))

## [2.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.1.5...@alfalab/core-components-tag@2.1.6) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-tag

## [2.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.1.4...@alfalab/core-components-tag@2.1.5) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-tag

## [2.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.1.2...@alfalab/core-components-tag@2.1.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.1.0...@alfalab/core-components-tag@2.1.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.0.1...@alfalab/core-components-tag@2.1.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@2.0.0...@alfalab/core-components-tag@2.0.1) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-tag

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@1.8.3...@alfalab/core-components-tag@2.0.0) (2021-03-04)

### Features

-   size vars (xs/s/m/l/xl → 32/48/56/64/72) ([d7254d2](https://github.com/core-ds/core-components/commit/d7254d2963106663e8f04b84bc747b38e4f57632))
-   **tag:** changed size L (72 → 64), added size XL (72) ([ea43560](https://github.com/core-ds/core-components/commit/ea435601abb79b3bde9e34d60616239e2a0ef6bc))

### BREAKING CHANGES

-   **tag:** size L changed to size XL

## [1.8.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-tag@1.8.2...@alfalab/core-components-tag@1.8.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-tag
