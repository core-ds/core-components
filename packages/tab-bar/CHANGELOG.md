# Change Log

## 2.1.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   typography@4.10.1
    -   indicator@2.2.1
    -   shared@0.12.1

## 2.1.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   indicator@2.2.0
    -   typography@4.10.0

## 2.0.8

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   typography@4.9.0
    -   indicator@2.1.1

## 2.0.7

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0

## 2.0.6

### Patch Changes

-   Обновлены зависимости
    -   typography@4.8.0

## 2.0.5

### Patch Changes

-   Обновлены зависимости
    -   typography@4.7.0

## 2.0.4

### Patch Changes

-   Обновлены зависимости
    -   shared@0.11.0

## 2.0.3

### Patch Changes

-   Обновлены зависимости
    -   indicator@2.1.0
    -   typography@4.6.0

## 2.0.2

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

-   Обновлены зависимости
    -   indicator@2.0.2

## 2.0.1

### Patch Changes

-   Обновлены зависимости
    -   indicator@2.0.1

## 2.0.0

### Major Changes

<sup><time>28.05.2024</time></sup>

### [#1114](https://github.com/core-ds/core-components/pull/1114)

-   Изменили компонент, отвечающий за индикатор таба с Badge на Indicator. Следовательно, изменился тип свойства indicatorProps с BadgeProps на IndicatorProps

## Миграция с предыдущей версии

-   Для того чтобы передать значение в индикатор необходимо заменить content на value. Например: indicatorProps: { content: 100 } -> indicatorProps: { value: 100 }

### Minor Changes

<sup><time>28.05.2024</time></sup>

### [#1114](https://github.com/core-ds/core-components/pull/1114)

-   Добавили новые props accentColor и bgColor, отвечающие за цвет активного таба и фон соответственно

### Patch Changes

-   Обновлены зависимости
    -   shared@0.10.0
    -   typography@4.5.1

## 1.1.0

### Minor Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

-   Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

### Patch Changes

-   Обновлены зависимости
    -   typography@4.5.0

## 1.0.3

### Patch Changes

### [#1044](https://github.com/core-ds/core-components/pull/1044)

-   Добавлена css-переменная для токена фона

-   Обновлены зависимости
    -   badge@5.5.1

## 1.0.2

### Patch Changes

-   Обновлены зависимости
    -   typography@4.4.0
    -   shared@0.9.1

## 1.0.1

### Patch Changes

-   Обновлены зависимости
    -   typography@4.3.0
    -   badge@5.5.0
    -   shared@0.9.0

## 1.0.0

### Major Changes

### [#969](https://github.com/core-ds/core-components/pull/969)

-   Добавлен новый компонент TabBar

### Patch Changes

-   Обновлены зависимости
    -   badge@5.4.0
    -   typography@4.2.1
