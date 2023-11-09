# Change Log

## 5.3.0

### Minor Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 5.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 5.1.1

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 5.1.0

### Minor Changes

### [#621](https://github.com/core-ds/core-components/pull/621)

-   Добавлены пропсы color - цветовое оформление бейджа при view='count' и iconUnderlayColor - цвет подложки под иконкой

## 5.0.2

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 5.0.1

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 5.0.0

### Major Changes

### [#397](https://github.com/core-ds/core-components/pull/397)

-   Обновлен размер 's' c 18px на 20px для Badge view='icon'
-   Исправлено сжатие svg в размерах 's' и 'm'<br />
-   Обводка для Badge view='count' изменена с внешней на внутреннюю<br />

## 4.0.4

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 4.0.3

### Patch Changes

### [#333](https://github.com/core-ds/core-components/pull/333)

-   Явные значения в css классах(padding, border-radius и т.п) заменены на переменные

## 4.0.2

### Patch Changes

-   [#284](https://github.com/core-ds/core-components/pull/284): В компоненте Badge уменьшен font-size до 11px для размера 's' (высота 16-17). Thanks [@Valeri8888](https://github.com/Valeri8888)
    В компоненте Tabs свойство font-feature-settings: 'ss01' назначено только для темы click

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@4.0.0...@alfalab/core-components-badge@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-badge

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.4.1...@alfalab/core-components-badge@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.4.0...@alfalab/core-components-badge@3.4.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.3.3...@alfalab/core-components-badge@3.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.3.2...@alfalab/core-components-badge@3.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-badge

## [3.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.3.1...@alfalab/core-components-badge@3.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.3.0...@alfalab/core-components-badge@3.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-badge

# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.2.2...@alfalab/core-components-badge@3.3.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [3.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.2.1...@alfalab/core-components-badge@3.2.2) (2022-06-20)

### Bug Fixes

-   **badge:** fix classname ([#100](https://github.com/core-ds/core-components/issues/100)) ([4b5f2bc](https://github.com/core-ds/core-components/commit/4b5f2bc9ab17daf865a5515828d178eaff94bd2d))

## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.2.0...@alfalab/core-components-badge@3.2.1) (2022-06-09)

### Bug Fixes

-   **badge:** fix box-sizing ([#90](https://github.com/core-ds/core-components/issues/90)) ([b052b9b](https://github.com/core-ds/core-components/commit/b052b9b15831229104bd25d1231f27ec41d2acb8))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@3.0.0...@alfalab/core-components-badge@3.1.0) (2021-07-09)

### Bug Fixes

-   **badge:** fix name ([207d3d3](https://github.com/core-ds/core-components/commit/207d3d30171a84ff4021cd119c0da1316a92d14c))

### Features

-   **badge:** add icon color ([d9e9065](https://github.com/core-ds/core-components/commit/d9e906596d157a5e3d7844bbecfb96f64d9f44e1))
-   **badge:** add screenshots ([3bbc8d0](https://github.com/core-ds/core-components/commit/3bbc8d032b0a267e9e6e949af5db6c955e25fb50))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.3.0...@alfalab/core-components-badge@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.2.5...@alfalab/core-components-badge@2.3.0) (2021-04-26)

### Features

-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))

## [2.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.2.4...@alfalab/core-components-badge@2.2.5) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-badge

## [2.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.2.2...@alfalab/core-components-badge@2.2.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [2.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.2.0...@alfalab/core-components-badge@2.2.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.1.3...@alfalab/core-components-badge@2.2.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.1.2...@alfalab/core-components-badge@2.1.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-badge

## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.1.1...@alfalab/core-components-badge@2.1.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-badge

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.1.0...@alfalab/core-components-badge@2.1.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-badge

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.0.1...@alfalab/core-components-badge@2.1.0) (2021-02-20)

### Features

-   updated design tokens ([#516](https://github.com/core-ds/core-components/issues/516)) ([ef66b65](https://github.com/core-ds/core-components/commit/ef66b65bb35b2ef06292b8da709ccc335eb44735))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-badge@2.0.0...@alfalab/core-components-badge@2.0.1) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
