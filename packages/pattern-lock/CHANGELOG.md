# @alfalab/core-components-pattern-lock

## 2.5.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

-   Обновлены зависимости
    -   button@11.9.0
    -   shared@0.13.0

## 2.4.3

### Patch Changes

-   Обновлены зависимости
    -   button@11.8.0

## 2.4.2

### Patch Changes

-   Обновлены зависимости
    -   button@11.7.1

## 2.4.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   button@11.7.0
    -   shared@0.12.1

## 2.4.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   button@11.6.0

## 2.3.1

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1355](https://github.com/core-ds/core-components/pull/1355)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   button@11.5.5

## 2.3.0

### Minor Changes

<sup><time>16.08.2024</time></sup>

### [#1333](https://github.com/core-ds/core-components/pull/1333)

#### pattern-lock

-   Добавлен пропс `disabled`, который позволяет отключать взаимодействие с компонентом

#### pass-code

-   Добавлен атрибут `title` с описанием кнопки удаления введенных символов
-   Добавлен пропс `rightAddonsTitle`, который позволяет добавлять атрибут `title` для передаваемого аддона

#### toast-plate

-   Добавлены атрибуты для улучшения доступности компонента

#### password-input

-   Добавлен атрибут `title` с описанием кнопки скрытия / показа введенного пароля

## 2.2.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0
    -   button@11.5.4

## 2.2.0

### Minor Changes

<sup><time>19.07.2024</time></sup>

### [#1294](https://github.com/core-ds/core-components/pull/1294)

-   Исправлены отступы компонента
-   Исправлен фоновый цвет компонента на прозрачный

## 2.1.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0
    -   button@11.5.3

## 2.0.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.5.2

## 2.0.0

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

## 1.8.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.11.0
    -   button@11.5.1

## 1.8.0

### Minor Changes

<sup><time>27.06.2024</time></sup>

### [#1258](https://github.com/core-ds/core-components/pull/1258)

-   Заменили устаревшие цветовые токены на актуальные

### Patch Changes

-   Обновлены зависимости
    -   button@11.5.0

## 1.7.4

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

-   Обновлены зависимости
    -   button@11.4.5

## 1.7.3

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовой токен: color-light-graphic-primary -> color-light-neutral-0-inverted

-   Обновлены зависимости
    -   button@11.4.4

## 1.7.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.10.0
    -   button@11.4.3

## 1.7.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.2

## 1.7.0

### Minor Changes

<sup><time>19.04.2024</time></sup>

### [#1163](https://github.com/core-ds/core-components/pull/1163)

-   Обновили версию react-canvas-pattern-lock. Исправили ховер, теперь, если линию не довести до узла, она исчезает

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.1

## 1.6.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.0

## 1.6.0

### Minor Changes

<sup><time>15.03.2024</time></sup>

### [#1122](https://github.com/core-ds/core-components/pull/1122)

-   Добавлены десктопная и адаптивная версии компонента

## 1.5.1

### Patch Changes

-   Обновлены зависимости
    -   gap@1.3.0
    -   button@11.3.0

## 1.5.0

### Minor Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

-   Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

### Patch Changes

-   Обновлены зависимости
    -   button@11.2.0

## 1.4.10

### Patch Changes

-   Обновлены зависимости
    -   shared@0.9.1
    -   button@11.1.1

## 1.4.9

### Patch Changes

-   Обновлены зависимости
    -   button@11.1.0
    -   shared@0.9.0

## 1.4.8

### Patch Changes

-   Обновлены зависимости
    -   button@11.0.0

## 1.4.7

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.2

## 1.4.6

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.1

## 1.4.5

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.0
    -   shared@0.8.0

## 1.4.4

### Patch Changes

-   Обновлены зависимости
    -   button@9.1.0
    -   shared@0.7.0

## 1.4.3

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.6
    -   shared@0.6.0

## 1.4.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.5.0
    -   button@9.0.5

## 1.4.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.4.0
    -   button@9.0.4

## 1.4.0

### Minor Changes

### [#830](https://github.com/core-ds/core-components/pull/830)

-   Добавлен message prop

## 1.3.3

### Patch Changes

-   Обновлены зависимости
    -   shared@0.3.0
    -   button@9.0.3

## 1.3.2

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.2

## 1.3.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.2.0
    -   button@9.0.1

## 1.3.0

### Minor Changes

### [#687](https://github.com/core-ds/core-components/pull/687)

-   Компонент Button заменен на mobile/desktop версии для мобильных и десктопных версий компонентов

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   shared@0.1.0
    -   button@9.0.0
    -   gap@1.2.0

## 1.2.4

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.1
    -   gap@1.1.3

## 1.2.3

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.0

## 1.2.2

### Patch Changes

-   Обновлены зависимости
    -   button@8.4.0

## 1.2.1

### Patch Changes

-   Обновлены зависимости
    -   button@8.3.0

## 1.2.0

### Minor Changes

### [#643](https://github.com/core-ds/core-components/pull/643)

-   Добавлен новый проп extraBounds, за счет которого можно увеличить площадь прослушивания события touchMove

### Patch Changes

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

-   Обновлены зависимости
    -   button@8.2.0

## 1.1.3

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0

## 1.1.2

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   button@8.0.0
    -   gap@1.1.2

## 1.1.1

### Patch Changes

-   Обновлены зависимости
    -   button@7.1.1

## 1.1.0

### Minor Changes

### [#516](https://github.com/core-ds/core-components/pull/516)

-   Добавлена кнопка "Забыли код?"

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   button@7.1.0
    -   gap@1.1.1

## 1.0.3

### Patch Changes

### [#466](https://github.com/core-ds/core-components/pull/466)

-   Обновлена версия библиотеки react-canvas-pattern-lock до 1.0.2

## 1.0.2

### Patch Changes

-   Обновлены зависимости
    -   gap@1.1.0

## 1.0.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   gap@1.0.1

## 1.0.0

### Major Changes

### [#377](https://github.com/core-ds/core-components/pull/377)

-   Добавлен новый компонент PatternLock
