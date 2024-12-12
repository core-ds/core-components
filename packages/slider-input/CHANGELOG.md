# Change Log

## 9.0.2

### Patch Changes

-   Обновлены зависимости
    -   input@15.3.3

## 9.0.1

### Patch Changes

-   Обновлены зависимости
    -   input@15.3.2

## 9.0.0

### Major Changes

<sup><time>18.11.2024</time></sup>

### [#1304](https://github.com/core-ds/core-components/pull/1304)

-   Добавлен пропс `lockLimit`, который предотвращает ввод числа если оно больше или меньше допустимого.
    При событии blur установится число по верхней границе, если оно больше допустимого, и наоборот - по нижней границе, если число меньше допустимого.

-   Изменен тип для пропса `onInputChange`. Теперь он может принимать `null`. Обратите внимание на типы при обновлении.

### Patch Changes

-   Обновлены зависимости
    -   input@15.3.1

## 8.3.6

### Patch Changes

-   Обновлены зависимости
    -   input@15.3.0

## 8.3.5

### Patch Changes

-   Обновлены зависимости
    -   input@15.2.1

## 8.3.4

### Patch Changes

-   Обновлены зависимости
    -   input@15.2.0

## 8.3.3

### Patch Changes

-   Обновлены зависимости
    -   input@15.1.3

## 8.3.2

### Patch Changes

-   Обновлены зависимости
    -   input@15.1.2

## 8.3.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1358](https://github.com/core-ds/core-components/pull/1358)

-   Обновлены наименования переменных скругления

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   slider@4.7.1
    -   input@15.1.1

## 8.3.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   input@15.1.0
    -   slider@4.7.0

