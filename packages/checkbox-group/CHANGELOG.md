# @alfalab/core-components-checkbox-group

## 4.10.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.1

## 4.10.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.0

## 4.10.0

### Minor Changes

<sup><time>11.04.2025</time></sup>

### [#1612](https://github.com/core-ds/core-components/pull/1612)

-   Обернул компонент `BaseCheckboxGroup` в forwardRef и предоставил возможность прокинуть ref

## 4.9.0

### Minor Changes

<sup><time>26.03.2025</time></sup>

### [#1610](https://github.com/core-ds/core-components/pull/1610)

-   Добавление пропса `name` в атрибуты `input` компонента Checkbox

## 4.8.0

### Minor Changes

<sup><time>21.02.2025</time></sup>

### [#1527](https://github.com/core-ds/core-components/pull/1527)

-   Добавлен пропс `colors`, который отвечает за набор цветов в компоненте (возможность переключить на inverted цвета для тёмного фона)

## 4.7.7

### Patch Changes

-   Обновлены зависимости
    -   shared@0.16.0

## 4.7.6

### Patch Changes

-   Обновлены зависимости
    -   shared@0.15.0

## 4.7.5

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 4.7.4

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.1
    -   shared@0.14.1

## 4.7.3

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1486](https://github.com/core-ds/core-components/pull/1486)

-   Добавлены sideEffects: false. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 2.

## 4.7.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0

## 4.7.1

### Patch Changes

<sup><time>18.11.2024</time></sup>

### [#1426](https://github.com/core-ds/core-components/pull/1426)

-   Добавлен пакет @alfalab/core-config для глобальных настроек библиотеки. В него включены параметры: breakpoint для переключения между десктопной и мобильной версиями и client для выбора версии по умолчанию при серверном рендеринге

-   Обновлены зависимости
    -   shared@0.14.0

## 4.7.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

-   Обновлены зависимости
    -   shared@0.13.0

## 4.6.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 4.6.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 4.5.0

### Minor Changes

<sup><time>04.09.2024</time></sup>

### [#1343](https://github.com/core-ds/core-components/pull/1343)

-   Стилевые исправления компонентов
-   Обновление документации

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1353](https://github.com/core-ds/core-components/pull/1353)

-   Обновлены наименования переменных отступов

## 4.4.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 4.3.1

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1204](https://github.com/core-ds/core-components/pull/1204)

-   Исправлен отступ в компонентах CheckboxGroup и RadioGroup в соответствии с макетом при их вертикальном расположении. Ранее отступ составлял 16px, теперь он уменьшен до 12px

## 4.3.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

## 4.2.0

### Minor Changes

### [#963](https://github.com/core-ds/core-components/pull/963)

-   В компонентах CheckboxGroup, RadioGroup, SegmentedControl, и Slider цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 4.1.1

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 4.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 4.0.1

### Patch Changes

### [#803](https://github.com/core-ds/core-components/pull/803)

-   Исправили стили для label в мобильных компонентах CheckboxGroup и RadioGroup

## 4.0.0

### Major Changes

### [#734](https://github.com/core-ds/core-components/pull/734)

-   Для компонента CheckboxGroup добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   mq@4.2.0

## 3.0.9

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.0.8

### Patch Changes

### [#622](https://github.com/core-ds/core-components/pull/622)

-   Убраны отрицательные отступы справа для списка тэгов, теперь тэги не будут выходить за пределы контейнера

## 3.0.7

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.0.6

### Patch Changes

### [#559](https://github.com/core-ds/core-components/pull/559)

-   Фикс доступности с клавиатуры, добавление скриншот тестов для компонентов с использованием Tag

## 3.0.5

### Patch Changes

### [#513](https://github.com/core-ds/core-components/pull/513)

-   Изменены типы onChange коллбэка.

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.4

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 3.0.3

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@3.0.1...@alfalab/core-components-checkbox-group@3.0.2) (2022-09-12)

### Bug Fixes

-   **checkbox-group:** added onBlur and onFocus ([#250](https://github.com/core-ds/core-components/issues/250)) ([b4a739b](https://github.com/core-ds/core-components/commit/b4a739b8516089265b9979f6f1eb5649d05833f5))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@3.0.0...@alfalab/core-components-checkbox-group@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.7.2...@alfalab/core-components-checkbox-group@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.7.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.7.1...@alfalab/core-components-checkbox-group@2.7.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [2.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.7.0...@alfalab/core-components-checkbox-group@2.7.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

# [2.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.6.3...@alfalab/core-components-checkbox-group@2.7.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.6.2...@alfalab/core-components-checkbox-group@2.6.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [2.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.6.1...@alfalab/core-components-checkbox-group@2.6.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.6.0...@alfalab/core-components-checkbox-group@2.6.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.5.2...@alfalab/core-components-checkbox-group@2.6.0) (2022-06-28)

### Bug Fixes

-   default className bug ([#13](https://github.com/core-ds/core-components/issues/13)) ([32883b3](https://github.com/core-ds/core-components/commit/32883b3a54f04b558e97e285824c9701fc802f99))

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.4.0...@alfalab/core-components-checkbox-group@2.5.0) (2022-02-21)

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.3.0...@alfalab/core-components-checkbox-group@2.4.0) (2021-12-20)

### Features

-   **checkbox-group:** add click theme ([967d585](https://github.com/core-ds/core-components/commit/967d58538c5537fc2b3ac583fb742ebaef86109e))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.2.0...@alfalab/core-components-checkbox-group@2.3.0) (2021-10-11)

### Features

-   проставлен role=alert для ошибок ([#850](https://github.com/core-ds/core-components/issues/850)) ([dc634a3](https://github.com/core-ds/core-components/commit/dc634a3d008accfab10192ce234c12ef0ecc7fa9))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.1.0...@alfalab/core-components-checkbox-group@2.2.0) (2021-09-14)

### Bug Fixes

-   **checkbox:** fix layout ([#790](https://github.com/core-ds/core-components/issues/790)) ([8aa18b4](https://github.com/core-ds/core-components/commit/8aa18b48167eeb5df225ff854d3ca337cd43d4f2))

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))
-   **tag:** add inverted colors ([#784](https://github.com/core-ds/core-components/issues/784)) ([d3681ae](https://github.com/core-ds/core-components/commit/d3681aeefe02e5f481d066013911a1877a165bb2))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.0.1...@alfalab/core-components-checkbox-group@2.1.0) (2021-07-23)

### Features

-   checkbox/radio/switch design updates (PDS-252) ([#735](https://github.com/core-ds/core-components/issues/735)) ([62f3c63](https://github.com/core-ds/core-components/commit/62f3c63279872a80ffb1c018b08addf897597b26))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@2.0.0...@alfalab/core-components-checkbox-group@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.11...@alfalab/core-components-checkbox-group@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.2.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.10...@alfalab/core-components-checkbox-group@1.2.11) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.9...@alfalab/core-components-checkbox-group@1.2.10) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.7...@alfalab/core-components-checkbox-group@1.2.9) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.5...@alfalab/core-components-checkbox-group@1.2.7) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.4...@alfalab/core-components-checkbox-group@1.2.5) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.3...@alfalab/core-components-checkbox-group@1.2.4) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.2...@alfalab/core-components-checkbox-group@1.2.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.1...@alfalab/core-components-checkbox-group@1.2.2) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-checkbox-group

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-checkbox-group@1.2.0...@alfalab/core-components-checkbox-group@1.2.1) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
