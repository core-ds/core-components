# @alfalab/core-components-stack

## 6.0.0

### Major Changes

<sup><time>16.04.2025</time></sup>

#### [#1](https://github.com/hextion/core-components/pull/1)

-   Пакет `@alfalab/stack-context` перенесен в `@balafla/core-components-stack-context`. При обновлении необходимо заменить `as-is`.

### Patch Changes

<sup><time>16.04.2025</time></sup>

#### [#1](https://github.com/hextion/core-components/pull/1)

-   Обновлена сборка.
-   Добавлены пропущенные зависимости.
-   Синхронизированы версии зависимостей.

-   Обновлены зависимости
    -   @balafla/core-components-stack-context@1.0.0

## 5.0.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 5.0.0

### Major Changes

<sup><time>28.06.2024</time></sup>

### [#1207](https://github.com/core-ds/core-components/pull/1207)

-   При взаимодействии нескольких компонентов-модулей, которые включают в себя core-components, React Context создает несколько экземпляров, что приводит к потере z-index. Для решения этой проблемы контекст компонента `Stack` вынесен в глобальную библиотеку.

## 4.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 4.0.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 4.0.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 4.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@4.0.0...@alfalab/core-components-stack@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-stack

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.1.1...@alfalab/core-components-stack@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.1.0...@alfalab/core-components-stack@3.1.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.0.5...@alfalab/core-components-stack@3.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.0.4...@alfalab/core-components-stack@3.0.5) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.0.3...@alfalab/core-components-stack@3.0.4) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-stack

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.0.2...@alfalab/core-components-stack@3.0.3) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-stack

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@3.0.0...@alfalab/core-components-stack@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-stack

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-stack@2.0.0...@alfalab/core-components-stack@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# 2.0.0 (2021-04-26)

### Features

-   **stack:** add new component ([#612](https://github.com/core-ds/core-components/issues/612)) ([c520f91](https://github.com/core-ds/core-components/commit/c520f91cd22bb9e23fd2f428719865b4c7d5a2a6))

### BREAKING CHANGES

-   **stack:** remove z-index, add stack component

-   feat(modal): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(notification-manager): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(notification): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(popover): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(select): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(toast): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(tooltip): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(stack): fix comment

-   Revert "feat(modal): remove z-index, add stack component"

This reverts commit fcae901c6ec58311701cd491296a7b04016a9a65.

-   feat(base-modal): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   test(file-upload-item): update snapshot
