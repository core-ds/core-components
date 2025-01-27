# Change Log

## 3.5.2

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 3.5.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1486](https://github.com/core-ds/core-components/pull/1486)

-   Добавлены sideEffects: false. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 2.

## 3.5.0

### Minor Changes

<sup><time>28.11.2024</time></sup>

### [#1459](https://github.com/core-ds/core-components/pull/1459)

-   Добавлен inverted цвет

## 3.4.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

## 3.4.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.3.2

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 3.3.1

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 3.3.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1027](https://github.com/core-ds/core-components/pull/1027)

-   Добавлены новые способы указать размеры - 4 и 8. Буквенные значения размеров s и m теперь deprecated, используйте вместо них 4 и 8 соответственно

## 3.2.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

-   В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 3.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.0.5

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.0.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.0.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@3.0.0...@alfalab/core-components-progress-bar@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.3.1...@alfalab/core-components-progress-bar@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.3.0...@alfalab/core-components-progress-bar@2.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.2.3...@alfalab/core-components-progress-bar@2.3.0) (2022-08-04)

### Bug Fixes

-   **progress-bar:** mechanics of progress line fixed ([#169](https://github.com/core-ds/core-components/issues/169)) ([4b46836](https://github.com/core-ds/core-components/commit/4b4683628ea4fd9da178799dfca8b287c0776ff1))

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.2.2...@alfalab/core-components-progress-bar@2.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

## [2.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.2.1...@alfalab/core-components-progress-bar@2.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.2.0...@alfalab/core-components-progress-bar@2.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.1.2...@alfalab/core-components-progress-bar@2.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.0.1...@alfalab/core-components-progress-bar@2.1.0) (2022-02-21)

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))
-   **progress-bar:** add size prop, additional views, new bg color ([#996](https://github.com/core-ds/core-components/issues/996)) ([63702f7](https://github.com/core-ds/core-components/commit/63702f7d9637e1fe3da502d7c91c4284453b3b48))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@2.0.0...@alfalab/core-components-progress-bar@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.1.6...@alfalab/core-components-progress-bar@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.1.5...@alfalab/core-components-progress-bar@1.1.6) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.1.4...@alfalab/core-components-progress-bar@1.1.5) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.1.2...@alfalab/core-components-progress-bar@1.1.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.1.0...@alfalab/core-components-progress-bar@1.1.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.0.9...@alfalab/core-components-progress-bar@1.1.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.0.8...@alfalab/core-components-progress-bar@1.0.9) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

## [1.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.0.7...@alfalab/core-components-progress-bar@1.0.8) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-progress-bar

## [1.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-progress-bar@1.0.6...@alfalab/core-components-progress-bar@1.0.7) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-progress-bar
