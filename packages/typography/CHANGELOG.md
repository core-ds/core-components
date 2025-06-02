# @alfalab/core-components-typography

## 4.14.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.1

## 4.14.1

### Patch Changes

<sup><time>26.05.2025</time></sup>

### [#1721](https://github.com/core-ds/core-components/pull/1721)

-   Исправлено использование переменной окружения `NODE_ENV`

## 4.14.0

### Minor Changes

<sup><time>23.05.2025</time></sup>

### [#1606](https://github.com/core-ds/core-components/pull/1606)

-   Перенос хука useSkeleton из `Typography` в `Skeleton`

### Patch Changes

-   Обновлены зависимости
    -   skeleton@5.4.0

## 4.13.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.0

## 4.13.0

### Minor Changes

<sup><time>18.04.2025</time></sup>

### [#1617](https://github.com/core-ds/core-components/pull/1617)

Добавлена поддержка шрифта `Alfa Interface Sans`

Подробнее смотрите в разделе [Типографика](https://core-ds.github.io/core-components/master/?path=/docs/guidelines-typography--docs)

## 4.12.0

### Minor Changes

<sup><time>21.02.2025</time></sup>

### [#1589](https://github.com/core-ds/core-components/pull/1589)

-   Добавлен static-positive цвет для Typography

## 4.11.4

### Patch Changes

-   Обновлены зависимости
    -   skeleton@5.3.0

## 4.11.3

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

-   Обновлены зависимости
    -   skeleton@5.2.3

## 4.11.2

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1502](https://github.com/core-ds/core-components/pull/1502)

-   Апдейт версий пакетов (в них починена сборка esm-версии): @alfalab/data, @alfalab/hooks, @alfalab/utils

-   Обновлены зависимости
    -   mq@4.4.1
    -   skeleton@5.2.2

## 4.11.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

-   Обновлены зависимости
    -   skeleton@5.2.1

## 4.11.0

### Minor Changes

<sup><time>28.11.2024</time></sup>

### [#1464](https://github.com/core-ds/core-components/pull/1464)

-   Добавлены атомарные экспорты TitleDesktop, TitleMobile, TitleResponsive и Text
-   В package.json добавлено sideEffects:false

## 4.10.3

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0

## 4.10.2

### Patch Changes

<sup><time>04.10.2024</time></sup>

### [#1401](https://github.com/core-ds/core-components/pull/1401)

-   Добавлен `opacity` во время показа скелетона. Это позволяет избежать моргания компонента в ssr.

## 4.10.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   skeleton@5.2.0

## 4.10.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   skeleton@5.1.0

## 4.9.0

### Minor Changes

<sup><time>04.09.2024</time></sup>

### [#1351](https://github.com/core-ds/core-components/pull/1351)

-   Добавлено новое свойство breakpoint, отвечающее за контрольную точку, с которой начинается desktop версия

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

## 4.8.0

### Minor Changes

<sup><time>19.07.2024</time></sup>

### [#1298](https://github.com/core-ds/core-components/pull/1298)

-   В компонент Typography.Text добавлен новый вариант начертания - tagline

### Patch Changes

<sup><time>19.07.2024</time></sup>

### [#1296](https://github.com/core-ds/core-components/pull/1296)

-   Исправлено поведение компонента Typography.TitleMobile: теперь он корректно учитывает пропс rowLimit и больше не игнорирует его

## 4.7.0

### Minor Changes

<sup><time>16.07.2024</time></sup>

### [#1291](https://github.com/core-ds/core-components/pull/1291)

-   Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0

## 4.6.0

### Minor Changes

<sup><time>27.06.2024</time></sup>

### [#1258](https://github.com/core-ds/core-components/pull/1258)

-   Заменили устаревшие цветовые токены на актуальные

## 4.5.1

### Patch Changes

-   Обновлены зависимости
    -   skeleton@5.0.0

## 4.5.0

### Minor Changes

### [#1070](https://github.com/core-ds/core-components/pull/1070)

-   Добавлен новый weight - semibold
-   Исправлена ошибка с жирностью в мобильном заголовке (по-умолчанию жирность мобильного заголовка со шрифтом system должна была быть 600, а была 700)

## 4.4.0

### Minor Changes

### [#1045](https://github.com/core-ds/core-components/pull/1045)

-   Добавлены свойства align и wrapperClassName в skeletonProps

## 4.3.0

### Minor Changes

### [#1008](https://github.com/core-ds/core-components/pull/1008)

-   Title, TitleMobile и TitleResponsive обернуты в forwardRef

## 4.2.1

### Patch Changes

-   Обновлены зависимости
    -   skeleton@4.2.0

## 4.2.0

### Minor Changes

### [#946](https://github.com/core-ds/core-components/pull/946)

-   Добавлены новые стили (component-secondary и component-primary) для view компонента Typography.Text
-   Стиль component-primary дублирует стиль component (view=component deprecated)

## 4.1.0

### Minor Changes

### [#800](https://github.com/core-ds/core-components/pull/800)

-   Добавлены пропы showSkeleton, skeletonProps для скелетонизации текста

## 4.0.0

### Major Changes

### [#771](https://github.com/core-ds/core-components/pull/771)

-   Исправлена типографика в компоненте TitleResponsive для шрифта system с headline-system на headline-system-mobile

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.2.2

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.2.1

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 3.2.0

### Minor Changes

### [#531](https://github.com/core-ds/core-components/pull/531)

-   Добавлены static цвета для Typography

## 3.1.1

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.1.0

### Minor Changes

### [#469](https://github.com/core-ds/core-components/pull/469)

-   Для компонента Typography добавлен новый пропс rowLimit отвечающий за ограничение максимального количества строк
-   Для компонентов PureCell и Plate изменено отсечение текста в несколько строк<br />

## 3.0.8

### Patch Changes

### [#436](https://github.com/core-ds/core-components/pull/436)

-   Исправлен font-weight для TitleResponsive

## 3.0.7

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 3.0.6

### Patch Changes

### [#390](https://github.com/core-ds/core-components/pull/390)

-   Подправлена типизация для компонента Typography.Text, чтобы можно было передавать ref

## 3.0.5

### Patch Changes

### [#358](https://github.com/core-ds/core-components/pull/358)

-   Добавлен новый prop `defaultMargins` в компонент Text. Теперь есть возможность отключить отступ для тега `p`

## 3.0.4

### Patch Changes

### [#368](https://github.com/core-ds/core-components/pull/368)

-   Обновлен пакет ui-primitives и миксины typography (изменился line-height 24→20 у миксинов headline-mobile_xsmall и headline-system-mobile_xsmall)

## 3.0.3

### Patch Changes

### [#324](https://github.com/core-ds/core-components/pull/324)

-   "export" типов заменен на "export type"

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@3.0.1...@alfalab/core-components-typography@3.0.2) (2022-09-01)

