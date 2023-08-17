# Change Log

## 13.1.0

### Minor Changes

### [#789](https://github.com/core-ds/core-components/pull/789)

-   Добавлен проп initialScreenHintSlot для возможности замены ссылки "не приходит сообщение" на кастомный контент
-   Loader заменен на Spinner

### Patch Changes

-   Обновлены зависимости
    -   button@9.0.1

## 13.0.0

### Major Changes

### [#705](https://github.com/core-ds/core-components/pull/705)

-   Удалена responsive точка входа. Теперь responsive компонент импортируется из индексного файла.

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   typography@4.0.0
    -   button@9.0.0
    -   code-input@3.0.0
    -   link@5.1.0
    -   loader@3.1.0
    -   mq@4.2.0

## 12.5.3

### Patch Changes

-   Обновлены зависимости
    -   code-input@2.3.5

## 12.5.2

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   button@8.5.1
    -   code-input@2.3.4
    -   link@5.0.6
    -   loader@3.0.7
    -   typography@3.2.2

## 12.5.1

### Patch Changes

-   Обновлены зависимости
    -   button@8.5.0

## 12.5.0

### Minor Changes

### [#712](https://github.com/core-ds/core-components/pull/712)

-   обновлены минорные версии @alfalab/utils и @alfalab/data

## 12.4.18

### Patch Changes

### [#676](https://github.com/core-ds/core-components/pull/676)

-   Обновлена зависимость @alfalab/hooks

-   Обновлены зависимости
    -   button@8.4.0
    -   link@5.0.5

## 12.4.17

### Patch Changes

### [865f8b492](https://github.com/core-ds/core-components/commit/865f8b4922e46a8011187447783fc26216846591)

-   Убран лишний пробел на мобильном hint-экране

## 12.4.16

### Patch Changes

### [#635](https://github.com/core-ds/core-components/pull/635)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 12.4.15

### Patch Changes

-   Обновлены зависимости
    -   button@8.3.0

## 12.4.14

### Patch Changes

### [#654](https://github.com/core-ds/core-components/pull/654)

-   Удалены лишние dependencies, добавлены отсутствующие

-   Обновлены зависимости
    -   button@8.2.0

## 12.4.13

### Patch Changes

-   Обновлены зависимости
    -   button@8.1.0

## 12.4.12

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   code-input@2.3.3
    -   button@8.0.0
    -   link@5.0.4
    -   loader@3.0.6
    -   typography@3.2.1

## 12.4.11

### Patch Changes

### [#545](https://github.com/core-ds/core-components/pull/545)

-   Добавлен пропс hideCountdownSection, с помощью которого можно скрыть секцию с обратным отсчетом и кнопкой с повторным запросом кода

## 12.4.10

### Patch Changes

-   Обновлены зависимости
    -   button@7.1.1

## 12.4.9

### Patch Changes

-   Обновлены зависимости
    -   typography@3.2.0

## 12.4.8

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   button@7.1.0
    -   code-input@2.3.2
    -   link@5.0.3
    -   loader@3.0.5
    -   typography@3.1.1

## 12.4.7

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.5

## 12.4.6

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.4

## 12.4.5

### Patch Changes

-   Обновлены зависимости
    -   typography@3.1.0

## 12.4.4

### Patch Changes

-   Обновлены зависимости
    -   button@7.0.3

## 12.4.3

### Patch Changes

-   Обновлены зависимости
    -   typography@3.0.8

## 12.4.2

### Patch Changes

### [#396](https://github.com/core-ds/core-components/pull/396)

-   Обновлена версия пакета @alfalab/icons-glyph в зависимостях

## 12.4.1

### Patch Changes

### [#411](https://github.com/core-ds/core-components/pull/411)

-   Исправлен отступ у лоадера в мобильной версии

## 12.4.0

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
    -   code-input@2.3.1
    -   link@5.0.2
    -   loader@3.0.4
    -   typography@3.0.7

