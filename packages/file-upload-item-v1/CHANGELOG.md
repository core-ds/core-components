# @alfalab/core-components-file-upload-item-v1

## 2.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

-   Обновлены зависимости
    -   @alfalab/core-components-icon-button@7.0.0
    -   @alfalab/core-components-link@6.0.0
    -   @alfalab/core-components-spinner@5.0.0

## 1.0.12

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.9
    -   icon-button@6.11.13

## 1.0.11

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.8
    -   icon-button@6.11.12

## 1.0.10

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.7
    -   icon-button@6.11.11

## 1.0.9

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.6
    -   icon-button@6.11.10

## 1.0.8

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.9

## 1.0.7

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.5
    -   icon-button@6.11.8

## 1.0.6

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.4
    -   icon-button@6.11.7

## 1.0.5

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

-   Обновлены зависимости
    -   icon-button@6.11.6
    -   link@5.3.4
    -   spinner@4.0.3

## 1.0.4

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1497](https://github.com/core-ds/core-components/pull/1497)

-   Добавлено sideEffects: false (package.json)

-   Обновлены зависимости
    -   icon-button@6.11.5
    -   link@5.3.3
    -   spinner@4.0.2

## 1.0.3

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

-   Обновлены зависимости
    -   icon-button@6.11.4
    -   link@5.3.2
    -   spinner@4.0.1

## 1.0.2

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.3

## 1.0.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.2

## 1.0.0

### Major Changes

<sup><time>18.11.2024</time></sup>

### [#1379](https://github.com/core-ds/core-components/pull/1379)

Добавлен новый компонент. Старый помечен как `deprecated`.

#### Обновление

Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До

```js
import { FileUploadItem } from '@alfalab/core-components/file-upload-item';
```

После

```js
import { FileUploadItemV1 } from '@alfalab/core-components/file-upload-item-v1';
```

Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.0
    -   icon-button@6.11.1
