# @alfalab/core-components-shared

## 1.1.0

### Minor Changes

<sup><time>26.08.2025</time></sup>

#### [#1823](https://github.com/core-ds/core-components/pull/1823)

-   Добавлена функция `humanFileSize`, с помощью которой можно переводить байты в человеко-читаемый вид

## 1.0.0

### Major Changes

<sup><time>05.08.2025</time></sup>

#### [#1611](https://github.com/core-ds/core-components/pull/1611)

Обновлена сборка.

Добавлены пропущенные зависимости.

Синхронизированы версии зависимостей.

### Patch Changes

-   Обновлены зависимости
    -   @alfalab/core-components-types@1.0.0

## 0.18.0

### Minor Changes

<sup><time>23.06.2025</time></sup>

### [#1740](https://github.com/core-ds/core-components/pull/1740)

-   Добавлена проверка `isMaskitoMask`

## 0.17.1

### Patch Changes

<sup><time>27.05.2025</time></sup>

### [#1718](https://github.com/core-ds/core-components/pull/1718)

-   Добавлена поддержка и преобразование argb в rgba у функции get-color-var

## 0.17.0

### Minor Changes

<sup><time>16.05.2025</time></sup>

### [#1697](https://github.com/core-ds/core-components/pull/1697)

-   Добавлена утилита get-color-var

## 0.16.0

### Minor Changes

<sup><time>19.02.2025</time></sup>

### [#1428](https://github.com/core-ds/core-components/pull/1428)

-   Добавлена проверка в os -> isMacOS
-   Добавлена проверка в browser -> isSafari

## 0.15.0

### Minor Changes

<sup><time>07.02.2025</time></sup>

### [#1533](https://github.com/core-ds/core-components/pull/1533)

-   Исправлено автозаполнение номера в Safari 18

## 0.14.1

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1509](https://github.com/core-ds/core-components/pull/1509)

-   Добавлено "sideEffects": false, чтобы бандлер лучше делал тришейк.

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

-   Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

## 0.14.0

### Minor Changes

<sup><time>18.11.2024</time></sup>

### [#1332](https://github.com/core-ds/core-components/pull/1332)

Крупное обновление Спиннера

-   Обновленный вид спиннера.
-   Добавлены новые пропсы для тонкой настройки внешнего вида:
    -   `preset` - преднастроенный вариант спиннера;
    -   `size` - теперь отвечает за размер кольца спиннера;
    -   `lineWidth` - толщина линии спиннера;
    -   `style` - позволяет регулировать отступы, цвет и т.п.
-   Добавлен [`codemod`](https://www.npmjs.com/package/@alfalab/core-components-codemod/v/2.7.0) для бесшовной миграции `Spinner`:
    ```bash
    npx @alfalab/core-components-codemod --transformers=spinner --glob='src/**/*.tsx'
    ```
    | Внимание                                                                                                                                                                                           |
    | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `codemod` может не работать в случаях использования [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) в коде. |

## 0.13.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

## 0.12.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1368](https://github.com/core-ds/core-components/pull/1368)

-   Исправлен расчет высоты списка опций

## 0.12.0

### Minor Changes

<sup><time>13.08.2024</time></sup>

### [#1320](https://github.com/core-ds/core-components/pull/1320)

-   Добавлена функция автозаполнения номера телефона. Для сохранения кода страны при автозаполнении (актуально для Safari) используйте `clearableCountryCode={'preserve'}`, при этом код страны можно удалить как и в случае `clearableCountryCode={true}`.

## 0.11.0

### Minor Changes

<sup><time>28.06.2024</time></sup>

### [#1215](https://github.com/core-ds/core-components/pull/1215)

-   Добавлена возможность переопределять рендер контейнер для группы элементов использующих Portal

## 0.10.0

### Minor Changes

<sup><time>28.05.2024</time></sup>

### [#1158](https://github.com/core-ds/core-components/pull/1158)

-   В toast-plate компоненте badge заменен на status-badge
-   Добавлена возможность принимать кастомные иконки для status-badge

## Миграция для toast-plate компонента

-   Добавлены изменения в пропс getBadgeIcons. Теперь он будет принимать объект в виде:

```
{
  'positive-checkmark': {
      24: AScoresCircleMIcon,
  },
  'negative-cross': {
    ...
  },
}
```

-   `'negative' | 'positive' | 'attention'` - `@deprеcated`
    Их по-прежнему можно передавать в пропс `badge` (компоненты toast, toast-plate, notification), под капотом они автоматически преобразуютеся в `'negative-cross' | 'positive-checkmark' | 'attention-alert'` соответственно

## 0.9.1

### Patch Changes

### [#1039](https://github.com/core-ds/core-components/pull/1039)

-   Исправлены типы getDataTestId функции

## 0.9.0

### Minor Changes

### [#1011](https://github.com/core-ds/core-components/pull/1011)

-   Добавлена функция preventDefault

## 0.8.0

### Minor Changes

### [#901](https://github.com/core-ds/core-components/pull/901)

-   Добавлена isIOS функция

## 0.7.0

### Minor Changes

### [#940](https://github.com/core-ds/core-components/pull/940)

-   getScrollbarSize перенесена в shared

## 0.6.0

### Minor Changes

### [#887](https://github.com/core-ds/core-components/pull/887)

-   **BREAKING CHANGE:** Удалена функция disableUserInput

## 0.5.0

### Minor Changes

### [#825](https://github.com/core-ds/core-components/pull/825)

-   Добавлены утилиты для работы с маской

## 0.4.0

### Minor Changes

### [#837](https://github.com/core-ds/core-components/pull/837)

-   Добавлена функция isNil

## 0.3.0

### Minor Changes

### [#817](https://github.com/core-ds/core-components/pull/817)

-   Добавлена утилита disableUserInput

## 0.2.0

### Minor Changes

### [#790](https://github.com/core-ds/core-components/pull/790)

-   Добавлена функция createPaddingStyle

### [#791](https://github.com/core-ds/core-components/pull/791)

-   Добавлена easeInOutQuad функция

## 0.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Новый пакет с общими утилитами и т.п
