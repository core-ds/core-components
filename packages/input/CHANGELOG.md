# Change Log

## 11.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.0
    -   form-control@9.0.0

## 10.2.5

### Patch Changes

### [#293](https://github.com/core-ds/core-components/pull/293)

-   Исправлена высота инпута в OS Windows

## 10.2.4

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2
    -   @alfalab/core-components-form-control@8.3.1

## 10.2.3

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 10.2.2

### Patch Changes

-   [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.2.0...@alfalab/core-components-input@10.2.1) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-input

# [10.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.1.0...@alfalab/core-components-input@10.2.0) (2022-09-12)

### Features

-   **form-control:** new input/select label view (outer) ([#177](https://github.com/core-ds/core-components/issues/177)) ([66beb15](https://github.com/core-ds/core-components/commit/66beb15756de97e17a4d1dd4221fa7f401ee8539))

# [10.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.3...@alfalab/core-components-input@10.1.0) (2022-09-02)

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [10.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.2...@alfalab/core-components-input@10.0.3) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

## [10.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.1...@alfalab/core-components-input@10.0.2) (2022-08-29)

**Note:** Version bump only for package @alfalab/core-components-input

## [10.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.0...@alfalab/core-components-input@10.0.1) (2022-08-19)

### Bug Fixes

-   omit enterKeyHint prop ([#197](https://github.com/core-ds/core-components/issues/197)) ([72f4946](https://github.com/core-ds/core-components/commit/72f494623c282f61b45539fa1c13d5c45bc5180c))

# [10.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.2...@alfalab/core-components-input@10.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [9.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.1...@alfalab/core-components-input@9.1.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [9.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.0...@alfalab/core-components-input@9.1.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-input

# [9.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.0.0...@alfalab/core-components-input@9.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

# [9.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.3...@alfalab/core-components-input@9.0.0) (2022-07-25)

### Features

-   Новый cdn alfabank.servicecdn.ru ([#166](https://github.com/core-ds/core-components/issues/166)) ([e29c89e](https://github.com/core-ds/core-components/commit/e29c89edc8cf60ac23df9570eece9e7811eb11f0))

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.servicecdn.ru data: 'self'`

-   chore(screenshot-utils): change cdn

-   feat(cdn-icon): add prop baseUrl

## [8.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.2...@alfalab/core-components-input@8.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.1...@alfalab/core-components-input@8.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [8.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.0...@alfalab/core-components-input@8.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.7...@alfalab/core-components-input@8.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   fixed form-control/input/select label and hint margins ([#97](https://github.com/core-ds/core-components/issues/97)) ([abd2f15](https://github.com/core-ds/core-components/commit/abd2f15f210bb63bafe0cee341f0a66b5f2071d7))

## [8.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.6...@alfalab/core-components-input@8.1.7) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.5...@alfalab/core-components-input@8.1.6) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.7...@alfalab/core-components-input@8.1.0) (2022-03-04)

### Bug Fixes

-   update glyph deps ([#1019](https://github.com/core-ds/core-components/issues/1019)) ([3e910d0](https://github.com/core-ds/core-components/commit/3e910d0801c4c46bcd399163200c1f7bfaba375e))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [8.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.6...@alfalab/core-components-input@8.0.7) (2022-02-17)

### Bug Fixes

-   imports for glyph icons ([#994](https://github.com/core-ds/core-components/issues/994)) ([8e807f2](https://github.com/core-ds/core-components/commit/8e807f26abf0f942fe8eadbd201caecb297b35dc))

## [8.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.5...@alfalab/core-components-input@8.0.6) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.4...@alfalab/core-components-input@8.0.5) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.3...@alfalab/core-components-input@8.0.4) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.2...@alfalab/core-components-input@8.0.3) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.1...@alfalab/core-components-input@8.0.2) (2021-12-29)

### Bug Fixes

-   **input:** компонент иконки для кнопки очистки ([#930](https://github.com/core-ds/core-components/issues/930)) ([37049af](https://github.com/core-ds/core-components/commit/37049af84ed475e1932c91f1907fb604893be7d7))

## [8.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.0...@alfalab/core-components-input@8.0.1) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.6...@alfalab/core-components-input@8.0.0) (2021-12-08)

-   fix!: новый cdn иконок (#913) (#917) ([224831f](https://github.com/core-ds/core-components/commit/224831f41ed2de49dc1a228dc081b0629cf274b1)), closes [#913](https://github.com/core-ds/core-components/issues/913) [#917](https://github.com/core-ds/core-components/issues/917)

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.gcdn.co data: 'self'`

This reverts commit 953fbcfec46a40089a5cfde670597315269b05f5.

## [7.3.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.5...@alfalab/core-components-input@7.3.6) (2021-12-08)

### Bug Fixes

-   revert 0e8124552206f96149d104f65cff1667e857bf01 ([#916](https://github.com/core-ds/core-components/issues/916)) ([953fbcf](https://github.com/core-ds/core-components/commit/953fbcfec46a40089a5cfde670597315269b05f5))

## [7.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.4...@alfalab/core-components-input@7.3.5) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))
-   новый cdn иконок ([#913](https://github.com/core-ds/core-components/issues/913)) ([0e81245](https://github.com/core-ds/core-components/commit/0e8124552206f96149d104f65cff1667e857bf01))

## [7.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.3...@alfalab/core-components-input@7.3.4) (2021-11-26)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.2...@alfalab/core-components-input@7.3.3) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.1...@alfalab/core-components-input@7.3.2) (2021-10-15)

### Bug Fixes

-   input & textarea disabled color on safari ([39ea4ef](https://github.com/core-ds/core-components/commit/39ea4ef7e948016a4ffa17c563cfdd13169a3c2b))

## [7.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.0...@alfalab/core-components-input@7.3.1) (2021-10-11)

**Note:** Version bump only for package @alfalab/core-components-input

# [7.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.4...@alfalab/core-components-input@7.3.0) (2021-09-14)

### Bug Fixes

-   confirmation & input ([#833](https://github.com/core-ds/core-components/issues/833)) ([f3c0d62](https://github.com/core-ds/core-components/commit/f3c0d62c15b3812205b71685c2d37c0a986677ee))

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))
-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

## [7.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.3...@alfalab/core-components-input@7.2.4) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.2...@alfalab/core-components-input@7.2.3) (2021-08-23)

### Bug Fixes

-   **input:** clear icon ([51debd4](https://github.com/core-ds/core-components/commit/51debd46ea2176486cfc1945d74e8d56a4b9387b))

## [7.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.1...@alfalab/core-components-input@7.2.2) (2021-08-23)

### Bug Fixes

-   **form-control:** l size offset between value and label (PDS-270) ([#781](https://github.com/core-ds/core-components/issues/781)) ([311f8a0](https://github.com/core-ds/core-components/commit/311f8a0eaa97cf7d0c89d4a3cdfc443aef2d763c))
-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

## [7.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.0...@alfalab/core-components-input@7.2.1) (2021-08-11)

### Bug Fixes

-   extend hint type to ReactNode ([#792](https://github.com/core-ds/core-components/issues/792)) ([d02784e](https://github.com/core-ds/core-components/commit/d02784e392f5ca3a30ae009109fbb6351967f746))

# [7.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.1.0...@alfalab/core-components-input@7.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [7.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.2...@alfalab/core-components-input@7.1.0) (2021-07-23)

### Bug Fixes

-   **input:** autofocus ([#761](https://github.com/core-ds/core-components/issues/761)) ([e2880de](https://github.com/core-ds/core-components/commit/e2880de6cff33b156bea58286bb46e0803e254a5))

### Features

-   **input:** input mobile theme (PDS-241) ([#737](https://github.com/core-ds/core-components/issues/737)) ([88f6f7c](https://github.com/core-ds/core-components/commit/88f6f7c58968b9564970eaa3d759aa2bc275ca7e))

## [7.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.1...@alfalab/core-components-input@7.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.0...@alfalab/core-components-input@7.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-input

# [7.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.2.0...@alfalab/core-components-input@7.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.3...@alfalab/core-components-input@6.2.0) (2021-06-22)

### Features

-   **slider-input:** design updates ([#673](https://github.com/core-ds/core-components/issues/673)) ([794e3cc](https://github.com/core-ds/core-components/commit/794e3cc99a3b61ec4faa630469dae7e49a56ee0a))

## [6.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.2...@alfalab/core-components-input@6.1.3) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.1...@alfalab/core-components-input@6.1.2) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.0...@alfalab/core-components-input@6.1.1) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-input

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.14...@alfalab/core-components-input@6.1.0) (2021-05-18)

### Features

-   **input:** pretty webkit autofill ([#660](https://github.com/core-ds/core-components/issues/660)) ([d50e83e](https://github.com/core-ds/core-components/commit/d50e83e627e1641c3634ace505b9abe163ef6530))

## [6.0.14](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.13...@alfalab/core-components-input@6.0.14) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.13](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.12...@alfalab/core-components-input@6.0.13) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.11...@alfalab/core-components-input@6.0.12) (2021-04-09)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.10...@alfalab/core-components-input@6.0.11) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.9...@alfalab/core-components-input@6.0.10) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.8...@alfalab/core-components-input@6.0.9) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.7...@alfalab/core-components-input@6.0.8) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.5...@alfalab/core-components-input@6.0.7) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [6.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.3...@alfalab/core-components-input@6.0.5) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [6.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.2...@alfalab/core-components-input@6.0.3) (2021-03-15)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.1...@alfalab/core-components-input@6.0.2) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.0...@alfalab/core-components-input@6.0.1) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-input

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.6...@alfalab/core-components-input@6.0.0) (2021-03-04)

### Features

-   **input:** changed size L (72 → 64), added size XL (72) ([79699e3](https://github.com/core-ds/core-components/commit/79699e34d28075809e537b73911875ff5fc2d406))

### BREAKING CHANGES

-   **input:** size L changed to size XL

## [5.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.5...@alfalab/core-components-input@5.1.6) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.4...@alfalab/core-components-input@5.1.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.3...@alfalab/core-components-input@5.1.4) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.2...@alfalab/core-components-input@5.1.3) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.1...@alfalab/core-components-input@5.1.2) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.0...@alfalab/core-components-input@5.1.1) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
