# @alfalab/core-components-accordion

## 3.0.1

### Patch Changes

<sup><time>05.02.2026</time></sup>

#### [#2047](https://github.com/core-ds/core-components/pull/2047)

- Корректная версия `alfasans`-пакетов в `package.json`

- Обновлены зависимости
    - @alfalab/core-components-shared@2.0.1
    - @alfalab/core-components-typography@6.0.1

## 3.0.0

### Major Changes

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

#### [#1853](https://github.com/core-ds/core-components/pull/1853)

##### Typography

- Исправление атомарного экспорта Text => TypographyText
- Исправление атомарного экспорта Title => TypographyTitle
- Исправление атомарного экспорта TitleResponsive => TypographyTitleResponsive
- Исправление атомарного экспорта TitleMobile => TypographyTitleMobile

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

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Обновление `@alfalab/icons-*` библиотек

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

- Обновлены зависимости
    - @alfalab/core-components-typography@6.0.0
    - @alfalab/core-components-shared@2.0.0

## 2.0.3

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.1
    - @alfalab/core-components-typography@5.0.3

## 2.0.2

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-typography@5.0.2

## 2.0.1

### Patch Changes

<sup><time>26.08.2025</time></sup>

#### [#1820](https://github.com/core-ds/core-components/pull/1820)

- Обновлены `@alfalab/icons-*` пакеты

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.0
    - @alfalab/core-components-typography@5.0.1

## 2.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-shared@1.0.0
    - @alfalab/core-components-typography@5.0.0

## 1.2.15

### Patch Changes

- Обновлены зависимости
    - typography@4.14.3

## 1.2.14

### Patch Changes

- Обновлены зависимости
    - typography@4.14.2

## 1.2.13

### Patch Changes

- Обновлены зависимости
    - typography@4.14.1

## 1.2.12

### Patch Changes

- Обновлены зависимости
    - typography@4.14.0

## 1.2.11

### Patch Changes

- Обновлены зависимости
    - typography@4.13.1

## 1.2.10

### Patch Changes

- Обновлены зависимости
    - typography@4.13.0

## 1.2.9

### Patch Changes

- Обновлены зависимости
    - typography@4.12.0

## 1.2.8

### Patch Changes

- Обновлены зависимости
    - typography@4.11.4

## 1.2.7

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

- Обновление зависимостей

- Обновлены зависимости
    - typography@4.11.3

## 1.2.6

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

- Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

- Обновлены зависимости
    - typography@4.11.2

## 1.2.5

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

- Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1473](https://github.com/core-ds/core-components/pull/1473)

- Переход на атомарные импорты Typography.\[Name] -> \[Name]

- Обновлены зависимости
    - typography@4.11.1

## 1.2.4

### Patch Changes

- Обновлены зависимости
    - typography@4.11.0

## 1.2.3

### Patch Changes

- Обновлены зависимости
    - typography@4.10.3

## 1.2.2

### Patch Changes

- Обновлены зависимости
    - typography@4.10.2

## 1.2.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

- Заменили числовые значения на переменные отступов

- Обновлены зависимости
    - typography@4.10.1

## 1.2.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

- Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

- Обновлены зависимости
    - typography@4.10.0

## 1.1.4

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1353](https://github.com/core-ds/core-components/pull/1353)

- Обновлены наименования переменных отступов

- Обновлены зависимости
    - typography@4.9.0

## 1.1.3

### Patch Changes

<sup><time>23.08.2024</time></sup>

### [#1344](https://github.com/core-ds/core-components/pull/1344)

- Исправление SSR

## 1.1.2

### Patch Changes

- Обновлены зависимости
    - typography@4.8.0

## 1.1.1

### Patch Changes

- Обновлены зависимости
    - typography@4.7.0

## 1.1.0

### Minor Changes

<sup><time>04.07.2024</time></sup>

### [#1274](https://github.com/core-ds/core-components/pull/1274)

- Добавлен проп 'bodyContentClassName'

### Patch Changes

<sup><time>04.07.2024</time></sup>

### [#1274](https://github.com/core-ds/core-components/pull/1274)

- Исправлен расчет высоты контента

## 1.0.2

### Patch Changes

<sup><time>27.06.2024</time></sup>

### [#1250](https://github.com/core-ds/core-components/pull/1250)

- Изменен элемент наблюдения ResizeObserver с contentRef.current на contentCaseRef.current, теперь контейнер контента динамически изменяет высоту при добавлении контента

- Обновлены зависимости
    - typography@4.6.0

## 1.0.1

### Patch Changes

- Обновлены зависимости
    - typography@4.5.1

## 1.0.0

### Major Changes

<sup><time>19.04.2024</time></sup>

### [#1164](https://github.com/core-ds/core-components/pull/1164)

- Добавлен новый компонент Accordion
