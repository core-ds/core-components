# Change Log

## 4.7.2

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 4.7.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

<sup><time>13.09.2024</time></sup>

### [#1369](https://github.com/core-ds/core-components/pull/1369)

-   Заменили числовые значения скругления на переменные

## 4.7.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 4.6.2

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1210](https://github.com/core-ds/core-components/pull/1210)

-   Изменены типы принимаемых компонентов

## 4.6.1

### Patch Changes

<sup><time>29.03.2024</time></sup>

### [#1100](https://github.com/core-ds/core-components/pull/1100)

-   fix(slider): Исправлена проблема, что событие onEnd не вызывалось когда перемещался ползунок стрелками на клавиатуре или тапом в слайдере

## 4.6.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1029](https://github.com/core-ds/core-components/pull/1029)

-   Добавлены новые способы указать размеры - 4 и 2. Буквенные значения размеров m и s теперь deprecated, используйте вместо них 4 и 2 соответственно

## 4.5.0

### Minor Changes

### [#1069](https://github.com/core-ds/core-components/pull/1069)

-   В Slider добавлены колбэки onStart, onEnd.
-   В SliderInput добавлены колбэки onSliderStart, onSliderEnd
-   Исправлена ошибка в 18 реакте с инициализацией слайдера ("Slider was already initialized")

## 4.4.0

### Minor Changes

### [#963](https://github.com/core-ds/core-components/pull/963)

-   В компонентах CheckboxGroup, RadioGroup, SegmentedControl, и Slider цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 4.3.1

### Patch Changes

### [#941](https://github.com/core-ds/core-components/pull/941)

-   Исправлен радиус прогресса

## 4.3.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 4.2.2

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 4.2.1

### Patch Changes

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

## 4.2.0

### Minor Changes

### [#607](https://github.com/core-ds/core-components/pull/607)

-   Добавлены новые пропс valueTo - второе значение диапазона и behaviour - определяет поведение ползунка

## 4.1.6

### Patch Changes

### [#603](https://github.com/core-ds/core-components/pull/603)

-   Исправлена ошибка, из-за которой трек слайдера исчезал при зуме

## 4.1.5

### Patch Changes

### [#586](https://github.com/core-ds/core-components/pull/586)

-   Исправлен порядок обновления pips и value. Раньше при одновременном изменении pips и value слайдер устанавливался на неверную позицию

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 4.1.4

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 4.1.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 4.1.2

### Patch Changes

### [#333](https://github.com/core-ds/core-components/pull/333)

-   Явные значения в css классах(padding, border-radius и т.п) заменены на переменные

## 4.1.1

### Patch Changes

-   [#289](https://github.com/core-ds/core-components/pull/289): Увеличена кликабельная область слайдера. Thanks [@reme3d2y](https://github.com/reme3d2y)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@4.0.1...@alfalab/core-components-slider@4.1.0) (2022-09-06)

### Features

-   **slider-input:** revert steps ([#234](https://github.com/core-ds/core-components/issues/234)) ([d5e312b](https://github.com/core-ds/core-components/commit/d5e312bb7a54e53414e205a57081159033d53efe))

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@4.0.0...@alfalab/core-components-slider@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-slider

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.2...@alfalab/core-components-slider@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.1...@alfalab/core-components-slider@3.1.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.1.0...@alfalab/core-components-slider@3.1.1) (2022-08-11)

### Bug Fixes

-   **slider:** handle slide ([#187](https://github.com/core-ds/core-components/issues/187)) ([709f8df](https://github.com/core-ds/core-components/commit/709f8df47c82c905225dfd4645e345cf14e9f844))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.4...@alfalab/core-components-slider@3.1.0) (2022-08-04)

### Bug Fixes

-   **slider:** заменил interface на type ([#176](https://github.com/core-ds/core-components/issues/176)) ([d19e3cb](https://github.com/core-ds/core-components/commit/d19e3cb3a728feb6a0dc46a6a0691f72fc90e10f))

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.3...@alfalab/core-components-slider@3.0.4) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-slider

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.2...@alfalab/core-components-slider@3.0.3) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.1...@alfalab/core-components-slider@3.0.2) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-slider

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@3.0.0...@alfalab/core-components-slider@3.0.1) (2022-07-11)

**Note:** Version bump only for package @alfalab/core-components-slider

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.3.3...@alfalab/core-components-slider@2.4.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.3.0...@alfalab/core-components-slider@2.3.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.2.0...@alfalab/core-components-slider@2.3.0) (2021-09-14)

### Features

-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.1.0...@alfalab/core-components-slider@2.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.0.1...@alfalab/core-components-slider@2.1.0) (2021-07-23)

### Features

-   slider input mobile theme (PDS-242) ([#738](https://github.com/core-ds/core-components/issues/738)) ([6e924aa](https://github.com/core-ds/core-components/commit/6e924aa90b63b914b6f5690766e41cddabe18e19))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@2.0.0...@alfalab/core-components-slider@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-slider

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.3.1...@alfalab/core-components-slider@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.3.0...@alfalab/core-components-slider@1.3.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-slider

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.5...@alfalab/core-components-slider@1.3.0) (2021-04-09)

### Features

-   **slider:** click theme ([15c308a](https://github.com/core-ds/core-components/commit/15c308a50e9fbcd8e40a8681f32aefea5b3d5cf9))

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.4...@alfalab/core-components-slider@1.2.5) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-slider

## [1.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.2...@alfalab/core-components-slider@1.2.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.2.0...@alfalab/core-components-slider@1.2.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.4...@alfalab/core-components-slider@1.2.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.3...@alfalab/core-components-slider@1.1.4) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-slider

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.2...@alfalab/core-components-slider@1.1.3) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-slider

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider@1.1.1...@alfalab/core-components-slider@1.1.2) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-slider
