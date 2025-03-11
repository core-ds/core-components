# @alfalab/core-components-radio

## 4.4.0

### Minor Changes

<sup><time>21.02.2025</time></sup>

### [#1527](https://github.com/core-ds/core-components/pull/1527)

-   Добавлен пропс `colors`, который отвечает за набор цветов в компоненте (возможность переключить на inverted цвета для тёмного фона)

## 4.3.8

### Patch Changes

-   Обновлены зависимости
    -   shared@0.16.0

## 4.3.7

### Patch Changes

-   Обновлены зависимости
    -   shared@0.15.0

## 4.3.6

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 4.3.5

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1509](https://github.com/core-ds/core-components/pull/1509)

-   Добавлено "sideEffects": false, чтобы бандлер лучше делал тришейк.

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

-   Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

-   Обновлены зависимости
    -   shared@0.14.1

## 4.3.4

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

## 4.3.3

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0

## 4.3.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.13.0

## 4.3.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   shared@0.12.1

## 4.3.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 4.2.0

### Minor Changes

<sup><time>04.09.2024</time></sup>

### [#1343](https://github.com/core-ds/core-components/pull/1343)

-   Стилевые исправления компонентов
-   Обновление документации

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1355](https://github.com/core-ds/core-components/pull/1355)

-   Обновлены наименования переменных отступов

## 4.1.5

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0

## 4.1.4

### Patch Changes

-   Обновлены зависимости
    -   shared@0.11.0

## 4.1.3

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 4.1.2

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 4.1.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.10.0

## 4.1.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1024](https://github.com/core-ds/core-components/pull/1024)

-   Добавлены новые способы указать размеры - 20 и 24. Буквенные значения размеров s и m теперь deprecated, используйте вместо них 20 и 24 соответственно

## 4.0.3

### Patch Changes

### [#1051](https://github.com/core-ds/core-components/pull/1051)

-   Исправлена проблема, из-за которой компоненты некорректно отображались при уменьшении масштаба страницы

## 4.0.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.9.1

## 4.0.1

### Patch Changes

### [#1011](https://github.com/core-ds/core-components/pull/1011)

-   Исправлена ошибка, из-за которой обработчик onChange вызывался при клике на addon

-   Обновлены зависимости
    -   shared@0.9.0

## 4.0.0

### Major Changes

### [#963](https://github.com/core-ds/core-components/pull/963)

-   В компонентах Checkbox, Radio и Switch цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалены css переменные для inactive состояния. Пропс inactive - deprecated

## 3.2.0

### Minor Changes

### [#958](https://github.com/core-ds/core-components/pull/958)

-   Добавлен проп labelProps

## 3.1.0

### Minor Changes

### [#734](https://github.com/core-ds/core-components/pull/734)

-   В компонентах Radio и Checkbox для выбранных контролов токен фона был изменен на --color-light-graphic-primary в темах default и site

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.0.7

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.0.6

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

## 3.0.5

### Patch Changes

### [#667](https://github.com/core-ds/core-components/pull/667)

-   Изменены токены цвета иконок на static

## 3.0.4

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.0.3

### Patch Changes

### [#513](https://github.com/core-ds/core-components/pull/513)

-   Изменены типы onChange коллбэка.

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@3.0.0...@alfalab/core-components-radio@3.0.1) (2022-08-19)

### Bug Fixes