## 12.3.5

### Patch Changes

### [#407](https://github.com/core-ds/core-components/pull/407)

-   В CodeInput добавлен новый проп onErrorAnimationEnd
-   В Confirmation теперь сбрасывается состоянии ошибки при включенном пропе clearCodeOnError<br />
-   В Confirmation исправлена ошибка, из-за которой не показывался текст из пропа texts.blockSmsRetry<br />

-   Обновлены зависимости
    -   code-input@2.3.0

## 12.3.4

### Patch Changes

### [#400](https://github.com/core-ds/core-components/pull/400)

-   Исправлена верстка fatal-error экрана
-   Поднята специфичность стилей Confirmation, чтобы они всегда перебивали стили других компонентов.<br />

## 12.3.3

### Patch Changes

-   Обновлены зависимости
    -   typography@3.0.6

## 12.3.2

### Patch Changes

-   Обновлены зависимости
    -   typography@3.0.5

## 12.3.1

### Patch Changes

-   Обновлены зависимости
    -   typography@3.0.4

## 12.3.0

### Minor Changes

### [#343](https://github.com/core-ds/core-components/pull/343)

-   Добавлен проп clearCodeOnError. Если он включен, то при возникновении ошибки код будет очищаться

### Patch Changes

-   Обновлены зависимости
    -   code-input@2.2.0
    -   button@7.0.1

## 12.2.4

### Patch Changes

-   Обновлены зависимости
    -   loader@3.0.3

## 12.2.3

### Patch Changes

-   Обновлены зависимости
    -   typography@3.0.3

## 12.2.2

### Patch Changes

### [#292](https://github.com/core-ds/core-components/pull/292)

-   Новые стили кнопок в теме default
-   Новый вид состояния loading во всех темах (Loader заменён на Spinner)<br />
-   Исправлена высота кнопки ghost в размерах s/m/l/xl (увеличилась на 4px)<br />
-   Исправлена ширина кнопок secondary/tertiary (уменьшилась на 2px)<br />

-   Обновлены зависимости
    -   button@7.0.0

## 12.2.1

### Patch Changes

