# @alfalab/core-components-pattern-lock-v1

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
