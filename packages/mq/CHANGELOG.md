# @alfalab/core-components-mq

## 5.0.1

### Patch Changes

-   Обновлены зависимости
    -   @alfalab/core-components-shared@1.0.1

## 5.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Пакет `@alfalab/core-config` перенесен в `@alfalab/core-components-config`. При обновлении необходимо заменить `as-is`.

Тип `CoreConfigContext` переименован в `CoreConfigContextValue`.

### Patch Changes

-   Обновлены зависимости
    -   @alfalab/core-components-config@1.0.0
    -   @alfalab/core-components-shared@1.0.0

## 4.4.1

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1497](https://github.com/core-ds/core-components/pull/1497)

-   Добавлено sideEffects: false (package.json)

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

-   Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

## 4.4.0

### Minor Changes

<sup><time>27.11.2024</time></sup>

### [#1469](https://github.com/core-ds/core-components/pull/1469)

-   Добавлен хук `useIsDesktop`

## 4.3.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

## 4.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 4.1.5

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 4.1.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 4.1.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 4.1.2

### Patch Changes

### [#484](https://github.com/core-ds/core-components/pull/484)

-   Исправлен тип для значения по-умолчанию у хука useMatchMedia
-   В side-panel добавлена возможность указать значение по-умолчанию для useMatchMedia<br />

## 4.1.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 4.1.0

### Minor Changes

### [#381](https://github.com/core-ds/core-components/pull/381)

-   В хук useMatchMedia добавлено значение по-умолчанию. Также useEffect заменен на useLayoutEffect

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@4.0.0...@alfalab/core-components-mq@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-mq

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.1.1...@alfalab/core-components-mq@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.1.0...@alfalab/core-components-mq@3.1.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.6...@alfalab/core-components-mq@3.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.5...@alfalab/core-components-mq@3.0.6) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-mq

## [3.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.4...@alfalab/core-components-mq@3.0.5) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.3...@alfalab/core-components-mq@3.0.4) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-mq

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.2...@alfalab/core-components-mq@3.0.3) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-mq

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@3.0.0...@alfalab/core-components-mq@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-mq

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@2.0.1...@alfalab/core-components-mq@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@2.0.0...@alfalab/core-components-mq@2.0.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-mq

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@1.1.6...@alfalab/core-components-mq@2.0.0) (2021-04-01)

### Features

-   **mq:** change mobile-s to mobile-xs ([9abf5ba](https://github.com/core-ds/core-components/commit/9abf5bada45287a786610dd6cce7cc047d779012))

### BREAKING CHANGES

-   **mq:** mobile-s теперь 360

## [1.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@1.1.4...@alfalab/core-components-mq@1.1.6) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@1.1.3...@alfalab/core-components-mq@1.1.4) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-mq

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@1.1.2...@alfalab/core-components-mq@1.1.3) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-mq

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-mq@1.1.1...@alfalab/core-components-mq@1.1.2) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-mq
