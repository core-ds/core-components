# @alfalab/core-components-code-input

## 3.9.8

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.0

## 3.9.7

### Patch Changes

-   Обновлены зависимости
    -   shared@0.16.0

## 3.9.6

### Patch Changes

-   Обновлены зависимости
    -   shared@0.15.0

## 3.9.5

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 3.9.4

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.1
    -   shared@0.14.1

## 3.9.3

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 3.9.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0

## 3.9.1

### Patch Changes

<sup><time>18.11.2024</time></sup>

### [#1426](https://github.com/core-ds/core-components/pull/1426)

-   Добавлен пакет @alfalab/core-config для глобальных настроек библиотеки. В него включены параметры: breakpoint для переключения между десктопной и мобильной версиями и client для выбора версии по умолчанию при серверном рендеринге

-   Обновлены зависимости
    -   shared@0.14.0

## 3.9.0

### Minor Changes

<sup><time>24.10.2024</time></sup>

### [#1387](https://github.com/core-ds/core-components/pull/1387)

-   Обновление темы corp

## 3.8.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

-   Обновлены зависимости
    -   shared@0.13.0

## 3.7.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1386](https://github.com/core-ds/core-components/pull/1386)

-   Откат обновления темизации corp из версии 47.16.0

## 3.6.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1360](https://github.com/core-ds/core-components/pull/1360)

-   Обновление темы corp

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

## 3.4.1

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1353](https://github.com/core-ds/core-components/pull/1353)

-   Обновлены наименования переменных отступов

## 3.4.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 3.3.1

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 3.3.0

### Minor Changes

<sup><time>04.03.2024</time></sup>

### [#1119](https://github.com/core-ds/core-components/pull/1119)

-   Добавлена новая пропса errorVisibleDuration, отвечающая за продолжительность отображения ошибки
-   Увеличено дефолтное время отображения ошибки с 300ms до 1300ms

## 3.2.0

### Minor Changes

### [#992](https://github.com/core-ds/core-components/pull/992)

-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 3.1.1

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 3.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 3.0.1

### Patch Changes

### [#857](https://github.com/core-ds/core-components/pull/857)

-   Убрали свойство stylesInput из общего типа BaseCodeInputProps

## 3.0.0

### Major Changes

### [#739](https://github.com/core-ds/core-components/pull/739)

-   Для компонента CodeInput добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   mq@4.2.0

## 2.3.5

### Patch Changes

### [#777](https://github.com/core-ds/core-components/pull/777)

-   Исправлена ошибка с фокусом в 16 реакте

## 2.3.4

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 2.3.3

### Patch Changes

### [#597](https://github.com/core-ds/core-components/pull/597)

-   Изменен цвет фона инпута

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 2.3.2

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 2.3.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 2.3.0

### Minor Changes

### [#407](https://github.com/core-ds/core-components/pull/407)

-   В CodeInput добавлен новый проп onErrorAnimationEnd
-   В Confirmation теперь сбрасывается состоянии ошибки при включенном пропе clearCodeOnError<br />
-   В Confirmation исправлена ошибка, из-за которой не показывался текст из пропа texts.blockSmsRetry<br />

## 2.2.0

### Minor Changes

### [#343](https://github.com/core-ds/core-components/pull/343)

-   Добавлен проп clearCodeOnError. Если он включен, то при возникновении ошибки код будет очищаться

## 2.1.1

### Patch Changes

-   [#274](https://github.com/core-ds/core-components/pull/274): Компактная версия теперь включается когда >6 полей. Thanks [@Valeri8888](https://github.com/Valeri8888)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@2.0.2...@alfalab/core-components-code-input@2.1.0) (2022-09-13)

### Features

-   **code-input:** update mobile version ([#230](https://github.com/core-ds/core-components/issues/230)) ([bf66e85](https://github.com/core-ds/core-components/commit/bf66e85b147e22be13f1a62d945aba6012d5ccf5))
-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@2.0.1...@alfalab/core-components-code-input@2.0.2) (2022-08-26)

### Bug Fixes

-   **code-input:** fixed "cannot read properties of undefined (reading get)" error ([#226](https://github.com/core-ds/core-components/issues/226)) ([8383613](https://github.com/core-ds/core-components/commit/838361388979acc184fb213f96c9e4ab43333fbc))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@2.0.0...@alfalab/core-components-code-input@2.0.1) (2022-08-19)

### Bug Fixes

-   omit enterKeyHint prop ([#197](https://github.com/core-ds/core-components/issues/197)) ([72f4946](https://github.com/core-ds/core-components/commit/72f494623c282f61b45539fa1c13d5c45bc5180c))

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.5.1...@alfalab/core-components-code-input@2.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [1.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.5.0...@alfalab/core-components-code-input@1.5.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [1.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.4.3...@alfalab/core-components-code-input@1.5.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [1.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.4.2...@alfalab/core-components-code-input@1.4.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-code-input

## [1.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.4.1...@alfalab/core-components-code-input@1.4.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.4.0...@alfalab/core-components-code-input@1.4.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-code-input

# [1.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.3.0...@alfalab/core-components-code-input@1.4.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.2.3...@alfalab/core-components-code-input@1.3.0) (2022-06-20)

### Features

-   **code-input:** autocomplete sms in android ([#67](https://github.com/core-ds/core-components/issues/67)) ([b32f734](https://github.com/core-ds/core-components/commit/b32f73403d5ccce9812368e5f186952a67dca57c))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-code-input@1.1.0...@alfalab/core-components-code-input@1.2.0) (2022-03-03)

### Bug Fixes

-   **code-input:** code-input-request-animation-frame-fix ([#1014](https://github.com/core-ds/core-components/issues/1014)) ([ad1478e](https://github.com/core-ds/core-components/commit/ad1478ebfd17679e8a2792462c619f525e5b7bb9))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# 1.1.0 (2022-02-16)

### Features

-   **code-input:** add component ([#932](https://github.com/core-ds/core-components/issues/932)) ([dc40cb5](https://github.com/core-ds/core-components/commit/dc40cb5b28322b4a2dc5735b354a7d45cf34adb9))
