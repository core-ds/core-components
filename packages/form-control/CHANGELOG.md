# Change Log

## 11.1.0

### Minor Changes

### [#985](https://github.com/core-ds/core-components/pull/985)

-   Цвет подложки в активном состоянии для компонента FormControl изменен с neutral/0 и neutral_inverted/0 на neutral-translucent/0 и neutral-translucent_inverted/0

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 11.0.0

### Major Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах FormControl и Input цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалены некоторые css переменные для мобильных компонентов и темизация для intranet и mobile

### Patch Changes

-   Обновлены зависимости
    -   shared@0.8.0

## 10.2.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

-   Обновлены зависимости
    -   shared@0.7.0

## 10.1.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.6.0

## 10.1.0

### Minor Changes

### [#860](https://github.com/core-ds/core-components/pull/860)

-   Добавлены пропcы rightAddonsProps, leftAddonsProps.
-   dataTestId добавлен к аддонам и сообщению об ошибке

## 10.0.1

### Patch Changes

### [#838](https://github.com/core-ds/core-components/pull/838)

-   Задана максимальная ширина в 100%, чтобы они не выходили за границы родителя

## 10.0.0

### Major Changes

### [#716](https://github.com/core-ds/core-components/pull/716)

-   Для компонента FormControl добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   mq@4.2.0

## 9.0.6

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 9.0.5

### Patch Changes

### [#613](https://github.com/core-ds/core-components/pull/613)

-   Обновлен дизайн в компоненте Textarea

## 9.0.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 9.0.3

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 9.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 9.0.1

### Patch Changes

### [#317](https://github.com/core-ds/core-components/pull/317)

-   Исправлены ошибки в браузере IE 11 в компонентах Сheckbox и FormControl

## 9.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

## 8.3.1

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@8.2.0...@alfalab/core-components-form-control@8.3.0) (2022-09-13)

### Features

-   **form-control, themes:** change colors in intranet theme ([#236](https://github.com/core-ds/core-components/issues/236)) ([eae8b7d](https://github.com/core-ds/core-components/commit/eae8b7deed8e394ebc0cc00cd584d9f05575b3b0))

# [8.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@8.1.1...@alfalab/core-components-form-control@8.2.0) (2022-09-12)

### Features

-   **form-control:** new input/select label view (outer) ([#177](https://github.com/core-ds/core-components/issues/177)) ([66beb15](https://github.com/core-ds/core-components/commit/66beb15756de97e17a4d1dd4221fa7f401ee8539))

## [8.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@8.1.0...@alfalab/core-components-form-control@8.1.1) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

# [8.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@8.0.1...@alfalab/core-components-form-control@8.1.0) (2022-08-29)

### Features

-   **textarea:** custom scrollbar ([#196](https://github.com/core-ds/core-components/issues/196)) ([c0d956c](https://github.com/core-ds/core-components/commit/c0d956cc7bf0a5440a66602ca77de2942a268be2))

## [8.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@8.0.0...@alfalab/core-components-form-control@8.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-form-control

# [8.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.6.1...@alfalab/core-components-form-control@8.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [7.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.6.0...@alfalab/core-components-form-control@7.6.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [7.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.5.3...@alfalab/core-components-form-control@7.6.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [7.5.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.5.2...@alfalab/core-components-form-control@7.5.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-form-control

## [7.5.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.5.1...@alfalab/core-components-form-control@7.5.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [7.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.5.0...@alfalab/core-components-form-control@7.5.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-form-control

# [7.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.4.3...@alfalab/core-components-form-control@7.5.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   fixed form-control/input/select label and hint margins ([#97](https://github.com/core-ds/core-components/issues/97)) ([abd2f15](https://github.com/core-ds/core-components/commit/abd2f15f210bb63bafe0cee341f0a66b5f2071d7))

# [7.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.3.0...@alfalab/core-components-form-control@7.4.0) (2021-10-11)

### Features

-   проставлен role=alert для ошибок ([#850](https://github.com/core-ds/core-components/issues/850)) ([dc634a3](https://github.com/core-ds/core-components/commit/dc634a3d008accfab10192ce234c12ef0ecc7fa9))

# [7.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.2.2...@alfalab/core-components-form-control@7.3.0) (2021-09-14)

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))

## [7.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.2.1...@alfalab/core-components-form-control@7.2.2) (2021-08-23)

### Bug Fixes

-   **form-control:** l size offset between value and label (PDS-270) ([#781](https://github.com/core-ds/core-components/issues/781)) ([311f8a0](https://github.com/core-ds/core-components/commit/311f8a0eaa97cf7d0c89d4a3cdfc443aef2d763c))
-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

## [7.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.2.0...@alfalab/core-components-form-control@7.2.1) (2021-08-11)

### Bug Fixes

-   extend hint type to ReactNode ([#792](https://github.com/core-ds/core-components/issues/792)) ([d02784e](https://github.com/core-ds/core-components/commit/d02784e392f5ca3a30ae009109fbb6351967f746))

# [7.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.1.0...@alfalab/core-components-form-control@7.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [7.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.0.1...@alfalab/core-components-form-control@7.1.0) (2021-07-23)

### Features

-   **input:** input mobile theme (PDS-241) ([#737](https://github.com/core-ds/core-components/issues/737)) ([88f6f7c](https://github.com/core-ds/core-components/commit/88f6f7c58968b9564970eaa3d759aa2bc275ca7e))

## [7.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@7.0.0...@alfalab/core-components-form-control@7.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-form-control

# [7.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.2.0...@alfalab/core-components-form-control@7.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.1.1...@alfalab/core-components-form-control@6.2.0) (2021-06-22)

### Features

-   **slider-input:** design updates ([#673](https://github.com/core-ds/core-components/issues/673)) ([794e3cc](https://github.com/core-ds/core-components/commit/794e3cc99a3b61ec4faa630469dae7e49a56ee0a))

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.1.0...@alfalab/core-components-form-control@6.1.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-form-control

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.0.5...@alfalab/core-components-form-control@6.1.0) (2021-04-09)

### Features

-   **form-control:** add hidden label instead min-width ([a40ffcf](https://github.com/core-ds/core-components/commit/a40ffcf149282c83a834587a9486bc09b2929f90))

## [6.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.0.3...@alfalab/core-components-form-control@6.0.5) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [6.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.0.1...@alfalab/core-components-form-control@6.0.3) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@6.0.0...@alfalab/core-components-form-control@6.0.1) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-form-control

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@5.0.5...@alfalab/core-components-form-control@6.0.0) (2021-03-04)

### Features

-   size vars (xs/s/m/l/xl → 32/48/56/64/72) ([d7254d2](https://github.com/core-ds/core-components/commit/d7254d2963106663e8f04b84bc747b38e4f57632))
-   **form-control:** changed size L (72 → 64), added size XL (72) ([4a129f3](https://github.com/core-ds/core-components/commit/4a129f3ca3c80e94489cbc485018e6eb6e542244))

### BREAKING CHANGES

-   **form-control:** size L changed to size XL

## [5.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@5.0.4...@alfalab/core-components-form-control@5.0.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-form-control

## [5.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@5.0.3...@alfalab/core-components-form-control@5.0.4) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-form-control

## [5.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@5.0.2...@alfalab/core-components-form-control@5.0.3) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))

# [@alfalab/core-components-form-control-v3.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-form-control@3.1.2...@alfalab/core-components-form-control@3.1.3) (2020-11-25)

### Bug Fixes

-   slightly better and safer ie fixes ([0e34b4f](https://github.com/core-ds/core-components/commit/0e34b4fb9800a435c05dc8f83146ce5617cf99a5))
