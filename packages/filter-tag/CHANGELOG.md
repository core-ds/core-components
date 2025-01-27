# Change Log

## 5.8.5

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 5.8.4

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

-   Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

-   Обновлены зависимости
    -   mq@4.4.1
    -   shared@0.14.1

## 5.8.3

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1491](https://github.com/core-ds/core-components/pull/1491)

-   Добавлено sideEffects: false в package.json. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 3.

## 5.8.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0

## 5.8.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0

## 5.8.0

### Minor Changes

<sup><time>24.10.2024</time></sup>

### [#1416](https://github.com/core-ds/core-components/pull/1416)

-   Внесены изменения в отступы в компонентах tag и filter-tag (затрагивает все темы)

## 5.7.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

-   Обновлены зависимости
    -   shared@0.13.0

## 5.6.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1369](https://github.com/core-ds/core-components/pull/1369)

-   Заменили числовые значения скругления на переменные

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 5.6.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 5.5.1

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1354](https://github.com/core-ds/core-components/pull/1354)

-   Обновлены наименования переменных отступов

## 5.5.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 5.4.0

### Minor Changes

<sup><time>27.06.2024</time></sup>

### [#1258](https://github.com/core-ds/core-components/pull/1258)

-   Заменили устаревшие цветовые токены на актуальные

## 5.3.0

### Minor Changes

<sup><time>14.06.2024</time></sup>

### [#1232](https://github.com/core-ds/core-components/pull/1232)

-   Добавили новое свойство block, отвечающее за растягивание компонента на ширину контейнера

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 5.2.1

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 5.2.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

-   Для компонента ActionButton добавлен новый способ указать размер - 48. Буквенное значение размера s теперь deprecated, используйте вместо него 48
-   Для компонента Attach добавлены новые способы указать размеры - 32, 40, 48, 56, 64. Буквенные значения размеров xxs, xs, s, m, l теперь deprecated, используйте вместо них 32 , 40 , 48 , 56 , 64 соответственно
-   Для компонента FilterTag добавлены новые способы указать размеры - 32, 40, 48. Буквенные значения размеров xxs, xs, s теперь deprecated, используйте вместо них 32, 40, 48 соответственно

## 5.1.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

### [#1001](https://github.com/core-ds/core-components/pull/1001)

-   Изменен отступ до аддонов в размерах xxs, xs с 4px до 6px

## 5.0.0

### Major Changes

### [#979](https://github.com/core-ds/core-components/pull/979)

-   Прекращена поддержка IE

## 4.0.1

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

## 4.0.0

### Major Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компоненте FilterTag цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалены некоторые css переменные для мобильного компонента и темизация для mobile

## 3.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 3.0.1

### Patch Changes

### [#838](https://github.com/core-ds/core-components/pull/838)

-   Задана максимальная ширина в 100%, чтобы они не выходили за границы родителя

## 3.0.0

### Major Changes

### [#700](https://github.com/core-ds/core-components/pull/700)

-   Для компонента FilterTag добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   mq@4.2.0

## 2.1.8

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 2.1.7

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

## 2.1.6

### Patch Changes

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

## 2.1.5

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.10

## 2.1.4

### Patch Changes

### [#623](https://github.com/core-ds/core-components/pull/623)

-   Tокены 'dark' заменены на аналогичные 'light'

-   Обновлены зависимости
    -   tag@5.3.1

## 2.1.3

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   icon-button@6.0.9
    -   tag@5.3.0

## 2.1.2

### Patch Changes

-   Обновлены зависимости
    -   tag@5.2.0

## 2.1.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.8

## 2.1.0

### Minor Changes

### [#498](https://github.com/core-ds/core-components/pull/498)

-   Добавлены новые пропс shape и view отвечающие за форму и стиль тега

### Patch Changes

### [#534](https://github.com/core-ds/core-components/pull/534)

-   Удалены restProps

### [#524](https://github.com/core-ds/core-components/pull/524)

-   Исправлен баг, из-за которого отсутствовал hover-эффект на старых браузерах

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   tag@5.1.0
    -   icon-button@6.0.7

## 2.0.15

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.6

## 2.0.14

### Patch Changes

### [#491](https://github.com/core-ds/core-components/pull/491)

-   Обновлены внутренние переменные (themes/default.css) для размеров кнопок (xxs добавлен, xs исправлен)

-   Обновлены зависимости
    -   tag@5.0.4
    -   icon-button@6.0.5

## 2.0.13

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.4

## 2.0.12

### Patch Changes

### [#433](https://github.com/core-ds/core-components/pull/433)

-   Добавлен новый опциональный prop `showClear` в компонент FilterTag. Теперь есть возможность скрывать наличие крестика в активном состоянии тэга

-   Обновлены зависимости
    -   icon-button@6.0.3

## 2.0.11

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   icon-button@6.0.2
    -   tag@5.0.3

## 2.0.10

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.1

## 2.0.9

### Patch Changes

### [#322](https://github.com/core-ds/core-components/pull/322)

-   Исправлено некорректное отображение в Safari при взаимодействии с компонентом FilterTag

## 2.0.8

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.0
    -   tag@5.0.2

## 2.0.7

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)
    -   @alfalab/core-components-icon-button@5.0.5