## 8.2.18

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1356](https://github.com/core-ds/core-components/pull/1356)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   input@15.0.5

## 8.2.17

### Patch Changes

-   Обновлены зависимости
    -   input@15.0.4

## 8.2.16

### Patch Changes

-   Обновлены зависимости
    -   input@15.0.3

## 8.2.15

### Patch Changes

-   Обновлены зависимости
    -   input@15.0.2

## 8.2.14

### Patch Changes

-   Обновлены зависимости
    -   input@15.0.1

## 8.2.13

### Patch Changes

-   Обновлены зависимости
    -   input@15.0.0

## 8.2.12

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.7

## 8.2.11

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.6

## 8.2.10

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

-   Обновлены зависимости
    -   input@14.4.5

## 8.2.9

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.4

## 8.2.8

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.3

## 8.2.7

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1210](https://github.com/core-ds/core-components/pull/1210)

-   Изменены типы принимаемых компонентов

-   Обновлены зависимости
    -   input@14.4.2
    -   slider@4.6.2

## 8.2.6

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.1

## 8.2.5

### Patch Changes

-   Обновлены зависимости
    -   input@14.4.0

## 8.2.4

### Patch Changes

-   Обновлены зависимости
    -   input@14.3.3

## 8.2.3

### Patch Changes

-   Обновлены зависимости
    -   slider@4.6.1

## 8.2.2

### Patch Changes

-   Обновлены зависимости
    -   input@14.3.2

## 8.2.1

### Patch Changes

-   Обновлены зависимости
    -   input@14.3.1

## 8.2.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

-   Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

### Patch Changes

-   Обновлены зависимости
    -   input@14.3.0
    -   slider@4.6.0

## 8.1.0

### Minor Changes

### [#1069](https://github.com/core-ds/core-components/pull/1069)

-   В Slider добавлены колбэки onStart, onEnd.
-   В SliderInput добавлены колбэки onSliderStart, onSliderEnd
-   Исправлена ошибка в 18 реакте с инициализацией слайдера ("Slider was already initialized")

### Patch Changes

-   Обновлены зависимости
    -   input@14.2.0
    -   slider@4.5.0

## 8.0.7

### Patch Changes

-   Обновлены зависимости
    -   input@14.1.2

## 8.0.6

### Patch Changes

-   Обновлены зависимости
    -   input@14.1.1

## 8.0.5

### Patch Changes

-   Обновлены зависимости
    -   input@14.1.0

## 8.0.4

### Patch Changes

-   Обновлены зависимости
    -   input@14.0.1

## 8.0.3

### Patch Changes

-   Обновлены зависимости
    -   input@14.0.0
    -   slider@4.4.0

## 8.0.2

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.2

## 8.0.1

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.1

## 8.0.0

### Major Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах Select и SliderInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалена темизация для intranet и mobile

### Patch Changes

-   Обновлены зависимости
    -   input@13.0.0

## 7.2.10

### Patch Changes

-   Обновлены зависимости
    -   slider@4.3.1
    -   input@12.3.0

## 7.2.9

### Patch Changes

-   Обновлены зависимости
    -   input@12.2.1

## 7.2.8

### Patch Changes

-   Обновлены зависимости
    -   input@12.2.0

## 7.2.7

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.4

## 7.2.6

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.3

## 7.2.5

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.2

## 7.2.4

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.1

## 7.2.3

### Patch Changes

-   Обновлены зависимости
    -   input@12.1.0

## 7.2.2

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.2

## 7.2.1

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.1

## 7.2.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   input@12.0.0
    -   slider@4.3.0

## 7.1.22

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   input@11.1.18
    -   slider@4.2.2

## 7.1.21

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.17

## 7.1.20

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.16

## 7.1.19

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.15

## 7.1.18

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.14

## 7.1.17

### Patch Changes

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

-   Обновлены зависимости
    -   slider@4.2.1
    -   input@11.1.13

## 7.1.16

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.12

## 7.1.15

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.11

## 7.1.14

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.10

## 7.1.13

### Patch Changes

-   Обновлены зависимости
    -   slider@4.2.0

## 7.1.12

### Patch Changes

-   Обновлены зависимости
    -   slider@4.1.6

## 7.1.11

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   slider@4.1.5
    -   input@11.1.9

## 7.1.10

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.8

## 7.1.9

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   input@11.1.7
    -   slider@4.1.4

## 7.1.8

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.6

## 7.1.7

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.5

## 7.1.6

### Patch Changes

### [#508](https://github.com/core-ds/core-components/pull/508)

-   Исправлена ошщибка "replace is not a funcion", если кастомный инпут в onChange обработчике возвращал число, а не строку

## 7.1.5

### Patch Changes

### [#441](https://github.com/core-ds/core-components/pull/441)

-   Исправлено скрытие pips при ошибке или подсказке

-   Обновлены зависимости
    -   input@11.1.4

## 7.1.4

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.3

## 7.1.3

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.2

## 7.1.2

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   input@11.1.1
    -   slider@4.1.3

## 7.1.1

### Patch Changes

### [#362](https://github.com/core-ds/core-components/pull/362)

-   Исправлена ошибка в onChange обработчике, из-за которой некорректно работала вставка значений с пробелом.

## 7.1.0

### Minor Changes

### [#342](https://github.com/core-ds/core-components/pull/342)

-   В компонентах Gallery и Input иконки подгружаемые с 'alfabank.servicecdn.ru' были заменены на иконки из icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   input@11.1.0

## 7.0.3

### Patch Changes

-   Обновлены зависимости
    -   input@11.0.2

## 7.0.2

### Patch Changes

-   Обновлены зависимости
    -   slider@4.1.2

## 7.0.1

### Patch Changes

### [#320](https://github.com/core-ds/core-components/pull/320)

-   Скрыт нативный спиннер (стрелочки) у компонента Input при type='number'

-   Обновлены зависимости
    -   input@11.0.1

## 7.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

### Patch Changes

-   Обновлены зависимости
    -   input@11.0.0

## 6.2.7

### Patch Changes

-   Обновлены зависимости
    -   input@10.2.5

## 6.2.6

### Patch Changes

-   [#289](https://github.com/core-ds/core-components/pull/289): Увеличена кликабельная область слайдера. Thanks [@reme3d2y](https://github.com/reme3d2y)
-   Updated dependencies [[#289](https://github.com/core-ds/core-components/pull/289)]
    -   @alfalab/core-components-slider@4.1.1

## 6.2.5

### Patch Changes

-   @alfalab/core-components-input@10.2.4

## 6.2.4

### Patch Changes

-   Updated dependencies [[#208](https://github.com/core-ds/core-components/pull/208)]
    -   @alfalab/core-components-input@10.2.3

## 6.2.3

### Patch Changes

-   Updated dependencies [[#189](https://github.com/core-ds/core-components/pull/189)]
    -   @alfalab/core-components-input@10.2.2

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.2.1...@alfalab/core-components-slider-input@6.2.2) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [6.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.2.0...@alfalab/core-components-slider-input@6.2.1) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.1.0...@alfalab/core-components-slider-input@6.2.0) (2022-09-06)

### Features

-   **slider-input:** revert steps ([#234](https://github.com/core-ds/core-components/issues/234)) ([d5e312b](https://github.com/core-ds/core-components/commit/d5e312bb7a54e53414e205a57081159033d53efe))

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.0.3...@alfalab/core-components-slider-input@6.1.0) (2022-09-02)

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [6.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.0.2...@alfalab/core-components-slider-input@6.0.3) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.0.1...@alfalab/core-components-slider-input@6.0.2) (2022-08-29)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@6.0.0...@alfalab/core-components-slider-input@6.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.1.2...@alfalab/core-components-slider-input@6.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [5.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.1.1...@alfalab/core-components-slider-input@5.1.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.1.0...@alfalab/core-components-slider-input@5.1.1) (2022-08-11)

### Bug Fixes

-   **slider:** handle slide ([#187](https://github.com/core-ds/core-components/issues/187)) ([709f8df](https://github.com/core-ds/core-components/commit/709f8df47c82c905225dfd4645e345cf14e9f844))

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.5...@alfalab/core-components-slider-input@5.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [5.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.4...@alfalab/core-components-slider-input@5.0.5) (2022-07-25)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [5.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.3...@alfalab/core-components-slider-input@5.0.4) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [5.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.2...@alfalab/core-components-slider-input@5.0.3) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [5.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.1...@alfalab/core-components-slider-input@5.0.2) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@5.0.0...@alfalab/core-components-slider-input@5.0.1) (2022-07-11)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [4.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.4.7...@alfalab/core-components-slider-input@4.5.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   fixed form-control/input/select label and hint margins ([#97](https://github.com/core-ds/core-components/issues/97)) ([abd2f15](https://github.com/core-ds/core-components/commit/abd2f15f210bb63bafe0cee341f0a66b5f2071d7))

## [4.4.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.4.6...@alfalab/core-components-slider-input@4.4.7) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.4.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.4.5...@alfalab/core-components-slider-input@4.4.6) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [4.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.16...@alfalab/core-components-slider-input@4.4.0) (2022-03-04)

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [4.3.16](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.15...@alfalab/core-components-slider-input@4.3.16) (2022-02-17)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.15](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.14...@alfalab/core-components-slider-input@4.3.15) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.14](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.13...@alfalab/core-components-slider-input@4.3.14) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.13](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.12...@alfalab/core-components-slider-input@4.3.13) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.11...@alfalab/core-components-slider-input@4.3.12) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.10...@alfalab/core-components-slider-input@4.3.11) (2022-01-17)

### Bug Fixes

-   **amount-input:** позволяем использовать строки, не рисуем 0 если передана пустая строка ([#941](https://github.com/core-ds/core-components/issues/941)) ([51c954f](https://github.com/core-ds/core-components/commit/51c954f238e7dbdbdbbd517e81e0e944f880ded6))

## [4.3.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.9...@alfalab/core-components-slider-input@4.3.10) (2021-12-29)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.8...@alfalab/core-components-slider-input@4.3.9) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.7...@alfalab/core-components-slider-input@4.3.8) (2021-12-08)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.6...@alfalab/core-components-slider-input@4.3.7) (2021-12-08)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.5...@alfalab/core-components-slider-input@4.3.6) (2021-12-08)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.4...@alfalab/core-components-slider-input@4.3.5) (2021-11-26)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.3...@alfalab/core-components-slider-input@4.3.4) (2021-11-22)

### Bug Fixes

-   **slider-input:** classnames overriding ([#891](https://github.com/core-ds/core-components/issues/891)) ([d63d676](https://github.com/core-ds/core-components/commit/d63d67628c88e54b38244b1f57969844379d311f))

## [4.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.2...@alfalab/core-components-slider-input@4.3.3) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.1...@alfalab/core-components-slider-input@4.3.2) (2021-10-15)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.3.0...@alfalab/core-components-slider-input@4.3.1) (2021-10-11)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [4.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.5...@alfalab/core-components-slider-input@4.3.0) (2021-09-14)

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))
-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

## [4.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.4...@alfalab/core-components-slider-input@4.2.5) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.3...@alfalab/core-components-slider-input@4.2.4) (2021-08-26)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.2...@alfalab/core-components-slider-input@4.2.3) (2021-08-23)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.1...@alfalab/core-components-slider-input@4.2.2) (2021-08-23)

### Bug Fixes

-   **form-control:** l size offset between value and label (PDS-270) ([#781](https://github.com/core-ds/core-components/issues/781)) ([311f8a0](https://github.com/core-ds/core-components/commit/311f8a0eaa97cf7d0c89d4a3cdfc443aef2d763c))
-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

## [4.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.2.0...@alfalab/core-components-slider-input@4.2.1) (2021-08-11)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [4.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.1.0...@alfalab/core-components-slider-input@4.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.0.2...@alfalab/core-components-slider-input@4.1.0) (2021-07-23)

### Features

-   slider input mobile theme (PDS-242) ([#738](https://github.com/core-ds/core-components/issues/738)) ([6e924aa](https://github.com/core-ds/core-components/commit/6e924aa90b63b914b6f5690766e41cddabe18e19))

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.0.1...@alfalab/core-components-slider-input@4.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@4.0.0...@alfalab/core-components-slider-input@4.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.2.0...@alfalab/core-components-slider-input@4.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.6...@alfalab/core-components-slider-input@3.2.0) (2021-06-22)

### Features

-   **slider-input:** design updates ([#673](https://github.com/core-ds/core-components/issues/673)) ([794e3cc](https://github.com/core-ds/core-components/commit/794e3cc99a3b61ec4faa630469dae7e49a56ee0a))

## [3.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.5...@alfalab/core-components-slider-input@3.1.6) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.4...@alfalab/core-components-slider-input@3.1.5) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.3...@alfalab/core-components-slider-input@3.1.4) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.2...@alfalab/core-components-slider-input@3.1.3) (2021-05-18)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.1...@alfalab/core-components-slider-input@3.1.2) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.1.0...@alfalab/core-components-slider-input@3.1.1) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.11...@alfalab/core-components-slider-input@3.1.0) (2021-04-09)

### Bug Fixes

-   **slider-input:** label + info + error issue ([147bb71](https://github.com/core-ds/core-components/commit/147bb716ab6dc500aaf0923d5442560c743e6b66))

### Features

-   **form-control:** add hidden label instead min-width ([a40ffcf](https://github.com/core-ds/core-components/commit/a40ffcf149282c83a834587a9486bc09b2929f90))

## [3.0.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.10...@alfalab/core-components-slider-input@3.0.11) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.9...@alfalab/core-components-slider-input@3.0.10) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.8...@alfalab/core-components-slider-input@3.0.9) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.7...@alfalab/core-components-slider-input@3.0.8) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.5...@alfalab/core-components-slider-input@3.0.7) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [3.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.3...@alfalab/core-components-slider-input@3.0.5) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.2...@alfalab/core-components-slider-input@3.0.3) (2021-03-15)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.1...@alfalab/core-components-slider-input@3.0.2) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@3.0.0...@alfalab/core-components-slider-input@3.0.1) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-slider-input

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.6...@alfalab/core-components-slider-input@3.0.0) (2021-03-04)

### Features

-   **slider-input:** changed size L (72 → 64), added size XL (72) ([f5fda56](https://github.com/core-ds/core-components/commit/f5fda569e0e73a06850914c1e494024a3aaab12c))

### BREAKING CHANGES

-   **slider-input:** size L changed to size XL

## [2.2.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.5...@alfalab/core-components-slider-input@2.2.6) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [2.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.4...@alfalab/core-components-slider-input@2.2.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [2.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.3...@alfalab/core-components-slider-input@2.2.4) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [2.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.2...@alfalab/core-components-slider-input@2.2.3) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [2.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.1...@alfalab/core-components-slider-input@2.2.2) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-slider-input

## [2.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-slider-input@2.2.0...@alfalab/core-components-slider-input@2.2.1) (2021-02-18)

**Note:** Version bump only for package @alfalab/core-components-slider-input
