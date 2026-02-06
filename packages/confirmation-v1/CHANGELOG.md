# @alfalab/core-components-confirmation-v1

## 3.0.1

### Patch Changes

<sup><time>05.02.2026</time></sup>

#### [#2047](https://github.com/core-ds/core-components/pull/2047)

- Корректная версия `alfasans`-пакетов в `package.json`

- Обновлены зависимости
    - @alfalab/core-components-button@13.0.1
    - @alfalab/core-components-link@7.0.1
    - @alfalab/core-components-loader@5.0.1

## 3.0.0

### Major Changes

<sup><time>04.02.2026</time></sup>

#### [#1638](https://github.com/core-ds/core-components/pull/1638)

##### Button

- Удален `view=link` и `view=ghost`, которые были помечены как `deprecated` в `core-components@45.x.x`
- Удален `view=filled`, который был помечен как `deprecated` в `core-components@21.x.x`
- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `xxs, xs, s, m, l, xl` на `32, 40, 48, 56, 64, 72` соответственно)

<sup><time>04.02.2026</time></sup>

#### [#2009](https://github.com/core-ds/core-components/pull/2009)

##### CSS переменные

- Удалены следующие css переменные, отвечающие за настройку шрифта:
    - `--bottom-sheet-subtitle-font-family`
    - `--bottom-sheet-subtitle-font-size`
    - `--bottom-sheet-subtitle-font-weight`
    - `--bottom-sheet-title-font-family`
    - `--bottom-sheet-title-font-size`
    - `--bottom-sheet-title-font-weight`
    - `--button-font-family`
    - `--button-font-weight`
    - `--calendar-month-only-header-font-family`
    - `--calendar-month-only-header-font-size`
    - `--calendar-month-only-header-font-weight`
    - `--circular-progress-bar-font-family`
    - `--circular-progress-bar-font-weight`
    - `--code-input-font-family`
    - `--code-input-font-size`
    - `--code-input-font-weight`
    - `--confirmation-header-desktop-font-family`
    - `--confirmation-header-desktop-font-size`
    - `--confirmation-header-desktop-font-weight`
    - `--confirmation-header-font-feature-settings`
    - `--confirmation-header-mobile-font-family`
    - `--confirmation-header-mobile-font-size`
    - `--confirmation-header-mobile-font-weight`
    - `--confirmation-input-font-family`
    - `--confirmation-input-font-size`
    - `--confirmation-input-font-weight`
    - `--confirmation-text-font-family`
    - `--confirmation-text-font-size`
    - `--confirmation-text-font-weight`
    - `--confirmation-title-font-family`
    - `--confirmation-title-font-feature-settings`
    - `--confirmation-title-font-size`
    - `--confirmation-title-font-weight`
    - `--form-control-font-family`
    - `--modal-header-desktop-font-family`
    - `--modal-header-desktop-font-weight`
    - `--modal-header-mobile-font-family`
    - `--modal-header-mobile-font-size`
    - `--modal-header-mobile-font-weight`
    - `--modal-l-header-desktop-font-size`
    - `--modal-s-header-desktop-font-size`
    - `--primary-tablist-font-feature-settings`
    - `--primary-tablist-l-font-family`
    - `--primary-tablist-l-font-size`
    - `--primary-tablist-l-font-weight`
    - `--primary-tablist-m-font-family`
    - `--primary-tablist-m-font-size`
    - `--primary-tablist-m-font-weight`
    - `--primary-tablist-mobile-font-family`
    - `--primary-tablist-mobile-font-size`
    - `--primary-tablist-mobile-font-weight`
    - `--primary-tablist-s-font-family`
    - `--primary-tablist-s-font-size`
    - `--primary-tablist-s-font-weight`
    - `--primary-tablist-xl-font-family`
    - `--primary-tablist-xl-font-size`
    - `--primary-tablist-xl-font-weight`
    - `--side-panel-header-desktop-font-family`
    - `--side-panel-header-desktop-font-weight`
    - `--side-panel-header-mobile-font-family`
    - `--side-panel-header-mobile-font-size`
    - `--side-panel-header-mobile-font-weight`
    - `--side-panel-s-header-desktop-font-size`
    - `--slider-input-font-weight`
    - `--sys-message-desktop-title-font-size`
    - `--sys-message-desktop-title-font-weight`
    - `--sys-message-mobile-title-font-size`
    - `--sys-message-mobile-title-font-weight`
    - `--sys-message-title-font-family`
    - `--toast-plate-title-font-weight`
    - `--universal-modal-header-desktop-font-family`
    - `--universal-modal-header-desktop-font-weight`
    - `--universal-modal-header-mobile-font-family`
    - `--universal-modal-header-mobile-font-size`
    - `--universal-modal-header-mobile-font-weight`

