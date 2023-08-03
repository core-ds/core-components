# Change Log

## 4.0.7

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 4.0.6

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

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

## 4.0.2

### Patch Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@4.0.0...@alfalab/core-components-keyboard-focusable@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.2.1...@alfalab/core-components-keyboard-focusable@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.2.0...@alfalab/core-components-keyboard-focusable@3.2.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.1.3...@alfalab/core-components-keyboard-focusable@3.2.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.1.2...@alfalab/core-components-keyboard-focusable@3.1.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

## [3.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.1.1...@alfalab/core-components-keyboard-focusable@3.1.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.1.0...@alfalab/core-components-keyboard-focusable@3.1.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.0.3...@alfalab/core-components-keyboard-focusable@3.1.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@3.0.0...@alfalab/core-components-keyboard-focusable@3.0.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@2.0.1...@alfalab/core-components-keyboard-focusable@3.0.0) (2021-11-26)

### Features

-   **button:** добавлена кнопка размера 40px, изменены скругления ([#886](https://github.com/core-ds/core-components/issues/886)) ([88e657a](https://github.com/core-ds/core-components/commit/88e657a9f0f68b8b58f6e9437053954ee984f83c)), closes [#890](https://github.com/core-ds/core-components/issues/890)

### BREAKING CHANGES

-   **button:** Кнопка размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   feat(codemod): add button xs to xxs transformer

-   feat(tag): добавлен тэг размера 40px, изменены отступы

Добавлен тэг размером 40px, изменены отступы. Тем, кто использовал размер xs, надо заменить размер
на xxs.

-   **button:** Тэг размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   test: update screenshots

-   test: update screenshots

-   feat(button): linter fix

-   feat(button): fix min-width

-   feat(tag): remove vertical paddings

-   feat(tag): remove vertical paddings

-   feat(button): updates

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@2.0.0...@alfalab/core-components-keyboard-focusable@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.3.0...@alfalab/core-components-keyboard-focusable@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.11...@alfalab/core-components-keyboard-focusable@1.3.0) (2021-06-22)

### Features

-   **slider-input:** design updates ([#673](https://github.com/core-ds/core-components/issues/673)) ([794e3cc](https://github.com/core-ds/core-components/commit/794e3cc99a3b61ec4faa630469dae7e49a56ee0a))

## [1.2.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.10...@alfalab/core-components-keyboard-focusable@1.2.11) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

## [1.2.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.9...@alfalab/core-components-keyboard-focusable@1.2.10) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

## [1.2.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.7...@alfalab/core-components-keyboard-focusable@1.2.9) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.6...@alfalab/core-components-keyboard-focusable@1.2.7) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

## [1.2.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.5...@alfalab/core-components-keyboard-focusable@1.2.6) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-keyboard-focusable@1.2.4...@alfalab/core-components-keyboard-focusable@1.2.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-keyboard-focusable
