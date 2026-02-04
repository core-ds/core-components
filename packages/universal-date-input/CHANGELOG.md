# @alfalab/core-components-universal-date-input

## 4.0.0

### Major Changes

<sup><time>04.02.2026</time></sup>

#### [#1638](https://github.com/core-ds/core-components/pull/1638)

##### Button

- Удален `view=link` и `view=ghost`, которые были помечены как `deprecated` в `core-components@45.x.x`
- Удален `view=filled`, который был помечен как `deprecated` в `core-components@21.x.x`
- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `xxs, xs, s, m, l, xl` на `32, 40, 48, 56, 64, 72` соответственно)

<sup><time>04.02.2026</time></sup>

#### [#1689](https://github.com/core-ds/core-components/pull/1689)

##### Modal

- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `s, m, l, xl` на `500, 600, 800, 1140` соответственно)
- Удален пропс `fullscreen`, который был отмечен как `deprecated` в `core-components@25.x.x`. Вместо него передавайте `fullscreen` в пропс `size`

<sup><time>04.02.2026</time></sup>

#### [#1685](https://github.com/core-ds/core-components/pull/1685)

##### FromControl

Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `s, m, l, xl` на `48, 56, 64, 72` соответственно)

<sup><time>04.02.2026</time></sup>

#### [#1635](https://github.com/core-ds/core-components/pull/1635)

##### BaseModal

- Удалён matches полифил для поддержки работы focusLock в ie 11

<sup><time>04.02.2026</time></sup>

#### [#1975](https://github.com/core-ds/core-components/pull/1975)

##### Input

- Для `disabled` и `readOnly` состояний добавлено отображение иконки замка

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

#### [#1975](https://github.com/core-ds/core-components/pull/1975)

##### UniversalDateInput

- Для `disabled` и `readOnly` состояний добавлено отображение иконки замка

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

#### [#1841](https://github.com/core-ds/core-components/pull/1841)

- Обновлен `date-fns` до `4` версии

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Обновление `@alfalab/icons-*` библиотек

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

- Обновлены зависимости
    - @alfalab/core-components-calendar@9.0.0
    - @alfalab/core-components-input@17.0.0
    - @alfalab/core-components-popover@8.0.0
    - @alfalab/core-components-shared@2.0.0
    - @alfalab/core-components-mq@6.0.0

## 3.1.1

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.10
    - @alfalab/core-components-input@16.0.5

## 3.1.0

### Minor Changes

<sup><time>23.01.2026</time></sup>

#### [#1947](https://github.com/core-ds/core-components/pull/1947)

##### UniversalDateInput

- Изменены значения border-radius во всех темах на 16px кроме site.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-input@16.0.4
    - @alfalab/core-components-calendar@8.0.9

## 3.0.9

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.8

## 3.0.8

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.7

## 3.0.7

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.6

## 3.0.6

### Patch Changes

<sup><time>08.12.2025</time></sup>

#### [#1959](https://github.com/core-ds/core-components/pull/1959)

##### DateInput

- Исправлено сохранение `lastValidDate` при неполном времени для `view="date-time"`,
  теперь автокоррекция возвращает именно последнюю валидную дату/время вместо `minDate`;

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.5

## 3.0.5

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.1
    - @alfalab/core-components-calendar@8.0.4
    - @alfalab/core-components-input@16.0.3
    - @alfalab/core-components-mq@5.0.2
    - @alfalab/core-components-popover@7.1.1

## 3.0.4

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.3

## 3.0.3

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.2

## 3.0.2

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-input@16.0.2

## 3.0.1

### Patch Changes

<sup><time>26.08.2025</time></sup>

#### [#1820](https://github.com/core-ds/core-components/pull/1820)

- Обновлены `@alfalab/icons-*` пакеты

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.1
    - @alfalab/core-components-input@16.0.1
    - @alfalab/core-components-popover@7.1.0
    - @alfalab/core-components-shared@1.1.0
    - @alfalab/core-components-mq@5.0.1

## 3.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-calendar@8.0.0
    - @alfalab/core-components-input@16.0.0
    - @alfalab/core-components-mq@5.0.0
    - @alfalab/core-components-popover@7.0.0
    - @alfalab/core-components-shared@1.0.0

## 2.8.1

### Patch Changes

- Обновлены зависимости
    - popover@6.4.0

## 2.8.0

### Minor Changes

<sup><time>23.06.2025</time></sup>

### [#1744](https://github.com/core-ds/core-components/pull/1744)

Добавлены пропсы для управления открытием календаря `calendarOpen` и `onCalendarOpenChange`.

Пропсы `onCalendarOpen` и `onCalendarClose` помечены как `deprecated`. Вместо них используйте `onCalendarOpenChange`.

### Patch Changes

