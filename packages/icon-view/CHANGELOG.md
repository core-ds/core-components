# Change Log

## 3.9.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

## 3.9.0

### Minor Changes

<sup><time>10.12.2024</time></sup>

### [#1454](https://github.com/core-ds/core-components/pull/1454)

-   Добавлен размер 72

## 3.8.4

### Patch Changes

<sup><time>05.11.2024</time></sup>

### [#1430](https://github.com/core-ds/core-components/pull/1430)

-   Icon-view: в компоненте ellipse восстановлен случайно удалённый вариант; пропсы: size: 40, topAddond: on

## 3.8.3

### Patch Changes

<sup><time>11.10.2024</time></sup>

### [#1399](https://github.com/core-ds/core-components/pull/1399)

-   Изменена логика отрисовки image тэга - теперь image рендерится всегда и скрывается только в случае ошибки загрузки

## 3.8.2

### Patch Changes

<sup><time>24.09.2024</time></sup>

### [#1384](https://github.com/core-ds/core-components/pull/1384)

-   Произвёл автоматическую оптимизацию кривых (по размеру) пакета 'icon-view'

## 3.8.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

## 3.8.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

<sup><time>10.09.2024</time></sup>

### [#1339](https://github.com/core-ds/core-components/pull/1339)

Небольшой рефакторинг:

-   оптимизация утилит (исправление копипасты и дубликаций)
-   уточнение типов (исправление копипасты, вынос общего типа)
-   уточнения в css (исправление shadow names)

## 3.7.1

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

## 3.7.0

### Minor Changes

<sup><time>24.05.2024</time></sup>

### [#1203](https://github.com/core-ds/core-components/pull/1203)

-   Исправлена форма для компонета SuperEllipse в размере 40 (стала более округлой)

## 3.6.2

### Patch Changes

<sup><time>15.03.2024</time></sup>

### [#1120](https://github.com/core-ds/core-components/pull/1120)

-   Загрузка изображений исправлена: теперь если произошла ошибка при загрузке, битое изображение не будет отображаться

## 3.6.1

### Patch Changes

### [#1079](https://github.com/core-ds/core-components/pull/1079)

-   Исправлена ошибка с nested оператором в css, из-за которой svg изображения не растягивались на всю ширину контейнера

## 3.6.0

### Minor Changes

### [#1009](https://github.com/core-ds/core-components/pull/1009)

-   Добавлены два новых размера компонента: 16 и 56. Добавлено новое свойство mainSize, отвечающее за размер основного слота (обычно, это иконка)

## 3.5.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

-   В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 3.4.1

### Patch Changes

### [#975](https://github.com/core-ds/core-components/pull/975)

-   Добавлено вертикальное выравнивание к svg

## 3.4.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

## 3.3.1

### Patch Changes

### [#890](https://github.com/core-ds/core-components/pull/890)

-   CDNIcon теперь занимает всю ширину и высоту IconView

## 3.3.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 3.2.0

### Minor Changes

### [#772](https://github.com/core-ds/core-components/pull/772)

-   Добавлен новый пропс shapeClassName для возможности стилизации формы шейпа

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 3.1.0

### Minor Changes

### [#675](https://github.com/core-ds/core-components/pull/675)

-   feat(icon-view): Добавлены шейпы Rectangle и NoShape

## 3.0.7

### Patch Changes

### [#655](https://github.com/core-ds/core-components/pull/655)

-   Исправлена генерация идентификаторов для изображений

## 3.0.6

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

### [#587](https://github.com/core-ds/core-components/pull/587)

-   Добавлена переменная в css для фона в компоненте IconView

## 3.0.5

### Patch Changes

### [#566](https://github.com/core-ds/core-components/pull/566)

-   Изменен цвет иконки в теме click

## 3.0.4

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 3.0.3

### Patch Changes

### [#499](https://github.com/core-ds/core-components/pull/499)

-   Исправлен размер 40 для компонента Сircle

## 3.0.2

### Patch Changes

### [#477](https://github.com/core-ds/core-components/pull/477)

