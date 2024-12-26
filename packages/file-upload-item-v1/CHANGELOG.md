# Change Log

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
