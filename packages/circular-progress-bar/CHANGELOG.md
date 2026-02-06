# @alfalab/core-components-circular-progress-bar

## 5.0.1

### Patch Changes

<sup><time>05.02.2026</time></sup>

#### [#2047](https://github.com/core-ds/core-components/pull/2047)

- Корректная версия `alfasans`-пакетов в `package.json`

- Обновлены зависимости
    - @alfalab/core-components-shared@2.0.1
    - @alfalab/core-components-typography@6.0.1

## 5.0.0

### Major Changes

<sup><time>04.02.2026</time></sup>

#### [#1989](https://github.com/core-ds/core-components/pull/1989)

##### Typography.{Text,Title,TitleMobile}

- Проп `font` помечен как `deprecated`
- Проп `font`, значения которого включает в себя `"alfasans"`, не имеет эффекта для шрифта `Alfa Interface Sans`, но для него сохраняется обратная совместимость по следующему принципу:
    - для компонента `Text`:
        1. для значения `font="alfasans"` соотвествует системный шрифт
    - для компонентов `Title` и `TitleMobile`:
        1. для значения `font="alfasans"` соотвествует шрифт `Styrene`
        2. для значения `font={ font: 'alfasans', systemCompat: boolean }` в зависимости от значения параметра `systemCompat`: `true` - системный шрифт, `false` - шрифт `Styrene`
- Для использования компонентов `Typography.{Text,Title,TitleMobile}` со шрифтом `Alfa Interface Sans` необходимо установить соответствующий пакет (пакеты)

<sup><time>04.02.2026</time></sup>

#### [#1853](https://github.com/core-ds/core-components/pull/1853)

##### Typography

- Исправление атомарного экспорта Text => TypographyText
- Исправление атомарного экспорта Title => TypographyTitle
- Исправление атомарного экспорта TitleResponsive => TypographyTitleResponsive
- Исправление атомарного экспорта TitleMobile => TypographyTitleMobile

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

#### [#1575](https://github.com/core-ds/core-components/pull/1575)

##### Typography

- Удален тип пропса `view` - `component`. Используйте `component-primary`

<sup><time>04.02.2026</time></sup>

#### [#1989](https://github.com/core-ds/core-components/pull/1989)

- Добавлен вариант пакета со шрифтом `Alfa Interface Sans`

<sup><time>04.02.2026</time></sup>

#### [#1648](https://github.com/core-ds/core-components/pull/1648)

##### CircularProgressBar

- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x`

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

- Обновлены зависимости
    - @alfalab/core-components-typography@6.0.0
    - @alfalab/core-components-shared@2.0.0

## 4.0.3

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.1
    - @alfalab/core-components-typography@5.0.3

## 4.0.2

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-typography@5.0.2

## 4.0.1

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.0
    - @alfalab/core-components-typography@5.0.1

## 4.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.0.0
    - @alfalab/core-components-typography@5.0.0

## 3.9.4

### Patch Changes

- Обновлены зависимости
    - shared@0.18.0
    - typography@4.14.3

## 3.9.3

### Patch Changes

- Обновлены зависимости
    - shared@0.17.1
    - typography@4.14.2

## 3.9.2

### Patch Changes

- Обновлены зависимости
    - typography@4.14.1

## 3.9.1

### Patch Changes

- Обновлены зависимости
    - typography@4.14.0

## 3.9.0

### Minor Changes

<sup><time>16.05.2025</time></sup>

### [#1700](https://github.com/core-ds/core-components/pull/1700)

- Добавлен callback на завершение таймера

### Patch Changes

- Обновлены зависимости
    - shared@0.17.0
    - typography@4.13.1

## 3.8.3

### Patch Changes

- Обновлены зависимости
    - typography@4.13.0

## 3.8.2

### Patch Changes

- Обновлены зависимости
    - typography@4.12.0

## 3.8.1

### Patch Changes

- Обновлены зависимости
    - shared@0.16.0

## 3.8.0

### Minor Changes

<sup><time>18.02.2025</time></sup>

### [#1584](https://github.com/core-ds/core-components/pull/1584)

- Обновление зависимостей

## 3.7.0

### Minor Changes

<sup><time>14.02.2025</time></sup>

### [#1538](https://github.com/core-ds/core-components/pull/1538)

- Добавлен размер 96
- Добавлен пропс для изменения цвета заголовка `titleColor`
- Добавлен пропс для изменения цвета подзаголовка `subtitleColor`
- Добавлен пропс `timer` который переводит компонент в режим таймера

## 3.6.8

### Patch Changes

- Обновлены зависимости
    - typography@4.11.4

## 3.6.7

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

- Обновление зависимостей

- Обновлены зависимости
    - typography@4.11.3

## 3.6.6

### Patch Changes

- Обновлены зависимости
    - typography@4.11.2

## 3.6.5

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

- Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1486](https://github.com/core-ds/core-components/pull/1486)

- Добавлены sideEffects: false. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 2.

<sup><time>13.12.2024</time></sup>

### [#1473](https://github.com/core-ds/core-components/pull/1473)

- Переход на атомарные импорты Typography.\[Name] -> \[Name]

- Обновлены зависимости
    - typography@4.11.1

## 3.6.4

### Patch Changes

- Обновлены зависимости
    - typography@4.11.0

## 3.6.3

### Patch Changes

- Обновлены зависимости
    - typography@4.10.3

## 3.6.2

### Patch Changes

- Обновлены зависимости
    - typography@4.10.2

## 3.6.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

- Заменили числовые значения на переменные отступов

- Обновлены зависимости
    - typography@4.10.1

## 3.6.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

- Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

- Обновлены зависимости
    - typography@4.10.0

## 3.5.6

### Patch Changes

- Обновлены зависимости
    - typography@4.9.0

## 3.5.5

### Patch Changes

- Обновлены зависимости
    - typography@4.8.0

## 3.5.4

### Patch Changes

- Обновлены зависимости
    - typography@4.7.0

## 3.5.3

### Patch Changes

- Обновлены зависимости
    - typography@4.6.0

## 3.5.2

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

- Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 3.5.1

### Patch Changes

- Обновлены зависимости
    - typography@4.5.1

## 3.5.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1025](https://github.com/core-ds/core-components/pull/1025)

- Добавлены новые способы указать размеры - 24, 48, 64, 80, 128, 144. Буквенные значения размеров xs, s, m, l, xl, xxl теперь deprecated, используйте вместо них 24, 48, 64, 80, 128, 144 соответственно

## 3.4.3

### Patch Changes

- Обновлены зависимости
    - typography@4.5.0

## 3.4.2

### Patch Changes

- Обновлены зависимости
    - typography@4.4.0

## 3.4.1

### Patch Changes

- Обновлены зависимости
    - typography@4.3.0

## 3.4.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

- В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

- Обновлены зависимости
    - typography@4.2.1

## 3.3.1

### Patch Changes

- Обновлены зависимости
    - typography@4.2.0

## 3.3.0

### Minor Changes

### [#878](https://github.com/core-ds/core-components/pull/878)

- Добавлена новая пропса strokeColor

## 3.2.0

### Minor Changes

### [#808](https://github.com/core-ds/core-components/pull/808)

- Добавлены новые пропсы progressStrokeColor и circleColor

## 3.1.1

### Patch Changes

- Обновлены зависимости
    - typography@4.1.0

## 3.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

- Теперь каждый пакет публикуется с исходниками

### Patch Changes

- Обновлены зависимости
    - typography@4.0.0

## 3.0.13

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

- Удален скрипт отправки статистики (send-stats)

- Обновлены зависимости
    - typography@3.2.2

## 3.0.12

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

- Добавлен \_\_esModule в cjs экспорт

- Обновлены зависимости
    - typography@3.2.1

## 3.0.11

### Patch Changes

- Обновлены зависимости
    - typography@3.2.0

## 3.0.10

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

- В зависимости добавлена библиотека tslib

- Обновлены зависимости
    - typography@3.1.1

## 3.0.9

### Patch Changes

- Обновлены зависимости
    - typography@3.1.0

## 3.0.8

### Patch Changes

- Обновлены зависимости
    - typography@3.0.8

## 3.0.7

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

- Исправлена проблема с default-импортом в cjs форматах

- Обновлены зависимости
    - typography@3.0.7

## 3.0.6

### Patch Changes

- Обновлены зависимости
    - typography@3.0.6

## 3.0.5

### Patch Changes

- Обновлены зависимости
    - typography@3.0.5

## 3.0.4

### Patch Changes

- Обновлены зависимости
    - typography@3.0.4

## 3.0.3

### Patch Changes

- Обновлены зависимости
    - typography@3.0.3

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@3.0.1...@alfalab/core-components-circular-progress-bar@3.0.2) (2022-09-01)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@3.0.0...@alfalab/core-components-circular-progress-bar@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.6.1...@alfalab/core-components-circular-progress-bar@3.0.0) (2022-08-17)

### Features

- removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

- Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
  директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.6.0...@alfalab/core-components-circular-progress-bar@2.6.1) (2022-08-17)

### Bug Fixes

- returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.5.0...@alfalab/core-components-circular-progress-bar@2.6.0) (2022-08-04)

### Features

- react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.4.3...@alfalab/core-components-circular-progress-bar@2.5.0) (2022-07-22)

### Features

- **circular-progress-bar:** added new sizes and props ([#122](https://github.com/core-ds/core-components/issues/122)) ([9b1c412](https://github.com/core-ds/core-components/commit/9b1c4126aabc516349655a51c6302d6af84aa129))

## [2.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.4.2...@alfalab/core-components-circular-progress-bar@2.4.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [2.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.4.1...@alfalab/core-components-circular-progress-bar@2.4.2) (2022-07-15)

### Bug Fixes

- bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.4.0...@alfalab/core-components-circular-progress-bar@2.4.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.3.4...@alfalab/core-components-circular-progress-bar@2.4.0) (2022-06-28)

### Features

- circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [2.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.3.0...@alfalab/core-components-circular-progress-bar@2.3.1) (2022-03-30)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.2.1...@alfalab/core-components-circular-progress-bar@2.3.0) (2022-03-05)

### Features

- **circular-progress-bar:** ReactNode as title or subtitle ([#1023](https://github.com/core-ds/core-components/issues/1023)) ([7ae6df9](https://github.com/core-ds/core-components/commit/7ae6df9d2e4253f9a94532d155e81032cd96c810))

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.2.0...@alfalab/core-components-circular-progress-bar@2.2.1) (2022-03-03)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.1.1...@alfalab/core-components-circular-progress-bar@2.2.0) (2022-03-01)

### Features

- Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.1.0...@alfalab/core-components-circular-progress-bar@2.1.1) (2022-01-17)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.0.3...@alfalab/core-components-circular-progress-bar@2.1.0) (2021-11-30)

### Features

- **circular-progress-bar:** new size S ([d34db5c](https://github.com/core-ds/core-components/commit/d34db5cca682bc63f948a0dad322604c8044a6b8))

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.0.2...@alfalab/core-components-circular-progress-bar@2.0.3) (2021-09-14)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.0.1...@alfalab/core-components-circular-progress-bar@2.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@2.0.0...@alfalab/core-components-circular-progress-bar@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.11...@alfalab/core-components-circular-progress-bar@2.0.0) (2021-07-08)

### Features

- upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.2.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.10...@alfalab/core-components-circular-progress-bar@1.2.11) (2021-06-28)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.9...@alfalab/core-components-circular-progress-bar@1.2.10) (2021-06-04)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.8...@alfalab/core-components-circular-progress-bar@1.2.9) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.7...@alfalab/core-components-circular-progress-bar@1.2.8) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.5...@alfalab/core-components-circular-progress-bar@1.2.7) (2021-03-18)

### Bug Fixes

- one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.3...@alfalab/core-components-circular-progress-bar@1.2.5) (2021-03-16)

### Bug Fixes

- border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [1.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.2...@alfalab/core-components-circular-progress-bar@1.2.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.1...@alfalab/core-components-circular-progress-bar@1.2.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar

## [1.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-circular-progress-bar@1.2.0...@alfalab/core-components-circular-progress-bar@1.2.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-circular-progress-bar
