# @alfalab/core-components-international-phone-input

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

#### [#1645](https://github.com/core-ds/core-components/pull/1645)

##### Checkbox

- Удален пропс `inactive`, который был помечен как `deprecated` в `core-components@43.x.x`
- Удалены буквенные размеры компонента, которые были отмечены как `deprecated` в `core-components@44.x.x` (замените `s, m` на `20 и 24` соответственно)

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

##### Select

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

#### [#2009](https://github.com/core-ds/core-components/pull/2009)

##### InternationalPhoneInput, InternationalPhoneInput{Desktop,Mobile}

- Удалены `deprecated` значения пропа `size`. Для перехода используйте следующие соответствия:
    - `'s'` -> `48`
    - `'m'` -> `56`
    - `'l'` -> `64`
    - `'xl'` -> `72`

<sup><time>04.02.2026</time></sup>

#### [#1975](https://github.com/core-ds/core-components/pull/1975)

##### InternationalPhoneInput

- Для `disabled` и `readOnly` состояний добавлено отображение иконки замка

<sup><time>04.02.2026</time></sup>

#### [#1636](https://github.com/core-ds/core-components/pull/1636)

##### BottomSheet

- Удален пропс `ignoreScreenChange`, который был объявлен как `deprecated` в `core-components@29.x.x`

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

#### [#1975](https://github.com/core-ds/core-components/pull/1975)

##### InputAutocomplete

- Для `disabled` и `readOnly` состояний добавлено отображение иконки замка

### Patch Changes

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Обновление `@alfalab/icons-*` библиотек

<sup><time>04.02.2026</time></sup>

#### [#1899](https://github.com/core-ds/core-components/pull/1899)

##### InternationalPhoneInput

- Исправлена `autoComplete` ошибка

<sup><time>04.02.2026</time></sup>

#### [#1898](https://github.com/core-ds/core-components/pull/1898)

- Добавлена поддержка `React@19.0.0`

- Обновлены зависимости
    - @alfalab/core-components-select@19.0.0
    - @alfalab/core-components-input@17.0.0
    - @alfalab/core-components-input-autocomplete@14.0.0
    - @alfalab/core-components-shared@2.0.0
    - @alfalab/core-components-mq@6.0.0
    - @alfalab/core-components-types@2.0.0

## 3.2.9

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-input@16.0.5
    - @alfalab/core-components-select@18.2.9
    - @alfalab/core-components-input-autocomplete@13.1.1

## 3.2.8

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.8
    - @alfalab/core-components-input@16.0.4
    - @alfalab/core-components-input-autocomplete@13.1.0

## 3.2.7

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.7
    - @alfalab/core-components-input-autocomplete@13.0.10

## 3.2.6

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.6
    - @alfalab/core-components-input-autocomplete@13.0.9

## 3.2.5

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.5
    - @alfalab/core-components-input-autocomplete@13.0.8

## 3.2.4

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.4
    - @alfalab/core-components-input-autocomplete@13.0.7

## 3.2.3

### Patch Changes

<sup><time>13.11.2025</time></sup>

#### [#1943](https://github.com/core-ds/core-components/pull/1943)

##### InternationalPhoneInput:

- Исправлена передача проп `autocomplete` на корректный `autoComplete`
- Проп `autoFill` помечен как `deprecated` и будет удален в следующей мажорной версии

<sup><time>13.11.2025</time></sup>

#### [#1943](https://github.com/core-ds/core-components/pull/1943)

##### InternationalPhoneInput:

- Исправлено автозаполнение номера для Safari 26 в режиме `clearableCountryCode='preserve'`

- Обновлены зависимости
    - @alfalab/core-components-shared@1.1.1
    - @alfalab/core-components-input@16.0.3
    - @alfalab/core-components-input-autocomplete@13.0.6
    - @alfalab/core-components-mq@5.0.2
    - @alfalab/core-components-select@18.2.3

## 3.2.2

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.2
    - @alfalab/core-components-input-autocomplete@13.0.5

