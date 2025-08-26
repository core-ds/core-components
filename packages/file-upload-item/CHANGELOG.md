# Change Log

## 6.3.9

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.14

## 6.3.8

### Patch Changes

-   Обновлены зависимости
    -   icon-view@3.11.0

## 6.3.7

### Patch Changes

-   Обновлены зависимости
    -   icon-view@3.10.4

## 6.3.6

### Patch Changes

-   Обновлены зависимости
    -   icon-view@3.10.3
    -   typography@4.14.3
    -   icon-button@6.11.13

## 6.3.5

### Patch Changes

-   Обновлены зависимости
    -   icon-view@3.10.2

## 6.3.4

### Patch Changes

-   Обновлены зависимости
    -   typography@4.14.2
    -   icon-button@6.11.12

## 6.3.3

### Patch Changes

-   Обновлены зависимости
    -   typography@4.14.1

## 6.3.2

### Patch Changes

-   Обновлены зависимости
    -   typography@4.14.0

## 6.3.1

### Patch Changes

-   Обновлены зависимости
    -   typography@4.13.1
    -   icon-button@6.11.11

## 6.3.0

### Minor Changes

<sup><time>18.04.2025</time></sup>

### [#1640](https://github.com/core-ds/core-components/pull/1640)

1. Если в компоненте `FileUploadItem` отсутствуют кнопки (то есть ни `showRestore`, ни `downloadLink`, ни `showDelete` не активны), то элемент `Content` отображается с курсором в виде `pointer`, сигнализируя о том, что он кликабельный.

2. Если хотя бы одна из кнопок присутствует, кликабельность `Content` меняется в соответствии с логикой отображения.

3. Добавлен пропс `isClickable`, который позволяет управлять визуальным отображением кликабельности элемента `Content` в случае отсутствия кнопок.

### Patch Changes

-   Обновлены зависимости
    -   typography@4.13.0

## 6.2.6

### Patch Changes

<sup><time>11.04.2025</time></sup>

### [#1641](https://github.com/core-ds/core-components/pull/1641)

-   Исправлен копирайт `subtitle` в компоненте FileUploadItem на `Загружено`

<sup><time>11.04.2025</time></sup>

### [#1627](https://github.com/core-ds/core-components/pull/1627)

-   Фикс импорта `icon-view`
-   Фикс tsconfig

-   Обновлены зависимости
    -   icon-view@3.10.1
    -   icon-button@6.11.10

## 6.2.5

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.9

## 6.2.4

### Patch Changes

-   Обновлены зависимости
    -   typography@4.12.0

## 6.2.3

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.5
    -   icon-button@6.11.8

## 6.2.2

### Patch Changes

-   Обновлены зависимости
    -   typography@4.11.4
    -   spinner@4.0.4
    -   icon-button@6.11.7

## 6.2.1

### Patch Changes

<sup><time>31.01.2025</time></sup>

### [#1552](https://github.com/core-ds/core-components/pull/1552)

-   Поправлено обрезание длинного текста при truncate: true

## 6.2.0

### Minor Changes

<sup><time>10.01.2025</time></sup>

### [#1525](https://github.com/core-ds/core-components/pull/1525)

-   Обновление зависимости icons-glyph

## 6.1.1

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

-   Обновлены зависимости
    -   icon-button@6.11.6
    -   link@5.3.4
    -   spinner@4.0.3
    -   typography@4.11.3

## 6.1.0

### Minor Changes

<sup><time>26.12.2024</time></sup>

### [#1504](https://github.com/core-ds/core-components/pull/1504)

