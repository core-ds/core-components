# @alfalab/core-components-universal-modal

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
