# Change Log

## 7.0.0

### Major Changes

### [#743](https://github.com/core-ds/core-components/pull/743)

-   Для компонента Plate добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.0
    -   icon-button@6.2.0
    -   mq@4.2.0

## 6.3.20

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   button@8.5.1
    -   icon-button@6.1.3

## 6.3.19

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.0
    -   icon-button@6.1.2

## 6.3.18

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

-   Обновлены зависимости
    -   button@8.4.0
    -   icon-button@6.1.1

## 6.3.17

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.1.0

## 6.3.16

### Patch Changes

-   Обновлены зависимости
    -   button@8.3.0
    -   icon-button@6.0.12

## 6.3.15

### Patch Changes

-   Обновлены зависимости
    -   button@8.2.0
    -   icon-button@6.0.11

## 6.3.14

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0
    -   icon-button@6.0.10

## 6.3.13

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   button@8.0.0
    -   icon-button@6.0.9

## 6.3.12

### Patch Changes

### [#551](https://github.com/core-ds/core-components/pull/551)

-   Исправлена высота плашки при наличии аддонов

## 6.3.11

### Patch Changes

-   Обновлены зависимости
    -   button@7.1.1
    -   icon-button@6.0.8

## 6.3.10

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   button@7.1.0
    -   icon-button@6.0.7

## 6.3.9

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.5
    -   icon-button@6.0.6

## 6.3.8

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.4
    -   icon-button@6.0.5

## 6.3.7

### Patch Changes

### [#469](https://github.com/core-ds/core-components/pull/469)

-   Для компонента Typography добавлен новый пропс rowLimit отвечающий за ограничение максимального количества строк
-   Для компонентов PureCell и Plate изменено отсечение текста в несколько строк<br />

## 6.3.6

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.3
    -   icon-button@6.0.4

## 6.3.5

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3

## 6.3.4

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   button@7.0.2
    -   icon-button@6.0.2

## 6.3.3

### Patch Changes

### [#376](https://github.com/core-ds/core-components/pull/376)

-   Убрали дополнительную обертку, которая ограничивала применение пропа `className`

## 6.3.2

### Patch Changes

### [#371](https://github.com/core-ds/core-components/pull/371)

-   Добавлен новый опциональный prop `rowLimit` в компонент Plate. Теперь есть возможность ограничивать количество строк для передаваемого текста в `children` (от 1 до 3).

## 6.3.1

### Patch Changes

### [#360](https://github.com/core-ds/core-components/pull/360)

-   Исправили max-height контента. Теперь max-height добавляется только раскрываемому(foldable) контенту.

## 6.3.0

### Minor Changes

### [#331](https://github.com/core-ds/core-components/pull/331)

-   Изменен фоновый цвет на light/specialbg/secondary-transparent для компонента Plate в режиме common

### [#340](https://github.com/core-ds/core-components/pull/340)

-   В компоненте Plate иконки подгружаемые с 'alfabank.servicecdn.ru' были заменены на иконки из icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.1
    -   icon-button@6.0.1

## 6.2.2

### Patch Changes

### [#292](https://github.com/core-ds/core-components/pull/292)

-   Новые стили кнопок в теме default
-   Новый вид состояния loading во всех темах (Loader заменён на Spinner)<br />
-   Исправлена высота кнопки ghost в размерах s/m/l/xl (увеличилась на 4px)<br />
-   Исправлена ширина кнопок secondary/tertiary (уменьшилась на 2px)<br />

-   Обновлены зависимости
    -   button@7.0.0

## 6.2.1

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@6.1.1...@alfalab/core-components-plate@6.2.0) (2022-09-13)

### Features

-   **plate:** added custom variable for box-shadow ([#256](https://github.com/core-ds/core-components/issues/256)) ([4d75e4e](https://github.com/core-ds/core-components/commit/4d75e4e84ead1ee12070c9097dba3b40400baac6))

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@6.1.0...@alfalab/core-components-plate@6.1.1) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-plate

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@6.0.2...@alfalab/core-components-plate@6.1.0) (2022-09-02)

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@6.0.1...@alfalab/core-components-plate@6.0.2) (2022-08-31)