<sup><time>23.06.2025</time></sup>

### [#1723](https://github.com/core-ds/core-components/pull/1723)

- Исправлена работа пропса onBlur для date-range варианта при использовании пикера

<sup><time>23.06.2025</time></sup>

### [#1545](https://github.com/core-ds/core-components/pull/1545)

- Исправлена валидация вводимого времени, которая раннее могла приводить к выводу неправильной даты в разных таймзонах

- Обновлены зависимости
    - shared@0.18.0
    - input@15.6.2
    - popover@6.3.11

## 2.7.7

### Patch Changes

- Обновлены зависимости
    - shared@0.17.1
    - input@15.6.1
    - popover@6.3.10

## 2.7.6

### Patch Changes

- Обновлены зависимости
    - input@15.6.0

## 2.7.5

### Patch Changes

- Обновлены зависимости
    - shared@0.17.0
    - input@15.5.5
    - popover@6.3.9

## 2.7.4

### Patch Changes

- Обновлены зависимости
    - input@15.5.4

## 2.7.3

### Patch Changes

- Обновлены зависимости
    - input@15.5.3

## 2.7.2

### Patch Changes

- Обновлены зависимости
    - shared@0.16.0
    - input@15.5.2
    - popover@6.3.8

## 2.7.1

### Patch Changes

- Обновлены зависимости
    - shared@0.15.0
    - input@15.5.1
    - popover@6.3.7

## 2.7.0

### Minor Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

- Добавлен 40 размер

### Patch Changes

- Обновлены зависимости
    - popover@6.3.6
    - input@15.5.0

## 2.6.6

### Patch Changes

- Обновлены зависимости
    - mq@4.4.1
    - input@15.4.0
    - popover@6.3.5
    - shared@0.14.1

## 2.6.5

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

- Вендор classnames обновлён 2.3.1 -> 2.5.1

- Обновлены зависимости
    - input@15.3.4
    - popover@6.3.4

## 2.6.4

### Patch Changes

<sup><time>10.12.2024</time></sup>

### [#1480](https://github.com/core-ds/core-components/pull/1480)

- Добавлено sideEffects: false

- Обновлены зависимости
    - input@15.3.3

## 2.6.3

### Patch Changes

- Обновлены зависимости
    - mq@4.4.0
    - input@15.3.2

## 2.6.2

### Patch Changes

- Обновлены зависимости
    - shared@0.14.0
    - input@15.3.1
    - popover@6.3.3

## 2.6.1

### Patch Changes

- Обновлены зависимости
    - input@15.3.0

## 2.6.0

### Minor Changes

<sup><time>24.10.2024</time></sup>

### [#1387](https://github.com/core-ds/core-components/pull/1387)

- Обновление темы corp

### Patch Changes

- Обновлены зависимости
    - input@15.2.1

## 2.5.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

- Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

- Обновлены зависимости
    - input@15.2.0
    - shared@0.13.0
    - popover@6.3.2

## 2.4.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1386](https://github.com/core-ds/core-components/pull/1386)

- Откат обновления темизации corp из версии 47.16.0

### Patch Changes

- Обновлены зависимости
    - input@15.1.3

## 2.3.1

### Patch Changes

- Обновлены зависимости
    - input@15.1.2

## 2.3.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1360](https://github.com/core-ds/core-components/pull/1360)

- Обновление темы corp

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

- Обновлены наименования переменных скругления

- Обновлены зависимости
    - input@15.1.1
    - popover@6.3.1
    - shared@0.12.1

## 2.2.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

- Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

- Обновлены зависимости
    - input@15.1.0
    - popover@6.3.0

## 2.1.8

### Patch Changes

- Обновлены зависимости
    - input@15.0.5

## 2.1.7

### Patch Changes

- Обновлены зависимости
    - shared@0.12.0
    - input@15.0.4
    - popover@6.2.5

## 2.1.6

### Patch Changes

- Обновлены зависимости
    - input@15.0.3

## 2.1.5

### Patch Changes

- Обновлены зависимости
    - mq@4.3.0
    - input@15.0.2

## 2.1.4

### Patch Changes

- Обновлены зависимости
    - input@15.0.1

## 2.1.3

### Patch Changes

- Обновлены зависимости
    - input@15.0.0
    - popover@6.2.4

## 2.1.2

### Patch Changes

- Обновлены зависимости
    - shared@0.11.0
    - popover@6.2.3
    - input@14.4.7

## 2.1.1

### Patch Changes

- Обновлены зависимости
    - input@14.4.6

## 2.1.0

### Minor Changes

<sup><time>14.06.2024</time></sup>

### [#1220](https://github.com/core-ds/core-components/pull/1220)

- Добавлена поддержка формата мм.гггг

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

- Добавлен параметр displayName для корректного отображения компонентов в React Devtools

