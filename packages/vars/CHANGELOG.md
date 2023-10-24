# Change Log

## 9.6.0

### Minor Changes

### [#926](https://github.com/core-ds/core-components/pull/926)

-   Тема site переведена на bluetint палитру

## 9.5.0

### Minor Changes

### [#741](https://github.com/core-ds/core-components/pull/741)

-   Перевод corp темизации на bluetint цвета, приведение компонентов Input, Select к core темизации

## 9.4.0

### Minor Changes

### [#658](https://github.com/core-ds/core-components/pull/658)

Изменения для Corp theme:

1. Перевод цветовой палитры с bluetint на indigo
2. Приведение компонентов Select, Input, Button к прошлому виду

## 9.3.0

### Minor Changes

### [#631](https://github.com/core-ds/core-components/pull/631)

Перевод Corp темы с indigo на bluetint
Приведение компонентов Button, Input в Corp теме к default Core view

## 9.2.1

### Patch Changes

### [#623](https://github.com/core-ds/core-components/pull/623)

-   Tокены 'dark' заменены на аналогичные 'light'

## 9.2.0

### Minor Changes

### [#620](https://github.com/core-ds/core-components/pull/620)

-   Обновлённая типографика: миксины promo-mobile и promo-system-mobile

## 9.1.0

### Minor Changes

### [#604](https://github.com/core-ds/core-components/pull/604)

-   Добавлен новый prop backgroundColor

### [#556](https://github.com/core-ds/core-components/pull/556)

-   Заданы статичные цвета для компонента Gallery. Добавлены новые css-переменные.

## 9.0.0

### Major Changes

### [#582](https://github.com/core-ds/core-components/pull/582)

Дефолтная тема сменит палитру Indigo на палитру Bluetint.

Основные изменения:

-   Изменятся оттенки серого, тёмный режим начнёт выглядеть хорошо, а веб интерфейсы в дефолтной теме будут еще больше похожи на нативные мобильные.
-   Вместе с изменением палитры будет перекрашена Primary-кнопка. Она станет чёрной, как в мобилке. Недавно добавленная Accent-кнопка останется красной.