**Note:** Version bump only for package @alfalab/core-components-plate

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@6.0.0...@alfalab/core-components-plate@6.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-plate

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@5.2.0...@alfalab/core-components-plate@6.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

# [5.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@5.1.1...@alfalab/core-components-plate@5.2.0) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

### Features

-   **plate:** subAddons slot, on/off border&shadow&borderRadius, new view 'custom' ([#158](https://github.com/core-ds/core-components/issues/158)) ([b2fc570](https://github.com/core-ds/core-components/commit/b2fc5703f083d493f0e5222d9a1f752cac190dbf)), closes [#161](https://github.com/core-ds/core-components/issues/161)

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@5.1.0...@alfalab/core-components-plate@5.1.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-plate

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@5.0.0...@alfalab/core-components-plate@5.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.2.3...@alfalab/core-components-plate@5.0.0) (2022-07-25)

### Features

-   Новый cdn alfabank.servicecdn.ru ([#166](https://github.com/core-ds/core-components/issues/166)) ([e29c89e](https://github.com/core-ds/core-components/commit/e29c89edc8cf60ac23df9570eece9e7811eb11f0))

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.servicecdn.ru data: 'self'`

-   chore(screenshot-utils): change cdn

-   feat(cdn-icon): add prop baseUrl

## [4.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.2.2...@alfalab/core-components-plate@4.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.2.1...@alfalab/core-components-plate@4.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [4.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.2.0...@alfalab/core-components-plate@4.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-plate

# [4.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.1.1...@alfalab/core-components-plate@4.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [4.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.1.0...@alfalab/core-components-plate@4.1.1) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-plate

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.11...@alfalab/core-components-plate@4.1.0) (2022-06-03)

### Features

-   **plate:** update buttons prop in Plate component ([#81](https://github.com/core-ds/core-components/issues/81)) ([0db6283](https://github.com/core-ds/core-components/commit/0db628390bfa91290b5a6529fab2653f06b4e629))

## [4.0.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.10...@alfalab/core-components-plate@4.0.11) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.5...@alfalab/core-components-plate@4.0.6) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.4...@alfalab/core-components-plate@4.0.5) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.3...@alfalab/core-components-plate@4.0.4) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.2...@alfalab/core-components-plate@4.0.3) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.1...@alfalab/core-components-plate@4.0.2) (2021-12-29)

**Note:** Version bump only for package @alfalab/core-components-plate

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@4.0.0...@alfalab/core-components-plate@4.0.1) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-plate

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@3.0.2...@alfalab/core-components-plate@4.0.0) (2021-12-08)

-   fix!: новый cdn иконок (#913) (#917) ([224831f](https://github.com/core-ds/core-components/commit/224831f41ed2de49dc1a228dc081b0629cf274b1)), closes [#913](https://github.com/core-ds/core-components/issues/913) [#917](https://github.com/core-ds/core-components/issues/917)

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.gcdn.co data: 'self'`

This reverts commit 953fbcfec46a40089a5cfde670597315269b05f5.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@3.0.1...@alfalab/core-components-plate@3.0.2) (2021-12-08)

### Bug Fixes

-   revert 0e8124552206f96149d104f65cff1667e857bf01 ([#916](https://github.com/core-ds/core-components/issues/916)) ([953fbcf](https://github.com/core-ds/core-components/commit/953fbcfec46a40089a5cfde670597315269b05f5))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@3.0.0...@alfalab/core-components-plate@3.0.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))
-   новый cdn иконок ([#913](https://github.com/core-ds/core-components/issues/913)) ([0e81245](https://github.com/core-ds/core-components/commit/0e8124552206f96149d104f65cff1667e857bf01))
-   **plate:** активный курсор только для foldable плашек ([#912](https://github.com/core-ds/core-components/issues/912)) ([06a38bd](https://github.com/core-ds/core-components/commit/06a38bd6bd07d016d670e600b373791aabe3d3ea))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.9...@alfalab/core-components-plate@3.0.0) (2021-11-26)

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

## [2.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.8...@alfalab/core-components-plate@2.0.9) (2021-09-14)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.7...@alfalab/core-components-plate@2.0.8) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.6...@alfalab/core-components-plate@2.0.7) (2021-08-23)

### Bug Fixes

-   **plate:** check is click inside component, popover issue ([bea8a7d](https://github.com/core-ds/core-components/commit/bea8a7dc199d7aced3ec8b5e9ab76568f0cba839))

## [2.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.5...@alfalab/core-components-plate@2.0.6) (2021-08-23)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.4...@alfalab/core-components-plate@2.0.5) (2021-08-11)

### Bug Fixes

-   **plate:** alert in plate cascade issue ([#793](https://github.com/core-ds/core-components/issues/793)) ([dbc20e5](https://github.com/core-ds/core-components/commit/dbc20e558f2b6452e70052b5abc3faf8533709d4))

## [2.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.3...@alfalab/core-components-plate@2.0.4) (2021-08-04)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.2...@alfalab/core-components-plate@2.0.3) (2021-07-23)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.1...@alfalab/core-components-plate@2.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-plate

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@2.0.0...@alfalab/core-components-plate@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-plate

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.8.0...@alfalab/core-components-plate@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [1.8.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.6...@alfalab/core-components-plate@1.8.0) (2021-06-04)

### Features

-   **plate:** update vars ([#668](https://github.com/core-ds/core-components/issues/668)) ([cbecef5](https://github.com/core-ds/core-components/commit/cbecef55e4cfc7231dcaa16b9220cc920547ff18))

## [1.7.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.5...@alfalab/core-components-plate@1.7.6) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.7.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.4...@alfalab/core-components-plate@1.7.5) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.7.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.3...@alfalab/core-components-plate@1.7.4) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.7.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.2...@alfalab/core-components-plate@1.7.3) (2021-05-18)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.7.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.1...@alfalab/core-components-plate@1.7.2) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.7.0...@alfalab/core-components-plate@1.7.1) (2021-04-28)

**Note:** Version bump only for package @alfalab/core-components-plate

# [1.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.6.2...@alfalab/core-components-plate@1.7.0) (2021-04-26)

### Features

-   **vars:** fresh colors ([10907ec](https://github.com/core-ds/core-components/commit/10907eca0f5556795529a90b41d2bc663ea01dfe))

## [1.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.6.1...@alfalab/core-components-plate@1.6.2) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.6.0...@alfalab/core-components-plate@1.6.1) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-plate

# [1.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.5.6...@alfalab/core-components-plate@1.6.0) (2021-03-24)

### Features

-   **alert:** add component ([#548](https://github.com/core-ds/core-components/issues/548)) ([264cbf8](https://github.com/core-ds/core-components/commit/264cbf8f7465d2ecaf043bf0f67530e040fc83f6))

## [1.5.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.5.5...@alfalab/core-components-plate@1.5.6) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.5.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.5.4...@alfalab/core-components-plate@1.5.5) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.5.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.5.2...@alfalab/core-components-plate@1.5.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.5.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.5.0...@alfalab/core-components-plate@1.5.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.5...@alfalab/core-components-plate@1.5.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.4.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.4...@alfalab/core-components-plate@1.4.5) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.4.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.3...@alfalab/core-components-plate@1.4.4) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.2...@alfalab/core-components-plate@1.4.3) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.1...@alfalab/core-components-plate@1.4.2) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.4.0...@alfalab/core-components-plate@1.4.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-plate

# [1.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.3.4...@alfalab/core-components-plate@1.4.0) (2021-03-03)

### Features

-   **vars:** 2px gap ([#544](https://github.com/core-ds/core-components/issues/544)) ([e401782](https://github.com/core-ds/core-components/commit/e40178290a02c45bd9ea23ab0deffabd74a69276))

## [1.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.3.3...@alfalab/core-components-plate@1.3.4) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.3.2...@alfalab/core-components-plate@1.3.3) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-plate

## [1.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-plate@1.3.1...@alfalab/core-components-plate@1.3.2) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
