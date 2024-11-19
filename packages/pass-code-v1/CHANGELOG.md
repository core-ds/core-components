# @alfalab/core-components-pass-code-v1

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
    -   gap@1.4.0

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

### Patch Changes

-   Обновлены зависимости
    -   gap@1.3.1
