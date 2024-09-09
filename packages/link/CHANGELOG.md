# Change Log

## 5.2.3

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1354](https://github.com/core-ds/core-components/pull/1354)

-   Обновлены наименования переменных отступов

## 5.2.2

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 5.2.1

### Patch Changes

<sup><time>22.03.2024</time></sup>

### [#1134](https://github.com/core-ds/core-components/pull/1134)

-   Убрали hover для мобильных устройств

## 5.2.0

### Minor Changes

### [#966](https://github.com/core-ds/core-components/pull/966)

-   В компонентах CustomButton, Link и PickerButton цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 5.1.1

### Patch Changes

### [#920](https://github.com/core-ds/core-components/pull/920)

-   Исправлен отступ у слота слева

## 5.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 5.0.6

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 5.0.5

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

## 5.0.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 5.0.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 5.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 5.0.1

### Patch Changes

-   [#283](https://github.com/core-ds/core-components/pull/283): Добавлен атрибут type=button для Link при pseudo=true. Thanks [@dmitrbrvsk](https://github.com/dmitrbrvsk)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.1.0...@alfalab/core-components-link@5.0.0) (2022-09-06)

### Bug Fixes

-   **link:** replace component with a button in pseudo mode ([#156](https://github.com/core-ds/core-components/issues/156)) ([6f24cbb](https://github.com/core-ds/core-components/commit/6f24cbb433c4ced85986d5f0e0b3bc1289e0fb8d))

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

### BREAKING CHANGES

-   **link:** В компоненте Link с пропсом pseudo заменяется дефолтный html-элемент "a" на
    "button"

Co-authored-by: crybabydanchan <crysiscaramel@gmal.com>

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.0.1...@alfalab/core-components-link@4.1.0) (2022-08-25)

### Bug Fixes

-   **link:** fix addons size for underline mode in description ([15c796b](https://github.com/core-ds/core-components/commit/15c796b1f5a99122ba7e3ba638490517eb985c6e))

### Features

-   **link:** implemented new view & updated styles ([3873619](https://github.com/core-ds/core-components/commit/38736190773e2aa199ca544ee976efb1ba5a88d3))
-   **link:** updated styles ([b5296f2](https://github.com/core-ds/core-components/commit/b5296f26a8271c2b3c2f34195dd3997308877bbe))

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@4.0.0...@alfalab/core-components-link@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-link

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.4.1...@alfalab/core-components-link@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.4.0...@alfalab/core-components-link@3.4.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.3...@alfalab/core-components-link@3.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.2...@alfalab/core-components-link@3.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-link

## [3.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.1...@alfalab/core-components-link@3.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.3.0...@alfalab/core-components-link@3.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-link

# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.2.4...@alfalab/core-components-link@3.3.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.2.0...@alfalab/core-components-link@3.2.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.1.0...@alfalab/core-components-link@3.2.0) (2021-08-27)

### Features

-   custom components for button and link ([#814](https://github.com/core-ds/core-components/issues/814)) ([a623dd0](https://github.com/core-ds/core-components/commit/a623dd021ef611f9994a6587ba6a0d0ee9d8929c))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.0.1...@alfalab/core-components-link@3.1.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@3.0.0...@alfalab/core-components-link@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-link

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@2.0.0...@alfalab/core-components-link@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.7.1...@alfalab/core-components-link@2.0.0) (2021-05-25)

### Features

-   **button:** add inverted ([#649](https://github.com/core-ds/core-components/issues/649)) ([be321b0](https://github.com/core-ds/core-components/commit/be321b07e99d20824138ad65141f3fbed1b6e315)), closes [#658](https://github.com/core-ds/core-components/issues/658) [#657](https://github.com/core-ds/core-components/issues/657)

### BREAKING CHANGES

-   **button:** remove inverted themes

## [1.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.7.0...@alfalab/core-components-link@1.7.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-link

# [1.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.7...@alfalab/core-components-link@1.7.0) (2021-04-06)

### Features

-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))

## [1.6.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.6...@alfalab/core-components-link@1.6.7) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-link

## [1.6.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.4...@alfalab/core-components-link@1.6.6) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.6.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.3...@alfalab/core-components-link@1.6.4) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-link

## [1.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.2...@alfalab/core-components-link@1.6.3) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-link

## [1.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.1...@alfalab/core-components-link@1.6.2) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-link

## [1.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.6.0...@alfalab/core-components-link@1.6.1) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-link

# [1.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-link@1.5.0...@alfalab/core-components-link@1.6.0) (2021-02-19)

### Features

-   **link:** set rel='noopener noreferrer' if target='\_blank' ([#520](https://github.com/core-ds/core-components/issues/520)) ([08c556e](https://github.com/core-ds/core-components/commit/08c556ecc0944d121b23566ae54319a1a33899ba)), closes [#519](https://github.com/core-ds/core-components/issues/519)
