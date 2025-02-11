# Change Log

## 3.3.6

### Patch Changes

-   Обновлены зависимости
    -   shared@0.15.0

## 3.3.5

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1509](https://github.com/core-ds/core-components/pull/1509)

-   Добавлено "sideEffects": false, чтобы бандлер лучше делал тришейк.

-   Обновлены зависимости
    -   shared@0.14.1

## 3.3.4

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0

## 3.3.3

### Patch Changes

-   Обновлены зависимости
    -   shared@0.13.0

## 3.3.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.1

## 3.3.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0

## 3.3.0

### Minor Changes

<sup><time>28.06.2024</time></sup>

### [#1215](https://github.com/core-ds/core-components/pull/1215)

-   Добавлена возможность переопределять рендер контейнер для группы элементов использующих Portal

### Patch Changes

-   Обновлены зависимости
    -   shared@0.11.0

## 3.2.1

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 3.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.1.5

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.1.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.1.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.1.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 3.1.1

### Patch Changes

### [#372](https://github.com/core-ds/core-components/pull/372)

-   Исправлена ошибка "document is not defined" при immediateMount=true

## 3.1.0

### Minor Changes

### [#306](https://github.com/core-ds/core-components/pull/306)

-   В portal добавлен проп immediateMount, с помощью которого можно мгновенно отрендерить дочерние элементы через портал.
-   В base-modal исправлена проблема с доступом к ref-ам контента, который рендерился через portal.<br />

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@3.0.0...@alfalab/core-components-portal@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-portal

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.1.1...@alfalab/core-components-portal@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.1.0...@alfalab/core-components-portal@2.1.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.6...@alfalab/core-components-portal@2.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.5...@alfalab/core-components-portal@2.0.6) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-portal

## [2.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.4...@alfalab/core-components-portal@2.0.5) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.3...@alfalab/core-components-portal@2.0.4) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-portal

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.2...@alfalab/core-components-portal@2.0.3) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-portal

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@2.0.0...@alfalab/core-components-portal@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-portal

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.6...@alfalab/core-components-portal@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.4.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.5...@alfalab/core-components-portal@1.4.6) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-portal

## [1.4.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.3...@alfalab/core-components-portal@1.4.5) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.2...@alfalab/core-components-portal@1.4.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-portal

## [1.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.1...@alfalab/core-components-portal@1.4.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-portal

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-portal@1.4.0...@alfalab/core-components-portal@1.4.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-portal
