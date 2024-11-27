# Change Log

## 15.3.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.4.0
    -   button@11.10.2
    -   form-control@12.7.2

## 15.3.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.14.0
    -   button@11.10.1
    -   form-control@12.7.1

## 15.3.0

### Minor Changes

<sup><time>11.11.2024</time></sup>

### [#1402](https://github.com/core-ds/core-components/pull/1402)

-   Изменено поведение пропса `disableUserInput`. Теперь инпут будет получать фокус состояние без каретки ввода.

### Patch Changes

<sup><time>11.11.2024</time></sup>

### [#1413](https://github.com/core-ds/core-components/pull/1413)

-   Исправлен баг с автофокусом и SSR. Каретка при автофокусе теперь программно устанавливается в конец ввода.

## 15.2.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.10.0
    -   form-control@12.7.0

## 15.2.0

### Minor Changes

<sup><time>20.09.2024</time></sup>

### [#1213](https://github.com/core-ds/core-components/pull/1213)

-   Добавлена возможность глобального переопределения breakpoint компонентов [Документация](https://core-ds.github.io/core-components/master/?path=/docs/instructions-breakpoints--docs)

### Patch Changes

-   Обновлены зависимости
    -   button@11.9.0
    -   form-control@12.6.0
    -   shared@0.13.0

## 15.1.3

### Patch Changes

-   Обновлены зависимости
    -   button@11.8.0
    -   form-control@12.5.0

## 15.1.2

### Patch Changes

-   Обновлены зависимости
    -   button@11.7.1

## 15.1.1

### Patch Changes

<sup><time>13.09.2024</time></sup>

### [#1370](https://github.com/core-ds/core-components/pull/1370)

-   Заменили числовые значения на переменные отступов

-   Обновлены зависимости
    -   button@11.7.0
    -   form-control@12.4.0
    -   shared@0.12.1

## 15.1.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

### Patch Changes

-   Обновлены зависимости
    -   button@11.6.0
    -   form-control@12.3.0
    -   status-badge@1.2.0

## 15.0.5

### Patch Changes

<sup><time>04.09.2024</time></sup>

### [#1324](https://github.com/core-ds/core-components/pull/1324)

-   Кнопка "Очистить" оборажается в случае `clear={true}` и `disableUserInput={true}`

<sup><time>04.09.2024</time></sup>

### [#1354](https://github.com/core-ds/core-components/pull/1354)

-   Обновлены наименования переменных отступов

-   Обновлены зависимости
    -   button@11.5.5
    -   form-control@12.2.8

## 15.0.4

### Patch Changes

-   Обновлены зависимости
    -   shared@0.12.0
    -   button@11.5.4
    -   form-control@12.2.7

## 15.0.3

### Patch Changes

-   Обновлены зависимости
    -   form-control@12.2.6

## 15.0.2

### Patch Changes

-   Обновлены зависимости
    -   mq@4.3.0
    -   button@11.5.3
    -   form-control@12.2.5

## 15.0.1

### Patch Changes

-   Обновлены зависимости
    -   button@11.5.2

## 15.0.0

### Major Changes

<sup><time>28.06.2024</time></sup>

### [#1231](https://github.com/core-ds/core-components/pull/1231)

-   Удален тип 'card'
-   Добавлен трансформер input-type-card, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric'

## 14.4.7

### Patch Changes

-   Обновлены зависимости
    -   shared@0.11.0
    -   button@11.5.1
    -   form-control@12.2.4

## 14.4.6

### Patch Changes

-   Обновлены зависимости
    -   button@11.5.0

## 14.4.5

### Patch Changes

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

-   Добавлен параметр displayName для корректного отображения компонентов в React Devtools

-   Обновлены зависимости
    -   button@11.4.5
    -   form-control@12.2.3

## 14.4.4

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

-   Обновлены зависимости
    -   button@11.4.4
    -   status-badge@1.1.1

## 14.4.3

### Patch Changes

-   Обновлены зависимости
    -   shared@0.10.0
    -   status-badge@1.1.0
    -   button@11.4.3
    -   form-control@12.2.2

## 14.4.2

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1210](https://github.com/core-ds/core-components/pull/1210)

-   Изменены типы принимаемых компонентов

<sup><time>24.05.2024</time></sup>

### [#1211](https://github.com/core-ds/core-components/pull/1211)

-   Добавили dataTestId для иконок, обозначающих успешное действие, ошибку и крестик для очистки
-   Компонент Badge заменен на StatusBadge

## 14.4.1

### Patch Changes

<sup><time>15.05.2024</time></sup>

### [#1197](https://github.com/core-ds/core-components/pull/1197)

-   Исправлен отступ кнопок в компоненте `bottom-sheet` для iOS систем

## 14.4.0

### Minor Changes

<sup><time>27.04.2024</time></sup>

### [#1171](https://github.com/core-ds/core-components/pull/1171)

-   Добавлен параметр reason для onInput события

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.2

## 14.3.3

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.1

## 14.3.2

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.0

## 14.3.1

### Patch Changes

-   Обновлены зависимости
    -   form-control@12.2.1

## 14.3.0

### Minor Changes

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

-   Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

### Patch Changes

-   Обновлены зависимости
    -   form-control@12.2.0
    -   button@11.3.0

## 14.2.0

### Minor Changes

### [#1049](https://github.com/core-ds/core-components/pull/1049)

-   Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

### Patch Changes

-   Обновлены зависимости
    -   button@11.2.0
    -   form-control@12.1.0

## 14.1.2

### Patch Changes

-   Обновлены зависимости
    -   badge@5.5.1

## 14.1.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.9.1
    -   button@11.1.1
    -   form-control@12.0.3

## 14.1.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   button@11.1.0
    -   badge@5.5.0
    -   shared@0.9.0
    -   form-control@12.0.2

## 14.0.1

### Patch Changes

-   Обновлены зависимости
    -   form-control@12.0.1

## 14.0.0

### Major Changes

### [#979](https://github.com/core-ds/core-components/pull/979)

-   Прекращена поддержка IE

### Minor Changes

### [#983](https://github.com/core-ds/core-components/pull/983)

-   Кнопка "очистить" вынесена в отдельный компонент и добавлена в shared

### Patch Changes

-   Обновлены зависимости
    -   button@11.0.0
    -   form-control@12.0.0
    -   badge@5.4.0

## 13.0.2

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

-   Обновлены зависимости
    -   button@10.0.2
    -   form-control@11.1.0

## 13.0.1

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.1

## 13.0.0

### Major Changes

### [#931](https://github.com/core-ds/core-components/pull/931)

-   В компонентах FormControl и Input цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
-   Удалены некоторые css переменные для мобильных компонентов и темизация для intranet и mobile

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.0
    -   form-control@11.0.0
    -   badge@5.3.0
    -   shared@0.8.0

## 12.3.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

-   Обновлены зависимости
    -   button@9.1.0
    -   form-control@10.2.0
    -   shared@0.7.0

## 12.2.1

### Patch Changes

### [#887](https://github.com/core-ds/core-components/pull/887)

-   Переработана механика инпута с включенным disableUserInput

-   Обновлены зависимости
    -   button@9.0.6
    -   shared@0.6.0
    -   form-control@10.1.1

## 12.2.0

### Minor Changes

### [#860](https://github.com/core-ds/core-components/pull/860)

-   dataTestId добавлен к аддонам и сообщению об ошибке у FormControl

### [#879](https://github.com/core-ds/core-components/pull/879)

-   Добавлены пропсы rightAddonsProps, leftAddonsProps

### Patch Changes

-   Обновлены зависимости
    -   form-control@10.1.0

## 12.1.4

### Patch Changes

-   Обновлены зависимости
    -   shared@0.5.0
    -   button@9.0.5

## 12.1.3

### Patch Changes

-   Обновлены зависимости
    -   form-control@10.0.1

## 12.1.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.4.0
    -   button@9.0.4

## 12.1.1

### Patch Changes

### [#826](https://github.com/core-ds/core-components/pull/826)

-   При нажатии на крестик очистки инпут больше не теряет фокус

## 12.1.0

### Minor Changes

### [#817](https://github.com/core-ds/core-components/pull/817)

-   Добавлен проп disableUserInput

### [#805](https://github.com/core-ds/core-components/pull/805)

-   feat(select): добавлена возможность фильтрации пунктов

### Patch Changes

-   Обновлены зависимости
    -   shared@0.3.0
    -   button@9.0.3

## 12.0.2

### Patch Changes

### [#807](https://github.com/core-ds/core-components/pull/807)

-   Исправлено выравнивание success иконки в старых браузерах

-   Обновлены зависимости
    -   button@9.0.2

## 12.0.1

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.1

## 12.0.0

### Major Changes

### [#716](https://github.com/core-ds/core-components/pull/716)

-   Для компонента Input добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   badge@5.2.0
    -   button@9.0.0
    -   form-control@10.0.0
    -   mq@4.2.0

## 11.1.18

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   badge@5.1.1
    -   button@8.5.1
    -   form-control@9.0.6

## 11.1.17

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.0

## 11.1.16

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

-   Обновлены зависимости
    -   button@8.4.0

## 11.1.15

### Patch Changes

### [#635](https://github.com/core-ds/core-components/pull/635)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 11.1.14

### Patch Changes

-   Обновлены зависимости
    -   button@8.3.0

## 11.1.13

### Patch Changes

-   Обновлены зависимости
    -   button@8.2.0

## 11.1.12

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0

## 11.1.11

### Patch Changes

-   Обновлены зависимости
    -   badge@5.1.0

## 11.1.10

### Patch Changes

-   Обновлены зависимости
    -   form-control@9.0.5

## 11.1.9

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   button@8.0.0
    -   badge@5.0.2
    -   form-control@9.0.4

## 11.1.8

### Patch Changes

-   Обновлены зависимости
    -   button@7.1.1

## 11.1.7

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   button@7.1.0
    -   badge@5.0.1
    -   form-control@9.0.3

## 11.1.6

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.5

## 11.1.5

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.4

## 11.1.4

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.3

## 11.1.3

### Patch Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

-   Обновлены зависимости
    -   badge@5.0.0

## 11.1.2

### Patch Changes

### [#423](https://github.com/core-ds/core-components/pull/423)

-   Исправлен импорт компонента Badge

## 11.1.1

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   badge@4.0.4
    -   button@7.0.2
    -   form-control@9.0.2

## 11.1.0

### Minor Changes

### [#342](https://github.com/core-ds/core-components/pull/342)

-   В компонентах Gallery и Input иконки подгружаемые с 'alfabank.servicecdn.ru' были заменены на иконки из icons-glyph

## 11.0.2

### Patch Changes

-   Обновлены зависимости
    -   form-control@9.0.1
    -   button@7.0.1

## 11.0.1

### Patch Changes

### [#320](https://github.com/core-ds/core-components/pull/320)

-   Скрыт нативный спиннер (стрелочки) у компонента Input при type='number'

## 11.0.0

### Major Changes

### [#286](https://github.com/core-ds/core-components/pull/286)

-   Новые стили инпутов в теме default (все компоненты на основе FormControl, включая Select)
-   Исправлен отступ до hint в SliderInput (уменьшился на 2px)<br />

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.0
    -   form-control@9.0.0

## 10.2.5

### Patch Changes

### [#293](https://github.com/core-ds/core-components/pull/293)

-   Исправлена высота инпута в OS Windows

## 10.2.4

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2
    -   @alfalab/core-components-form-control@8.3.1

## 10.2.3

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 10.2.2

### Patch Changes

-   [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.2.0...@alfalab/core-components-input@10.2.1) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-input

# [10.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.1.0...@alfalab/core-components-input@10.2.0) (2022-09-12)

### Features

-   **form-control:** new input/select label view (outer) ([#177](https://github.com/core-ds/core-components/issues/177)) ([66beb15](https://github.com/core-ds/core-components/commit/66beb15756de97e17a4d1dd4221fa7f401ee8539))

# [10.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.3...@alfalab/core-components-input@10.1.0) (2022-09-02)

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [10.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.2...@alfalab/core-components-input@10.0.3) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

## [10.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.1...@alfalab/core-components-input@10.0.2) (2022-08-29)

**Note:** Version bump only for package @alfalab/core-components-input

## [10.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@10.0.0...@alfalab/core-components-input@10.0.1) (2022-08-19)

### Bug Fixes

-   omit enterKeyHint prop ([#197](https://github.com/core-ds/core-components/issues/197)) ([72f4946](https://github.com/core-ds/core-components/commit/72f494623c282f61b45539fa1c13d5c45bc5180c))

# [10.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.2...@alfalab/core-components-input@10.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [9.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.1...@alfalab/core-components-input@9.1.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [9.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.1.0...@alfalab/core-components-input@9.1.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-input

# [9.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@9.0.0...@alfalab/core-components-input@9.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

# [9.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.3...@alfalab/core-components-input@9.0.0) (2022-07-25)

### Features

-   Новый cdn alfabank.servicecdn.ru ([#166](https://github.com/core-ds/core-components/issues/166)) ([e29c89e](https://github.com/core-ds/core-components/commit/e29c89edc8cf60ac23df9570eece9e7811eb11f0))

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.servicecdn.ru data: 'self'`

-   chore(screenshot-utils): change cdn

-   feat(cdn-icon): add prop baseUrl

## [8.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.2...@alfalab/core-components-input@8.2.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.1...@alfalab/core-components-input@8.2.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [8.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.2.0...@alfalab/core-components-input@8.2.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.7...@alfalab/core-components-input@8.2.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))
-   fixed form-control/input/select label and hint margins ([#97](https://github.com/core-ds/core-components/issues/97)) ([abd2f15](https://github.com/core-ds/core-components/commit/abd2f15f210bb63bafe0cee341f0a66b5f2071d7))

## [8.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.6...@alfalab/core-components-input@8.1.7) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.1.5...@alfalab/core-components-input@8.1.6) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.7...@alfalab/core-components-input@8.1.0) (2022-03-04)

### Bug Fixes

-   update glyph deps ([#1019](https://github.com/core-ds/core-components/issues/1019)) ([3e910d0](https://github.com/core-ds/core-components/commit/3e910d0801c4c46bcd399163200c1f7bfaba375e))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [8.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.6...@alfalab/core-components-input@8.0.7) (2022-02-17)

### Bug Fixes

-   imports for glyph icons ([#994](https://github.com/core-ds/core-components/issues/994)) ([8e807f2](https://github.com/core-ds/core-components/commit/8e807f26abf0f942fe8eadbd201caecb297b35dc))

## [8.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.5...@alfalab/core-components-input@8.0.6) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.4...@alfalab/core-components-input@8.0.5) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.3...@alfalab/core-components-input@8.0.4) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.2...@alfalab/core-components-input@8.0.3) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-input

## [8.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.1...@alfalab/core-components-input@8.0.2) (2021-12-29)

### Bug Fixes

-   **input:** компонент иконки для кнопки очистки ([#930](https://github.com/core-ds/core-components/issues/930)) ([37049af](https://github.com/core-ds/core-components/commit/37049af84ed475e1932c91f1907fb604893be7d7))

## [8.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@8.0.0...@alfalab/core-components-input@8.0.1) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-input

# [8.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.6...@alfalab/core-components-input@8.0.0) (2021-12-08)

-   fix!: новый cdn иконок (#913) (#917) ([224831f](https://github.com/core-ds/core-components/commit/224831f41ed2de49dc1a228dc081b0629cf274b1)), closes [#913](https://github.com/core-ds/core-components/issues/913) [#917](https://github.com/core-ds/core-components/issues/917)

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.gcdn.co data: 'self'`

This reverts commit 953fbcfec46a40089a5cfde670597315269b05f5.

## [7.3.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.5...@alfalab/core-components-input@7.3.6) (2021-12-08)

### Bug Fixes

-   revert 0e8124552206f96149d104f65cff1667e857bf01 ([#916](https://github.com/core-ds/core-components/issues/916)) ([953fbcf](https://github.com/core-ds/core-components/commit/953fbcfec46a40089a5cfde670597315269b05f5))

## [7.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.4...@alfalab/core-components-input@7.3.5) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))
-   новый cdn иконок ([#913](https://github.com/core-ds/core-components/issues/913)) ([0e81245](https://github.com/core-ds/core-components/commit/0e8124552206f96149d104f65cff1667e857bf01))

## [7.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.3...@alfalab/core-components-input@7.3.4) (2021-11-26)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.2...@alfalab/core-components-input@7.3.3) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.1...@alfalab/core-components-input@7.3.2) (2021-10-15)

### Bug Fixes

-   input & textarea disabled color on safari ([39ea4ef](https://github.com/core-ds/core-components/commit/39ea4ef7e948016a4ffa17c563cfdd13169a3c2b))

## [7.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.3.0...@alfalab/core-components-input@7.3.1) (2021-10-11)

**Note:** Version bump only for package @alfalab/core-components-input

# [7.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.4...@alfalab/core-components-input@7.3.0) (2021-09-14)

### Bug Fixes

-   confirmation & input ([#833](https://github.com/core-ds/core-components/issues/833)) ([f3c0d62](https://github.com/core-ds/core-components/commit/f3c0d62c15b3812205b71685c2d37c0a986677ee))

### Features

-   change error type to ReactNode ([#825](https://github.com/core-ds/core-components/issues/825)) ([c6d95c1](https://github.com/core-ds/core-components/commit/c6d95c1c6239f2b2a3bf2c1639554d8500e794f3))
-   **vars:** updated colors and typography from latest alfa-ui-primitives ([#803](https://github.com/core-ds/core-components/issues/803)) ([0d5b2a3](https://github.com/core-ds/core-components/commit/0d5b2a30a78e70392dd505790a92bc3bc83f9386))

## [7.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.3...@alfalab/core-components-input@7.2.4) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.2...@alfalab/core-components-input@7.2.3) (2021-08-23)

### Bug Fixes

-   **input:** clear icon ([51debd4](https://github.com/core-ds/core-components/commit/51debd46ea2176486cfc1945d74e8d56a4b9387b))

## [7.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.1...@alfalab/core-components-input@7.2.2) (2021-08-23)

### Bug Fixes

-   **form-control:** l size offset between value and label (PDS-270) ([#781](https://github.com/core-ds/core-components/issues/781)) ([311f8a0](https://github.com/core-ds/core-components/commit/311f8a0eaa97cf7d0c89d4a3cdfc443aef2d763c))
-   **input:** smart error icon ([#746](https://github.com/core-ds/core-components/issues/746)) ([f1950d6](https://github.com/core-ds/core-components/commit/f1950d6d516d17d993f0865c10390b6301bb2707)), closes [#782](https://github.com/core-ds/core-components/issues/782)

## [7.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.2.0...@alfalab/core-components-input@7.2.1) (2021-08-11)

### Bug Fixes

-   extend hint type to ReactNode ([#792](https://github.com/core-ds/core-components/issues/792)) ([d02784e](https://github.com/core-ds/core-components/commit/d02784e392f5ca3a30ae009109fbb6351967f746))

# [7.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.1.0...@alfalab/core-components-input@7.2.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

# [7.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.2...@alfalab/core-components-input@7.1.0) (2021-07-23)

### Bug Fixes

-   **input:** autofocus ([#761](https://github.com/core-ds/core-components/issues/761)) ([e2880de](https://github.com/core-ds/core-components/commit/e2880de6cff33b156bea58286bb46e0803e254a5))

### Features

-   **input:** input mobile theme (PDS-241) ([#737](https://github.com/core-ds/core-components/issues/737)) ([88f6f7c](https://github.com/core-ds/core-components/commit/88f6f7c58968b9564970eaa3d759aa2bc275ca7e))

## [7.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.1...@alfalab/core-components-input@7.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [7.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@7.0.0...@alfalab/core-components-input@7.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-input

# [7.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.2.0...@alfalab/core-components-input@7.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [6.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.3...@alfalab/core-components-input@6.2.0) (2021-06-22)

### Features

-   **slider-input:** design updates ([#673](https://github.com/core-ds/core-components/issues/673)) ([794e3cc](https://github.com/core-ds/core-components/commit/794e3cc99a3b61ec4faa630469dae7e49a56ee0a))

## [6.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.2...@alfalab/core-components-input@6.1.3) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.1...@alfalab/core-components-input@6.1.2) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.1.0...@alfalab/core-components-input@6.1.1) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-input

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.14...@alfalab/core-components-input@6.1.0) (2021-05-18)

### Features

-   **input:** pretty webkit autofill ([#660](https://github.com/core-ds/core-components/issues/660)) ([d50e83e](https://github.com/core-ds/core-components/commit/d50e83e627e1641c3634ace505b9abe163ef6530))

## [6.0.14](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.13...@alfalab/core-components-input@6.0.14) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.13](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.12...@alfalab/core-components-input@6.0.13) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.11...@alfalab/core-components-input@6.0.12) (2021-04-09)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.10...@alfalab/core-components-input@6.0.11) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.9...@alfalab/core-components-input@6.0.10) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.8...@alfalab/core-components-input@6.0.9) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.7...@alfalab/core-components-input@6.0.8) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.5...@alfalab/core-components-input@6.0.7) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [6.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.3...@alfalab/core-components-input@6.0.5) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

## [6.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.2...@alfalab/core-components-input@6.0.3) (2021-03-15)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.1...@alfalab/core-components-input@6.0.2) (2021-03-14)

**Note:** Version bump only for package @alfalab/core-components-input

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@6.0.0...@alfalab/core-components-input@6.0.1) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-input

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.6...@alfalab/core-components-input@6.0.0) (2021-03-04)

### Features

-   **input:** changed size L (72 → 64), added size XL (72) ([79699e3](https://github.com/core-ds/core-components/commit/79699e34d28075809e537b73911875ff5fc2d406))

### BREAKING CHANGES

-   **input:** size L changed to size XL

## [5.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.5...@alfalab/core-components-input@5.1.6) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.4...@alfalab/core-components-input@5.1.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.3...@alfalab/core-components-input@5.1.4) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.2...@alfalab/core-components-input@5.1.3) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.1...@alfalab/core-components-input@5.1.2) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-input

## [5.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-input@5.1.0...@alfalab/core-components-input@5.1.1) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
