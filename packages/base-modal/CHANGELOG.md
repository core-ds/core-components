# Change Log

## 5.5.0

### Minor Changes

### [#940](https://github.com/core-ds/core-components/pull/940)

-   getScrollbarSize перенесена в shared

### Patch Changes

-   Обновлены зависимости
    -   shared@0.7.0

## 5.4.1

### Patch Changes

### [#880](https://github.com/core-ds/core-components/pull/880)

-   Убран "bounce effect" в safari при скролле контента

## 5.4.0

### Minor Changes

### [#791](https://github.com/core-ds/core-components/pull/791)

-   Добавлен проп contentProps, componentDivProps

## 5.3.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

### Patch Changes

-   Обновлены зависимости
    -   backdrop@3.1.0
    -   global-store@2.1.0
    -   portal@3.2.0
    -   stack@4.1.0

## 5.2.1

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

-   Обновлены зависимости
    -   backdrop@3.0.7
    -   portal@3.1.5

## 5.2.0

### Minor Changes

### [#745](https://github.com/core-ds/core-components/pull/745)

-   Добавлен usePortal проп

## 5.1.3

### Patch Changes

-   Обновлены зависимости
    -   backdrop@3.0.6

## 5.1.2

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

-   Обновлены зависимости
    -   backdrop@3.0.5
    -   global-store@2.0.4
    -   portal@3.1.4
    -   stack@4.0.4

## 5.1.1

### Patch Changes

### [#540](https://github.com/core-ds/core-components/pull/540)

-   Изменена нода с overflow: auto в SidePanelMobile

## 5.1.0

### Minor Changes

### [#494](https://github.com/core-ds/core-components/pull/494)

-   В ModalContext у base-modal добавлен ref на div-обертку модальных окон
-   У компонентов Modal, SidePanel и BottomSheet обновлён компонент заголовка и изменены основные отступы<br />

## 5.0.10

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

-   Обновлены зависимости
    -   backdrop@3.0.4
    -   portal@3.1.3
    -   stack@4.0.3

## 5.0.9

### Patch Changes

### [#523](https://github.com/core-ds/core-components/pull/523)

-   Обновлена зависимость react-focus-lock

## 5.0.8

### Patch Changes

### [#470](https://github.com/core-ds/core-components/pull/470)

-   Обновлена версия react-transition-group

-   Обновлены зависимости
    -   backdrop@3.0.3

## 5.0.7

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

-   Обновлены зависимости
    -   backdrop@3.0.2
    -   global-store@2.0.3
    -   portal@3.1.2
    -   stack@4.0.2

## 5.0.6

### Patch Changes

-   Обновлены зависимости
    -   portal@3.1.1

## 5.0.5

### Patch Changes

-   Обновлены зависимости
    -   global-store@2.0.2

## 5.0.4

### Patch Changes

### [#306](https://github.com/core-ds/core-components/pull/306)

-   В portal добавлен проп immediateMount, с помощью которого можно мгновенно отрендерить дочерние элементы через портал.
-   В base-modal исправлена проблема с доступом к ref-ам контента, который рендерился через portal.<br />

*   Обновлены зависимости
    -   portal@3.1.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@5.0.2...@alfalab/core-components-base-modal@5.0.3) (2022-09-13)

### Bug Fixes

