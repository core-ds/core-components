# @alfalab/core-components-gap

## 1.4.2

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 1.4.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 1.4.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 1.3.1

### Patch Changes

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

## 1.3.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1037](https://github.com/core-ds/core-components/pull/1037)

-   Добавлены новые способы указать размеры - 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 128, 256. Буквенные значения размеров 3xs, 2xs, xs, s, m, l, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl теперь deprecated, используйте вместо них 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 128, 256 соответственно

## 1.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 1.1.3

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 1.1.2

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 1.1.1

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 1.1.0

### Minor Changes

### [#419](https://github.com/core-ds/core-components/pull/419)

-   Добавлен новый компонент GenericWrapper. Исправлено поведение компонента Gap для flex лейаута

## 1.0.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 1.0.0

### Major Changes

### [#339](https://github.com/core-ds/core-components/pull/339)

-   Добавлен новый компонент Gap
