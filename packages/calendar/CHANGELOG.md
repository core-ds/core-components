# Change Log

## 7.6.2

### Patch Changes

<sup><time>24.05.2024</time></sup>

### [#1193](https://github.com/core-ds/core-components/pull/1193)

-   Добавили dataTestId к PeriodSlider

-   Обновлены зависимости
    -   modal@9.3.0

## 7.6.1

### Patch Changes

-   Обновлены зависимости
    -   modal@9.2.4

## 7.6.0

### Minor Changes

<sup><time>27.04.2024</time></sup>

### [#1183](https://github.com/core-ds/core-components/pull/1183)

-   Добавлена возможность изменения текста PeriodSlider для состояния когда ему не переданы даты

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.2
    -   modal@9.2.3
    -   icon-button@6.5.6

## 7.5.2

### Patch Changes

-   Обновлены зависимости
    -   button@11.4.1
    -   icon-button@6.5.5
    -   modal@9.2.2

## 7.5.1

### Patch Changes

<sup><time>22.03.2024</time></sup>

### [#1135](https://github.com/core-ds/core-components/pull/1135)

-   Исправлена критическая ошибка генерации списка в мобильном календаре с view="month-only" при установке даты больше трех лет назад

<sup><time>22.03.2024</time></sup>

### [#1140](https://github.com/core-ds/core-components/pull/1140)

-   Добавлен обработчик периода `range` для компонента `PeriodSlider`

-   Обновлены зависимости
    -   button@11.4.0
    -   icon-button@6.5.4
    -   modal@9.2.1

## 7.5.0

### Minor Changes

<sup><time>04.03.2024</time></sup>

### [#1091](https://github.com/core-ds/core-components/pull/1091)

-   Экспортирован мобильный month-only календарь, пофикшены параметры month/defaultMonth для month-only view

## 7.4.0

### Minor Changes

<sup><time>04.03.2024</time></sup>

### [#1111](https://github.com/core-ds/core-components/pull/1111)

-   Добавлен новый пропс onApply, отвечающий за обработку клика по кнопке "Выбрать"
-   Добавлена возможность передавать dataTestId в компонент ModalMobile и его слоты (для CalendarMobile), а также в кнопки подтверждения и сброса

## 7.3.4

### Patch Changes

-   Обновлены зависимости
    -   modal@9.2.0
    -   button@11.3.0
    -   icon-button@6.5.3

## 7.3.3

### Patch Changes

-   Обновлены зависимости
    -   modal@9.1.2

## 7.3.2

### Patch Changes

### [#1071](https://github.com/core-ds/core-components/pull/1071)

-   Исправлено отображение тени в мобильном компоненте (теперь визуально отображается как бордер и не обрезается из-за паддингов в контентной части модалки)

### [#1074](https://github.com/core-ds/core-components/pull/1074)

-   Исправлена ошибка с выбором диапазона дат. (Если dateFrom была равна dateTo и после этого выбиралась меньшая дата, то получался некорректный диапазон, в котором dateTo < dateFrom)

-   Обновлены зависимости
    -   button@11.2.0
    -   icon-button@6.5.2
    -   modal@9.1.1

## 7.3.1

### Patch Changes

-   Обновлены зависимости
    -   modal@9.1.0
    -   shared@0.9.1
    -   button@11.1.1
    -   icon-button@6.5.1

## 7.3.0

### Minor Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Обновлена зависимость @alfalab/icons-glyph

### Patch Changes

-   Обновлены зависимости
    -   button@11.1.0
    -   icon-button@6.5.0
    -   modal@9.0.1
    -   shared@0.9.0

## 7.2.0

### Minor Changes

### [#982](https://github.com/core-ds/core-components/pull/982)

-   В компонентах CalendarInput, CalendarRange, CalendarWithSkeleton, Calendar, Confirmation, DateRangeInput, DateTimeInput, PassCode и Plate цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

### Patch Changes

-   Обновлены зависимости
    -   modal@9.0.0
    -   button@11.0.0
    -   icon-button@6.4.3

