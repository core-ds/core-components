# @alfalab/core-components-universal-modal

## 3.0.0

### Major Changes

<sup><time>04.02.2026</time></sup>

#### [#1638](https://github.com/core-ds/core-components/pull/1638)

##### Button

- Удален `view=link` и `view=ghost`, которые были помечены как `deprecated` в `core-components@45.x.x`
- Удален `view=filled`, который был помечен как `deprecated` в `core-components@21.x.x`
- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `xxs, xs, s, m, l, xl` на `32, 40, 48, 56, 64, 72` соответственно)

<sup><time>04.02.2026</time></sup>

#### [#1635](https://github.com/core-ds/core-components/pull/1635)

##### BaseModal

- Удалён matches полифил для поддержки работы focusLock в ie 11

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

#### [#1851](https://github.com/core-ds/core-components/pull/1851)

##### PortalContext

- Удалён глобальный провайдер `PortalContext`, используйте вместо него актуальный пакет `@alfalab/core-components-config` ([инструкция](?path=/docs/portal--docs))

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

#### [#1672](https://github.com/core-ds/core-components/pull/1672)

##### UniversalModal

- Удалены компоненты для внешнего использования `Arrow` и `Cross`. Данные компоненты остались от промежуточной реализации `UniversalModal`
- Изменена высота по умолчанию для центральной модалки на `hugContent`

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Обновление `@alfalab/icons-*` библиотек

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

<sup><time>04.02.2026</time></sup>

#### [#1899](https://github.com/core-ds/core-components/pull/1899)

- Обновление типов `types/react-transition-group`

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@2.0.0
    - @alfalab/core-components-base-modal@7.0.0
    - @alfalab/core-components-scrollbar@5.0.0
    - @alfalab/core-components-backdrop@5.0.0
    - @alfalab/core-components-shared@2.0.0
    - @alfalab/core-components-mq@6.0.0

## 2.0.12

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.1.6
    - @alfalab/core-components-button@12.1.1

## 2.0.11

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-button@12.1.0
    - @alfalab/core-components-navigation-bar-private@1.1.5

## 2.0.10

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.1.4

## 2.0.9

### Patch Changes

<sup><time>30.12.2025</time></sup>

#### [#1998](https://github.com/core-ds/core-components/pull/1998)

##### UniversalModal

- Увеличена специфичность CSS селектора для `scrollableNode`

- Обновлены зависимости
    - @alfalab/core-components-base-modal@6.1.0

## 2.0.8

### Patch Changes

<sup><time>22.12.2025</time></sup>

#### [#1987](https://github.com/core-ds/core-components/pull/1987)

##### UniversalModal

- Удален неиспользуемый код стилей хэдера
- Небольшие исправления и улучшения кодовой базы хэдера

<sup><time>22.12.2025</time></sup>

#### [#1987](https://github.com/core-ds/core-components/pull/1987)

##### NavigationBarPrivate

- Исправлен trim хэдера, когда часть текста продолжала отображаться под обрезаемой строкой

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.1.3

## 2.0.7

### Patch Changes

<sup><time>08.12.2025</time></sup>

#### [#1963](https://github.com/core-ds/core-components/pull/1963)

##### UniversalModal

Удалены ограничения минимальных размеров

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.1.2

## 2.0.6

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.1
    - @alfalab/core-components-base-modal@6.0.2
    - @alfalab/core-components-button@12.0.2
    - @alfalab/core-components-mq@5.0.2
    - @alfalab/core-components-navigation-bar-private@1.1.1
    - @alfalab/core-components-typography@5.0.3

## 2.0.5

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.1.0

## 2.0.4

### Patch Changes

<sup><time>29.09.2025</time></sup>

#### [#1894](https://github.com/core-ds/core-components/pull/1894)

- Исправлена типизация для `disableFocusLock` пропса

## 2.0.3

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-typography@5.0.2
    - @alfalab/core-components-navigation-bar-private@1.0.2

## 2.0.2

### Patch Changes

<sup><time>29.08.2025</time></sup>

#### [#1838](https://github.com/core-ds/core-components/pull/1838)

- Исправлена типизация. Типы переведены на интерфейсы.

## 2.0.1

### Patch Changes

<sup><time>26.08.2025</time></sup>

#### [#1820](https://github.com/core-ds/core-components/pull/1820)

- Обновлены `@alfalab/icons-*` пакеты

<sup><time>26.08.2025</time></sup>

#### [#1816](https://github.com/core-ds/core-components/pull/1816)

- Исправлено наследование пропса `onClose`. Теперь из аргументов callback функции можно получить event и reason без ts ошибки.

- Обновлены зависимости
    - @alfalab/core-components-navigation-bar-private@1.0.1
    - @alfalab/core-components-shared@1.1.0
    - @alfalab/core-components-base-modal@6.0.1
    - @alfalab/core-components-button@12.0.1
    - @alfalab/core-components-mq@5.0.1
    - @alfalab/core-components-typography@5.0.1

