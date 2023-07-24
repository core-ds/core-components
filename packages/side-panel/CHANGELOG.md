# Change Log

## 3.0.15

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.3.6

## 3.0.14

### Patch Changes

-   Обновлены зависимости
    -   base-modal@5.2.0
    -   drawer@4.2.11

## 3.0.13

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.3.5

## 3.0.12

### Patch Changes

### [#681](https://github.com/core-ds/core-components/pull/681)

-   Поправлен размер шрифта у заголовка

## 3.0.11

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.3.4

## 3.0.10

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.3.3

## 3.0.9

### Patch Changes

### [#647](https://github.com/core-ds/core-components/pull/647)

-   Исправлена ошибка, из-за которой неверно вычислялось свойство контекста hasScroll в мобильной версии компонента

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

-   Обновлены зависимости
    -   navigation-bar@0.3.2

## 3.0.8

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0
    -   icon-button@6.0.10
    -   navigation-bar@0.3.1

## 3.0.7

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.3.0

## 3.0.6

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.2.0
    -   base-modal@5.1.3
    -   drawer@4.2.10

## 3.0.5

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   button@8.0.0
    -   base-modal@5.1.2
    -   drawer@4.2.9
    -   icon-button@6.0.9
    -   mq@4.1.4
    -   navigation-bar@0.1.3

## 3.0.4

### Patch Changes

### [#568](https://github.com/core-ds/core-components/pull/568)

-   Ограничена максимальная ширина компонента SidePanelMobile до 600px

## 3.0.3

### Patch Changes

### [#548](https://github.com/core-ds/core-components/pull/548)

-   Исправлена ошибка, из-за которой контент с z-index, отличным от auto, наезжал на sticky footer и header

-   Обновлены зависимости
    -   drawer@4.2.8

## 3.0.2

### Patch Changes

-   Обновлены зависимости
    -   navigation-bar@0.1.2

## 3.0.1

### Patch Changes

### [#540](https://github.com/core-ds/core-components/pull/540)

-   Изменена нода с overflow: auto в SidePanelMobile

-   Обновлены зависимости
    -   base-modal@5.1.1
    -   navigation-bar@0.1.1
    -   button@7.1.1
    -   drawer@4.2.7
    -   icon-button@6.0.8

## 3.0.0

### Major Changes

### [#494](https://github.com/core-ds/core-components/pull/494)

-   В ModalContext у base-modal добавлен ref на div-обертку модальных окон
-   У компонентов Modal, SidePanel и BottomSheet обновлён компонент заголовка и изменены основные отступы<br />

### Patch Changes

-   Обновлены зависимости
    -   base-modal@5.1.0
    -   navigation-bar@0.1.0
    -   drawer@4.2.6

## 2.5.7

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   button@7.1.0
    -   base-modal@5.0.10
    -   drawer@4.2.5
    -   icon-button@6.0.7
    -   mq@4.1.3

## 2.5.6

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.5
    -   base-modal@5.0.9
    -   icon-button@6.0.6
    -   drawer@4.2.4

## 2.5.5

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.4
    -   icon-button@6.0.5

## 2.5.4

### Patch Changes

-   Обновлены зависимости
    -   base-modal@5.0.8
    -   drawer@4.2.3

## 2.5.3

### Patch Changes

### [#484](https://github.com/core-ds/core-components/pull/484)

-   Исправлен тип для значения по-умолчанию у хука useMatchMedia
-   В side-panel добавлена возможность указать значение по-умолчанию для useMatchMedia<br />

-   Обновлены зависимости
    -   mq@4.1.2

## 2.5.2

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.3
    -   icon-button@6.0.4

## 2.5.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3

## 2.5.0

### Minor Changes

### [#334](https://github.com/core-ds/core-components/pull/334)

-   В компонентах DateRangeInput, DateTimeInput и CalendarInput добавлены mobile и desktop версии компонентов. Название компонентов было изменено по схеме Component → ComponentDesktop
-   В компонентах Calendar и InputAutocomplete добавлена responsive версия компонентов. Название компонентов было изменено по схеме Component → ComponentResponsive<br />
-   В компонентах PickerButton и Tooltip добавлен новый пропс breakpoint. Название компонентов было изменено по схеме Component -→ ComponentResponsive для PickerButton и Component → ComponentDesktop для Tooltip<br />
-   В компонентах Confirmation и SidePanel добавлен новый пропс breakpoint<br />

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   base-modal@5.0.7
    -   button@7.0.2
    -   drawer@4.2.2
    -   icon-button@6.0.2