## 7.1.3

### Patch Changes

### [#987](https://github.com/core-ds/core-components/pull/987)

-   Немного изменена структура файлов в пакетах для корректной сборки в vite

-   Обновлены зависимости
    -   button@10.0.2
    -   modal@8.1.3
    -   icon-button@6.4.2

## 7.1.2

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.1
    -   icon-button@6.4.1
    -   modal@8.1.2

## 7.1.1

### Patch Changes

-   Обновлены зависимости
    -   button@10.0.0
    -   icon-button@6.4.0
    -   shared@0.8.0
    -   modal@8.1.1

## 7.1.0

### Minor Changes

### [#944](https://github.com/core-ds/core-components/pull/944)

-   Добавлен package.json с module полем в mobile, desktop, shared точки входа

### Patch Changes

### [#940](https://github.com/core-ds/core-components/pull/940)

-   Немного увеличена высота мобильного календаря
-   Кнопки с годами теперь выровнены по левому краю, а не по центру

-   Обновлены зависимости
    -   button@9.1.0
    -   modal@8.1.0
    -   shared@0.7.0
    -   icon-button@6.3.2

## 7.0.9

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.6
    -   icon-button@6.3.1
    -   modal@8.0.9

## 7.0.8

### Patch Changes

### [#877](https://github.com/core-ds/core-components/pull/877)

-   Обертка из CssTransitions больше не используется, если это не нужно

### [#858](https://github.com/core-ds/core-components/pull/858)

-   useMedia заменен на useMatchMedia

### [#866](https://github.com/core-ds/core-components/pull/866)

-   В мобильном календаре с selectorView=full удалена шапка с месяцами
-   Изменена анимация открытия мобильного календаря
-   Исправлена ошибка, из-за которой не работал скролл к выбранном году в списке

-   Обновлены зависимости
    -   icon-button@6.3.0
    -   modal@8.0.8

## 7.0.7

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.5
    -   icon-button@6.2.5
    -   modal@8.0.7

## 7.0.6

### Patch Changes

-   Обновлены зависимости
    -   modal@8.0.6

## 7.0.5

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.4
    -   icon-button@6.2.4
    -   modal@8.0.5

## 7.0.4

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.3
    -   icon-button@6.2.3
    -   modal@8.0.4

## 7.0.3

### Patch Changes

-   Обновлены зависимости
    -   modal@8.0.3

## 7.0.2

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.2
    -   icon-button@6.2.2
    -   modal@8.0.2

## 7.0.1

### Patch Changes

### [#792](https://github.com/core-ds/core-components/pull/792)

-   Исправлена ошибка, из-за которой не всегда выбиралась минимально допустимая дата при указанном minDate

### [#793](https://github.com/core-ds/core-components/pull/793)

-   Добавлены недостающие зависимости в package.json

-   Обновлены зависимости
    -   modal@8.0.1
    -   button@9.0.1
    -   icon-button@6.2.1

## 7.0.0

### Major Changes

### [#702](https://github.com/core-ds/core-components/pull/702)

-   Из index теперь экспортируется responsive версия компонента. Десктопная версия импортируется отсюда -> @alfalab/core-components-calendar/desktop
-   Утилиты и константы экспортируются из shared

### [#702](https://github.com/core-ds/core-components/pull/702)

-   Удалена responsive точка входа. (В проектах нужно заменить импорт @alfalab/core-components-calendar/responsive на @alfalab/core-components-calendar)

### Minor Changes

### [#687](https://github.com/core-ds/core-components/pull/687)

-   Компонент Button заменен на mobile/desktop версии для мобильных и десктопных версий компонентов

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   modal@8.0.0
    -   button@9.0.0
    -   icon-button@6.2.0

## 6.6.2

### Patch Changes

### [#774](https://github.com/core-ds/core-components/pull/774)

-   Исправлены границы выделения выбранного периода при динамической установке значений

## 6.6.1

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   button@8.5.1
    -   icon-button@6.1.3
    -   modal@7.0.15

## 6.6.0