## 2.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-backdrop@4.0.0
    - @alfalab/core-components-base-modal@6.0.0
    - @alfalab/core-components-button@12.0.0
    - @alfalab/core-components-mq@5.0.0
    - @alfalab/core-components-navigation-bar-private@1.0.0
    - @alfalab/core-components-scrollbar@4.0.0
    - @alfalab/core-components-shared@1.0.0
    - @alfalab/core-components-typography@5.0.0

## 1.1.5

### Patch Changes

- Обновлены зависимости
    - shared@0.18.0
    - scrollbar@3.4.0
    - base-modal@5.9.4
    - button@11.11.10
    - navigation-bar-private@0.8.7
    - typography@4.14.3

## 1.1.4

### Patch Changes

<sup><time>17.06.2025</time></sup>

### [#1743](https://github.com/core-ds/core-components/pull/1743)

- Открыт для использования пропс `disableBackdropClick` в десктопной версии

## 1.1.3

### Patch Changes

- Обновлены зависимости
    - base-modal@5.9.3

## 1.1.2

### Patch Changes

- Обновлены зависимости
    - shared@0.17.1
    - base-modal@5.9.2
    - button@11.11.9
    - navigation-bar-private@0.8.6
    - typography@4.14.2

## 1.1.1

### Patch Changes

<sup><time>26.05.2025</time></sup>

### [#1724](https://github.com/core-ds/core-components/pull/1724)

- Исправлены расчеты параметров компонента при передаче responsive header и responsive footer

- Обновлены зависимости
    - typography@4.14.1
    - navigation-bar-private@0.8.5

## 1.1.0

### Minor Changes

<sup><time>23.05.2025</time></sup>

### [#1679](https://github.com/core-ds/core-components/pull/1679)

- Добавлен тип высоты `hugContent` который позволяет фиксировать высоту по содержимому контента
- Изменены механизмы установки размеров `Modal` и `SidePanel`
- Изменены механизмы позиционирования `Modal`
- Исправлены отступы в `ModalMobile`

<sup><time>23.05.2025</time></sup>

### [#1713](https://github.com/core-ds/core-components/pull/1713)

- Добавлен ref пропс (scrollableContainerRef) для контейнера на котором происходит scroll

### Patch Changes

- Обновлены зависимости
    - scrollbar@3.3.0
    - typography@4.14.0
    - navigation-bar-private@0.8.4

## 1.0.8

### Patch Changes

<sup><time>16.05.2025</time></sup>

### [#1703](https://github.com/core-ds/core-components/pull/1703)

- Исправлена типизация опциональных пропсов

- Обновлены зависимости
    - shared@0.17.0
    - base-modal@5.9.1
    - button@11.11.8
    - navigation-bar-private@0.8.3
    - typography@4.13.1

## 1.0.7

### Patch Changes

- Обновлены зависимости
    - typography@4.13.0
    - navigation-bar-private@0.8.2

## 1.0.6

### Patch Changes

<sup><time>14.04.2025</time></sup>

### [#1670](https://github.com/core-ds/core-components/pull/1670)

- Исправлено закрытие `UniversalModalMobile` при использовании пропса `hasCloser`. Теперь не нужно прокидывать `onClose` компоненту `Header`. Хэндлер будет браться с компонента `UniversalModalMobile`.

<sup><time>14.04.2025</time></sup>

### [#1671](https://github.com/core-ds/core-components/pull/1671)

- Исправлен размер левого аддона компонента `Header` для `UniverslaModalMobile`

## 1.0.5

### Patch Changes

<sup><time>11.04.2025</time></sup>

### [#1668](https://github.com/core-ds/core-components/pull/1668)

- Исправлено закрытие модалки при использовании пропса `hasCloser`. Теперь не нужно прокидывать `onClose` компоненту `Header`. Хэндлер будет браться с компонента `UniversalModal`.

- Обновлены зависимости
    - button@11.11.7
    - navigation-bar-private@0.8.1

## 1.0.4

### Patch Changes

<sup><time>28.03.2025</time></sup>

### [#1629](https://github.com/core-ds/core-components/pull/1629)

- Исправили css токен для темной темы

- Обновлены зависимости
    - navigation-bar-private@0.8.0

## 1.0.3

### Patch Changes

- Обновлены зависимости
    - navigation-bar-private@0.7.0

## 1.0.2

### Patch Changes

- Обновлены зависимости
    - button@11.11.6
    - navigation-bar-private@0.6.2

## 1.0.1

### Patch Changes

- Обновлены зависимости
    - typography@4.12.0
    - navigation-bar-private@0.6.1

## 1.0.0

### Major Changes

<sup><time>19.02.2025</time></sup>

### [#1428](https://github.com/core-ds/core-components/pull/1428)

- Добавлен новый компонент `UniversalModal`

### Patch Changes

- Обновлены зависимости
    - scrollbar@3.2.0
    - base-modal@5.9.0
    - shared@0.16.0
    - navigation-bar-private@0.6.0
    - button@11.11.5
