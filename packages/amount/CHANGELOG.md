# Change Log

## 3.8.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

## 3.7.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1375](https://github.com/core-ds/core-components/pull/1375)

-   Добавили новое свойство trimZero - обрезает ноль в минорной части. Например: 1.60 - 1.6

## 3.6.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 3.5.2

### Patch Changes

<sup><time>19.07.2024</time></sup>

### [#1297](https://github.com/core-ds/core-components/pull/1297)

-   Обновлена документация
-   RUR для пропса currency - deprecated
-   Для разработчиков добавлен warning при использовании валюты RUR

## 3.5.1

### Patch Changes

<sup><time>27.04.2024</time></sup>

### [#1174](https://github.com/core-ds/core-components/pull/1174)

-   Обновление библиотеки ui-primitives и зависящих от нее файлов.

## 3.5.0

### Minor Changes

<sup><time>29.03.2024</time></sup>

### [#1147](https://github.com/core-ds/core-components/pull/1147)

-   Обновили версии пакетов @alfalab/utils и @alfalab/data

## 3.4.0

### Minor Changes

<sup><time>04.03.2024</time></sup>

### [#1108](https://github.com/core-ds/core-components/pull/1108)

-   обновлены минорные версии @alfalab/utils и @alfalab/data

## 3.3.1

### Patch Changes

### [#967](https://github.com/core-ds/core-components/pull/967)

-   Добавлено центрирование контента передаваемого в пропсе rightAddons.

## 3.3.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.2.2

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.2.1

### Patch Changes

### [#717](https://github.com/core-ds/core-components/pull/717)

-   Добавлен проп codeFormat в Amount.Pure

## 3.2.0

### Minor Changes

### [#712](https://github.com/core-ds/core-components/pull/712)

-   обновлены минорные версии @alfalab/utils и @alfalab/data

## 3.1.3

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.1.2

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.1.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 3.1.0

### Minor Changes

### [#308](https://github.com/core-ds/core-components/pull/308)

-   Добавлен новый пропс в компонент Amount - codeFormat, который отображает код валюты в зависимости от указанного формата.
    Обновлена библиотека @alfalab/utils, теперь метод formatAmount форматирует сумму, разделяя ее средним математическим пробелом.<br />

### Patch Changes

### [#324](https://github.com/core-ds/core-components/pull/324)

-   "export" типов заменен на "export type"

## 3.0.4

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)

## 3.0.3

### Patch Changes

-   [#279](https://github.com/core-ds/core-components/pull/279): chore: обновились @alfalab-data и @alfalab/utils версии в зависимостях. Thanks [@EGNKupava](https://github.com/EGNKupava)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@3.0.1...@alfalab/core-components-amount@3.0.2) (2022-08-31)

### Bug Fixes

-   **amount:** fix undefined symbol ([#231](https://github.com/core-ds/core-components/issues/231)) ([07a93ab](https://github.com/core-ds/core-components/commit/07a93abefd530532cdacb530baf27d239b7f7174))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@3.0.0...@alfalab/core-components-amount@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-amount

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.5.1...@alfalab/core-components-amount@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.5.0...@alfalab/core-components-amount@2.5.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.4.3...@alfalab/core-components-amount@2.5.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.4.2...@alfalab/core-components-amount@2.4.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-amount

## [2.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.4.1...@alfalab/core-components-amount@2.4.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.4.0...@alfalab/core-components-amount@2.4.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-amount

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.3.0...@alfalab/core-components-amount@2.4.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.2.1...@alfalab/core-components-amount@2.3.0) (2022-06-24)

### Features

-   **amount-input:** added functionality to enter negative values ([#106](https://github.com/core-ds/core-components/issues/106)) ([d6b6ca7](https://github.com/core-ds/core-components/commit/d6b6ca71d87b5c4c62d2e87cdbe9d1ff035852c4))

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.2.0...@alfalab/core-components-amount@2.2.1) (2022-06-08)

**Note:** Version bump only for package @alfalab/core-components-amount

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.0.3...@alfalab/core-components-amount@2.1.0) (2022-02-02)

### Features

-   **amount:** add rightAddons, add showPlus, make currency optional ([#955](https://github.com/core-ds/core-components/issues/955)) ([ac35b9a](https://github.com/core-ds/core-components/commit/ac35b9aaf842d88fd28caeb4f888cdf74facf644))

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.0.2...@alfalab/core-components-amount@2.0.3) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.0.1...@alfalab/core-components-amount@2.0.2) (2021-07-23)

**Note:** Version bump only for package @alfalab/core-components-amount

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@2.0.0...@alfalab/core-components-amount@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-amount

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.18...@alfalab/core-components-amount@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.0.18](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.17...@alfalab/core-components-amount@1.0.18) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.17](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.16...@alfalab/core-components-amount@1.0.17) (2021-04-09)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.16](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.15...@alfalab/core-components-amount@1.0.16) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.15](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.13...@alfalab/core-components-amount@1.0.15) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.0.13](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.12...@alfalab/core-components-amount@1.0.13) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.11...@alfalab/core-components-amount@1.0.12) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.10...@alfalab/core-components-amount@1.0.11) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.9...@alfalab/core-components-amount@1.0.10) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-amount

## [1.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-amount@1.0.8...@alfalab/core-components-amount@1.0.9) (2021-02-18)

### Bug Fixes

-   update versions ([d1b69a3](https://github.com/core-ds/core-components/commit/d1b69a3f0f488bdef5bea2b3aafc0e275058f321))
-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))

# @alfalab/core-components-amount-v1.0.0 (2020-11-25)

### Features

-   fix eslint ([c4f5261](https://github.com/core-ds/core-components/commit/c4f5261ec4ed63f285e0cb7dc0bdbc17e94dc38d))
-   **core-components-amount:** add boilerplate for amount ([5614885](https://github.com/core-ds/core-components/commit/5614885237a9a4843fb312c22c6b5810a3509e63))
-   **core-components-amount:** add click theme ([b4b0699](https://github.com/core-ds/core-components/commit/b4b0699dcffd2f505935489d66fd0d48b633ecf7))
-   **core-components-amount:** allow withZeroMinorPart formatting ([e86529d](https://github.com/core-ds/core-components/commit/e86529d72e28e8cde8bffbfd4b4d263129ec4d78))
-   **core-components-amount:** export CurrencyCodes ([1a6155a](https://github.com/core-ds/core-components/commit/1a6155a63655084895831094127404cdbcb0ef54))
-   **core-components-amount:** feat, change api, add PureAmount ([f946776](https://github.com/core-ds/core-components/commit/f94677645a8244dedf6f003f901290d5a2c6c16d))
-   **core-components-amount:** implemented amount, add demo ([1e78129](https://github.com/core-ds/core-components/commit/1e781295de03ff4aac5f5a7ec761f22b529716bd))
-   **core-components-themes:** add tabs site theme, improve plugin ([da5d9ec](https://github.com/core-ds/core-components/commit/da5d9ec07f16b328c15ebebbb55498e25ff866b1))
-   **lint:** add lint ([3bd5492](https://github.com/core-ds/core-components/commit/3bd5492bba179083cb26aa99c295a43f8e3be037))
-   **storybook:** add theme switcher to storybook ([#199](https://github.com/core-ds/core-components/issues/199)) ([7794f80](https://github.com/core-ds/core-components/commit/7794f80dc83cba171ffe7282e54d5ce0f4bd8245))
