# Change Log

## 4.0.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 4.0.0

### Major Changes

<sup><time>18.11.2024</time></sup>

### [#1332](https://github.com/core-ds/core-components/pull/1332)

Крупное обновление Спиннера

-   Обновленный вид спиннера.
-   Добавлены новые пропсы для тонкой настройки внешнего вида:
    -   `preset` - преднастроенный вариант спиннера;
    -   `size` - теперь отвечает за размер кольца спиннера;
    -   `lineWidth` - толщина линии спиннера;
    -   `style` - позволяет регулировать отступы, цвет и т.п.
-   Добавлен [`codemod`](https://www.npmjs.com/package/@alfalab/core-components-codemod/v/2.7.0) для бесшовной миграции `Spinner`:
    ```bash
    npx @alfalab/core-components-codemod --transformers=spinner --glob='src/**/*.tsx'
    ```
    | Внимание                                                                                                                                                                                           |
    | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `codemod` может не работать в случаях использования [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) в коде. |

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0

## 3.5.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.4.0

### Minor Changes

<sup><time>05.07.2024</time></sup>

### [#1277](https://github.com/core-ds/core-components/pull/1277)

-   Исправили ширину и высоту для размера '16' с 18px на 16px

## 3.3.1

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 3.3.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1030](https://github.com/core-ds/core-components/pull/1030)

-   Добавлены новые способы указать размеры - 16, 24, 48. Буквенные значения размеров xs, s, m теперь deprecated, используйте вместо них 16, 24, 48 соответственно

## 3.2.0

### Minor Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 3.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.0.7

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.0.6

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

## 3.0.5

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.0.4

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@3.0.1...@alfalab/core-components-spinner@3.0.2) (2022-09-12)

### Bug Fixes

-   renamed default classnames ([#198](https://github.com/core-ds/core-components/issues/198)) ([bf22bba](https://github.com/core-ds/core-components/commit/bf22bbafbd16c14804316cba25a4026b85dde2f7))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@3.0.0...@alfalab/core-components-spinner@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-spinner

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.3.1...@alfalab/core-components-spinner@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.3.0...@alfalab/core-components-spinner@2.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.2.3...@alfalab/core-components-spinner@2.3.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.2.2...@alfalab/core-components-spinner@2.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-spinner

## [2.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.2.1...@alfalab/core-components-spinner@2.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.2.0...@alfalab/core-components-spinner@2.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-spinner

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.1.0...@alfalab/core-components-spinner@2.2.0) (2022-07-11)

### Features

-   **spinner:** new size & inverted theme ([#123](https://github.com/core-ds/core-components/issues/123)) ([5568ab5](https://github.com/core-ds/core-components/commit/5568ab5183badaded723ebc5a608b20bf471c6bc))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.0.3...@alfalab/core-components-spinner@2.1.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@2.0.0...@alfalab/core-components-spinner@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-spinner

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.9...@alfalab/core-components-spinner@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.8...@alfalab/core-components-spinner@1.0.9) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-spinner

## [1.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.7...@alfalab/core-components-spinner@1.0.8) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-spinner

## [1.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.5...@alfalab/core-components-spinner@1.0.7) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.4...@alfalab/core-components-spinner@1.0.5) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-spinner

## [1.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.3...@alfalab/core-components-spinner@1.0.4) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-spinner

## [1.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-spinner@1.0.2...@alfalab/core-components-spinner@1.0.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-spinner