## 2.0.6

### Patch Changes

-   [#279](https://github.com/core-ds/core-components/pull/279): chore: обновились @alfalab-data и @alfalab/utils версии в зависимостях. Thanks [@EGNKupava](https://github.com/EGNKupava)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@2.0.4...@alfalab/core-components-filter-tag@2.0.5) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [2.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@2.0.3...@alfalab/core-components-filter-tag@2.0.4) (2022-09-02)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@2.0.2...@alfalab/core-components-filter-tag@2.0.3) (2022-08-31)

### Bug Fixes

-   **filter-tag:** поправлены цвета у иконки крестика ([#167](https://github.com/core-ds/core-components/issues/167)) ([28eb49e](https://github.com/core-ds/core-components/commit/28eb49e012b5b6f8a8e4f07e2214ecb65fae0564))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@2.0.1...@alfalab/core-components-filter-tag@2.0.2) (2022-08-26)

### Bug Fixes

-   **filter-tag:** добавил font family ([#212](https://github.com/core-ds/core-components/issues/212)) ([34dd253](https://github.com/core-ds/core-components/commit/34dd253c5c7dcdc03443212c7dd1c2b3b8ca9e1b))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@2.0.0...@alfalab/core-components-filter-tag@2.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.4.2...@alfalab/core-components-filter-tag@2.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [1.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.4.1...@alfalab/core-components-filter-tag@1.4.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.4.0...@alfalab/core-components-filter-tag@1.4.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

# [1.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.3.3...@alfalab/core-components-filter-tag@1.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [1.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.3.2...@alfalab/core-components-filter-tag@1.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [1.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.3.1...@alfalab/core-components-filter-tag@1.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [1.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.3.0...@alfalab/core-components-filter-tag@1.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.2.0...@alfalab/core-components-filter-tag@1.3.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.10...@alfalab/core-components-filter-tag@1.2.0) (2022-06-24)

### Features

-   **amount-input:** added functionality to enter negative values ([#106](https://github.com/core-ds/core-components/issues/106)) ([d6b6ca7](https://github.com/core-ds/core-components/commit/d6b6ca71d87b5c4c62d2e87cdbe9d1ff035852c4))

## [1.1.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.9...@alfalab/core-components-filter-tag@1.1.10) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [1.1.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.8...@alfalab/core-components-filter-tag@1.1.9) (2022-06-20)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [1.1.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.7...@alfalab/core-components-filter-tag@1.1.8) (2022-06-08)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [1.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.6...@alfalab/core-components-filter-tag@1.1.7) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-filter-tag

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-filter-tag@1.1.0...@alfalab/core-components-filter-tag@1.1.1) (2022-03-30)

### Bug Fixes

-   **filter-tag:** move onClick from btn to div ([#1049](https://github.com/core-ds/core-components/issues/1049)) ([616a90a](https://github.com/core-ds/core-components/commit/616a90af9b0b95de324d3475572d5ac85d3e7a2a))

# 1.1.0 (2022-03-28)

### Features

-   **filter-tag:** new component ([#1035](https://github.com/core-ds/core-components/issues/1035)) ([f97e9c5](https://github.com/core-ds/core-components/commit/f97e9c59062e56f3bafa855450a33b5f67497143))