- Обновлены зависимости
    - input@14.4.5
    - popover@6.2.2

## 2.0.10

### Patch Changes

- Обновлены зависимости
    - input@14.4.4

## 2.0.9

### Patch Changes

- Обновлены зависимости
    - shared@0.10.0
    - input@14.4.3

## 2.0.8

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1214](https://github.com/core-ds/core-components/pull/1214)

- Добавлена возможность обработки строковых значений для отображения даты

<sup><time>24.05.2024</time></sup>

### [#1218](https://github.com/core-ds/core-components/pull/1218)

- Исправлен выбор даты на мобильных устройствах

- Обновлены зависимости
    - input@14.4.2

## 2.0.7

### Patch Changes

- Обновлены зависимости
    - input@14.4.1

## 2.0.6

### Patch Changes

- Обновлены зависимости
    - input@14.4.0

## 2.0.5

### Patch Changes

<sup><time>19.04.2024</time></sup>

### [#1170](https://github.com/core-ds/core-components/pull/1170)

- Устранена проблема, из-за которой невозможно было установить год раньше 1971

- Обновлены зависимости
    - input@14.3.3

## 2.0.4

### Patch Changes

<sup><time>08.04.2024</time></sup>

### [#1162](https://github.com/core-ds/core-components/pull/1162)

- Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено

## 2.0.3

### Patch Changes

- Обновлены зависимости
    - input@14.3.2

## 2.0.2

### Patch Changes

- Обновлены зависимости
    - input@14.3.1

## 2.0.1

### Patch Changes

<sup><time>04.03.2024</time></sup>

### [#1110](https://github.com/core-ds/core-components/pull/1110)

- Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено

## 2.0.0

### Major Changes

<sup><time>12.02.2024</time></sup>

### [#1041](https://github.com/core-ds/core-components/pull/1041)

- Переименованы свойства. onChange стал называться onInputChange, onComplete стал называться onChange
- Изменены типы свойств value и onChange.
- Исправлена ошибка из-за которой onChange не вызывался в момент очистки инпута

## Миграция с предыдущей версии

- Меняем onChange на onInputChange. (но от использования onInputChange лучше отказаться, если не нужно посимвольно контролировать пользовательский ввод).
- Меняем onComplete на onChange. (Это основной обработчик. Вызывается в момент, когда дата введена полностью, либо полностью стерта. Первый аргумент - дата(или диапазон дат), второй - значение инпута).
- value теперь принимает дату(диапазон дат в случае view=data-range), а не строку как раньше.

Примеры всегда можно посмотреть в [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/universaldateinput--docs)

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

- Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

### Patch Changes

- Обновлены зависимости
    - input@14.3.0

## 1.5.0

### Minor Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

- Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

### Patch Changes

### [#1074](https://github.com/core-ds/core-components/pull/1074)

- Исправлена ошибка с выбором диапазона дат. (Если dateFrom была равна dateTo и после этого выбиралась меньшая дата, то получался некорректный диапазон, в котором dateTo < dateFrom)

- Обновлены зависимости
    - input@14.2.0

## 1.4.2

### Patch Changes

- Обновлены зависимости
    - input@14.1.2

## 1.4.1

### Patch Changes

- Обновлены зависимости
    - shared@0.9.1
    - input@14.1.1

## 1.4.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

- Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

- Обновлены зависимости
    - popover@6.2.1
    - input@14.1.0
    - shared@0.9.0

## 1.3.1

### Patch Changes

- Обновлены зависимости
    - input@14.0.1

## 1.3.0

### Minor Changes

### [#992](https://github.com/core-ds/core-components/pull/992)

- В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

- Обновлены зависимости
    - popover@6.2.0
    - input@14.0.0

## 1.2.3

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

- Немного изменена структура файлов в пакетах для корректной сборки в vite

- Обновлены зависимости
    - input@13.0.2

## 1.2.2

### Patch Changes

### [#970](https://github.com/core-ds/core-components/pull/970)

- Исправлен размер иконки календаря

## 1.2.1

### Patch Changes

- Обновлены зависимости
    - input@13.0.1

## 1.2.0

### Minor Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

- В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

- Обновлены зависимости
    - input@13.0.0
    - shared@0.8.0

## 1.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

- Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

- Обновлены зависимости
    - input@12.3.0
    - shared@0.7.0

## 1.0.1

### Patch Changes

### [#884](https://github.com/core-ds/core-components/pull/884)

- Добавлен атрибут autocomplete='off'

- Обновлены зависимости
    - input@12.2.1
    - shared@0.6.0

## 1.0.0

### Major Changes

### [#858](https://github.com/core-ds/core-components/pull/858)

- Добавлен новый компонент UniversalDateInput

### Patch Changes

- Обновлены зависимости
    - input@12.2.0