-   **base-modal:** fixed scroll to top issues ([#224](https://github.com/core-ds/core-components/issues/224)) ([2e3fdd2](https://github.com/core-ds/core-components/commit/2e3fdd22a4af2b043c428a3ad800b82ac4166d5d))
-   **base-modal:** fixed ssr error in element matches polyfill ([#257](https://github.com/core-ds/core-components/issues/257)) ([a6e05b1](https://github.com/core-ds/core-components/commit/a6e05b15ed4aabea7ffea0566d7fb121d72b8729))

## [5.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@5.0.1...@alfalab/core-components-base-modal@5.0.2) (2022-09-12)

### Bug Fixes

-   **base-modal:** Added element matches polyfill for IE11 ([#245](https://github.com/core-ds/core-components/issues/245)) ([cb95740](https://github.com/core-ds/core-components/commit/cb95740b931ec48d2f92a2cb64a148400b6cb135))

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@5.0.0...@alfalab/core-components-base-modal@5.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-base-modal

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.3.1...@alfalab/core-components-base-modal@5.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [4.3.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.3.0...@alfalab/core-components-base-modal@4.3.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [4.3.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.2.2...@alfalab/core-components-base-modal@4.3.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

## [4.2.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.2.1...@alfalab/core-components-base-modal@4.2.2) (2022-07-25)

### Bug Fixes

-   **base-modal:** fixed click on scrollbar bug ([#165](https://github.com/core-ds/core-components/issues/165)) ([c9df897](https://github.com/core-ds/core-components/commit/c9df8977a6f2e30d753a1f825bb6bad061179a6e))

## [4.2.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.2.0...@alfalab/core-components-base-modal@4.2.1) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-base-modal

# [4.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.5...@alfalab/core-components-base-modal@4.2.0) (2022-07-15)

### Features

-   **bottom-sheet:** add props for disable blocking scroll and modal wrapper classname ([#147](https://github.com/core-ds/core-components/issues/147)) ([a873c20](https://github.com/core-ds/core-components/commit/a873c2035d4885c1b8e5ffae02ce75c4826d1e71))

## [4.1.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.4...@alfalab/core-components-base-modal@4.1.5) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [4.1.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.3...@alfalab/core-components-base-modal@4.1.4) (2022-07-14)

### Bug Fixes

-   **base-modal:** fix overflow hidden bug ([#128](https://github.com/core-ds/core-components/issues/128)) ([eb953b9](https://github.com/core-ds/core-components/commit/eb953b9866dae8c28bf8265d6884cdf1544ae63c))

## [4.1.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.2...@alfalab/core-components-base-modal@4.1.3) (2022-07-11)

### Bug Fixes

-   **base-modal:** fix using resize observer ([#136](https://github.com/core-ds/core-components/issues/136)) ([cb8f03c](https://github.com/core-ds/core-components/commit/cb8f03ca55394316189d1d4529ee3fdb691538d9))
-   fixed 'window is not defined' error ([#126](https://github.com/core-ds/core-components/issues/126)) ([f4e9ca5](https://github.com/core-ds/core-components/commit/f4e9ca54ed52fb328d21c85b7efa8176a90dcb6e))

## [4.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.1...@alfalab/core-components-base-modal@4.1.2) (2022-07-01)

### Performance Improvements

-   refuse to use a resize-observer polyfill if it is not needed ([#120](https://github.com/core-ds/core-components/issues/120)) ([f2abcb2](https://github.com/core-ds/core-components/commit/f2abcb2888dd5906b345f5fc64b1624eef56ac13))

## [4.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.1.0...@alfalab/core-components-base-modal@4.1.1) (2022-06-30)

### Bug Fixes

-   **base-modal:** fixed outside modal click ([#115](https://github.com/core-ds/core-components/issues/115)) ([6a08f72](https://github.com/core-ds/core-components/commit/6a08f726521dcd9a310b0e06345950429eac246a))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@4.0.2...@alfalab/core-components-base-modal@4.1.0) (2022-06-28)

### Features

-   circumflexus retrieval ([#57](https://github.com/core-ds/core-components/issues/57)) ([3820da8](https://github.com/core-ds/core-components/commit/3820da818bcdcbee6904c648b3e29c3c828fe202))

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@3.2.0...@alfalab/core-components-base-modal@4.0.0) (2022-03-24)

### Features

-   **bottom-sheet:** update-bottom-sheet ([#1025](https://github.com/core-ds/core-components/issues/1025)) ([26fa9aa](https://github.com/core-ds/core-components/commit/26fa9aab68bebf0f7093a38bc0f18a9b596ccf37)), closes [#1032](https://github.com/core-ds/core-components/issues/1032)

### BREAKING CHANGES

-   **bottom-sheet:** Большое обновление стилей, множество дополнительных настроек

# [3.2.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@3.1.0...@alfalab/core-components-base-modal@3.2.0) (2022-03-01)

### Features

-   **base-modal:** add component ref for base modal ([#1008](https://github.com/core-ds/core-components/issues/1008)) ([fb13dbd](https://github.com/core-ds/core-components/commit/fb13dbdf6352b10b80a74fa87edfcb1f54b76d5a))
-   Исправить импорты в сторях. ([#998](https://github.com/core-ds/core-components/issues/998)) ([e6a654a](https://github.com/core-ds/core-components/commit/e6a654a0599451c7d149484cb61d8067eed083b7))

# [3.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@3.0.2...@alfalab/core-components-base-modal@3.1.0) (2022-01-17)

### Features

-   **base-modal:** extract modal store to global ([#943](https://github.com/core-ds/core-components/issues/943)) ([9587f17](https://github.com/core-ds/core-components/commit/9587f1773bb690ac6696077509d4a519aa109198))

## [3.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@3.0.1...@alfalab/core-components-base-modal@3.0.2) (2021-09-14)

### Bug Fixes

-   **base-modal:** modal scroll ([#820](https://github.com/core-ds/core-components/issues/820)) ([1b2d94a](https://github.com/core-ds/core-components/commit/1b2d94ad45e04145bf1292d749ae2028702dc622))

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@3.0.0...@alfalab/core-components-base-modal@3.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-base-modal

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@2.1.1...@alfalab/core-components-base-modal@3.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [2.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@2.1.0...@alfalab/core-components-base-modal@2.1.1) (2021-07-02)

### Bug Fixes

-   **base-modal:** resubscribe observer when content node changed ([2fef06e](https://github.com/core-ds/core-components/commit/2fef06eea01354f58663a5f4470606123d31f9d4))

# [2.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@2.0.2...@alfalab/core-components-base-modal@2.1.0) (2021-06-28)

### Bug Fixes

-   **base-modal:** fix has scroll bug ([#712](https://github.com/core-ds/core-components/issues/712)) ([a6749a1](https://github.com/core-ds/core-components/commit/a6749a149d511b28cc59aaec188d59c380c64243))

### Features

-   **bottom-sheet:** new component (PDS-228) ([#645](https://github.com/core-ds/core-components/issues/645)) ([1f7391d](https://github.com/core-ds/core-components/commit/1f7391df16a270d8a3a28b8ebaf98d0ed0928bc8)), closes [#642](https://github.com/core-ds/core-components/issues/642) [#642](https://github.com/core-ds/core-components/issues/642) [#646](https://github.com/core-ds/core-components/issues/646) [#646](https://github.com/core-ds/core-components/issues/646) [#634](https://github.com/core-ds/core-components/issues/634) [#635](https://github.com/core-ds/core-components/issues/635) [#634](https://github.com/core-ds/core-components/issues/634) [#635](https://github.com/core-ds/core-components/issues/635) [#648](https://github.com/core-ds/core-components/issues/648) [#647](https://github.com/core-ds/core-components/issues/647) [#630](https://github.com/core-ds/core-components/issues/630) [#648](https://github.com/core-ds/core-components/issues/648) [#630](https://github.com/core-ds/core-components/issues/630) [#669](https://github.com/core-ds/core-components/issues/669)

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@2.0.1...@alfalab/core-components-base-modal@2.0.2) (2021-05-28)

### Bug Fixes

-   **base-modal:** restore body styles on unmount ([#671](https://github.com/core-ds/core-components/issues/671)) ([963a6b1](https://github.com/core-ds/core-components/commit/963a6b18b13924a09cda672a662d0b402d00e75b))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@2.0.0...@alfalab/core-components-base-modal@2.0.1) (2021-05-25)

### Bug Fixes

-   **modal:** fix styles ([#665](https://github.com/core-ds/core-components/issues/665)) ([06f3615](https://github.com/core-ds/core-components/commit/06f3615c532f8ec2932d8a4d1fcbb1f5ee6b6a30))
-   **modal:** restore styles after exited ([#663](https://github.com/core-ds/core-components/issues/663)) ([48a8d69](https://github.com/core-ds/core-components/commit/48a8d6986dcde6c191d8411d51f28e6f399e26e6))

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@1.1.2...@alfalab/core-components-base-modal@2.0.0) (2021-04-26)

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

## [1.1.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@1.1.1...@alfalab/core-components-base-modal@1.1.2) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-base-modal

## [1.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-base-modal@1.1.0...@alfalab/core-components-base-modal@1.1.1) (2021-04-09)

### Bug Fixes

-   **base-modal:** correct cb ([256a142](https://github.com/core-ds/core-components/commit/256a142398a9ada34386e92d012185763cedef5a))

# 1.1.0 (2021-04-09)

### Features

-   **backdrop:** add component ([948a6c2](https://github.com/core-ds/core-components/commit/948a6c2fb5ec58edb2d087691ce4713d75da6e35))