### Minor Changes

### [#758](https://github.com/core-ds/core-components/pull/758)

-   В CalendarMobile добавлен проп onMonthTitleClick

## 6.5.2

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.0
    -   icon-button@6.1.2
    -   modal@7.0.14

## 6.5.1

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.13

## 6.5.0

### Minor Changes

### [#673](https://github.com/core-ds/core-components/pull/673)

-   В мобильных модальных компонентах кнопка подтверждения теперь находится справа

### [#664](https://github.com/core-ds/core-components/pull/664)

-   Для скролла в десктопном календаре используется CSS реализация
-   В мобильном календаре скролл вынесен на обертку ModalMobile

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

-   Обновлены зависимости
    -   button@8.4.0
    -   icon-button@6.1.1
    -   modal@7.0.12

## 6.4.0

### Minor Changes

### [#657](https://github.com/core-ds/core-components/pull/657)

-   В компонент Calendar добавлено свойство showCurrentYearSelector , отвечающее за отображение текущего года

### [#672](https://github.com/core-ds/core-components/pull/672)

-   Добавлена возможность прокидывать обработчик нажатия на период в шапке со слайдером

### Patch Changes

### [#635](https://github.com/core-ds/core-components/pull/635)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

-   Обновлены зависимости
    -   icon-button@6.1.0
    -   modal@7.0.11

## 6.3.3

### Patch Changes

-   Обновлены зависимости
    -   button@8.3.0
    -   icon-button@6.0.12
    -   modal@7.0.10

## 6.3.2

### Patch Changes

-   Обновлены зависимости
    -   button@8.2.0
    -   modal@7.0.9
    -   icon-button@6.0.11

## 6.3.1

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0
    -   icon-button@6.0.10
    -   modal@7.0.8

## 6.3.0

### Minor Changes

### [#616](https://github.com/core-ds/core-components/pull/616)

-   Добавлены пропсы dayAddons - отвечает за дополнительный контент под числом, shape - форма ячейки дня (круглая или прямоугольная)

## 6.2.18

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.7

## 6.2.17

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.6

## 6.2.16

### Patch Changes

### [#612](https://github.com/core-ds/core-components/pull/612)

-   Исправлены отступы

## 6.2.15

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   button@8.0.0
    -   modal@7.0.5
    -   icon-button@6.0.9

## 6.2.14

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.4

## 6.2.13

### Patch Changes

### [#550](https://github.com/core-ds/core-components/pull/550)

-   Исправлен цвет выделения диапазона в темной теме

### [#563](https://github.com/core-ds/core-components/pull/563)

-   Исправлены стили диапозона в календаре

-   Обновлены зависимости
    -   modal@7.0.3

## 6.2.12

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.2

## 6.2.11

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.1
    -   button@7.1.1
    -   icon-button@6.0.8

## 6.2.10

### Patch Changes

-   Обновлены зависимости
    -   modal@7.0.0

## 6.2.9

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

### [#522](https://github.com/core-ds/core-components/pull/522)

-   Исправлена TS ошибка "ref does not exist on type"

-   Обновлены зависимости
    -   button@7.1.0
    -   icon-button@6.0.7
    -   modal@6.1.12

## 6.2.8

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.5
    -   icon-button@6.0.6
    -   modal@6.1.11

## 6.2.7

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.4
    -   icon-button@6.0.5
    -   modal@6.1.10

## 6.2.6

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.9

## 6.2.5

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.8

## 6.2.4

### Patch Changes

### [#443](https://github.com/core-ds/core-components/pull/443)

-   Исправлена ошибка с анимацией при множественных ререндерах

-   Обновлены зависимости
    -   button@7.0.3
    -   icon-button@6.0.4
    -   modal@6.1.7

## 6.2.3

### Patch Changes

-   Обновлены зависимости
    -   icon-button@6.0.3
    -   modal@6.1.6

## 6.2.2

### Patch Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

-   Обновлены зависимости
    -   modal@6.1.5

## 6.2.1

### Patch Changes

