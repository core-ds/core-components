# @alfalab/core-components-date-time-input

## 3.1.6

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.3.1
    -   icon-button@6.0.10
    -   input@11.1.12

## 3.1.5

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.3.0
    -   input@11.1.11

## 3.1.4

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.10
    -   calendar@6.2.18

## 3.1.3

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.17

## 3.1.2

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.16

## 3.1.1

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   calendar@6.2.15
    -   icon-button@6.0.9
    -   input@11.1.9
    -   popover@6.0.8

## 3.1.0

### Minor Changes

### [#579](https://github.com/core-ds/core-components/pull/579)

-   Добавлены новые правила форматирования для DateInput, DateRangeInput, DateTimeInput

## 3.0.13

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.14

## 3.0.12

### Patch Changes

### [#557](https://github.com/core-ds/core-components/pull/557)

-   Добавлены бордеры у выпадающих меню

## 3.0.11

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.13

## 3.0.10

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.12

## 3.0.9

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.11
    -   icon-button@6.0.8
    -   input@11.1.8

## 3.0.8

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.10

## 3.0.7

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

### [#522](https://github.com/core-ds/core-components/pull/522)

-   Исправлена TS ошибка "ref does not exist on type"

-   Обновлены зависимости
    -   calendar@6.2.9
    -   icon-button@6.0.7
    -   input@11.1.7
    -   popover@6.0.7

## 3.0.6

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.8
    -   icon-button@6.0.6
    -   input@11.1.6

## 3.0.5

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.7
    -   icon-button@6.0.5
    -   input@11.1.5

## 3.0.4

### Patch Changes

-   Обновлены зависимости
    -   popover@6.0.6
    -   calendar@6.2.6

## 3.0.3

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.5

## 3.0.2

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.4
    -   icon-button@6.0.4
    -   input@11.1.4

## 3.0.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3
    -   calendar@6.2.3

## 3.0.0

### Major Changes

### [#393](https://github.com/core-ds/core-components/pull/393)

-   Исправлен borderRadius у календаря
-   Исправлена ошибка, из-за которой коллбэки onChange и onComplete в компоненте DateTimeInput не вызывались, если даты выбиралась с помощью календаря<br />
-   В компоненте DateTimeInput изменена типизация onChange и onComplete коллбэков. Теперь event опциональный, так как при выборе даты в пикере ChangeEvent в инпуте не происходит<br />
-   В компоненте DateTimeInput исправлена ошибка, из-за которой не подставлялось время после закрытия мобильного календаря<br />
-   В компоненте DateRangeInput исправлены ошибки, из-за которых в коллбэке onComplete передавалось неверное значение value и при полной очистке инпута период в календаре не сбрасывался<br />

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.2
    -   input@11.1.3

## 2.2.1

### Patch Changes

### [#422](https://github.com/core-ds/core-components/pull/422)

-   "export" типов заменен на "export type"

-   Обновлены зависимости
    -   input@11.1.2
    -   calendar@6.2.1

## 2.2.0

### Minor Changes

### [#334](https://github.com/core-ds/core-components/pull/334)

-   В компонентах DateRangeInput, DateTimeInput и CalendarInput добавлены mobile и desktop версии компонентов. Название компонентов было изменено по схеме Component → ComponentDesktop
-   В компонентах Calendar и InputAutocomplete добавлена responsive версия компонентов. Название компонентов было изменено по схеме Component → ComponentResponsive<br />
-   В компонентах PickerButton и Tooltip добавлен новый пропс breakpoint. Название компонентов было изменено по схеме Component -→ ComponentResponsive для PickerButton и Component → ComponentDesktop для Tooltip<br />
-   В компонентах Confirmation и SidePanel добавлен новый пропс breakpoint<br />

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   calendar@6.2.0
    -   icon-button@6.0.2
    -   input@11.1.1
    -   popover@6.0.5

## 2.1.3

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.1.15

## 2.1.2

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.1.14

## 2.1.1

### Patch Changes

-   Обновлены зависимости
    -   popover@6.0.4
    -   calendar@6.1.13

## 2.1.0

### Minor Changes

### [#342](https://github.com/core-ds/core-components/pull/342)

-   В компонентах Gallery и Input иконки подгружаемые с 'alfabank.servicecdn.ru' были заменены на иконки из icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.0
    -   calendar@6.1.12

## 2.0.2

### Patch Changes

-   Обновлены зависимости
    -   popover@6.0.3
    -   calendar@6.1.11
    -   input@11.0.2
    -   icon-button@6.0.1

## 2.0.1

### Patch Changes

### [#320](https://github.com/core-ds/core-components/pull/320)

-   Скрыт нативный спиннер (стрелочки) у компонента Input при type='number'

-   Обновлены зависимости
    -   input@11.0.1
    -   calendar@6.1.10

## 2.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.0
    -   input@11.0.0
    -   calendar@6.1.9

## 1.1.4

### Patch Changes

-   Обновлены зависимости
    -   input@10.2.5
    -   calendar@6.1.8
    -   popover@6.0.2

## 1.1.3

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.1.7

## 1.1.2

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)
-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-calendar@6.1.6
    -   @alfalab/core-components-icon-button@5.0.5
    -   @alfalab/core-components-input@10.2.4

## 1.1.1

### Patch Changes

-   Updated dependencies [[#208](https://github.com/core-ds/core-components/pull/208)]
    -   @alfalab/core-components-calendar@6.1.5
    -   @alfalab/core-components-input@10.2.3

## 1.1.0

### Minor Changes

-   [#175](https://github.com/core-ds/core-components/pull/175): Новые компоненты: TimeInput, DateTimeInput, DateRangeInput. Thanks [@blackraydev](https://github.com/blackraydev)

### Patch Changes

-   Updated dependencies [[#175](https://github.com/core-ds/core-components/pull/175)]
    -   @alfalab/core-components-calendar@6.1.4