- Темизации, использовавшие указанные переменные, приведены к дизайну по-умолчанию

<sup><time>04.02.2026</time></sup>

#### [#1620](https://github.com/core-ds/core-components/pull/1620)

##### Shared

- Импорты browser и os утилит заменены с компаунд на атомарные

<sup><time>04.02.2026</time></sup>

#### [#1989](https://github.com/core-ds/core-components/pull/1989)

- Добавлен вариант пакета со шрифтом `Alfa Interface Sans`

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Обновление `@alfalab/icons-*` библиотек

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

- Обновлены зависимости
    - @alfalab/core-components-button@13.0.0
    - @alfalab/core-components-loader@5.0.0
    - @alfalab/core-components-link@7.0.0

## 2.0.5

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-button@12.1.1

## 2.0.4

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-button@12.1.0

## 2.0.3

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-button@12.0.2

## 2.0.2

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-link@6.1.0

## 2.0.1

### Patch Changes

<sup><time>26.08.2025</time></sup>

#### [#1820](https://github.com/core-ds/core-components/pull/1820)

- Обновлены `@alfalab/icons-*` пакеты

- Обновлены зависимости
    - @alfalab/core-components-button@12.0.1

## 2.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-button@12.0.0
    - @alfalab/core-components-link@6.0.0
    - @alfalab/core-components-loader@4.0.0

## 1.10.5

### Patch Changes

- Обновлены зависимости
    - loader@3.2.5

## 1.10.4

### Patch Changes

- Обновлены зависимости
    - button@11.11.10

## 1.10.3

### Patch Changes

- Обновлены зависимости
    - button@11.11.9

## 1.10.2

### Patch Changes

- Обновлены зависимости
    - button@11.11.8

## 1.10.1

### Patch Changes

- Обновлены зависимости
    - button@11.11.7

## 1.10.0

### Minor Changes

<sup><time>28.02.2025</time></sup>

### [#1588](https://github.com/core-ds/core-components/pull/1588)

- Обновлена версия @alfalab/utils до 1.18.0

### Patch Changes

- Обновлены зависимости
    - button@11.11.6

## 1.9.14

### Patch Changes

- Обновлены зависимости
    - button@11.11.5

## 1.9.13

### Patch Changes

- Обновлены зависимости
    - button@11.11.4

## 1.9.12

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

- Обновление зависимостей

- Обновлены зависимости
    - button@11.11.3
    - link@5.3.4
    - loader@3.2.4

