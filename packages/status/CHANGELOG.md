# @alfalab/core-components-status

## 3.7.0

### Minor Changes

<sup><time>11.04.2025</time></sup>

### [#1663](https://github.com/core-ds/core-components/pull/1663)

-   Добавлен пропс `leftAddons` позволяющий размещать контент в левый слот

## 3.6.3

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 3.6.2

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 3.6.1

### Patch Changes

<sup><time>20.09.2024</time></sup>

### [#1380](https://github.com/core-ds/core-components/pull/1380)

-   Уменьшена жирность текста для lowercase режима у всех размеров

## 3.6.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1361](https://github.com/core-ds/core-components/pull/1361)

-   Добавлен пропс `size`. Теперь помимо дефолтного значения `20` можно также установить `24, 32, 40`
-   Для значения `20` изменены скругления
-   Добавлен пропс `shape`. С помощью него можно задать тип скругления компонента - `rectangular, rounded`
-   Добавлен пропс `uppercase`. Изначально текст в компоненте всегда указывался в верхнем регистре - теперь регистр можно менять. Для обратной совместимости оставили по умолчанию `uppercase=true`
-   Внутренние улучшения кода компонента

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 3.5.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.4.2

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

## 3.4.1

### Patch Changes

<sup><time>05.07.2024</time></sup>

### [#1273](https://github.com/core-ds/core-components/pull/1273)

-   Добавлено предупреждение в консоль о том, что значение soft для view теперь deprecated

## 3.4.0

### Minor Changes

<sup><time>13.06.2024</time></sup>

### [#1223](https://github.com/core-ds/core-components/pull/1223)

-   Добавлены новые значения для свойства view: 'muted-alt' и 'muted'. Значение 'soft' для view теперь deprecated, используйте вместо него 'muted-alt'
-   Также добавлен кодмод, который изменяет значение view компонента Status с 'soft' на 'muted-alt'

## 3.3.0

### Minor Changes

<sup><time>24.05.2024</time></sup>

### [#1205](https://github.com/core-ds/core-components/pull/1205)

-   Для компонента Status было добавлено многоточие для обработки сценариев переполнения

## 3.2.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

-   В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 3.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.0.8

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.0.7

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.0.6

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.5

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 3.0.4

### Patch Changes

### [#319](https://github.com/core-ds/core-components/pull/319)

-   Добавлен текстовый стиль letter-spacing для компонента Status

## 3.0.3

-   В этом выпуске не было значимых изменений.

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@3.0.0...@alfalab/core-components-status@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-status

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.4.1...@alfalab/core-components-status@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.4.0...@alfalab/core-components-status@2.4.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.3.3...@alfalab/core-components-status@2.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.3.2...@alfalab/core-components-status@2.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-status

## [2.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.3.1...@alfalab/core-components-status@2.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.3.0...@alfalab/core-components-status@2.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-status

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.2.2...@alfalab/core-components-status@2.3.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.1.0...@alfalab/core-components-status@2.2.0) (2021-12-09)

### Features

-   **status:** добавлено 10% прозрачности в цвет фона ([#896](https://github.com/core-ds/core-components/issues/896)) ([b55c62b](https://github.com/core-ds/core-components/commit/b55c62b49cc52a15ff7497b9ad329773fba15959))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.0.1...@alfalab/core-components-status@2.1.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@2.0.0...@alfalab/core-components-status@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-status

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.2.6...@alfalab/core-components-status@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.2.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.2.5...@alfalab/core-components-status@1.2.6) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-status

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.2.4...@alfalab/core-components-status@1.2.5) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-status

## [1.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.2.2...@alfalab/core-components-status@1.2.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.2.0...@alfalab/core-components-status@1.2.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.1.3...@alfalab/core-components-status@1.2.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.1.2...@alfalab/core-components-status@1.1.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-status

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.1.1...@alfalab/core-components-status@1.1.2) (2021-03-11)

**Note:** Version bump only for package @alfalab/core-components-status

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-status@1.1.0...@alfalab/core-components-status@1.1.1) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-status

# 1.1.0 (2021-03-05)

### Features

-   **status:** add component ([#546](https://github.com/core-ds/core-components/issues/546)) ([52a1f0b](https://github.com/core-ds/core-components/commit/52a1f0bd8578fe34d1c214b93a363e7b76621c17))