## 3.2.1

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-input-autocomplete@13.0.4
    - @alfalab/core-components-select@18.2.1

## 3.2.0

### Minor Changes

<sup><time>19.09.2025</time></sup>

#### [#1885](https://github.com/core-ds/core-components/pull/1885)

- Добавлена поддержка aria-label для улучшения доступности в компонентах InternationalPhoneInput и Select

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-select@18.2.0
    - @alfalab/core-components-input-autocomplete@13.0.3

## 3.1.1

### Patch Changes

- Обновлены зависимости
    - @alfalab/core-components-input-autocomplete@13.0.2
    - @alfalab/core-components-input@16.0.2
    - @alfalab/core-components-select@18.1.0

## 3.1.0

### Minor Changes

<sup><time>26.08.2025</time></sup>

#### [#1829](https://github.com/core-ds/core-components/pull/1829)

- Добавлен проп `autoFill` для включения/выключения автозаполнения номера

### Patch Changes

<sup><time>26.08.2025</time></sup>

#### [#1820](https://github.com/core-ds/core-components/pull/1820)

- Обновлены `@alfalab/icons-*` пакеты

- Обновлены зависимости
    - @alfalab/core-components-input@16.0.1
    - @alfalab/core-components-select@18.0.1
    - @alfalab/core-components-shared@1.1.0
    - @alfalab/core-components-input-autocomplete@13.0.1
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
    - @alfalab/core-components-input@16.0.0
    - @alfalab/core-components-input-autocomplete@13.0.0
    - @alfalab/core-components-mq@5.0.0
    - @alfalab/core-components-select@18.0.0
    - @alfalab/core-components-shared@1.0.0
    - @alfalab/core-components-types@1.0.0

## 2.8.0

### Minor Changes

<sup><time>04.08.2025</time></sup>

### [#1764](https://github.com/core-ds/core-components/pull/1764)

- Наличие язычка никак не влияет на возможность закрыть штору свайпом. Для управления видимостью язычка теперь используется проп showSwipeMarker.
- Видимость язычка влияет на высоту шапки: если язычка нет — высота шапки становится меньше.

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.10.0
    - select@17.24.0

## 2.7.21

### Patch Changes

- Обновлены зависимости
    - select@17.23.0
    - input-autocomplete@12.9.9

## 2.7.20

### Patch Changes

- Обновлены зависимости
    - select@17.22.0
    - input-autocomplete@12.9.8

## 2.7.19

### Patch Changes

- Обновлены зависимости
    - select@17.21.5
    - input-autocomplete@12.9.7

## 2.7.18

### Patch Changes

<sup><time>23.06.2025</time></sup>

### [#1644](https://github.com/core-ds/core-components/pull/1644)

- Для размера XL горизонтальные паддинги исправлены на 16px в соответствии с дизайном

- Обновлены зависимости
    - select@17.21.4
    - shared@0.18.0
    - input-autocomplete@12.9.6
    - input@15.6.2

## 2.7.17

### Patch Changes

<sup><time>30.05.2025</time></sup>

### [#1722](https://github.com/core-ds/core-components/pull/1722)

- Убран не используемый проп onClear(обработчик можно пробросить в inputProps)

- Обновлены зависимости
    - select@17.21.3
    - input-autocomplete@12.9.5

## 2.7.16

### Patch Changes

- Обновлены зависимости
    - shared@0.17.1
    - input@15.6.1
    - input-autocomplete@12.9.4
    - select@17.21.2

## 2.7.15

### Patch Changes

- Обновлены зависимости
    - select@17.21.1
    - input-autocomplete@12.9.3

## 2.7.14

### Patch Changes

<sup><time>23.05.2025</time></sup>

### [#1709](https://github.com/core-ds/core-components/pull/1709)

- Улучшен механизм угадывания страны по пользовательскому вводу

- Обновлены зависимости
    - select@17.21.0
    - input@15.6.0
    - input-autocomplete@12.9.2

## 2.7.13

### Patch Changes

- Обновлены зависимости
    - shared@0.17.0
    - input@15.5.5
    - input-autocomplete@12.9.1
    - select@17.20.14