-   Добавлен импорт типов для статусов и пропсов компонента

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1497](https://github.com/core-ds/core-components/pull/1497)

-   Добавлено sideEffects: false (package.json)

-   Обновлены зависимости
    -   icon-button@6.11.5
    -   link@5.3.3
    -   spinner@4.0.2
    -   typography@4.11.2

## 6.0.4

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1473](https://github.com/core-ds/core-components/pull/1473)

-   Переход на атомарные импорты Typography.\[Name] -> \[Name]

-   Обновлены зависимости
    -   icon-button@6.11.4
    -   link@5.3.2
    -   spinner@4.0.1
    -   typography@4.11.1

## 6.0.3

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.3

## 6.0.2

### Patch Changes

-   Обновлены зависимости
    -   typography@4.11.0

## 6.0.1

### Patch Changes

-   Обновлены зависимости
    -   typography@4.10.3
    -   icon-button@6.11.2

## 6.0.0

### Major Changes

<sup><time>18.11.2024</time></sup>

### [#1379](https://github.com/core-ds/core-components/pull/1379)

Добавлен новый компонент. Старый помечен как `deprecated`.

#### Обновление

Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До

```js
import { FileUploadItem } from '@alfalab/core-components/file-upload-item';
```

После

```js
import { FileUploadItemV1 } from '@alfalab/core-components/file-upload-item-v1';
```

Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.

### Patch Changes

-   Обновлены зависимости
    -   spinner@4.0.0
    -   icon-button@6.11.1

## 5.11.0

### Minor Changes

<sup><time>24.10.2024</time></sup>

### [#1387](https://github.com/core-ds/core-components/pull/1387)

-   Обновление темы corp

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.11.0

## 5.10.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.10.1

## 5.10.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1386](https://github.com/core-ds/core-components/pull/1386)

-   Откат обновления темизации corp из версии 47.16.0

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.10.0

## 5.9.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.9.1

## 5.9.0

### Minor Changes

<sup><time>13.09.2024</time></sup>

### [#1360](https://github.com/core-ds/core-components/pull/1360)

-   Обновление темы corp

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   icon-button@6.9.0
    -   link@5.3.1

## 5.8.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.8.0
    -   link@5.3.0
    -   spinner@3.5.0

## 5.7.1

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1354](https://github.com/core-ds/core-components/pull/1354)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   link@5.2.3
    -   icon-button@6.7.5

## 5.7.0

### Minor Changes

<sup><time>26.08.2024</time></sup>

### [#1323](https://github.com/core-ds/core-components/pull/1323)

-   Добавлено новое свойство target, которое определяет, где открывать скачиваемый документ

## 5.6.10

### Patch Changes

<sup><time>20.08.2024</time></sup>

### [#1338](https://github.com/core-ds/core-components/pull/1338)

-   Исправлено отображение имени файла в состоянии ошибки

## 5.6.9

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.7.4

## 5.6.8

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.7.3

## 5.6.7

### Patch Changes

-   Обновлены зависимости
    -   spinner@3.4.0
    -   icon-button@6.7.2

## 5.6.6

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.7.1

## 5.6.5

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.7.0

## 5.6.4

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.6.1
    -   link@5.2.2

## 5.6.3

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

-   Обновлены зависимости
    -   icon-button@6.6.0
    -   spinner@3.3.1

## 5.6.2

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.7

## 5.6.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.6

## 5.6.0

### Minor Changes

<sup><time>19.04.2024</time></sup>

### [#1168](https://github.com/core-ds/core-components/pull/1168)

-   Для свойства onDelete был добавлен второй параметр, который является опциональным и представляет собой событие event

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.5

## 5.5.0

### Minor Changes

<sup><time>22.03.2024</time></sup>

### [#1129](https://github.com/core-ds/core-components/pull/1129)

-   Добавлено новое свойство "multiline", которое позволяет использовать многострочные названия файлов. Также было удалено отображение нижней границы у компонента, если он является единственным или последним в списке

### Patch Changes

-   Обновлены зависимости
    -   link@5.2.1
    -   icon-button@6.5.4

## 5.4.3

### Patch Changes

-   Обновлены зависимости
    -   spinner@3.3.0
    -   icon-button@6.5.3

## 5.4.2

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.2

## 5.4.1

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.1

## 5.4.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.5.0

## 5.3.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

-   В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

-   Обновлены зависимости
    -   link@5.2.0
    -   icon-button@6.4.3

## 5.2.12

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.4.2

## 5.2.11

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.4.1

## 5.2.10

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.4.0
    -   spinner@3.2.0

## 5.2.9

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.3.2

## 5.2.8

### Patch Changes

-   Обновлены зависимости
    -   link@5.1.1

## 5.2.7

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.3.1

## 5.2.6

### Patch Changes

### [#870](https://github.com/core-ds/core-components/pull/870)

-   Увеличен отступ для даты загрузки

-   Обновлены зависимости
    -   icon-button@6.3.0

## 5.2.5

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.2.5

## 5.2.4

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.2.4

## 5.2.3

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.2.3

## 5.2.2

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.2.2

## 5.2.1

### Patch Changes

### [#793](https://github.com/core-ds/core-components/pull/793)

-   Добавлены недостающие зависимости в package.json

-   Обновлены зависимости
    -   icon-button@6.2.1

## 5.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.2.0
    -   link@5.1.0
    -   spinner@3.1.0

## 5.1.25

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.1.3
    -   link@5.0.6
    -   spinner@3.0.7

## 5.1.24

### Patch Changes

### [#757](https://github.com/core-ds/core-components/pull/757)

-   Перевели единицы измерения на русский язык

## 5.1.23

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.1.2

## 5.1.22

### Patch Changes

-   Обновлены зависимости
    -   link@5.0.5
    -   spinner@3.0.6
    -   icon-button@6.1.1

## 5.1.21

### Patch Changes

### [#635](https://github.com/core-ds/core-components/pull/635)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

-   Обновлены зависимости
    -   icon-button@6.1.0

## 5.1.20

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.12

## 5.1.19

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.11

## 5.1.18

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.10

## 5.1.17

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   icon-button@6.0.9
    -   link@5.0.4
    -   spinner@3.0.5

## 5.1.16

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.8

## 5.1.15

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   icon-button@6.0.7
    -   link@5.0.3
    -   spinner@3.0.4

## 5.1.14

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.6

## 5.1.13

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.5

## 5.1.12

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.4

## 5.1.11

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3

## 5.1.10

### Patch Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 5.1.9

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   icon-button@6.0.2
    -   link@5.0.2
    -   spinner@3.0.3

## 5.1.8

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.1

## 5.1.7

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.0

## 5.1.6

### Patch Changes

### [#298](https://github.com/core-ds/core-components/pull/298)

-   Заменены иконки M размера на S

## 5.1.5

### Patch Changes

-   @alfalab/core-components-icon-button@5.0.5

## 5.1.4

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 5.1.3

### Patch Changes

-   Updated dependencies [[#283](https://github.com/core-ds/core-components/pull/283)]
    -   @alfalab/core-components-link@5.0.1

## 5.1.2

### Patch Changes

-   [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@5.1.0...@alfalab/core-components-file-upload-item@5.1.1) (2022-09-13)

### Bug Fixes

-   **file-upload-item:** fixed error display by default ([#252](https://github.com/core-ds/core-components/issues/252)) ([874a669](https://github.com/core-ds/core-components/commit/874a6692af0a17624a219ee967bb1503a3dfb629))

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@5.0.0...@alfalab/core-components-file-upload-item@5.1.0) (2022-09-12)

### Features

-   **form-control:** new input/select label view (outer) ([#177](https://github.com/core-ds/core-components/issues/177)) ([66beb15](https://github.com/core-ds/core-components/commit/66beb15756de97e17a4d1dd4221fa7f401ee8539))

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@4.0.4...@alfalab/core-components-file-upload-item@5.0.0) (2022-09-06)

### Bug Fixes

-   **link:** replace component with a button in pseudo mode ([#156](https://github.com/core-ds/core-components/issues/156)) ([6f24cbb](https://github.com/core-ds/core-components/commit/6f24cbb433c4ced85986d5f0e0b3bc1289e0fb8d))

### BREAKING CHANGES

-   **link:** В компоненте Link с пропсом pseudo заменяется дефолтный html-элемент "a" на
    "button"

Co-authored-by: crybabydanchan <crysiscaramel@gmal.com>

## [4.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@4.0.3...@alfalab/core-components-file-upload-item@4.0.4) (2022-09-02)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [4.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@4.0.2...@alfalab/core-components-file-upload-item@4.0.3) (2022-08-31)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@4.0.1...@alfalab/core-components-file-upload-item@4.0.2) (2022-08-25)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@4.0.0...@alfalab/core-components-file-upload-item@4.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.9.2...@alfalab/core-components-file-upload-item@4.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [3.9.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.9.1...@alfalab/core-components-file-upload-item@3.9.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [3.9.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.9.0...@alfalab/core-components-file-upload-item@3.9.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.9.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.8.3...@alfalab/core-components-file-upload-item@3.9.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [3.8.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.8.2...@alfalab/core-components-file-upload-item@3.8.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.8.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.8.1...@alfalab/core-components-file-upload-item@3.8.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.8.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.8.0...@alfalab/core-components-file-upload-item@3.8.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.8.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.7.3...@alfalab/core-components-file-upload-item@3.8.0) (2022-07-11)

### Features

-   **spinner:** new size & inverted theme ([#123](https://github.com/core-ds/core-components/issues/123)) ([5568ab5](https://github.com/core-ds/core-components/commit/5568ab5183badaded723ebc5a608b20bf471c6bc))

## [3.7.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.7.2...@alfalab/core-components-file-upload-item@3.7.3) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.7.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.7.1...@alfalab/core-components-file-upload-item@3.7.2) (2022-06-24)

### Bug Fixes

-   **icon-button:** fix disabled colors ([#104](https://github.com/core-ds/core-components/issues/104)) ([3f03849](https://github.com/core-ds/core-components/commit/3f038495bb63f72cd81ceeedbe55b52119581d57))

## [3.7.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.7.0...@alfalab/core-components-file-upload-item@3.7.1) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.7.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.6.5...@alfalab/core-components-file-upload-item@3.7.0) (2022-06-20)

### Bug Fixes

-   **icon-button:** fix loading ([#105](https://github.com/core-ds/core-components/issues/105)) ([0b133f0](https://github.com/core-ds/core-components/commit/0b133f042e86702ec2861915f2cdbcdbad9ca905))

### Features

-   **file-upload-item:** add ability to disable file delete button ([#86](https://github.com/core-ds/core-components/issues/86)) ([daa8775](https://github.com/core-ds/core-components/commit/daa877591736598ef6f9f0237c40ac8759258eeb))

## [3.6.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.6.4...@alfalab/core-components-file-upload-item@3.6.5) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.8...@alfalab/core-components-file-upload-item@3.5.0) (2022-03-04)

### Bug Fixes

-   update glyph deps ([#1019](https://github.com/core-ds/core-components/issues/1019)) ([3e910d0](https://github.com/core-ds/core-components/commit/3e910d0801c4c46bcd399163200c1f7bfaba375e))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [3.4.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.7...@alfalab/core-components-file-upload-item@3.4.8) (2022-02-17)

### Bug Fixes

-   imports for glyph icons ([#994](https://github.com/core-ds/core-components/issues/994)) ([8e807f2](https://github.com/core-ds/core-components/commit/8e807f26abf0f942fe8eadbd201caecb297b35dc))

## [3.4.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.6...@alfalab/core-components-file-upload-item@3.4.7) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.4.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.5...@alfalab/core-components-file-upload-item@3.4.6) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.4.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.4...@alfalab/core-components-file-upload-item@3.4.5) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.4.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.3...@alfalab/core-components-file-upload-item@3.4.4) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.4.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.2...@alfalab/core-components-file-upload-item@3.4.3) (2022-01-17)

### Bug Fixes

-   **file-upload-item:** корректная обрезка контента ([#942](https://github.com/core-ds/core-components/issues/942)) ([5a285f2](https://github.com/core-ds/core-components/commit/5a285f2c1259dab270f52b438203fe7d40c07b29))

## [3.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.1...@alfalab/core-components-file-upload-item@3.4.2) (2021-12-29)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.4.0...@alfalab/core-components-file-upload-item@3.4.1) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.3.3...@alfalab/core-components-file-upload-item@3.4.0) (2021-12-09)

### Features

-   **file-upload-item:** обновлен внешний вид ([#902](https://github.com/core-ds/core-components/issues/902)) ([d0f7d1e](https://github.com/core-ds/core-components/commit/d0f7d1ebdf302711a01549e86d0d8a5129b66d82))

## [3.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.3.2...@alfalab/core-components-file-upload-item@3.3.3) (2021-12-08)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.3.1...@alfalab/core-components-file-upload-item@3.3.2) (2021-11-26)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.3.0...@alfalab/core-components-file-upload-item@3.3.1) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.2.0...@alfalab/core-components-file-upload-item@3.3.0) (2021-10-12)

### Features

-   **file-upload-item:** добавлен пропс download ([#844](https://github.com/core-ds/core-components/issues/844)) ([db2a4ca](https://github.com/core-ds/core-components/commit/db2a4ca27ee7a64721138c7c2e918b4657c75489))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.1.1...@alfalab/core-components-file-upload-item@3.2.0) (2021-10-11)

### Features

-   проставлен role=alert для ошибок ([#850](https://github.com/core-ds/core-components/issues/850)) ([dc634a3](https://github.com/core-ds/core-components/commit/dc634a3d008accfab10192ce234c12ef0ecc7fa9))
-   **file-upload-item:** custom icon ([#849](https://github.com/core-ds/core-components/issues/849)) ([59b8925](https://github.com/core-ds/core-components/commit/59b8925fbb9c631534c49c8dbb68cf493678e9e5))

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.1.0...@alfalab/core-components-file-upload-item@3.1.1) (2021-09-27)

### Bug Fixes

-   **file-upload-item:** fix description prop ([#836](https://github.com/core-ds/core-components/issues/836)) ([e15cf1d](https://github.com/core-ds/core-components/commit/e15cf1dad438e22ac31984bfcf8531981b88c6de))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.7...@alfalab/core-components-file-upload-item@3.1.0) (2021-09-14)

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))

## [3.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.6...@alfalab/core-components-file-upload-item@3.0.7) (2021-08-31)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.5...@alfalab/core-components-file-upload-item@3.0.6) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.4...@alfalab/core-components-file-upload-item@3.0.5) (2021-08-23)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.3...@alfalab/core-components-file-upload-item@3.0.4) (2021-08-04)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.2...@alfalab/core-components-file-upload-item@3.0.3) (2021-07-23)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.1...@alfalab/core-components-file-upload-item@3.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@3.0.0...@alfalab/core-components-file-upload-item@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@2.0.2...@alfalab/core-components-file-upload-item@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@2.0.1...@alfalab/core-components-file-upload-item@2.0.2) (2021-06-04)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@2.0.0...@alfalab/core-components-file-upload-item@2.0.1) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.5...@alfalab/core-components-file-upload-item@2.0.0) (2021-05-25)

### Features

-   **button:** add inverted ([#649](https://github.com/core-ds/core-components/issues/649)) ([be321b0](https://github.com/core-ds/core-components/commit/be321b07e99d20824138ad65141f3fbed1b6e315)), closes [#658](https://github.com/core-ds/core-components/issues/658) [#657](https://github.com/core-ds/core-components/issues/657)

### BREAKING CHANGES

-   **button:** remove inverted themes

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.4...@alfalab/core-components-file-upload-item@1.1.5) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.3...@alfalab/core-components-file-upload-item@1.1.4) (2021-05-18)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.2...@alfalab/core-components-file-upload-item@1.1.3) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.1...@alfalab/core-components-file-upload-item@1.1.2) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-file-upload-item@1.1.0...@alfalab/core-components-file-upload-item@1.1.1) (2021-04-28)

**Note:** Version bump only for package @alfalab/core-components-file-upload-item

# 1.1.0 (2021-04-26)

### Features

-   **file-upload-item:** add component ([#571](https://github.com/core-ds/core-components/issues/571)) ([e627350](https://github.com/core-ds/core-components/commit/e627350b3eabfb36aaa67c17411a9b98b551867d))