### [#422](https://github.com/core-ds/core-components/pull/422)

-   "export" типов заменен на "export type"

## 6.2.0

### Minor Changes

### [#334](https://github.com/core-ds/core-components/pull/334)

-   В компонентах DateRangeInput, DateTimeInput и CalendarInput добавлены mobile и desktop версии компонентов. Название компонентов было изменено по схеме Component → ComponentDesktop
-   В компонентах Calendar и InputAutocomplete добавлена responsive версия компонентов. Название компонентов было изменено по схеме Component → ComponentResponsive<br />
-   В компонентах PickerButton и Tooltip добавлен новый пропс breakpoint. Название компонентов было изменено по схеме Component -→ ComponentResponsive для PickerButton и Component → ComponentDesktop для Tooltip<br />
-   В компонентах Confirmation и SidePanel добавлен новый пропс breakpoint<br />

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   button@7.0.2
    -   icon-button@6.0.2
    -   modal@6.1.4

## 6.1.15

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.3

## 6.1.14

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.2

## 6.1.13

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.1

## 6.1.12

### Patch Changes

-   Обновлены зависимости
    -   modal@6.1.0

## 6.1.11

### Patch Changes

-   Обновлены зависимости
    -   modal@6.0.12
    -   button@7.0.1
    -   icon-button@6.0.1

## 6.1.10

### Patch Changes

-   Обновлены зависимости
    -   modal@6.0.11

## 6.1.9

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.0
    -   icon-button@6.0.0
    -   modal@6.0.10

## 6.1.8

### Patch Changes

-   Обновлены зависимости
    -   modal@6.0.9

## 6.1.7

### Patch Changes

### [#301](https://github.com/core-ds/core-components/pull/301)

-   Исправлена ошибка, из-за которой не рендерился контент CalendarMobile в iOS < 13.4

*   Обновлены зависимости
    -   modal@6.0.8

## 6.1.6

### Patch Changes

