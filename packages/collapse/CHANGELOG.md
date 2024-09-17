# Change Log

## 4.5.1

### Patch Changes

-   Обновлены зависимости
    -   link@5.3.1

## 4.5.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   link@5.3.0

## 4.4.4

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1353](https://github.com/core-ds/core-components/pull/1353)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   link@5.2.3

## 4.4.3

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

-   Обновлены зависимости
    -   link@5.2.2

## 4.4.2

### Patch Changes

<sup><time>29.03.2024</time></sup>

### [#1152](https://github.com/core-ds/core-components/pull/1152)

-   Повышена специфичность стилей label

## 4.4.1

### Patch Changes

-   Обновлены зависимости
    -   link@5.2.1

## 4.4.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

## 4.3.3

### Patch Changes

-   Обновлены зависимости
    -   link@5.2.0

## 4.3.2

### Patch Changes

-   Обновлены зависимости
    -   link@5.1.1

## 4.3.1

### Patch Changes

### [#898](https://github.com/core-ds/core-components/pull/898)

-   Исправлена ошибка, из-за которой компонент ломался после ресайза

## 4.3.0

### Minor Changes

### [#862](https://github.com/core-ds/core-components/pull/862)

-   Обновлены пакеты иконок

## 4.2.1

### Patch Changes

### [#818](https://github.com/core-ds/core-components/pull/818)

-   Исправлена ошибка, из-за которой после анимации не всегда отображался дочерний элемент в safari

## 4.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   link@5.1.0

## 4.1.5

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   link@5.0.6

## 4.1.4

### Patch Changes

-   Обновлены зависимости
    -   link@5.0.5

## 4.1.3

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   link@5.0.4

## 4.1.2

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   link@5.0.3

## 4.1.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   link@5.0.2

## 4.1.0

### Minor Changes

### [#335](https://github.com/core-ds/core-components/pull/335)

-   Добавлен обязательный параметр(expanded) в типы обработчиков состояний.
    Добавлены пропсы:<br />
    <br />
-   `expandedContentClassName` - позволяет устанавливать дополнительный класс для скрываемого контента.<br />
-   `defaultExpanded` - позволяет устанавливать начальное состояние неконтролируемого компонента.<br />

## 4.0.3

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 4.0.2

### Patch Changes

-   Updated dependencies [[#283](https://github.com/core-ds/core-components/pull/283)]
    -   @alfalab/core-components-link@5.0.1

## 4.0.1

### Patch Changes

-   [#278](https://github.com/core-ds/core-components/pull/278): Отключена анимация при изначальном expanded=true. Убран ненужный пропс style.. Thanks [@reme3d2y](https://github.com/reme3d2y)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@3.0.2...@alfalab/core-components-collapse@4.0.0) (2022-09-06)

### Bug Fixes

-   **link:** replace component with a button in pseudo mode ([#156](https://github.com/core-ds/core-components/issues/156)) ([6f24cbb](https://github.com/core-ds/core-components/commit/6f24cbb433c4ced85986d5f0e0b3bc1289e0fb8d))

### BREAKING CHANGES

-   **link:** В компоненте Link с пропсом pseudo заменяется дефолтный html-элемент "a" на
    "button"

Co-authored-by: crybabydanchan <crysiscaramel@gmal.com>

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@3.0.1...@alfalab/core-components-collapse@3.0.2) (2022-08-25)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@3.0.0...@alfalab/core-components-collapse@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-collapse

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.3.1...@alfalab/core-components-collapse@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.3.0...@alfalab/core-components-collapse@2.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.5...@alfalab/core-components-collapse@2.3.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.4...@alfalab/core-components-collapse@2.2.5) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.3...@alfalab/core-components-collapse@2.2.4) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.2...@alfalab/core-components-collapse@2.2.3) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.1...@alfalab/core-components-collapse@2.2.2) (2022-07-11)

### Bug Fixes

-   fixed 'window is not defined' error ([#126](https://github.com/core-ds/core-components/issues/126)) ([f4e9ca5](https://github.com/core-ds/core-components/commit/f4e9ca54ed52fb328d21c85b7efa8176a90dcb6e))

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.2.0...@alfalab/core-components-collapse@2.2.1) (2022-07-01)

### Performance Improvements

-   refuse to use a resize-observer polyfill if it is not needed ([#120](https://github.com/core-ds/core-components/issues/120)) ([f2abcb2](https://github.com/core-ds/core-components/commit/f2abcb2888dd5906b345f5fc64b1624eef56ac13))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.1.6...@alfalab/core-components-collapse@2.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.1.2...@alfalab/core-components-collapse@2.1.3) (2021-12-08)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.1.1...@alfalab/core-components-collapse@2.1.2) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.1.0...@alfalab/core-components-collapse@2.1.1) (2021-10-27)

### Bug Fixes

-   **collapse:** dynamic content height ([#864](https://github.com/core-ds/core-components/issues/864)) ([e96c86b](https://github.com/core-ds/core-components/commit/e96c86bde70d58e4311a2c6bcd6d7407be0f4c44))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.0.3...@alfalab/core-components-collapse@2.1.0) (2021-10-25)

### Features

-   **collapse:** reset height to auto ([#822](https://github.com/core-ds/core-components/issues/822)) ([f533e3b](https://github.com/core-ds/core-components/commit/f533e3ba1eab5f41539c39ca3b97f698e90ca687))

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.0.2...@alfalab/core-components-collapse@2.0.3) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.0.1...@alfalab/core-components-collapse@2.0.2) (2021-08-04)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@2.0.0...@alfalab/core-components-collapse@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-collapse

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.2.1...@alfalab/core-components-collapse@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.2.0...@alfalab/core-components-collapse@1.2.1) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-collapse

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.1.1...@alfalab/core-components-collapse@1.2.0) (2021-05-25)

### Features

-   **collapse:** add ability to change state using prop expanded ([#659](https://github.com/core-ds/core-components/issues/659)) ([809c835](https://github.com/core-ds/core-components/commit/809c8356f6dec0eeb9167bca8483f36bf5845455))

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.1.0...@alfalab/core-components-collapse@1.1.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-collapse

# [1.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.8...@alfalab/core-components-collapse@1.1.0) (2021-04-06)

### Features

-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))

## [1.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.7...@alfalab/core-components-collapse@1.0.8) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [1.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.5...@alfalab/core-components-collapse@1.0.7) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.4...@alfalab/core-components-collapse@1.0.5) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [1.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.3...@alfalab/core-components-collapse@1.0.4) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [1.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.2...@alfalab/core-components-collapse@1.0.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [1.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.1...@alfalab/core-components-collapse@1.0.2) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-collapse

## [1.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-collapse@1.0.0...@alfalab/core-components-collapse@1.0.1) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-collapse