## 2.7.12

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.9.0
    - select@17.20.13

## 2.7.11

### Patch Changes

- Обновлены зависимости
    - select@17.20.12
    - input-autocomplete@12.8.9

## 2.7.10

### Patch Changes

- Обновлены зависимости
    - input@15.5.4
    - select@17.20.11
    - input-autocomplete@12.8.8

## 2.7.9

### Patch Changes

- Обновлены зависимости
    - select@17.20.10
    - input-autocomplete@12.8.7

## 2.7.8

### Patch Changes

- Обновлены зависимости
    - select@17.20.9
    - input-autocomplete@12.8.6

## 2.7.7

### Patch Changes

- Обновлены зависимости
    - select@17.20.8
    - input-autocomplete@12.8.5
    - input@15.5.3

## 2.7.6

### Patch Changes

- Обновлены зависимости
    - select@17.20.7
    - input-autocomplete@12.8.4

## 2.7.5

### Patch Changes

- Обновлены зависимости
    - shared@0.16.0
    - select@17.20.6
    - input@15.5.2
    - input-autocomplete@12.8.3

## 2.7.4

### Patch Changes

- Обновлены зависимости
    - select@17.20.5
    - input-autocomplete@12.8.2

## 2.7.3

### Patch Changes

- Обновлены зависимости
    - select@17.20.4
    - input-autocomplete@12.8.1

## 2.7.2

### Patch Changes

<sup><time>07.02.2025</time></sup>

### [#1533](https://github.com/core-ds/core-components/pull/1533)

- Исправлено автозаполнение номера в Safari 18

- Обновлены зависимости
    - select@17.20.3
    - shared@0.15.0
    - input-autocomplete@12.8.0
    - input@15.5.1

## 2.7.1

### Patch Changes

- Обновлены зависимости
    - select@17.20.2
    - input-autocomplete@12.7.3

## 2.7.0

### Minor Changes

<sup><time>05.02.2025</time></sup>

### [#1566](https://github.com/core-ds/core-components/pull/1566)

- Экспорт массива countriesData и его типа (для модификации по месту использования)

## 2.6.0

### Minor Changes

<sup><time>04.02.2025</time></sup>

### [#1562](https://github.com/core-ds/core-components/pull/1562)

- добавлен опциональный проп customCountriesList, который можно использовать, чтобы переопределить дефолтный массив country-data

## 2.5.10

### Patch Changes

- Обновлены зависимости
    - select@17.20.1
    - input-autocomplete@12.7.2

## 2.5.9

### Patch Changes

- Обновлены зависимости
    - select@17.20.0
    - input-autocomplete@12.7.1

## 2.5.8

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

- Обновление зависимостей

- Обновлены зависимости
    - input@15.5.0
    - input-autocomplete@12.7.0
    - select@17.19.0

## 2.5.7

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

- Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

- Обновлены зависимости
    - mq@4.4.1
    - input@15.4.0
    - select@17.18.1
    - shared@0.14.1
    - input-autocomplete@12.6.9

## 2.5.6

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

- Вендор classnames обновлён 2.3.1 -> 2.5.1

- Обновлены зависимости
    - input-autocomplete@12.6.8
    - input@15.3.4
    - select@17.18.0

## 2.5.5

### Patch Changes

<sup><time>10.12.2024</time></sup>

### [#1480](https://github.com/core-ds/core-components/pull/1480)

- Добавлено sideEffects: false

- Обновлены зависимости
    - input@15.3.3
    - input-autocomplete@12.6.7
    - select@17.17.5

## 2.5.4

### Patch Changes

- Обновлены зависимости
    - select@17.17.4
    - input-autocomplete@12.6.6

## 2.5.3

### Patch Changes

- Обновлены зависимости
    - mq@4.4.0
    - input@15.3.2
    - input-autocomplete@12.6.5
    - select@17.17.3

## 2.5.2

### Patch Changes

