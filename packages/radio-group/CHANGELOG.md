# Change Log

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

### [#1355](https://github.com/core-ds/core-components/pull/1355)

-   Обновлены наименования переменных отступов

## 4.4.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 4.3.3

### Patch Changes

<sup><time>05.07.2024</time></sup>

### [#1272](https://github.com/core-ds/core-components/pull/1272)

-   Исправлено позиционирование инпута для группы тегов

## 4.3.2

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 4.3.1

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1204](https://github.com/core-ds/core-components/pull/1204)

-   Исправлен отступ в компонентах CheckboxGroup и RadioGroup в соответствии с макетом при их вертикальном расположении. Ранее отступ составлял 16px, теперь он уменьшен до 12px

## 4.3.0

### Minor Changes

### [#963](https://github.com/core-ds/core-components/pull/963)

-   В компонентах CheckboxGroup, RadioGroup, SegmentedControl, и Slider цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 4.2.1

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 4.2.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 4.1.1

### Patch Changes

### [#919](https://github.com/core-ds/core-components/pull/919)

-   Уменьшена специфичность стилей

## 4.1.0

### Minor Changes

### [#841](https://github.com/core-ds/core-components/pull/841)

-   Добавлен проп radioListClassName

## 4.0.1

### Patch Changes

### [#803](https://github.com/core-ds/core-components/pull/803)

-   Исправили стили для label в мобильных компонентах CheckboxGroup и RadioGroup

## 4.0.0

### Major Changes

### [#734](https://github.com/core-ds/core-components/pull/734)

-   Для компонента RadioGroup добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

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

### [#465](https://github.com/core-ds/core-components/pull/465)

-   Исправлена ошибка из-за которой происходил рассинхрон состояний

## 3.0.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@3.0.1...@alfalab/core-components-radio-group@3.0.2) (2022-09-12)

### Bug Fixes

-   **radio-group:** added onBlur and onFocus ([#249](https://github.com/core-ds/core-components/issues/249)) ([68c802c](https://github.com/core-ds/core-components/commit/68c802c2f4b8d1506573f9bd53aa2ef1af2e51ce))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@3.0.0...@alfalab/core-components-radio-group@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-radio-group

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.7.1...@alfalab/core-components-radio-group@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.7.0...@alfalab/core-components-radio-group@2.7.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.6.4...@alfalab/core-components-radio-group@2.7.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.6.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.6.3...@alfalab/core-components-radio-group@2.6.4) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [2.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.6.2...@alfalab/core-components-radio-group@2.6.3) (2022-07-15)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [2.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.6.1...@alfalab/core-components-radio-group@2.6.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.6.0...@alfalab/core-components-radio-group@2.6.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-radio-group

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.5.0...@alfalab/core-components-radio-group@2.6.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.3.0...@alfalab/core-components-radio-group@2.4.0) (2022-03-22)

### Bug Fixes

-   **radio-group:** add missing 'value' attribute to 'input' tag ([#1033](https://github.com/core-ds/core-components/issues/1033)) ([0f9cf0e](https://github.com/core-ds/core-components/commit/0f9cf0ecd74f4764ccd0b2839ba0cdf1b96e75cb)), closes [#1031](https://github.com/core-ds/core-components/issues/1031)

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.2.0...@alfalab/core-components-radio-group@2.3.0) (2021-10-11)

### Features

-   проставлен role=alert для ошибок ([#850](https://github.com/core-ds/core-components/issues/850)) ([dc634a3](https://github.com/core-ds/core-components/commit/dc634a3d008accfab10192ce234c12ef0ecc7fa9))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.1.0...@alfalab/core-components-radio-group@2.2.0) (2021-09-14)

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))
-   **tag:** add inverted colors ([#784](https://github.com/core-ds/core-components/issues/784)) ([d3681ae](https://github.com/core-ds/core-components/commit/d3681aeefe02e5f481d066013911a1877a165bb2))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.0.1...@alfalab/core-components-radio-group@2.1.0) (2021-07-23)

### Features

-   checkbox/radio/switch design updates (PDS-252) ([#735](https://github.com/core-ds/core-components/issues/735)) ([62f3c63](https://github.com/core-ds/core-components/commit/62f3c63279872a80ffb1c018b08addf897597b26))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@2.0.0...@alfalab/core-components-radio-group@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-radio-group

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.11...@alfalab/core-components-radio-group@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.1.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.10...@alfalab/core-components-radio-group@1.1.11) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.9...@alfalab/core-components-radio-group@1.1.10) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.7...@alfalab/core-components-radio-group@1.1.9) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.5...@alfalab/core-components-radio-group@1.1.7) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.4...@alfalab/core-components-radio-group@1.1.5) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.3...@alfalab/core-components-radio-group@1.1.4) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.2...@alfalab/core-components-radio-group@1.1.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.1...@alfalab/core-components-radio-group@1.1.2) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-radio-group

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio-group@1.1.0...@alfalab/core-components-radio-group@1.1.1) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
