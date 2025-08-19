# @alfalab/core-components-pattern-lock-v1

## 2.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

-   Обновлены зависимости
    -   @alfalab/core-components-button@12.0.0
    -   @alfalab/core-components-mq@5.0.0
    -   @alfalab/core-components-shared@1.0.0

## 1.1.18

### Patch Changes

-   Обновлены зависимости
    -   shared@0.18.0
    -   button@11.11.10

## 1.1.17

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.1
    -   button@11.11.9

## 1.1.16

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.0
    -   button@11.11.8

## 1.1.15

### Patch Changes

-   Обновлены зависимости
    -   button@11.11.7

## 1.1.14

### Patch Changes

-   Обновлены зависимости
    -   button@11.11.6

## 1.1.13

### Patch Changes

-   Обновлены зависимости
    -   shared@0.16.0
    -   button@11.11.5

## 1.1.12

### Patch Changes

-   Обновлены зависимости
    -   shared@0.15.0
    -   button@11.11.4

## 1.1.11

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

-   Обновлены зависимости
    -   button@11.11.3

## 1.1.10

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1509](https://github.com/core-ds/core-components/pull/1509)

-   Добавлено "sideEffects": false, чтобы бандлер лучше делал тришейк.

-   Обновлены зависимости
    -   mq@4.4.1
    -   shared@0.14.1
    -   button@11.11.2

## 1.1.9

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

-   Обновлены зависимости
    -   button@11.11.1

## 1.1.8

### Patch Changes

-   Обновлены зависимости
    -   button@11.11.0

## 1.1.7

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0
    -   button@11.10.2

## 1.1.6

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0
    -   button@11.10.1

## 1.1.5

### Patch Changes

-   Обновлены зависимости
    -   button@11.10.0

## 1.1.4

### Patch Changes

-   Обновлены зависимости
    -   button@11.9.0
    -   shared@0.13.0

## 1.1.3

### Patch Changes

-   Обновлены зависимости
    -   button@11.8.0

## 1.1.2

### Patch Changes

-   Обновлены зависимости
    -   button@11.7.1

## 1.1.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   button@11.7.0
    -   shared@0.12.1

## 1.1.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   button@11.6.0

## 1.0.4

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1355](https://github.com/core-ds/core-components/pull/1355)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   button@11.5.5

## 1.0.3

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0
    -   button@11.5.4

## 1.0.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0
    -   button@11.5.3

## 1.0.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.5.2

## 1.0.0

### Major Changes

<sup><time>28.06.2024</time></sup>

### [#1233](https://github.com/core-ds/core-components/pull/1233)

Редизайн компонентов PassCode и PatternLock

-   Внесены изменения в адаптивность
-   Удалены пропсы для вывода кастомных сообщений и ошибок
    Эти исправления уменьшили габариты компонентов, что позволит упростить работу с их размещением на странице

## Обновление

Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До

```js
import { PassCode } from '@alfalab/core-components/pass-code';
import { PatternLock } from '@alfalab/core-components/pattern-lock';
```

После

```js
import { PassCodeV1 } from '@alfalab/core-components/pass-code-v1';
import { PatternLockV1 } from '@alfalab/core-components/pattern-lock-v1';
```

Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.
