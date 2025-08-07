# @alfalab/core-components-date-range-input

## 2.2.7

### Patch Changes

### [#1804](https://github.com/core-ds/core-components/pull/1804)

-   Удален `postinstall` скрипт

-   Обновлены зависимости
    -   calendar@6.2.7
    -   icon-button@6.0.5
    -   input@11.1.5
    -   popover@6.0.7

## 2.2.6

### Patch Changes

-   Обновлены зависимости
    -   popover@6.0.6
    -   calendar@6.2.6

## 2.2.5

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.5

## 2.2.4

### Patch Changes

-   Обновлены зависимости
    -   calendar@6.2.4
    -   icon-button@6.0.4
    -   input@11.1.4

## 2.2.3

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3
    -   calendar@6.2.3

## 2.2.2

### Patch Changes

### [#393](https://github.com/core-ds/core-components/pull/393)

-   Исправлен borderRadius у календаря
-   Исправлена ошибка, из-за которой коллбэки onChange и onComplete в компоненте DateTimeInput не вызывались, если даты выбиралась с помощью календаря<br />
-   В компоненте DateTimeInput изменена типизация onChange и onComplete коллбэков. Теперь event опциональный, так как при выборе даты в пикере ChangeEvent в инпуте не происходит<br />
-   В компоненте DateTimeInput исправлена ошибка, из-за которой не подставлялось время после закрытия мобильного календаря<br />
-   В компоненте DateRangeInput исправлены ошибки, из-за которых в коллбэке onComplete передавалось неверное значение value и при полной очистке инпута период в календаре не сбрасывался<br />

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
