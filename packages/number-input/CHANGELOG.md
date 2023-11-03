# @alfalab/core-components-number-input

## 2.0.0

### Major Changes

### [#901](https://github.com/core-ds/core-components/pull/901)

-   Изменен тип коллбэка onChange, теперь в payload приходит только число
-   Добавлены пропы min, max
-   Удален prop allowSign. Теперь, чтобы появилась возможность вводить знак "-", достаточно указать min < 0
-   Добавлен проп step.
-   Удален StepperInput, используйте вместо него NumberInput с пропом step

# Миграция с предыдущей версии

-   Заменить onChange с (event, {value, valueString}) на (event, {value}).
-   allowSign был удален, знак "+" больше указать невозможно. "-" можно указать по-умолчанию.
    Чтобы запретить указывать знак "-", достаточно передать проп min={0}
-   <StepperInput .../> нужно заменить на <NumberInput step={1} .../>

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.0
    -   icon-button@6.4.0
    -   shared@0.8.0

## 1.3.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

-   Обновлены зависимости
    -   input@12.3.0

## 1.2.6

### Patch Changes

-   Обновлены зависимости
    -   input@12.2.1

## 1.2.5

### Patch Changes

-   Обновлены зависимости
    -   input@12.2.0

## 1.2.4

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.4

## 1.2.3

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.3

## 1.2.2

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.2

## 1.2.1

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.1

## 1.2.0

### Minor Changes

### [#817](https://github.com/core-ds/core-components/pull/817)

-   Добавлена мобильная и десктопная версия компонента

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.0

## 1.1.2

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.2

## 1.1.1

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.1

## 1.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.0

## 1.0.16

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   input@11.1.18

## 1.0.15

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.17

## 1.0.14

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.16

## 1.0.13

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.15

## 1.0.12

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.14

## 1.0.11

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.13

## 1.0.10

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.12

## 1.0.9

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.11

## 1.0.8

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.10

## 1.0.7

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   input@11.1.9

## 1.0.6

### Patch Changes

### [#565](https://github.com/core-ds/core-components/pull/565)

-   Исправлена ошибка, из-за которой не вызывался onChange, если было передано недопустимое значение

## 1.0.5

### Patch Changes

### [#564](https://github.com/core-ds/core-components/pull/564)

-   Значение value при сбросе изменено на null

## 1.0.4

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.8

## 1.0.3

### Patch Changes

### [#517](https://github.com/core-ds/core-components/pull/517)

-   Изменили внутренний компонент с MaskedInput на Input

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   input@11.1.7

## 1.0.2

### Patch Changes

-   Обновлены зависимости
    -   masked-input@6.1.6

## 1.0.1

### Patch Changes

-   Обновлены зависимости
    -   masked-input@6.1.5

## 1.0.0

### Major Changes

### [#455](https://github.com/core-ds/core-components/pull/455)

-   Добавлен новый компонент NumberInput