- Обновлены зависимости
    - shared@0.14.0
    - input@15.3.1
    - input-autocomplete@12.6.4
    - select@17.17.2

## 2.5.1

### Patch Changes

- Обновлены зависимости
    - select@17.17.1
    - input-autocomplete@12.6.3

## 2.5.0

### Minor Changes

<sup><time>11.11.2024</time></sup>

### [#1437](https://github.com/core-ds/core-components/pull/1437)

- Добавлены телефонные коды для Абхазии

### Patch Changes

- Обновлены зависимости
    - input@15.3.0
    - select@17.17.0
    - input-autocomplete@12.6.2

## 2.4.1

### Patch Changes

- Обновлены зависимости
    - select@17.16.1
    - input-autocomplete@12.6.1

## 2.4.0

### Minor Changes

<sup><time>24.10.2024</time></sup>

### [#1387](https://github.com/core-ds/core-components/pull/1387)

- Обновление темы corp

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.6.0
    - select@17.16.0
    - input@15.2.1

## 2.3.5

### Patch Changes

- Обновлены зависимости
    - select@17.15.2
    - input-autocomplete@12.5.5

## 2.3.4

### Patch Changes

- Обновлены зависимости
    - select@17.15.1
    - input-autocomplete@12.5.4

## 2.3.3

### Patch Changes

- Обновлены зависимости
    - select@17.15.0
    - input-autocomplete@12.5.3

## 2.3.2

### Patch Changes

- Обновлены зависимости
    - select@17.14.2
    - input-autocomplete@12.5.2

## 2.3.1

### Patch Changes

- Обновлены зависимости
    - select@17.14.1
    - input-autocomplete@12.5.1

## 2.3.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

- Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.5.0
    - input@15.2.0
    - select@17.14.0
    - shared@0.13.0

## 2.2.3

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.4.0
    - select@17.13.0
    - input@15.1.3

## 2.2.2

### Patch Changes

- Обновлены зависимости
    - input@15.1.2
    - select@17.12.1
    - input-autocomplete@12.3.1

## 2.2.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

- Заменили числовые значения на переменные отступов

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

- Обновлены наименования переменных скругления

- Обновлены зависимости
    - select@17.12.0
    - input-autocomplete@12.3.0
    - input@15.1.1
    - shared@0.12.1

## 2.2.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

- Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

- Обновлены зависимости
    - input@15.1.0
    - input-autocomplete@12.2.0
    - select@17.11.0