-   omit enterKeyHint prop ([#197](https://github.com/core-ds/core-components/issues/197)) ([72f4946](https://github.com/core-ds/core-components/commit/72f494623c282f61b45539fa1c13d5c45bc5180c))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.7.1...@alfalab/core-components-radio@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.7.0...@alfalab/core-components-radio@2.7.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.6.3...@alfalab/core-components-radio@2.7.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.6.2...@alfalab/core-components-radio@2.6.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-radio

## [2.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.6.1...@alfalab/core-components-radio@2.6.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.6.0...@alfalab/core-components-radio@2.6.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-radio

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.5.3...@alfalab/core-components-radio@2.6.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.4.0...@alfalab/core-components-radio@2.5.0) (2022-03-29)

### Features

-   add extra content class name prop for radio and checkbox components ([#1048](https://github.com/core-ds/core-components/issues/1048)) ([3c076b9](https://github.com/core-ds/core-components/commit/3c076b939a64dff8f9c66bd65f474ccea76c8cad))

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.3.1...@alfalab/core-components-radio@2.4.0) (2022-03-24)

### Features

-   add extra classes for radio and checkbox components ([#1039](https://github.com/core-ds/core-components/issues/1039)) ([c3ed089](https://github.com/core-ds/core-components/commit/c3ed089360b25d0f7712f2e7608c5a23f11a95df))
-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.3.0...@alfalab/core-components-radio@2.3.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))
-   **radio:** условный рендер подсказки и лейбла ([#892](https://github.com/core-ds/core-components/issues/892)) ([b744c15](https://github.com/core-ds/core-components/commit/b744c159f3779c5bf555041e7762f9653efb7b0e)), closes [#869](https://github.com/core-ds/core-components/issues/869)

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.2.0...@alfalab/core-components-radio@2.3.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.1.0...@alfalab/core-components-radio@2.2.0) (2021-08-03)

### Features

-   add inactive controls (PDS-266) ([#765](https://github.com/core-ds/core-components/issues/765)) ([ec02c89](https://github.com/core-ds/core-components/commit/ec02c89ab6bf038c026ca0a72b3185525334840a))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.0.1...@alfalab/core-components-radio@2.1.0) (2021-07-23)

### Features

-   **calendar-input:** uses date-input ([#752](https://github.com/core-ds/core-components/issues/752)) ([509dba2](https://github.com/core-ds/core-components/commit/509dba26913ccf6df859a200aa476eeef1df2ddc))
-   add mobile theme for tag, radio, checkbox (PDS-244/247/248) ([#717](https://github.com/core-ds/core-components/issues/717)) ([36e2d99](https://github.com/core-ds/core-components/commit/36e2d99c716a03e7f319439df9ca47ec43ad4b71))
-   checkbox/radio/switch design updates (PDS-252) ([#735](https://github.com/core-ds/core-components/issues/735)) ([62f3c63](https://github.com/core-ds/core-components/commit/62f3c63279872a80ffb1c018b08addf897597b26))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@2.0.0...@alfalab/core-components-radio@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-radio

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.7...@alfalab/core-components-radio@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.7.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.6...@alfalab/core-components-radio@1.7.7) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-radio

## [1.7.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.5...@alfalab/core-components-radio@1.7.6) (2021-04-01)

### Bug Fixes

-   radio/checkbox ([#594](https://github.com/core-ds/core-components/issues/594)) ([4c9c13f](https://github.com/core-ds/core-components/commit/4c9c13fdf4ab3db9a6b176aeaba529c9b23f971b))

## [1.7.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.4...@alfalab/core-components-radio@1.7.5) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-radio

## [1.7.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.2...@alfalab/core-components-radio@1.7.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.7.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.7.0...@alfalab/core-components-radio@1.7.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.6.4...@alfalab/core-components-radio@1.7.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.6.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.6.3...@alfalab/core-components-radio@1.6.4) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-radio

## [1.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.6.2...@alfalab/core-components-radio@1.6.3) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-radio

## [1.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.6.1...@alfalab/core-components-radio@1.6.2) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-radio

## [1.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.6.0...@alfalab/core-components-radio@1.6.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-radio

# [1.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.5.0...@alfalab/core-components-radio@1.6.0) (2021-03-03)

### Features

-   **vars:** 2px gap ([#544](https://github.com/core-ds/core-components/issues/544)) ([e401782](https://github.com/core-ds/core-components/commit/e40178290a02c45bd9ea23ab0deffabd74a69276))

# [@alfalab/core-components-radio-v1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-radio@1.1.5...@alfalab/core-components-radio@1.2.0) (2020-11-25)

### Features

-   **radio:** improved theming ([3dcb532](https://github.com/core-ds/core-components/commit/3dcb532b8b6d9a4e610a56b557a54f6c68e6ce46))
