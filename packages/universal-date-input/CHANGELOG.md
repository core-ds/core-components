# @alfalab/core-components-universal-date-input

## 2.0.1

### Patch Changes

<sup><time>04.03.2024</time></sup>

### [#1110](https://github.com/core-ds/core-components/pull/1110)

-   Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено

## 2.0.0

### Major Changes

<sup><time>12.02.2024</time></sup>

### [#1041](https://github.com/core-ds/core-components/pull/1041)

-   Переименованы свойства. onChange стал называться onInputChange, onComplete стал называться onChange
-   Изменены типы свойств value и onChange.
-   Исправлена ошибка из-за которой onChange не вызывался в момент очистки инпута

## Миграция с предыдущей версии

-   Меняем onChange на onInputChange. (но от использования onInputChange лучше отказаться, если не нужно посимвольно контролировать пользовательский ввод).
-   Меняем onComplete на onChange. (Это основной обработчик. Вызывается в момент, когда дата введена полностью, либо полностью стерта. Первый аргумент - дата(или диапазон дат), второй - значение инпута).
-   value теперь принимает дату(диапазон дат в случае view=data-range), а не строку как раньше.

Примеры всегда можно посмотреть в [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/universaldateinput--docs)

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

-   Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

### Patch Changes

-   Обновлены зависимости
    -   input@14.3.0

## 1.5.0

### Minor Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

-   Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

### Patch Changes

### [#1074](https://github.com/core-ds/core-components/pull/1074)

-   Исправлена ошибка с выбором диапазона дат. (Если dateFrom была равна dateTo и после этого выбиралась меньшая дата, то получался некорректный диапазон, в котором dateTo < dateFrom)

-   Обновлены зависимости
    -   input@14.2.0

## 1.4.2

### Patch Changes

-   Обновлены зависимости
    -   input@14.1.2

## 1.4.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.9.1
    -   input@14.1.1

## 1.4.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   popover@6.2.1
    -   input@14.1.0
    -   shared@0.9.0

## 1.3.1

### Patch Changes

-   Обновлены зависимости
    -   input@14.0.1

## 1.3.0

### Minor Changes

### [#992](https://github.com/core-ds/core-components/pull/992)

-   В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

-   Обновлены зависимости
    -   popover@6.2.0
    -   input@14.0.0

## 1.2.3

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

-   Обновлены зависимости
    -   input@13.0.2

## 1.2.2

### Patch Changes

### [#970](https://github.com/core-ds/core-components/pull/970)

-   Исправлен размер иконки календаря

## 1.2.1

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.1

## 1.2.0

### Minor Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.0
    -   shared@0.8.0

## 1.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

-   Обновлены зависимости
    -   input@12.3.0
    -   shared@0.7.0

## 1.0.1

### Patch Changes

### [#884](https://github.com/core-ds/core-components/pull/884)

-   Добавлен атрибут autocomplete='off'

-   Обновлены зависимости
    -   input@12.2.1
    -   shared@0.6.0

## 1.0.0

### Major Changes

### [#858](https://github.com/core-ds/core-components/pull/858)

-   Добавлен новый компонент UniversalDateInput

### Patch Changes

-   Обновлены зависимости
    -   input@12.2.0