## 2.1.3

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1354](https://github.com/core-ds/core-components/pull/1354)

- Обновлены наименования переменных отступов

- Обновлены зависимости
    - input@15.0.5
    - select@17.10.1
    - input-autocomplete@12.1.20

## 2.1.2

### Patch Changes

- Обновлены зависимости
    - select@17.10.0
    - input-autocomplete@12.1.19

## 2.1.1

### Patch Changes

- Обновлены зависимости
    - select@17.9.0
    - input-autocomplete@12.1.18

## 2.1.0

### Minor Changes

<sup><time>13.08.2024</time></sup>

### [#1320](https://github.com/core-ds/core-components/pull/1320)

- Добавлена функция автозаполнения номера телефона. Для сохранения кода страны при автозаполнении (актуально для Safari) используйте `clearableCountryCode={'preserve'}`, при этом код страны можно удалить как и в случае `clearableCountryCode={true}`.

### Patch Changes

- Обновлены зависимости
    - shared@0.12.0
    - input@15.0.4
    - input-autocomplete@12.1.17
    - select@17.8.5

## 2.0.24

### Patch Changes

- Обновлены зависимости
    - input@15.0.3
    - input-autocomplete@12.1.16
    - select@17.8.4

## 2.0.23

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.1.15
    - select@17.8.3

## 2.0.22

### Patch Changes

- Обновлены зависимости
    - select@17.8.2
    - mq@4.3.0
    - input-autocomplete@12.1.14
    - input@15.0.2

## 2.0.21

### Patch Changes

- Обновлены зависимости
    - select@17.8.1
    - input-autocomplete@12.1.13
    - input@15.0.1

## 2.0.20

### Patch Changes

<sup><time>04.07.2024</time></sup>

### [#1226](https://github.com/core-ds/core-components/pull/1226)

- SVG флагов оптимизированны по размеру, с сохранением качества графики.

## 2.0.19

### Patch Changes

- Обновлены зависимости
    - select@17.8.0
    - input-autocomplete@12.1.12

## 2.0.18

### Patch Changes

- Обновлены зависимости
    - input@15.0.0
    - input-autocomplete@12.1.11
    - select@17.7.2

## 2.0.17

### Patch Changes

- Обновлены зависимости
    - shared@0.11.0
    - input@14.4.7
    - input-autocomplete@12.1.10
    - select@17.7.1

## 2.0.16

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.1.9
    - select@17.7.0
    - input@14.4.6

## 2.0.15

### Patch Changes

- Обновлены зависимости
    - select@17.6.1
    - input-autocomplete@12.1.8

## 2.0.14

### Patch Changes

- Обновлены зависимости
    - select@17.6.0
    - input-autocomplete@12.1.7

## 2.0.13

### Patch Changes

- Обновлены зависимости
    - select@17.5.1
    - input-autocomplete@12.1.6

## 2.0.12

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

- Добавлен параметр displayName для корректного отображения компонентов в React Devtools

- Обновлены зависимости
    - input@14.4.5
    - input-autocomplete@12.1.5
    - select@17.5.0

## 2.0.11

### Patch Changes

- Обновлены зависимости
    - input@14.4.4
    - select@17.4.5
    - input-autocomplete@12.1.4

## 2.0.10

### Patch Changes

- Обновлены зависимости
    - shared@0.10.0
    - select@17.4.4
    - input@14.4.3
    - input-autocomplete@12.1.3

## 2.0.9

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.1.2
    - input@14.4.2
    - select@17.4.3

## 2.0.8

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.1.1
    - input@14.4.1
    - select@17.4.2

## 2.0.7

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.1.0
    - input@14.4.0
    - select@17.4.1

## 2.0.6

### Patch Changes

<sup><time>19.04.2024</time></sup>

### [#1151](https://github.com/core-ds/core-components/pull/1151)

- Исправлена логика закрытия селекта с номерами телефонов при включенном автокомплите. Теперь при переключении между селектами выбора страны и выбора номера телефона, селекты закрываются, а не перекрывают друг друга

- Обновлены зависимости
    - select@17.4.0
    - input-autocomplete@12.0.6
    - input@14.3.3

## 2.0.5

### Patch Changes

- Обновлены зависимости
    - select@17.3.5
    - input-autocomplete@12.0.5

## 2.0.4

### Patch Changes

<sup><time>22.03.2024</time></sup>

### [#1142](https://github.com/core-ds/core-components/pull/1142)

- Изменили название стран с английского на русский язык

- Обновлены зависимости
    - select@17.3.4
    - input-autocomplete@12.0.4
    - input@14.3.2

## 2.0.3

### Patch Changes

<sup><time>15.03.2024</time></sup>

### [#1126](https://github.com/core-ds/core-components/pull/1126)

- Добавлены флаги для следующих стран: Caribbean Netherlands, Cyprus, French Guiana, Guadeloupe, Guyana, Kuwait, Malaysia, New Caledonia, Réunion, São Tomé and Príncipe

- Обновлены зависимости
    - input@14.3.1
    - input-autocomplete@12.0.3
    - select@17.3.3

## 2.0.2

### Patch Changes

- Обновлены зависимости
    - select@17.3.2
    - input-autocomplete@12.0.2

## 2.0.1

### Patch Changes

<sup><time>04.03.2024</time></sup>

### [#1092](https://github.com/core-ds/core-components/pull/1092)

- Теперь, если пользователь удаляет номер телефона с помощью кнопки "очистить" (крестика), то выбранный флаг сбрасывается на флаг страны по умолчанию (если задан defaultIso2) или на заглушку - флаг страны не выбран. Ранее, после удаления номера с помощью кнопки "очистить", оставался последний выбранный флаг
- Если код страны не найден и установлено свойство defaultIso2, то теперь будет отображаться заглушка - флаг страны не выбран. Раньше оставался дефолтный флаг

- Обновлены зависимости
    - select@17.3.1
    - input-autocomplete@12.0.1

## 2.0.0

### Major Changes

<sup><time>12.02.2024</time></sup>

### [#1043](https://github.com/core-ds/core-components/pull/1043)

- Тип onChange коллбэка заменен на (value: string) => void

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

- Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@12.0.0
    - input@14.3.0
    - select@17.3.0

## 1.4.0

### Minor Changes

### [#1083](https://github.com/core-ds/core-components/pull/1083)

- Добавлен вызов функции onClear из inputProps

### Patch Changes

- Обновлены зависимости
    - select@17.2.1
    - input-autocomplete@11.4.1

## 1.3.3

### Patch Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

- Добавили возможность передавать dataTestId в компонент выбора страны и props в input (error, rightAddons).
- Добавлены функции getInternationalPhoneInputDesktopTestIds и getInternationalPhoneInputMobileTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

- Обновлены зависимости
    - input@14.2.0
    - select@17.2.0
    - input-autocomplete@11.4.0

## 1.3.2

### Patch Changes

- Обновлены зависимости
    - input@14.1.2
    - select@17.1.2
    - input-autocomplete@11.3.4

## 1.3.1

### Patch Changes

- Обновлены зависимости
    - shared@0.9.1
    - select@17.1.1
    - input@14.1.1
    - input-autocomplete@11.3.3

## 1.3.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

- Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

- Обновлены зависимости
    - select@17.1.0
    - input@14.1.0
    - shared@0.9.0
    - input-autocomplete@11.3.2

## 1.2.7

### Patch Changes

- Обновлены зависимости
    - input@14.0.1
    - input-autocomplete@11.3.1
    - select@17.0.1

## 1.2.6

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@11.3.0

## 1.2.5

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@11.2.0

## 1.2.4

### Patch Changes

- Обновлены зависимости
    - select@17.0.0
    - input@14.0.0
    - input-autocomplete@11.1.0

## 1.2.3

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

- Немного изменена структура файлов в пакетах для корректной сборки в vite

- Обновлены зависимости
    - input@13.0.2
    - input-autocomplete@11.0.3
    - select@16.0.3

## 1.2.2

### Patch Changes

- Обновлены зависимости
    - select@16.0.2
    - input-autocomplete@11.0.2

## 1.2.1

### Patch Changes

- Обновлены зависимости
    - input@13.0.1
    - select@16.0.1
    - input-autocomplete@11.0.1

## 1.2.0

### Minor Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

- В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@11.0.0
    - select@16.0.0
    - input@13.0.0
    - shared@0.8.0

## 1.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

- Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

- Обновлены зависимости
    - input@12.3.0
    - input-autocomplete@10.3.0
    - select@15.3.0
    - shared@0.7.0

## 1.0.4

### Patch Changes

- Обновлены зависимости
    - select@15.2.3
    - input-autocomplete@10.2.3

## 1.0.3

### Patch Changes

- Обновлены зависимости
    - select@15.2.2
    - input-autocomplete@10.2.2

## 1.0.2

### Patch Changes

### [#900](https://github.com/core-ds/core-components/pull/900)

- Исправлен формат номера телефона (удалены скобки и тире)

- Обновлены зависимости
    - input-autocomplete@10.2.1
    - select@15.2.1
    - input@12.2.1
    - shared@0.6.0

## 1.0.1

### Patch Changes

- Обновлены зависимости
    - input@12.2.0
    - input-autocomplete@10.2.0
    - select@15.2.0

## 1.0.0

### Major Changes

### [#825](https://github.com/core-ds/core-components/pull/825)

- Добавлен новый компонент InternationalPhoneInput

### Patch Changes

- Обновлены зависимости
    - input-autocomplete@10.1.6
    - shared@0.5.0
    - input@12.1.4
    - select@15.1.6