-   [#282](https://github.com/core-ds/core-components/pull/282): Обновление vars из последней версии ui-primitives, удалены deprecated цвета и миксины типографики. Thanks [@Valeri8888](https://github.com/Valeri8888)
-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2
    -   @alfalab/core-components-icon-button@5.0.5
    -   @alfalab/core-components-modal@6.0.7

## 6.1.5

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 6.1.4

### Patch Changes

-   [#175](https://github.com/core-ds/core-components/pull/175): Новые компоненты: TimeInput, DateTimeInput, DateRangeInput. Thanks [@blackraydev](https://github.com/blackraydev)

## 6.1.3

### Patch Changes

-   [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)
-   Updated dependencies [[#261](https://github.com/core-ds/core-components/pull/261)]
    -   @alfalab/core-components-modal@6.0.6

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@6.1.1...@alfalab/core-components-calendar@6.1.2) (2022-09-13)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [6.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@6.1.0...@alfalab/core-components-calendar@6.1.1) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@6.0.2...@alfalab/core-components-calendar@6.1.0) (2022-09-02)

### Features

-   testing-library versions update ([#216](https://github.com/core-ds/core-components/issues/216)) ([33b6225](https://github.com/core-ds/core-components/commit/33b62259a1332f535f367502590ea37e7ad051d4))

## [6.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@6.0.1...@alfalab/core-components-calendar@6.0.2) (2022-08-31)

### Bug Fixes

-   fixed missing css vars ([#227](https://github.com/core-ds/core-components/issues/227)) ([42912d3](https://github.com/core-ds/core-components/commit/42912d306657490e8c7f577cb53120767d503fcb))

## [6.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@6.0.0...@alfalab/core-components-calendar@6.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.6.3...@alfalab/core-components-calendar@6.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [5.6.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.6.2...@alfalab/core-components-calendar@5.6.3) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [5.6.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.6.1...@alfalab/core-components-calendar@5.6.2) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.6.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.6.0...@alfalab/core-components-calendar@5.6.1) (2022-08-09)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [5.6.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.8...@alfalab/core-components-calendar@5.6.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [5.5.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.7...@alfalab/core-components-calendar@5.5.8) (2022-07-25)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.6...@alfalab/core-components-calendar@5.5.7) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.5...@alfalab/core-components-calendar@5.5.6) (2022-07-15)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.4...@alfalab/core-components-calendar@5.5.5) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [5.5.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.3...@alfalab/core-components-calendar@5.5.4) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.2...@alfalab/core-components-calendar@5.5.3) (2022-07-11)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.1...@alfalab/core-components-calendar@5.5.2) (2022-07-01)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.5.0...@alfalab/core-components-calendar@5.5.1) (2022-06-30)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [5.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.4.0...@alfalab/core-components-calendar@5.5.0) (2022-06-29)

### Features

-   **calendar:** implement calendar mobile ([#54](https://github.com/core-ds/core-components/issues/54)) ([730f51d](https://github.com/core-ds/core-components/commit/730f51d35823273f122fe84a0369f95745fd2878))

# [5.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.3.5...@alfalab/core-components-calendar@5.4.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

## [5.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.3.4...@alfalab/core-components-calendar@5.3.5) (2022-06-24)

### Bug Fixes

-   **icon-button:** fix disabled colors ([#104](https://github.com/core-ds/core-components/issues/104)) ([3f03849](https://github.com/core-ds/core-components/commit/3f038495bb63f72cd81ceeedbe55b52119581d57))

## [5.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.3.3...@alfalab/core-components-calendar@5.3.4) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [5.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.3.2...@alfalab/core-components-calendar@5.3.3) (2022-06-20)

### Bug Fixes

-   **calendar:** increased specificity of the button css class ([#103](https://github.com/core-ds/core-components/issues/103)) ([3d20c11](https://github.com/core-ds/core-components/commit/3d20c112a1c161951afa2e1c6fca8d3c048501e7))
-   **icon-button:** fix loading ([#105](https://github.com/core-ds/core-components/issues/105)) ([0b133f0](https://github.com/core-ds/core-components/commit/0b133f042e86702ec2861915f2cdbcdbad9ca905))

## [5.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.3.1...@alfalab/core-components-calendar@5.3.2) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [5.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.1.0...@alfalab/core-components-calendar@5.2.0) (2022-03-18)

### Features

-   **calendar:** add intranet theme ([#1026](https://github.com/core-ds/core-components/issues/1026)) ([292b76c](https://github.com/core-ds/core-components/commit/292b76c100bb12ebb1011d2a9981ba2b2899dd7a))

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@5.0.0...@alfalab/core-components-calendar@5.1.0) (2022-03-04)

### Bug Fixes

-   update glyph deps ([#1019](https://github.com/core-ds/core-components/issues/1019)) ([3e910d0](https://github.com/core-ds/core-components/commit/3e910d0801c4c46bcd399163200c1f7bfaba375e))

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.3.0...@alfalab/core-components-calendar@5.0.0) (2022-02-17)

-   refactor/calendar-range (#984) ([714f615](https://github.com/core-ds/core-components/commit/714f61590586bafe1060e652943e95c133ed002a)), closes [#984](https://github.com/core-ds/core-components/issues/984)

### BREAKING CHANGES

-   Большое обновление CalendarRange

-   feat(date-input): add some improvements

-   feat(date-input): some updates

-   feat(date-input): validation

-   feat(calendar): change period selection logic

-   fix(calendar): range styles

-   fix(calendar): fix styles, add rangeComplete flag

-   refactor(calendar-range): temporary

-   fix(calendar-range): fix hook

-   fix(calendar-range): fix period

-   fix(calendar-range): fix tests, fix max date

-   fix: update exports

-   feat(calendar): allow empty values for PeriodSlider, update today

-   fix(calendar-range): hide error icon

-   chore(calendar-range): demo

-   feat(calendar): use IconButton

-   feat(calendar-range): add onChange, update demo

-   fix(calendar-range): update width

-   test(calendar-range): update snapshot

-   fix: import date-fns separately

-   fix(calendar-range): fix rest props

Co-authored-by: dmitrsavk <dmitrsavk@yandex.ru>

# [4.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.2.4...@alfalab/core-components-calendar@4.3.0) (2022-02-17)

### Features

-   **calendar:** design & logic updates ([#991](https://github.com/core-ds/core-components/issues/991)) ([358142c](https://github.com/core-ds/core-components/commit/358142c6d259e1463954139cc648787cdf461f76)), closes [#993](https://github.com/core-ds/core-components/issues/993) [#990](https://github.com/core-ds/core-components/issues/990)

## [4.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.2.3...@alfalab/core-components-calendar@4.2.4) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [4.2.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.2.2...@alfalab/core-components-calendar@4.2.3) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [4.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.2.1...@alfalab/core-components-calendar@4.2.2) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [4.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.2.0...@alfalab/core-components-calendar@4.2.1) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [4.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.1.0...@alfalab/core-components-calendar@4.2.0) (2022-01-27)

### Features

-   **picker-button:** gap между picker-button и popover в 8px ([#935](https://github.com/core-ds/core-components/issues/935)) ([9b3aa2b](https://github.com/core-ds/core-components/commit/9b3aa2b70b534d8e571baa62b973e1f67667ac43))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.0.2...@alfalab/core-components-calendar@4.1.0) (2022-01-17)

### Features

-   **calendar:** split header to header & period-slider ([#939](https://github.com/core-ds/core-components/issues/939)) ([107cee0](https://github.com/core-ds/core-components/commit/107cee0f2b5d609a02b61023b324dcc8c98c5220))

## [4.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.0.1...@alfalab/core-components-calendar@4.0.2) (2021-12-29)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@4.0.0...@alfalab/core-components-calendar@4.0.1) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.2.1...@alfalab/core-components-calendar@4.0.0) (2021-12-08)

-   fix!: новый cdn иконок (#913) (#917) ([224831f](https://github.com/core-ds/core-components/commit/224831f41ed2de49dc1a228dc081b0629cf274b1)), closes [#913](https://github.com/core-ds/core-components/issues/913) [#917](https://github.com/core-ds/core-components/issues/917)

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.gcdn.co data: 'self'`

This reverts commit 953fbcfec46a40089a5cfde670597315269b05f5.

## [3.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.2.0...@alfalab/core-components-calendar@3.2.1) (2021-12-08)

### Bug Fixes

-   revert 0e8124552206f96149d104f65cff1667e857bf01 ([#916](https://github.com/core-ds/core-components/issues/916)) ([953fbcf](https://github.com/core-ds/core-components/commit/953fbcfec46a40089a5cfde670597315269b05f5))

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.1.4...@alfalab/core-components-calendar@3.2.0) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))
-   новый cdn иконок ([#913](https://github.com/core-ds/core-components/issues/913)) ([0e81245](https://github.com/core-ds/core-components/commit/0e8124552206f96149d104f65cff1667e857bf01))

### Features

-   **calendar:** мобильные стили ([#867](https://github.com/core-ds/core-components/issues/867)) ([febf545](https://github.com/core-ds/core-components/commit/febf54551f8179a1ba03fe65ed47aa3b20b01472))
-   **calendar:** показываем будущий год ([#900](https://github.com/core-ds/core-components/issues/900)) ([3cd3c63](https://github.com/core-ds/core-components/commit/3cd3c63e5ff88066599d0944a2d3183e63150664))

## [3.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.1.3...@alfalab/core-components-calendar@3.1.4) (2021-11-26)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [3.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.1.2...@alfalab/core-components-calendar@3.1.3) (2021-09-14)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [3.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.1.1...@alfalab/core-components-calendar@3.1.2) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [3.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.1.0...@alfalab/core-components-calendar@3.1.1) (2021-08-13)

### Bug Fixes

-   **calendar:** fix min\max ([6bd4944](https://github.com/core-ds/core-components/commit/6bd49447492b10583973cdfc43350cf8f96c1ecb))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.0.3...@alfalab/core-components-calendar@3.1.0) (2021-08-04)

### Features

-   add mods colors ([#770](https://github.com/core-ds/core-components/issues/770)) ([fe985f4](https://github.com/core-ds/core-components/commit/fe985f467b4d47a5152e168d2ab3846872d1a574))

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.0.2...@alfalab/core-components-calendar@3.0.3) (2021-07-23)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.0.1...@alfalab/core-components-calendar@3.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@3.0.0...@alfalab/core-components-calendar@3.0.1) (2021-07-09)

### Bug Fixes

-   **calendar:** fix select-button disabled+selected state ([4f54c01](https://github.com/core-ds/core-components/commit/4f54c01451a2532fd377d3590869dfa52c968dcf))
-   **calendar:** limit defaultMonth ([636fa5b](https://github.com/core-ds/core-components/commit/636fa5b1363fbdea8516b95ac758aee65b8cffba))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@2.0.1...@alfalab/core-components-calendar@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@2.0.0...@alfalab/core-components-calendar@2.0.1) (2021-05-31)

**Note:** Version bump only for package @alfalab/core-components-calendar

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.12...@alfalab/core-components-calendar@2.0.0) (2021-05-25)

### Features

-   **button:** add inverted ([#649](https://github.com/core-ds/core-components/issues/649)) ([be321b0](https://github.com/core-ds/core-components/commit/be321b07e99d20824138ad65141f3fbed1b6e315)), closes [#658](https://github.com/core-ds/core-components/issues/658) [#657](https://github.com/core-ds/core-components/issues/657)

### BREAKING CHANGES

-   **button:** remove inverted themes

## [1.2.12](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.11...@alfalab/core-components-calendar@1.2.12) (2021-05-25)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.10...@alfalab/core-components-calendar@1.2.11) (2021-05-18)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.9...@alfalab/core-components-calendar@1.2.10) (2021-05-07)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.8...@alfalab/core-components-calendar@1.2.9) (2021-04-26)

### Bug Fixes

-   **calendar:** ie fixes ([#628](https://github.com/core-ds/core-components/issues/628)) ([983509c](https://github.com/core-ds/core-components/commit/983509cd1cfe5be64a8627fed44ec55d989eb8a2))
-   **tabs:** fix ssr rendering ([#621](https://github.com/core-ds/core-components/issues/621)) ([e45efe7](https://github.com/core-ds/core-components/commit/e45efe78ff2583b92393e9c271f07fe3718b9d40))

## [1.2.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.7...@alfalab/core-components-calendar@1.2.8) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.6...@alfalab/core-components-calendar@1.2.7) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.5...@alfalab/core-components-calendar@1.2.6) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.4...@alfalab/core-components-calendar@1.2.5) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.2.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.2...@alfalab/core-components-calendar@1.2.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.2.0...@alfalab/core-components-calendar@1.2.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [1.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.10...@alfalab/core-components-calendar@1.2.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [1.1.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.9...@alfalab/core-components-calendar@1.1.10) (2021-03-14)

### Bug Fixes

-   **button:** set type button by default ([#564](https://github.com/core-ds/core-components/issues/564)) ([59fdefd](https://github.com/core-ds/core-components/commit/59fdefd4f37fbe589840aa8944d88bde5b8cda6e))

## [1.1.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.8...@alfalab/core-components-calendar@1.1.9) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.7...@alfalab/core-components-calendar@1.1.8) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.6...@alfalab/core-components-calendar@1.1.7) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.5...@alfalab/core-components-calendar@1.1.6) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.4...@alfalab/core-components-calendar@1.1.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.3...@alfalab/core-components-calendar@1.1.4) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.2...@alfalab/core-components-calendar@1.1.3) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-calendar

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-calendar@1.1.1...@alfalab/core-components-calendar@1.1.2) (2021-02-18)

### Bug Fixes

-   update versions ([#525](https://github.com/core-ds/core-components/issues/525)) ([31b2e4c](https://github.com/core-ds/core-components/commit/31b2e4c92fde6e2b63a3391a4e053cd328e93e70))