**Note:** Version bump only for package @alfalab/core-components-typography

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@3.0.0...@alfalab/core-components-typography@3.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-typography

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.7.1...@alfalab/core-components-typography@3.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [2.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.7.0...@alfalab/core-components-typography@2.7.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [2.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.6.3...@alfalab/core-components-typography@2.7.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [2.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.6.2...@alfalab/core-components-typography@2.6.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-typography

## [2.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.6.1...@alfalab/core-components-typography@2.6.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [2.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.6.0...@alfalab/core-components-typography@2.6.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-typography

# [2.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.5.3...@alfalab/core-components-typography@2.6.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   **pure cell:** new component ([#10](https://github.com/core-ds/core-components/issues/10)) ([4e95c57](https://github.com/core-ds/core-components/commit/4e95c573aaa6f99197292ea4bae12cbbcc3207c9))

# [2.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.4.1...@alfalab/core-components-typography@2.5.0) (2022-03-30)

### Features

-   **list:** added list & typography presets ([#1047](https://github.com/core-ds/core-components/issues/1047)) ([67b6a77](https://github.com/core-ds/core-components/commit/67b6a77d1327b090b010eb061f83a2e6a0cb67b9))

## [2.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.4.0...@alfalab/core-components-typography@2.4.1) (2022-03-03)

### Bug Fixes

-   **typography:** changed styrene font styles for title responsive ([#1017](https://github.com/core-ds/core-components/issues/1017)) ([540b0b5](https://github.com/core-ds/core-components/commit/540b0b59cf99a4cee0798f50b94e6449be4aa3c6))

# [2.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.3.0...@alfalab/core-components-typography@2.4.0) (2022-03-01)

### Features

-   **typography:** новый компонент Typography.TitleMobile ([#1003](https://github.com/core-ds/core-components/issues/1003)) ([9b03cf9](https://github.com/core-ds/core-components/commit/9b03cf90422b05cc927ed98959708430812d1a50))
-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [2.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.2.0...@alfalab/core-components-typography@2.3.0) (2022-01-17)

### Features

-   **typography:** export types ([#940](https://github.com/core-ds/core-components/issues/940)) ([498227c](https://github.com/core-ds/core-components/commit/498227c272659a1ebf890eee61c6fecdd110faee))

# [2.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.1.0...@alfalab/core-components-typography@2.2.0) (2021-09-14)

### Features

-   **typography:** add ref ([#834](https://github.com/core-ds/core-components/issues/834)) ([976b16d](https://github.com/core-ds/core-components/commit/976b16dd9ae68c31999bffb3506623db05033ad4))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.0.1...@alfalab/core-components-typography@2.1.0) (2021-07-19)

### Features

-   **typography:** monospaceNumbers prop (PDS-255) ([#697](https://github.com/core-ds/core-components/issues/697)) ([42d16a6](https://github.com/core-ds/core-components/commit/42d16a62f6d0781eba44dc1e0b76b28cae37d89a))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@2.0.0...@alfalab/core-components-typography@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-typography

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.5.1...@alfalab/core-components-typography@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.5.0...@alfalab/core-components-typography@1.5.1) (2021-06-28)

### Bug Fixes

-   **typography:** add missing weight styles ([#719](https://github.com/core-ds/core-components/issues/719)) ([6b855aa](https://github.com/core-ds/core-components/commit/6b855aa97eff918e0e16f957c4c05bb7f2d8f4fe))

# [1.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.7...@alfalab/core-components-typography@1.5.0) (2021-06-04)

### Features

-   **typography:** add rest props ([#682](https://github.com/core-ds/core-components/issues/682)) ([51e1cf8](https://github.com/core-ds/core-components/commit/51e1cf89028c788bfcdbc21ea16acbbe190b5db9))

## [1.4.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.6...@alfalab/core-components-typography@1.4.7) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-typography

## [1.4.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.5...@alfalab/core-components-typography@1.4.6) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-typography

## [1.4.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.3...@alfalab/core-components-typography@1.4.5) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.2...@alfalab/core-components-typography@1.4.3) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-typography

## [1.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.1...@alfalab/core-components-typography@1.4.2) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-typography

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-typography@1.4.0...@alfalab/core-components-typography@1.4.1) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-typography
