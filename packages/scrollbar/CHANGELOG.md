# Change Log

## 3.2.0

### Minor Changes

<sup><time>19.02.2025</time></sup>

### [#1428](https://github.com/core-ds/core-components/pull/1428)

-   Добавлен дополнительный класс для контейнера вертикальной полосы прокрутки `verticalBarClassName`
-   Добавлен обработчик прокрутки контента `onContentScroll`

## 3.1.3

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 3.1.2

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1486](https://github.com/core-ds/core-components/pull/1486)

-   Добавлены sideEffects: false. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 2.

## 3.1.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

<sup><time>13.09.2024</time></sup>

### [#1368](https://github.com/core-ds/core-components/pull/1368)

-   Исправлен расчет высоты списка опций

## 3.1.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.0.3

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

## 3.0.2

### Patch Changes

<sup><time>26.06.2024</time></sup>

### [#1264](https://github.com/core-ds/core-components/pull/1264)

-   Исправлена ширина контента в пустом состоянии

## 3.0.1

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

<sup><time>14.06.2024</time></sup>

### [#1244](https://github.com/core-ds/core-components/pull/1244)

-   Исправлена ширина списка выбора вариантов Select при использовании VirtualOptionsList

## 3.0.0

### Major Changes

### [#979](https://github.com/core-ds/core-components/pull/979)

-   Прекращена поддержка IE

### Minor Changes

### [#992](https://github.com/core-ds/core-components/pull/992)

-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 2.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 2.1.6

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 2.1.5

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 2.1.4

### Patch Changes

### [#555](https://github.com/core-ds/core-components/pull/555)

-   Убрана фокусная рамка

## 2.1.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 2.1.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 2.1.1

### Patch Changes

-   [#239](https://github.com/core-ds/core-components/pull/239): Исправлен border-radius при hover-эффекте. Thanks [@Valeri8888](https://github.com/Valeri8888)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@2.0.1...@alfalab/core-components-scrollbar@2.1.0) (2022-08-29)

### Features

-   **textarea:** custom scrollbar ([#196](https://github.com/core-ds/core-components/issues/196)) ([c0d956c](https://github.com/core-ds/core-components/commit/c0d956cc7bf0a5440a66602ca77de2942a268be2))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@2.0.0...@alfalab/core-components-scrollbar@2.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-scrollbar

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.2.1...@alfalab/core-components-scrollbar@2.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.2.0...@alfalab/core-components-scrollbar@1.2.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.5...@alfalab/core-components-scrollbar@1.2.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.4...@alfalab/core-components-scrollbar@1.1.5) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-scrollbar

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.3...@alfalab/core-components-scrollbar@1.1.4) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.2...@alfalab/core-components-scrollbar@1.1.3) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-scrollbar

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.1...@alfalab/core-components-scrollbar@1.1.2) (2022-07-14)

### Bug Fixes

-   **scrollbar:** removed core-js dependency ([#145](https://github.com/core-ds/core-components/issues/145)) ([72da859](https://github.com/core-ds/core-components/commit/72da859555de203e1f4c75a316227738b4b981f2))

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-scrollbar@1.1.0...@alfalab/core-components-scrollbar@1.1.1) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-scrollbar

# 1.1.0 (2022-06-08)

### Features

-   **scrollbar:** new component scrollbar ([#48](https://github.com/core-ds/core-components/issues/48)) ([5ea6fa3](https://github.com/core-ds/core-components/commit/5ea6fa352ff943cda8c52e35f9d96da9bea97fa3))
