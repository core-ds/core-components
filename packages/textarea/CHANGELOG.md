# Change Log

## 8.1.5

### Patch Changes

### [#1804](https://github.com/core-ds/core-components/pull/1804)

-   Удален `postinstall` скрипт

-   Обновлены зависимости
    -   form-control@9.0.3
    -   scrollbar@2.1.3

## 8.1.4

### Patch Changes

### [#468](https://github.com/core-ds/core-components/pull/468)

-   Исправлен баг в textarea, при передаче пропа value не работала механика переполнения

### [#483](https://github.com/core-ds/core-components/pull/483)

-   Экспорт пропсов из индексного файла компонента

## 8.1.3

### Patch Changes

### [#474](https://github.com/core-ds/core-components/pull/474)

-   Добавлен role="none" для элемента, который используется только для вычисления размера контейнера.
    Рефакторинг тестов.<br />

## 8.1.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   form-control@9.0.2
    -   scrollbar@2.1.2

## 8.1.1

### Patch Changes

### [#399](https://github.com/core-ds/core-components/pull/399)

-   Исправлено некорректное выделение текста который превышает maxLength

## 8.1.0

### Minor Changes

### [#357](https://github.com/core-ds/core-components/pull/357)

-   Добавлена механика переполнения в Textarea. Теперь ввод будет доступен даже если количество введённых символов превышает maxLength. Символы, позиция которых превышает maxLength, будут выделены цветом ошибки.

## 8.0.1

### Patch Changes

-   Обновлены зависимости
    -   form-control@9.0.1

## 8.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

### Patch Changes

-   Обновлены зависимости
    -   form-control@9.0.0

## 7.2.3

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-form-control@8.3.1

## 7.2.2

### Patch Changes

-   Updated dependencies [[#239](https://github.com/core-ds/core-components/pull/239)]
    -   @alfalab/core-components-scrollbar@2.1.1

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@7.2.0...@alfalab/core-components-textarea@7.2.1) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [7.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@7.1.1...@alfalab/core-components-textarea@7.2.0) (2022-09-12)

### Features

-   **form-control:** new input/select label view (outer) ([#177](https://github.com/core-ds/core-components/issues/177)) ([66beb15](https://github.com/core-ds/core-components/commit/66beb15756de97e17a4d1dd4221fa7f401ee8539))
-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [7.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@7.1.0...@alfalab/core-components-textarea@7.1.1) (2022-08-31)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [7.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@7.0.1...@alfalab/core-components-textarea@7.1.0) (2022-08-29)

### Features

-   **textarea:** custom scrollbar ([#196](https://github.com/core-ds/core-components/issues/196)) ([c0d956c](https://github.com/core-ds/core-components/commit/c0d956cc7bf0a5440a66602ca77de2942a268be2))

## [7.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@7.0.0...@alfalab/core-components-textarea@7.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [7.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.3.1...@alfalab/core-components-textarea@7.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [6.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.3.0...@alfalab/core-components-textarea@6.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [6.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.2.3...@alfalab/core-components-textarea@6.3.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [6.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.2.2...@alfalab/core-components-textarea@6.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [6.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.2.1...@alfalab/core-components-textarea@6.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [6.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.2.0...@alfalab/core-components-textarea@6.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.1.7...@alfalab/core-components-textarea@6.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   fixed form-control/input/select label and hint margins ([#97](https://github.com/core-ds/core-components/issues/97)) ([abd2f15](https://github.com/core-ds/core-components/commit/abd2f15f210bb63bafe0cee341f0a66b5f2071d7))

## [6.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.1.3...@alfalab/core-components-textarea@6.1.4) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

## [6.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.1.2...@alfalab/core-components-textarea@6.1.3) (2021-10-25)

### Bug Fixes

-   **textarea:** поправлен отступ в размере xl ([#859](https://github.com/core-ds/core-components/issues/859)) ([fcd586b](https://github.com/core-ds/core-components/commit/fcd586b03761bda053c7c3fd9381bb94227711d7))

## [6.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.1.1...@alfalab/core-components-textarea@6.1.2) (2021-10-15)

### Bug Fixes

-   input & textarea disabled color on safari ([39ea4ef](https://github.com/core-ds/core-components/commit/39ea4ef7e948016a4ffa17c563cfdd13169a3c2b))

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.1.0...@alfalab/core-components-textarea@6.1.1) (2021-10-11)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.6...@alfalab/core-components-textarea@6.1.0) (2021-09-14)

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))

## [6.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.5...@alfalab/core-components-textarea@6.0.6) (2021-08-31)

### Bug Fixes

-   **textarea:** missing vars ([#817](https://github.com/core-ds/core-components/issues/817)) ([d03231f](https://github.com/core-ds/core-components/commit/d03231f24c826f540ecc8c6ddeb2b3e3fec38b6a))

## [6.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.4...@alfalab/core-components-textarea@6.0.5) (2021-08-23)

### Bug Fixes

-   **form-control:** l size offset between value and label (PDS-270) ([#781](https://github.com/core-ds/core-components/issues/781)) ([311f8a0](https://github.com/core-ds/core-components/commit/311f8a0eaa97cf7d0c89d4a3cdfc443aef2d763c))
-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

## [6.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.3...@alfalab/core-components-textarea@6.0.4) (2021-08-11)

### Bug Fixes

-   extend hint type to ReactNode ([#792](https://github.com/core-ds/core-components/issues/792)) ([d02784e](https://github.com/core-ds/core-components/commit/d02784e392f5ca3a30ae009109fbb6351967f746))

## [6.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.2...@alfalab/core-components-textarea@6.0.3) (2021-08-04)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.1...@alfalab/core-components-textarea@6.0.2) (2021-07-23)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@6.0.0...@alfalab/core-components-textarea@6.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.1.0...@alfalab/core-components-textarea@6.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.8...@alfalab/core-components-textarea@5.1.0) (2021-06-22)

### Features

-   **textarea:** add value counter ([#695](https://github.com/core-ds/core-components/issues/695)) ([cbc6bd3](https://github.com/core-ds/core-components/commit/cbc6bd3eaa48e3df2791d23e156c7c664d67ff49))

## [5.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.7...@alfalab/core-components-textarea@5.0.8) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [5.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.6...@alfalab/core-components-textarea@5.0.7) (2021-04-09)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [5.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.5...@alfalab/core-components-textarea@5.0.6) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [5.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.3...@alfalab/core-components-textarea@5.0.5) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [5.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.1...@alfalab/core-components-textarea@5.0.3) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@5.0.0...@alfalab/core-components-textarea@5.0.1) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-textarea

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@4.0.3...@alfalab/core-components-textarea@5.0.0) (2021-03-04)

### Features

-   **textarea:** changed size L (72 → 64), added size XL (72) ([175e360](https://github.com/core-ds/core-components/commit/175e360d5acb4eb146c81020fd65dc725588edee))

### BREAKING CHANGES

-   **textarea:** size L changed to size XL

## [4.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@4.0.2...@alfalab/core-components-textarea@4.0.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@4.0.1...@alfalab/core-components-textarea@4.0.2) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-textarea

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-textarea@4.0.0...@alfalab/core-components-textarea@4.0.1) (2021-02-18)

**Note:** Version bump only for package @alfalab/core-components-textarea