## 1.9.11

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1497](https://github.com/core-ds/core-components/pull/1497)

- Добавлено sideEffects: false (package.json)

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

- Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

- Обновлены зависимости
    - loader@3.2.3
    - button@11.11.2
    - link@5.3.3

## 1.9.10

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

- Вендор classnames обновлён 2.3.1 -> 2.5.1

- Обновлены зависимости
    - button@11.11.1
    - link@5.3.2
    - loader@3.2.2

## 1.9.9

### Patch Changes

- Обновлены зависимости
    - button@11.11.0

## 1.9.8

### Patch Changes

- Обновлены зависимости
    - button@11.10.2

## 1.9.7

### Patch Changes

- Обновлены зависимости
    - button@11.10.1

## 1.9.6

### Patch Changes

<sup><time>02.11.2024</time></sup>

### [#1429](https://github.com/core-ds/core-components/pull/1429)

- Исправлен цвет инпута в соответсвии с актуальной версией компонента

## 1.9.5

### Patch Changes

- Обновлены зависимости
    - button@11.10.0

## 1.9.4

### Patch Changes

- Обновлены зависимости
    - button@11.9.0

## 1.9.3

### Patch Changes

- Обновлены зависимости
    - button@11.8.0

## 1.9.2

### Patch Changes

- Обновлены зависимости
    - button@11.7.1

## 1.9.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

- Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

- Заменили числовые значения на переменные отступов

- Обновлены зависимости
    - button@11.7.0
    - link@5.3.1
    - loader@3.2.1

## 1.9.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

- Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

- Обновлены зависимости
    - button@11.6.0
    - link@5.3.0
    - loader@3.2.0

## 1.8.5

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1353](https://github.com/core-ds/core-components/pull/1353)

- Обновлены наименования переменных отступов

- Обновлены зависимости
    - button@11.5.5
    - link@5.2.3
    - loader@3.1.1

## 1.8.4

### Patch Changes

- Обновлены зависимости
    - button@11.5.4

## 1.8.3

### Patch Changes

- Обновлены зависимости
    - button@11.5.3

## 1.8.2

### Patch Changes

- Обновлены зависимости
    - button@11.5.2

## 1.8.1

### Patch Changes

- Обновлены зависимости
    - button@11.5.1

## 1.8.0

### Minor Changes

<sup><time>27.06.2024</time></sup>

### [#1258](https://github.com/core-ds/core-components/pull/1258)

- Заменили устаревшие цветовые токены на актуальные

### Patch Changes

- Обновлены зависимости
    - button@11.5.0

## 1.7.5

### Patch Changes

- Обновлены зависимости
    - button@11.4.5
    - link@5.2.2

## 1.7.4

### Patch Changes

- Обновлены зависимости
    - button@11.4.4

## 1.7.3

### Patch Changes

- Обновлены зависимости
    - button@11.4.3

## 1.7.2

### Patch Changes

- Обновлены зависимости
    - button@11.4.2

## 1.7.1

### Patch Changes

- Обновлены зависимости
    - button@11.4.1

## 1.7.0

### Minor Changes

<sup><time>29.03.2024</time></sup>

### [#1147](https://github.com/core-ds/core-components/pull/1147)

- Обновили версии пакетов @alfalab/utils и @alfalab/data

## 1.6.1

### Patch Changes

- Обновлены зависимости
    - button@11.4.0
    - link@5.2.1

## 1.6.0

### Minor Changes

<sup><time>04.03.2024</time></sup>

### [#1108](https://github.com/core-ds/core-components/pull/1108)

- обновлены минорные версии @alfalab/utils и @alfalab/data

## 1.5.3

### Patch Changes

- Обновлены зависимости
    - button@11.3.0

## 1.5.2

### Patch Changes

- Обновлены зависимости
    - button@11.2.0

## 1.5.1

### Patch Changes

- Обновлены зависимости
    - button@11.1.1

## 1.5.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

- Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

- Обновлены зависимости
    - button@11.1.0

## 1.4.12

### Patch Changes

- Обновлены зависимости
    - link@5.2.0
    - button@11.0.0

## 1.4.11

### Patch Changes

- Обновлены зависимости
    - button@10.0.2

## 1.4.10

### Patch Changes

- Обновлены зависимости
    - button@10.0.1

## 1.4.9

### Patch Changes

- Обновлены зависимости
    - button@10.0.0

## 1.4.8

### Patch Changes

- Обновлены зависимости
    - button@9.1.0

## 1.4.7

### Patch Changes

- Обновлены зависимости
    - link@5.1.1

## 1.4.6

### Patch Changes

- Обновлены зависимости
    - button@9.0.6

## 1.4.5

### Patch Changes

- Обновлены зависимости
    - button@9.0.5

## 1.4.4

### Patch Changes

- Обновлены зависимости
    - button@9.0.4

## 1.4.3

### Patch Changes

- Обновлены зависимости
    - button@9.0.3

## 1.4.2

### Patch Changes

- Обновлены зависимости
    - button@9.0.2

## 1.4.1

### Patch Changes

- Обновлены зависимости
    - button@9.0.1

## 1.4.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

- Теперь каждый пакет публикуется с исходниками

### Patch Changes

- Обновлены зависимости
    - button@9.0.0
    - link@5.1.0
    - loader@3.1.0

## 1.3.2

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

- Удален скрипт отправки статистики (send-stats)

- Обновлены зависимости
    - button@8.5.1
    - link@5.0.6
    - loader@3.0.7

## 1.3.1

### Patch Changes

- Обновлены зависимости
    - button@8.5.0

## 1.3.0

### Minor Changes

### [#712](https://github.com/core-ds/core-components/pull/712)

- обновлены минорные версии @alfalab/utils и @alfalab/data

## 1.2.21

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

- Обновлена зависимость @alfalab/hooks

- Обновлены зависимости
    - button@8.4.0
    - link@5.0.5

## 1.2.20

### Patch Changes

### [#635](https://github.com/core-ds/core-components/pull/635)

- Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 1.2.19

### Patch Changes

- Обновлены зависимости
    - button@8.3.0

## 1.2.18

### Patch Changes

- Обновлены зависимости
    - button@8.2.0

## 1.2.17

### Patch Changes

- Обновлены зависимости
    - button@8.1.0

## 1.2.16

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

- Добавлен \_\_esModule в cjs экспорт

- Обновлены зависимости
    - button@8.0.0
    - link@5.0.4
    - loader@3.0.6

## 1.2.15

### Patch Changes

- Обновлены зависимости
    - button@7.1.1

## 1.2.14

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

- В зависимости добавлена библиотека tslib

- Обновлены зависимости
    - button@7.1.0
    - link@5.0.3
    - loader@3.0.5

## 1.2.13

### Patch Changes

- Обновлены зависимости
    - button@7.0.5

## 1.2.12

### Patch Changes

- Обновлены зависимости
    - button@7.0.4

## 1.2.11

### Patch Changes

- Обновлены зависимости
    - button@7.0.3

## 1.2.10

### Patch Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

- Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 1.2.9

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

- Исправлена проблема с default-импортом в cjs форматах

- Обновлены зависимости
    - button@7.0.2
    - link@5.0.2
    - loader@3.0.4

## 1.2.8

### Patch Changes

- Обновлены зависимости
    - button@7.0.1

## 1.2.7

### Patch Changes

- Обновлены зависимости
    - loader@3.0.3

## 1.2.6

### Patch Changes

### [#324](https://github.com/core-ds/core-components/pull/324)

- "export" типов заменен на "export type"

## 1.2.5

### Patch Changes

### [#292](https://github.com/core-ds/core-components/pull/292)

- Новые стили кнопок в теме default
- Новый вид состояния loading во всех темах (Loader заменён на Spinner)<br />
- Исправлена высота кнопки ghost в размерах s/m/l/xl (увеличилась на 4px)<br />
- Исправлена ширина кнопок secondary/tertiary (уменьшилась на 2px)<br />

- Обновлены зависимости
    - button@7.0.0

## 1.2.4

### Patch Changes

- Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    - @alfalab/core-components-button@6.1.2

## 1.2.3

### Patch Changes

- [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
  Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 1.2.2

### Patch Changes

- Updated dependencies [[#283](https://github.com/core-ds/core-components/pull/283)]
    - @alfalab/core-components-link@5.0.1

## 1.2.1

### Patch Changes

- [#279](https://github.com/core-ds/core-components/pull/279): chore: обновились @alfalab-data и @alfalab/utils версии в зависимостях. Thanks [@EGNKupava](https://github.com/EGNKupava)

## 1.2.0

### Minor Changes

- [#260](https://github.com/core-ds/core-components/pull/260): Добавил реэкспорт для компонента ConfirmationV1 как Confirmation и типа пропсов ConfirmationV1Props как ConfirmationProps. Thanks [@EGNKupava](https://github.com/EGNKupava)

### Patch Changes

- [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.1.0 (2022-09-13)

### Features

- **confirmation-v1:** rename package confirmation-v-1 ([#258](https://github.com/core-ds/core-components/issues/258)) ([195f7a0](https://github.com/core-ds/core-components/commit/195f7a08eeb24bbb9eecf8e62155ec18dbe731d5))
