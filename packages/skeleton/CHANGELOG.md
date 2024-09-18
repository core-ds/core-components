# Change Log

## 5.2.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1372](https://github.com/core-ds/core-components/pull/1372)

-   Добавлено новое свойство colors, отвечающее за набор цветов в компоненте (возможность переключить на inverted цвета для тёмного фона)

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 5.1.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 5.0.0

### Major Changes

<sup><time>28.05.2024</time></sup>

### [#1159](https://github.com/core-ds/core-components/pull/1159)

-   Добавлено новое свойство allowBackdropBlur, отвечающее за размытие фона
-   Добавлен трансформер skeleton-blur, который устанавливает свойство allowBackdropBlur в значение true для компонента Skeleton
-   Удалена css переменная --skeleton-gradient-animation-display

## 4.2.0

### Minor Changes

### [#992](https://github.com/core-ds/core-components/pull/992)

-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 4.1.0

### Minor Changes

### [#711](https://github.com/core-ds/core-components/pull/711)

-   Добавлен проп style

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 4.0.6

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 4.0.5

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 4.0.4

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 4.0.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@4.0.1...@alfalab/core-components-skeleton@4.0.2) (2022-09-05)

### Bug Fixes

-   **skeleton:** added className for visible === false ([29a1280](https://github.com/core-ds/core-components/commit/29a12809730bd49e5d2c47c66840642fff359f4c))

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@4.0.0...@alfalab/core-components-skeleton@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-skeleton

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.3.1...@alfalab/core-components-skeleton@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.3.0...@alfalab/core-components-skeleton@3.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.2.4...@alfalab/core-components-skeleton@3.3.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.2.3...@alfalab/core-components-skeleton@3.2.4) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-skeleton

## [3.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.2.2...@alfalab/core-components-skeleton@3.2.3) (2022-07-18)

### Bug Fixes

-   **skeleton:** fixed skeleton animation flickering(safari) ([#142](https://github.com/core-ds/core-components/issues/142)) ([40fb389](https://github.com/core-ds/core-components/commit/40fb389316d2a12492ea6a1827947ac71bf7d081))

## [3.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.2.1...@alfalab/core-components-skeleton@3.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.2.0...@alfalab/core-components-skeleton@3.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-skeleton

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.1.2...@alfalab/core-components-skeleton@3.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.0.2...@alfalab/core-components-skeleton@3.1.0) (2022-03-04)

### Bug Fixes

-   **skeleton:** added dataTestId ([18e4af8](https://github.com/core-ds/core-components/commit/18e4af805bd4e49a1a3c303cb3b4d9a3a9dd5751))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.0.1...@alfalab/core-components-skeleton@3.0.2) (2021-11-16)

### Bug Fixes

-   **skeleton:** prevent component unmount ([#887](https://github.com/core-ds/core-components/issues/887)) ([1bd4dc3](https://github.com/core-ds/core-components/commit/1bd4dc3147622f75802dd8e574175dbbf02cca54))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@3.0.0...@alfalab/core-components-skeleton@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-skeleton

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@2.0.0...@alfalab/core-components-skeleton@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.4.1...@alfalab/core-components-skeleton@2.0.0) (2021-06-28)

### Features

-   **skeleton:** add display var, change default to block ([#718](https://github.com/core-ds/core-components/issues/718)) ([27aaa60](https://github.com/core-ds/core-components/commit/27aaa605a958d932a52904556ac2fe1dd59356af))

### BREAKING CHANGES

-   **skeleton:** inline-block changes to block

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.4.0...@alfalab/core-components-skeleton@1.4.1) (2021-06-09)

### Bug Fixes

-   **skeleton:** remove vars that purge kills ([886d1b2](https://github.com/core-ds/core-components/commit/886d1b24b144d9d277821d3264f71a93c7a1b146))

# [1.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.3.6...@alfalab/core-components-skeleton@1.4.0) (2021-06-08)

### Features

-   **skeleton:** bg animation ([3dac97d](https://github.com/core-ds/core-components/commit/3dac97d18b9c7b2f63f55e2139a1adfb84710b88))
-   **skeleton:** bg animation ([37a52ad](https://github.com/core-ds/core-components/commit/37a52ad3e49f2873aaff86a768599d947a17c754))

## [1.3.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.3.5...@alfalab/core-components-skeleton@1.3.6) (2021-04-26)

### Bug Fixes

-   **skeleton:** remove extra bottom margin ([#619](https://github.com/core-ds/core-components/issues/619)) ([8f83022](https://github.com/core-ds/core-components/commit/8f83022c5a89e2f0b63449970437d0ca00129e5d))

## [1.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.3.4...@alfalab/core-components-skeleton@1.3.5) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-skeleton

## [1.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.3.2...@alfalab/core-components-skeleton@1.3.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.3.0...@alfalab/core-components-skeleton@1.3.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.2.1...@alfalab/core-components-skeleton@1.3.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.2.0...@alfalab/core-components-skeleton@1.2.1) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-skeleton

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.1.2...@alfalab/core-components-skeleton@1.2.0) (2021-03-10)

### Features

-   **skeleton:** updated default theme, click theme ([#549](https://github.com/core-ds/core-components/issues/549)) ([9bf9259](https://github.com/core-ds/core-components/commit/9bf9259d4d1efd73067ea548cdfaf3007b0f8839))

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.1.1...@alfalab/core-components-skeleton@1.1.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-skeleton

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-skeleton@1.1.0...@alfalab/core-components-skeleton@1.1.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-skeleton
