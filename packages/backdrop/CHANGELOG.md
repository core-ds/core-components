# @alfalab/core-components-backdrop

## 3.4.5

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 3.4.4

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1444](https://github.com/core-ds/core-components/pull/1444)

-   Для drawer исправлена передача backdrop transition пропсов
-   Для backdrop поднята специфичность transition класса

## 3.4.3

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

## 3.4.2

### Patch Changes

<sup><time>10.12.2024</time></sup>

### [#1480](https://github.com/core-ds/core-components/pull/1480)

-   Добавлено sideEffects: false

## 3.4.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 3.4.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.3.0

### Minor Changes

<sup><time>04.09.2024</time></sup>

### [#1352](https://github.com/core-ds/core-components/pull/1352)

-   Добавлено новое свойство transparent, отвечающее за прозрачность бэкдропа. Свойство invisible помечено как deprecated

## 3.2.0

### Minor Changes

### [#977](https://github.com/core-ds/core-components/pull/977)

-   В компонентах Backdrop, BaseModal, BottomSheet, Modal, NavigationBar, Popover, Select, SelectWithTags, SidePanel, ToastPlate и Tooltip цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

### [#991](https://github.com/core-ds/core-components/pull/991)

-   Исправлена проблема, из-за которой появлялся warning: "findDOMNode is deprecated"

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

### [#615](https://github.com/core-ds/core-components/pull/615)

-   Проп invisible теперь привязан к пропу open CssTransitionGroup

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

### [#470](https://github.com/core-ds/core-components/pull/470)

-   Обновлена версия react-transition-group

## 3.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@3.0.0...@alfalab/core-components-backdrop@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-backdrop

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.2.1...@alfalab/core-components-backdrop@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.2.0...@alfalab/core-components-backdrop@2.2.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.1.3...@alfalab/core-components-backdrop@2.2.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.1.2...@alfalab/core-components-backdrop@2.1.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-backdrop

## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.1.1...@alfalab/core-components-backdrop@2.1.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.1.0...@alfalab/core-components-backdrop@2.1.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-backdrop

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.0.3...@alfalab/core-components-backdrop@2.1.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@2.0.0...@alfalab/core-components-backdrop@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-backdrop

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@1.1.2...@alfalab/core-components-backdrop@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@1.1.1...@alfalab/core-components-backdrop@1.1.2) (2021-04-26)

### Bug Fixes

-   **drawer:** lost vars ([#632](https://github.com/core-ds/core-components/issues/632)) ([82a8e46](https://github.com/core-ds/core-components/commit/82a8e461fc16d4ae8b6d3d268c92f7dc969e81f8))

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-backdrop@1.1.0...@alfalab/core-components-backdrop@1.1.1) (2021-04-09)

### Bug Fixes

-   **backdrop:** styles ([82bdfa7](https://github.com/core-ds/core-components/commit/82bdfa7759240755f74bf12906c395d633f464e4))

# 1.1.0 (2021-04-09)

### Features

-   **backdrop:** add component ([2b87958](https://github.com/core-ds/core-components/commit/2b87958e51449645c58bbd02552ce7a908c6bab8))