## 2.4.2

### Patch Changes

-   Обновлены зависимости
    -   base-modal@5.0.6
    -   drawer@4.2.1

## 2.4.1

### Patch Changes

### [#350](https://github.com/core-ds/core-components/pull/350)

-   В документацию добавлены пропсы и их описание для подкомпонентов SidePanel

-   Обновлены зависимости
    -   button@7.0.1
    -   icon-button@6.0.1

## 2.4.0

### Minor Changes

### [#323](https://github.com/core-ds/core-components/pull/323)

-   Добавлена возможность передавать пропсы в компонент Scrollbar

### Patch Changes

-   Обновлены зависимости
    -   drawer@4.2.0
    -   base-modal@5.0.5

## 2.3.0

### Minor Changes

### [#310](https://github.com/core-ds/core-components/pull/310)

-   Добавлена возможность менять иконку Closer

### Patch Changes

### [#292](https://github.com/core-ds/core-components/pull/292)

-   Новые стили кнопок в теме default
-   Новый вид состояния loading во всех темах (Loader заменён на Spinner)<br />
-   Исправлена высота кнопки ghost в размерах s/m/l/xl (увеличилась на 4px)<br />
-   Исправлена ширина кнопок secondary/tertiary (уменьшилась на 2px)<br />

-   Обновлены зависимости
    -   button@7.0.0
    -   icon-button@6.0.0

## 2.2.0

### Minor Changes

### [#305](https://github.com/core-ds/core-components/pull/305)

-   Добавлен проп placement, теперь Drawer и SidePanel могут появляться слева
-   Добавлен кастомный скроллбар.<br />

### Patch Changes

-   Обновлены зависимости
    -   base-modal@5.0.4
    -   drawer@4.1.0

## 2.1.5

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2
    -   @alfalab/core-components-icon-button@5.0.5

## 2.1.4

### Patch Changes

-   [#270](https://github.com/core-ds/core-components/pull/270): Исправлена ошибка, когда non-static position контент при скролле перекрывал sticky заголовок. Thanks [@Lacronts](https://github.com/Lacronts)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.1.2...@alfalab/core-components-side-panel@2.1.3) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [2.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.1.1...@alfalab/core-components-side-panel@2.1.2) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.1.0...@alfalab/core-components-side-panel@2.1.1) (2022-09-02)

**Note:** Version bump only for package @alfalab/core-components-side-panel

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.0.2...@alfalab/core-components-side-panel@2.1.0) (2022-09-01)

### Features

-   **side-panel:** add props imageUrl and fix doc ([#168](https://github.com/core-ds/core-components/issues/168)) ([9ca0f00](https://github.com/core-ds/core-components/commit/9ca0f0094b993bdd302765db79bcf8f91fae2a12))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.0.1...@alfalab/core-components-side-panel@2.0.2) (2022-08-31)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@2.0.0...@alfalab/core-components-side-panel@2.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-side-panel

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.2.2...@alfalab/core-components-side-panel@2.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.2.1...@alfalab/core-components-side-panel@1.2.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.2.0...@alfalab/core-components-side-panel@1.2.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-side-panel

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.6...@alfalab/core-components-side-panel@1.2.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [1.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.5...@alfalab/core-components-side-panel@1.1.6) (2022-07-25)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.4...@alfalab/core-components-side-panel@1.1.5) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.3...@alfalab/core-components-side-panel@1.1.4) (2022-07-15)

### Bug Fixes

-   **side-panel:** fix ts ([#149](https://github.com/core-ds/core-components/issues/149)) ([6ec7063](https://github.com/core-ds/core-components/commit/6ec706359d95bf7e55845aa0b24a7fd5190d0932))

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.2...@alfalab/core-components-side-panel@1.1.3) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.1...@alfalab/core-components-side-panel@1.1.2) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-side-panel

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-side-panel@1.1.0...@alfalab/core-components-side-panel@1.1.1) (2022-07-11)

### Bug Fixes

-   **select:** added comment for IE ([#127](https://github.com/core-ds/core-components/issues/127)) ([31fb5f6](https://github.com/core-ds/core-components/commit/31fb5f69c57acbf71e897b8c261068a24c883ecc))

# 1.1.0 (2022-07-01)

### Features

-   **side-panel:** add new component side-panel ([#56](https://github.com/core-ds/core-components/issues/56)) ([0f9365a](https://github.com/core-ds/core-components/commit/0f9365ab22597cc230ac19ab19032f63d72a816e))