-   Исправлен тип у свойства backgroundIcon

## 3.0.1

### Patch Changes

### [#432](https://github.com/core-ds/core-components/pull/432)

-   Обновлен тип для props 'size'

## 3.0.0

### Major Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

-   Добавлен новый вид выреза под индикатор
-   Добавлены новые размеры 32px и 20px<br />
-   В старых размерах изменены вырезы под аддон и размер аддонов (в 64 размере с 18px до 24px, в 48 и 40 размерах с 18px до 20px)<br />
-   Добавлена возможность прокидывать иконку в шейп<br />

## 2.2.2

### Patch Changes

### [#428](https://github.com/core-ds/core-components/pull/428)

-   Исправлен patternId для imageUrl

## 2.2.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

## 2.2.0

### Minor Changes

### [#327](https://github.com/core-ds/core-components/pull/327)

-   Добавлен новый размер (24px) для компонента SuperEllipse
-   Добавлены новые размеры (24px и 128px) для компонента Circle<br />

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@2.0.1...@alfalab/core-components-icon-view@2.1.0) (2022-09-01)

### Features

-   **side-panel:** add props imageUrl and fix doc ([#168](https://github.com/core-ds/core-components/issues/168)) ([9ca0f00](https://github.com/core-ds/core-components/commit/9ca0f0094b993bdd302765db79bcf8f91fae2a12))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@2.0.0...@alfalab/core-components-icon-view@2.0.1) (2022-08-19)

### Bug Fixes

-   **icon-view:** add aditional path to image and change icon size in addons ([#170](https://github.com/core-ds/core-components/issues/170)) ([51c8259](https://github.com/core-ds/core-components/commit/51c825975296bed2c5461c8b96d7ef527684d7b0))

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.4.1...@alfalab/core-components-icon-view@2.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [1.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.4.0...@alfalab/core-components-icon-view@1.4.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [1.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.3.3...@alfalab/core-components-icon-view@1.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [1.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.3.2...@alfalab/core-components-icon-view@1.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-icon-view

## [1.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.3.1...@alfalab/core-components-icon-view@1.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [1.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.3.0...@alfalab/core-components-icon-view@1.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-icon-view

# [1.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.2.0...@alfalab/core-components-icon-view@1.3.0) (2022-06-28)

### Bug Fixes

-   **icon-view:** fix line-height ([#111](https://github.com/core-ds/core-components/issues/111)) ([b16e0ea](https://github.com/core-ds/core-components/commit/b16e0ea206c819ba4370ed8c1662804a83648e0f))

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.1.1...@alfalab/core-components-icon-view@1.1.2) (2022-02-17)

### Bug Fixes

-   **icon-view:** fix bg-color ([#980](https://github.com/core-ds/core-components/issues/980)) ([2fbad56](https://github.com/core-ds/core-components/commit/2fbad5671d64056a4af81c4fe281a82c415ffeb5))

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-icon-view@1.1.0...@alfalab/core-components-icon-view@1.1.1) (2022-01-27)

### Bug Fixes

-   **icon-view:** fix types ([#961](https://github.com/core-ds/core-components/issues/961)) ([74152f3](https://github.com/core-ds/core-components/commit/74152f3bd6d776bebeabea65d5971b57cc486b2e))

# 1.1.0 (2021-12-30)

### Features

-   **icon-view:** add draft component ([f0ab46f](https://github.com/core-ds/core-components/commit/f0ab46fc5241c3856962f19315213c3e45b6c05b))
-   **icon-view:** add tests, some refactoring ([4fee755](https://github.com/core-ds/core-components/commit/4fee755b826024a02f2dab9e9573088284185380))
-   **icon-view:** refactoring ([2579bb0](https://github.com/core-ds/core-components/commit/2579bb016cfdeef0ff0e177f231a1d1a4715b0af))
-   **icon-view:** updates ([7b17f5f](https://github.com/core-ds/core-components/commit/7b17f5ffca39243a13d57fdbd0da31041dc0ea98))