Если в своём продукте вы хотите чтобы кнопки, которые используются у вас в интерфейсе, остались красными, то используйте [кодмод](https://www.npmjs.com/package/@alfalab/core-components-codemod/v/2.3.1), который заменит во всех кнопках view=primary на view=accent. Тогда они останутся красными.

Также если вы используете индексный файл с переменными (vars/index.css) , то рекомендуем вам [перейти на один из бандлов](https://github.com/core-ds/core-components/tree/master/packages/vars/src/bundle), подготовленных под продукты (например, vars/bundle/click.css).
В этих бандлах всегда будет правильный набор переменных для вашего продукта. Если в продукте встречаются очень старые deprecated цвета из файла vars/colors.css, дополнительно подключите его (Он всё ещё есть в индексном файле, но в бандлы его уже не добавляли).

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 8.1.2

### Patch Changes

### [#546](https://github.com/core-ds/core-components/pull/546)

-   Обновление vars из последней версии ui-primitives, deprecated и 'old' цвета отмечены комментарием /_ deprecated _/

### [#550](https://github.com/core-ds/core-components/pull/550)

-   Исправлен цвет выделения диапазона в темной теме

## 8.1.1

### Patch Changes

### [#537](https://github.com/core-ds/core-components/pull/537)

-   Доработан скрипт сборки тем

## 8.1.0

### Minor Changes

### [#486](https://github.com/core-ds/core-components/pull/486)

-   Добавлен файл main.css с базовыми стилями

## 8.0.0

### Major Changes

### [#500](https://github.com/core-ds/core-components/pull/500)

-   Обвновлён bundle site.css для перехода на палитру bluetint

### Patch Changes

### [#503](https://github.com/core-ds/core-components/pull/503)

-   Обновление палитры bluetint: корректировка контраста text и graphic цветов

## 7.3.1

### Patch Changes

### [#502](https://github.com/core-ds/core-components/pull/502)

-   Исправлен экспорт css-переменных в js. Теперь js-файл есть как в рут пакете, так и core-components-vars

## 7.3.0

### Minor Changes

### [#492](https://github.com/core-ds/core-components/pull/492)

-   Добавлены тени для палитры bluetint (shadows-bluetint.css) и продуктовые бандлы переменных (vars/bundle/corp.css и др.)

## 7.2.0

### Minor Changes

### [#450](https://github.com/core-ds/core-components/pull/450)

-   Добавлен экспорт css-переменных из палитры bluetint в js файл

## 7.1.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 7.1.0

### Minor Changes

### [#377](https://github.com/core-ds/core-components/pull/377)

-   Добавлены новые токены light-graphic-positive-alpha-10 и light-graphic-negative-alpha-10

## 7.0.0

### Major Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)

Удалённые миксины с текстовыми стилями были помечены как deprecated более двух лет назад и в макетах давно не используются.

Основное изменение, про которое нужно знать — удалены текстовые transparent цвета.
При обновлении достаточно убрать `-transparent` из названий:
`--color-light-text-secondary-transparent` → `--color-light-text-secondary`

## 6.5.1

### Patch Changes

-   [#273](https://github.com/core-ds/core-components/pull/273): Исправлены пути импорта переменных в бандле. Thanks [@Lacronts](https://github.com/Lacronts)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.5...@alfalab/core-components-vars@6.5.0) (2022-09-12)

### Features

-   **vars:** introducing vars bundles ([#192](https://github.com/core-ds/core-components/issues/192)) ([28c15a4](https://github.com/core-ds/core-components/commit/28c15a49a7037680b38fec19018c0d1268f79ac3))

## [6.4.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.4...@alfalab/core-components-vars@6.4.5) (2022-09-09)

### Bug Fixes

-   **action-button:** review fixes ([8c4b419](https://github.com/core-ds/core-components/commit/8c4b4193b2959e99f2b0f6de836f3f3d63ca0b18))

## [6.4.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.3...@alfalab/core-components-vars@6.4.4) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

## [6.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.2...@alfalab/core-components-vars@6.4.3) (2022-07-25)

### Bug Fixes

-   **bottom-sheet:** fix component border-radius ([#157](https://github.com/core-ds/core-components/issues/157)) ([57b767e](https://github.com/core-ds/core-components/commit/57b767e43e40e9170967e3a53481e21f92cb0190))

## [6.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.1...@alfalab/core-components-vars@6.4.2) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-vars

## [6.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.4.0...@alfalab/core-components-vars@6.4.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-vars

# [6.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.2.0...@alfalab/core-components-vars@6.3.0) (2022-06-28)

### Features

-   **pure cell:** new component ([#10](https://github.com/core-ds/core-components/issues/10)) ([4e95c57](https://github.com/core-ds/core-components/commit/4e95c573aaa6f99197292ea4bae12cbbcc3207c9))

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.1.0...@alfalab/core-components-vars@6.2.0) (2022-06-23)

### Bug Fixes

-   **button:** fix color secondary ([#92](https://github.com/core-ds/core-components/issues/92)) ([57b8e66](https://github.com/core-ds/core-components/commit/57b8e661b8f54acdfd0c235f58ebd59d66c116a4))

### Features

-   **vars:** export CSS custom properties as JS vars ([#45](https://github.com/core-ds/core-components/issues/45)) ([dbb1f78](https://github.com/core-ds/core-components/commit/dbb1f78795247fa09797c05f134b21a7774e6898))

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@6.0.0...@alfalab/core-components-vars@6.1.0) (2022-06-08)

### Features

-   **scrollbar:** new component scrollbar ([#48](https://github.com/core-ds/core-components/issues/48)) ([5ea6fa3](https://github.com/core-ds/core-components/commit/5ea6fa352ff943cda8c52e35f9d96da9bea97fa3))

## [5.5.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.5.1...@alfalab/core-components-vars@5.5.2) (2022-03-28)

### Bug Fixes

-   fix modal and bottom-sheet dark mode ([#1043](https://github.com/core-ds/core-components/issues/1043)) ([cad36a2](https://github.com/core-ds/core-components/commit/cad36a25b28bfa71296c3dd9dc325eec28b5c241))

## [5.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.5.0...@alfalab/core-components-vars@5.5.1) (2022-03-24)

**Note:** Version bump only for package @alfalab/core-components-vars

# [5.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.4.0...@alfalab/core-components-vars@5.5.0) (2022-03-18)

### Features

-   **calendar:** add intranet theme ([#1026](https://github.com/core-ds/core-components/issues/1026)) ([292b76c](https://github.com/core-ds/core-components/commit/292b76c100bb12ebb1011d2a9981ba2b2899dd7a))
-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [5.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.3.0...@alfalab/core-components-vars@5.4.0) (2022-02-17)

### Features

-   **calendar:** design & logic updates ([#991](https://github.com/core-ds/core-components/issues/991)) ([358142c](https://github.com/core-ds/core-components/commit/358142c6d259e1463954139cc648787cdf461f76)), closes [#993](https://github.com/core-ds/core-components/issues/993) [#990](https://github.com/core-ds/core-components/issues/990)

# [5.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.2.0...@alfalab/core-components-vars@5.3.0) (2022-02-15)

### Features

-   **vars:** updated typography ([#981](https://github.com/core-ds/core-components/issues/981)) ([95bcce8](https://github.com/core-ds/core-components/commit/95bcce8e07467c635e2a93c55edfb3550a533ba4))

# [5.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.1.1...@alfalab/core-components-vars@5.2.0) (2022-01-27)

### Features

-   **vars:** build color-mod ([#953](https://github.com/core-ds/core-components/issues/953)) ([aa64366](https://github.com/core-ds/core-components/commit/aa64366d970be46776d23c9d13ebec413b2ac4d9))

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.1.0...@alfalab/core-components-vars@5.1.1) (2022-01-17)

### Bug Fixes

-   **vars:** remove unused colors ([#945](https://github.com/core-ds/core-components/issues/945)) ([310a70a](https://github.com/core-ds/core-components/commit/310a70a8be6bff687861d3d643ebc347ecf6cd6d))

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@5.0.0...@alfalab/core-components-vars@5.1.0) (2021-12-09)

### Features

-   **status:** добавлено 10% прозрачности в цвет фона ([#896](https://github.com/core-ds/core-components/issues/896)) ([b55c62b](https://github.com/core-ds/core-components/commit/b55c62b49cc52a15ff7497b9ad329773fba15959))

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@4.1.0...@alfalab/core-components-vars@5.0.0) (2021-11-26)

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

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@4.0.0...@alfalab/core-components-vars@4.1.0) (2021-09-16)

### Features

-   **gallery:** add component ([#815](https://github.com/core-ds/core-components/issues/815)) ([7ffd20e](https://github.com/core-ds/core-components/commit/7ffd20e2d007f658223d29aa943639c13ad51342)), closes [#774](https://github.com/core-ds/core-components/issues/774) [#795](https://github.com/core-ds/core-components/issues/795)

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@3.1.1...@alfalab/core-components-vars@4.0.0) (2021-09-14)

### Features

-   dark themes ([#778](https://github.com/core-ds/core-components/issues/778)) ([d848d16](https://github.com/core-ds/core-components/commit/d848d165b59182e6521d28efc2aadeecebc00d93))
-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

### BREAKING CHANGES

-   remove dark-theme-injector. remove vars duplications

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@3.1.0...@alfalab/core-components-vars@3.1.1) (2021-08-23)

### Bug Fixes

-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@3.0.1...@alfalab/core-components-vars@3.1.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@3.0.0...@alfalab/core-components-vars@3.0.1) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-vars

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.6.2...@alfalab/core-components-vars@3.0.0) (2021-07-09)

### Features

-   **vars:** add border-radius-xs ([a4bd8ff](https://github.com/core-ds/core-components/commit/a4bd8ff44d9ed7cf68ca2b0994ab61a80ed358e2))
-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [2.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.6.1...@alfalab/core-components-vars@2.6.2) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-vars

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.6.0...@alfalab/core-components-vars@2.6.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-vars

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.5.2...@alfalab/core-components-vars@2.6.0) (2021-04-06)

### Features

-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))

## [2.5.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.5.0...@alfalab/core-components-vars@2.5.2) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.4.3...@alfalab/core-components-vars@2.5.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [2.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.4.2...@alfalab/core-components-vars@2.4.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-vars

## [2.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.4.1...@alfalab/core-components-vars@2.4.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-vars

## [2.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.4.0...@alfalab/core-components-vars@2.4.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-vars

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.3.2...@alfalab/core-components-vars@2.4.0) (2021-03-03)

### Features

-   **vars:** 2px gap ([#544](https://github.com/core-ds/core-components/issues/544)) ([e401782](https://github.com/core-ds/core-components/commit/e40178290a02c45bd9ea23ab0deffabd74a69276))

## [2.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.3.1...@alfalab/core-components-vars@2.3.2) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-vars

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.3.0...@alfalab/core-components-vars@2.3.1) (2021-02-19)

### Bug Fixes

-   **toast-plate:** polish toast-plate themes ([#527](https://github.com/core-ds/core-components/issues/527)) ([57d73d4](https://github.com/core-ds/core-components/commit/57d73d47b089997b2cc0d85e37b70f068c945e50))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@2.2.0...@alfalab/core-components-vars@2.3.0) (2021-02-18)

### Features

-   updated design tokens ([#516](https://github.com/core-ds/core-components/issues/516)) ([ef66b65](https://github.com/core-ds/core-components/commit/ef66b65bb35b2ef06292b8da709ccc335eb44735))

# [@alfalab/core-components-vars-v2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-vars@1.8.0...@alfalab/core-components-vars@2.0.0) (2020-11-25)

### Features

-   remove extra vars, update docs ([#370](https://github.com/core-ds/core-components/issues/370)) ([af1b133](https://github.com/core-ds/core-components/commit/af1b1339e768e59a2377409bf164cc8c439bd3bf))

### BREAKING CHANGES

-   remove packages/vars/src/breakpoints.css