-   Updated dependencies [[#282](https://github.com/core-ds/core-components/pull/282)]
    -   @alfalab/core-components-button@6.1.2

## 12.2.0

### Minor Changes

-   [#233](https://github.com/core-ds/core-components/pull/233): Добавлены новые компоненты ConfirmationMobile, ConfirmationResponsive. Thanks [@Valeri8888](https://github.com/Valeri8888)
    Обновлены стили компонента для соответствия актуальным макетам

### Patch Changes

-   [#208](https://github.com/core-ds/core-components/pull/208): Обновлён лого в BankCard. Thanks [@reabiliti](https://github.com/reabiliti)
    Обновлены версии зависимостей с иконками (icons-logotype/icons-classic/icons-glyph/icons-flag)

## 12.1.4

### Patch Changes

-   Updated dependencies [[#283](https://github.com/core-ds/core-components/pull/283)]
    -   @alfalab/core-components-link@5.0.1

## 12.1.3

### Patch Changes

-   [#279](https://github.com/core-ds/core-components/pull/279): chore: обновились @alfalab-data и @alfalab/utils версии в зависимостях. Thanks [@EGNKupava](https://github.com/EGNKupava)

## 12.1.2

### Patch Changes

-   Updated dependencies [[#274](https://github.com/core-ds/core-components/pull/274)]
    -   @alfalab/core-components-code-input@2.1.1

## 12.1.1

### Patch Changes

-   [#189](https://github.com/core-ds/core-components/pull/189): Обновлена зависимость @alfalab/icons-glyph. Thanks [@blackraydev](https://github.com/blackraydev)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [12.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@12.0.1...@alfalab/core-components-confirmation@12.1.0) (2022-09-13)

### Features

-   **code-input:** update mobile version ([#230](https://github.com/core-ds/core-components/issues/230)) ([bf66e85](https://github.com/core-ds/core-components/commit/bf66e85b147e22be13f1a62d945aba6012d5ccf5))

## [12.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@12.0.0...@alfalab/core-components-confirmation@12.0.1) (2022-09-12)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [12.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.5...@alfalab/core-components-confirmation@12.0.0) (2022-09-06)

### Bug Fixes

-   **link:** replace component with a button in pseudo mode ([#156](https://github.com/core-ds/core-components/issues/156)) ([6f24cbb](https://github.com/core-ds/core-components/commit/6f24cbb433c4ced85986d5f0e0b3bc1289e0fb8d))

### BREAKING CHANGES

-   **link:** В компоненте Link с пропсом pseudo заменяется дефолтный html-элемент "a" на
    "button"

Co-authored-by: crybabydanchan <crysiscaramel@gmal.com>

## [11.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.4...@alfalab/core-components-confirmation@11.0.5) (2022-09-02)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [11.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.3...@alfalab/core-components-confirmation@11.0.4) (2022-08-31)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [11.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.2...@alfalab/core-components-confirmation@11.0.3) (2022-08-26)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [11.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.1...@alfalab/core-components-confirmation@11.0.2) (2022-08-25)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [11.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@11.0.0...@alfalab/core-components-confirmation@11.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [11.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.4.2...@alfalab/core-components-confirmation@11.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [10.4.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.4.1...@alfalab/core-components-confirmation@10.4.2) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

## [10.4.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.4.0...@alfalab/core-components-confirmation@10.4.1) (2022-08-11)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [10.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.3.3...@alfalab/core-components-confirmation@10.4.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [10.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.3.2...@alfalab/core-components-confirmation@10.3.3) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [10.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.3.1...@alfalab/core-components-confirmation@10.3.2) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [10.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.3.0...@alfalab/core-components-confirmation@10.3.1) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [10.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.2.0...@alfalab/core-components-confirmation@10.3.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [10.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.10...@alfalab/core-components-confirmation@10.2.0) (2022-06-24)

### Features

-   **amount-input:** added functionality to enter negative values ([#106](https://github.com/core-ds/core-components/issues/106)) ([d6b6ca7](https://github.com/core-ds/core-components/commit/d6b6ca71d87b5c4c62d2e87cdbe9d1ff035852c4))

## [10.1.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.9...@alfalab/core-components-confirmation@10.1.10) (2022-06-23)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [10.1.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.8...@alfalab/core-components-confirmation@10.1.9) (2022-06-20)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [10.1.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.7...@alfalab/core-components-confirmation@10.1.8) (2022-06-08)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [10.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.6...@alfalab/core-components-confirmation@10.1.7) (2022-06-03)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [10.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.1.0...@alfalab/core-components-confirmation@10.1.1) (2022-03-04)

### Bug Fixes

-   update glyph deps ([#1019](https://github.com/core-ds/core-components/issues/1019)) ([3e910d0](https://github.com/core-ds/core-components/commit/3e910d0801c4c46bcd399163200c1f7bfaba375e))

# [10.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.0.1...@alfalab/core-components-confirmation@10.1.0) (2022-03-03)

### Features

-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

## [10.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@10.0.0...@alfalab/core-components-confirmation@10.0.1) (2022-02-17)

### Bug Fixes

-   imports for glyph icons ([#994](https://github.com/core-ds/core-components/issues/994)) ([8e807f2](https://github.com/core-ds/core-components/commit/8e807f26abf0f942fe8eadbd201caecb297b35dc))

# [10.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.7...@alfalab/core-components-confirmation@10.0.0) (2022-02-16)

### Features

-   **confirmation:** большое обновление компонента ([#958](https://github.com/core-ds/core-components/issues/958)) ([3e61e7e](https://github.com/core-ds/core-components/commit/3e61e7e6529662d8fb96acb2898a29fd9c1917ab))

### BREAKING CHANGES

-   **confirmation:** Удалена пропса code

-   feat(code-input): ref updates

-   feat(confirmation): updates, fix tests

-   feat(confirmation): initial

-   feat(confirmation): updates

-   feat(confirmation): update tests

-   feat(confirmation): updates

-   feat(confirmation): dont reset code, if error

-   test(confirmation): update snapshot
-   **confirmation:** Удалена пропса code

Co-authored-by: reme3d2y <AYatsenko@alfabank.ru>

## [9.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.6...@alfalab/core-components-confirmation@9.0.7) (2022-02-15)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.5...@alfalab/core-components-confirmation@9.0.6) (2022-02-09)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.4...@alfalab/core-components-confirmation@9.0.5) (2022-02-03)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.3...@alfalab/core-components-confirmation@9.0.4) (2022-02-02)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.2...@alfalab/core-components-confirmation@9.0.3) (2021-12-29)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.1...@alfalab/core-components-confirmation@9.0.2) (2021-12-14)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [9.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@9.0.0...@alfalab/core-components-confirmation@9.0.1) (2021-12-08)

### Bug Fixes

-   актуализируем @alfalab/utils ([#897](https://github.com/core-ds/core-components/issues/897)) ([30fb88e](https://github.com/core-ds/core-components/commit/30fb88eee36f68cabf80069e5125d911fabde4a5))

# [9.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.5.1...@alfalab/core-components-confirmation@9.0.0) (2021-11-26)

### Features

-   **button:** добавлена кнопка размера 40px, изменены скругления ([#886](https://github.com/core-ds/core-components/issues/886)) ([88e657a](https://github.com/core-ds/core-components/commit/88e657a9f0f68b8b58f6e9437053954ee984f83c)), closes [#890](https://github.com/core-ds/core-components/issues/890)

### BREAKING CHANGES

-   **button:** Кнопка размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   feat(codemod): add button xs to xxs transformer

-   feat(tag): добавлен тэг размера 40px, изменены отступы

Добавлен тэг размером 40px, изменены отступы. Тем, кто использовал размер xs, надо заменить размер
на xxs.

-   **button:** Тэг размера xs теперь имеет размер 40px. Тем, кто использовал размер xs, надо
    заменить размер на xxs. Можно воспользоваться codemod.

-   test: update screenshots

-   test: update screenshots

-   feat(button): linter fix

-   feat(button): fix min-width

-   feat(tag): remove vertical paddings

-   feat(tag): remove vertical paddings

-   feat(button): updates

## [8.5.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.5.0...@alfalab/core-components-confirmation@8.5.1) (2021-11-16)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [8.5.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.4.0...@alfalab/core-components-confirmation@8.5.0) (2021-10-18)

### Features

-   **confirmation:** compact code-input if slotsCount > 6 ([99be0e1](https://github.com/core-ds/core-components/commit/99be0e1744d9782824756c8992fd4b986a589dd7))

# [8.4.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.3.0...@alfalab/core-components-confirmation@8.4.0) (2021-10-11)

### Features

-   проставлен role=alert для ошибок ([#850](https://github.com/core-ds/core-components/issues/850)) ([dc634a3](https://github.com/core-ds/core-components/commit/dc634a3d008accfab10192ce234c12ef0ecc7fa9))

# [8.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.2.2...@alfalab/core-components-confirmation@8.3.0) (2021-09-27)

### Features

-   **confirmation:** design update, new type of error "overlimit" and blocking input ([#841](https://github.com/core-ds/core-components/issues/841)) ([1ea5d31](https://github.com/core-ds/core-components/commit/1ea5d3117552f7cc9fcd78092edf634d9020b693))

## [8.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.2.1...@alfalab/core-components-confirmation@8.2.2) (2021-09-14)

### Bug Fixes

-   confirmation & input ([#833](https://github.com/core-ds/core-components/issues/833)) ([f3c0d62](https://github.com/core-ds/core-components/commit/f3c0d62c15b3812205b71685c2d37c0a986677ee))

## [8.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.2.0...@alfalab/core-components-confirmation@8.2.1) (2021-08-27)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [8.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.1.1...@alfalab/core-components-confirmation@8.2.0) (2021-08-23)

### Features

-   **confirmation:** add custom countdown content, change time format ([#804](https://github.com/core-ds/core-components/issues/804)) ([b87ace1](https://github.com/core-ds/core-components/commit/b87ace190013cc873133bd1fff23cb6ae0ae3800))

## [8.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.1.0...@alfalab/core-components-confirmation@8.1.1) (2021-08-04)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [8.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.0.2...@alfalab/core-components-confirmation@8.1.0) (2021-07-23)

### Features

-   **confirmation:** fix timer, some loader refactoring ([#754](https://github.com/core-ds/core-components/issues/754)) ([187bb0e](https://github.com/core-ds/core-components/commit/187bb0e72a75c62b117a49917976903257d90bb7))

## [8.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.0.1...@alfalab/core-components-confirmation@8.0.2) (2021-07-19)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [8.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@8.0.0...@alfalab/core-components-confirmation@8.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [8.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@7.0.0...@alfalab/core-components-confirmation@8.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

# [7.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@6.1.0...@alfalab/core-components-confirmation@7.0.0) (2021-06-28)

### Features

-   **confirmation:** add property for change retry button text ([#720](https://github.com/core-ds/core-components/issues/720)) ([c0f7688](https://github.com/core-ds/core-components/commit/c0f76888cffff8ad4169769bc4615429663352a5))

### BREAKING CHANGES

-   **confirmation:** buttonRetryText renamed to buttonReturnText

Co-authored-by: Alexander Soldatov <aesoldatov@alfabank.ru>

# [6.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@6.0.0...@alfalab/core-components-confirmation@6.1.0) (2021-05-31)

### Features

-   **confirmation:** set up signTitle prop as slot ([#672](https://github.com/core-ds/core-components/issues/672)) ([85e4786](https://github.com/core-ds/core-components/commit/85e47862689f373fd1904495ae7b86d998ad7cec))

# [6.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@5.1.0...@alfalab/core-components-confirmation@6.0.0) (2021-05-25)

### Features

-   **button:** add inverted ([#649](https://github.com/core-ds/core-components/issues/649)) ([be321b0](https://github.com/core-ds/core-components/commit/be321b07e99d20824138ad65141f3fbed1b6e315)), closes [#658](https://github.com/core-ds/core-components/issues/658) [#657](https://github.com/core-ds/core-components/issues/657)

### BREAKING CHANGES

-   **button:** remove inverted themes

# [5.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@5.0.1...@alfalab/core-components-confirmation@5.1.0) (2021-05-25)

### Features

-   **confirmation:** styles updates ([#636](https://github.com/core-ds/core-components/issues/636)) ([da00fc5](https://github.com/core-ds/core-components/commit/da00fc5bf80251f5104452ba326711788c2f7240)), closes [#1](https://github.com/core-ds/core-components/issues/1)

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@5.0.0...@alfalab/core-components-confirmation@5.0.1) (2021-05-18)

**Note:** Version bump only for package @alfalab/core-components-confirmation

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.11...@alfalab/core-components-confirmation@5.0.0) (2021-05-07)

### Features

-   **stack:** add new component ([#612](https://github.com/core-ds/core-components/issues/612)) ([c520f91](https://github.com/core-ds/core-components/commit/c520f91cd22bb9e23fd2f428719865b4c7d5a2a6))

### BREAKING CHANGES

-   **stack:** remove z-index, add stack component

-   feat(modal): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(notification-manager): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(notification): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(popover): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(select): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(toast): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(tooltip): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   feat(stack): fix comment

-   Revert "feat(modal): remove z-index, add stack component"

This reverts commit fcae901c6ec58311701cd491296a7b04016a9a65.

-   feat(base-modal): remove z-index, add stack component

remove z-index, add stack component

-   **stack:** remove z-index, add stack component

-   test(file-upload-item): update snapshot

## [4.1.11](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.10...@alfalab/core-components-confirmation@4.1.11) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.10](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.9...@alfalab/core-components-confirmation@4.1.10) (2021-04-09)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.9](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.8...@alfalab/core-components-confirmation@4.1.9) (2021-04-06)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.7...@alfalab/core-components-confirmation@4.1.8) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.6...@alfalab/core-components-confirmation@4.1.7) (2021-03-30)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.5...@alfalab/core-components-confirmation@4.1.6) (2021-03-24)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.4...@alfalab/core-components-confirmation@4.1.5) (2021-03-19)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [4.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.2...@alfalab/core-components-confirmation@4.1.4) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [4.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.1.0...@alfalab/core-components-confirmation@4.1.2) (2021-03-16)

### Bug Fixes

-   border-radius in packages ([781749e](https://github.com/core-ds/core-components/commit/781749ef38aefd5a6707ac56d2e297dce9f3e073))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.0.1...@alfalab/core-components-confirmation@4.1.0) (2021-03-15)

### Features

-   **vars:** introducing border-radius vars ([1a6fb28](https://github.com/core-ds/core-components/commit/1a6fb287bcfab50048c3a9100645b4dee8cd3395))

## [4.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@4.0.0...@alfalab/core-components-confirmation@4.0.1) (2021-03-14)

### Bug Fixes

-   **button:** set type button by default ([#564](https://github.com/core-ds/core-components/issues/564)) ([59fdefd](https://github.com/core-ds/core-components/commit/59fdefd4f37fbe589840aa8944d88bde5b8cda6e))

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.8...@alfalab/core-components-confirmation@4.0.0) (2021-03-11)

### Bug Fixes

-   **confirmation:** fix bug with timers ([2bdb105](https://github.com/core-ds/core-components/commit/2bdb10505ebb91713bca0b56e4d10af08cbcd4ed))

### Features

-   **confirmation:** add noAttemptsLeftMessage prop ([7dc0e02](https://github.com/core-ds/core-components/commit/7dc0e02074443fd68c13aa0ac54bd966e8968ffc))
-   **confirmation:** always show sms come link ([0a14a54](https://github.com/core-ds/core-components/commit/0a14a54b177ee72ccf8cd8b057ea48db0168c1fb))
-   **confirmation:** confirmation design updates ([69f26e4](https://github.com/core-ds/core-components/commit/69f26e415a195d863686076941b6a3f15f3d1d15))
-   **confirmation:** fix text ([40d4d6b](https://github.com/core-ds/core-components/commit/40d4d6b2261b2e0db79bc160266cc207a1ca3858))

### BREAKING CHANGES

-   **confirmation:** Add phone formatting into component. Phone prop doesn't have to be formatted.

## [3.3.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.7...@alfalab/core-components-confirmation@3.3.8) (2021-03-10)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.6...@alfalab/core-components-confirmation@3.3.7) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.5...@alfalab/core-components-confirmation@3.3.6) (2021-03-03)

### Bug Fixes

-   **confirmation:** add font feature settings ([#540](https://github.com/core-ds/core-components/issues/540)) ([08057f6](https://github.com/core-ds/core-components/commit/08057f6930e9cd19c0213442a4915e366d26e607))

## [3.3.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.4...@alfalab/core-components-confirmation@3.3.5) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.3...@alfalab/core-components-confirmation@3.3.4) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.2...@alfalab/core-components-confirmation@3.3.3) (2021-02-20)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.1...@alfalab/core-components-confirmation@3.3.2) (2021-02-19)

**Note:** Version bump only for package @alfalab/core-components-confirmation

## [3.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-confirmation@3.3.0...@alfalab/core-components-confirmation@3.3.1) (2021-02-18)

**Note:** Version bump only for package @alfalab/core-components-confirmation
