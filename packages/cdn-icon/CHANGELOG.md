# Change Log

## 5.4.2

### Patch Changes

-   Обновлены зависимости
    -   shared@0.18.0

## 5.4.1

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.1

## 5.4.0

### Minor Changes

<sup><time>23.05.2025</time></sup>

### [#1696](https://github.com/core-ds/core-components/pull/1696)

-   Добавлена возможность пробросить колбек onError в компонент CDNIcon

## 5.3.5

### Patch Changes

-   Обновлены зависимости
    -   shared@0.17.0

## 5.3.4

### Patch Changes

<sup><time>17.03.2025</time></sup>

### [#1622](https://github.com/core-ds/core-components/pull/1622)

-   Использование `use-sync-external-store` через shim для обратной совместимости `React`

## 5.3.3

### Patch Changes

<sup><time>28.02.2025</time></sup>

### [#1558](https://github.com/core-ds/core-components/pull/1558)

-   Рефакторинг `CDNIcon`: логика вынесена в хук `useIcon`, кеширование иконки переписано на `useSyncExternalStore`

<sup><time>28.02.2025</time></sup>

### [#1558](https://github.com/core-ds/core-components/pull/1558)

-   Исправлен баг `CDNIcon`, когда при изменении пропса `name` не менялась иконка

## 5.3.2

### Patch Changes

<sup><time>09.01.2025</time></sup>

### [#1461](https://github.com/core-ds/core-components/pull/1461)

-   Обновление зависимостей

## 5.3.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

<sup><time>13.12.2024</time></sup>

### [#1486](https://github.com/core-ds/core-components/pull/1486)

-   Добавлены sideEffects: false. Помогает бандлерам убирать неиспользуемые части кода при сборке (treeshake). Часть 2.

## 5.3.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 5.2.2

### Patch Changes

<sup><time>19.07.2024</time></sup>

### [#1290](https://github.com/core-ds/core-components/pull/1290)

-   Добавлено кэширование иконок, чтобы предотвратить их перезагрузку при повторном монтировании

## 5.2.1

### Patch Changes

### [#890](https://github.com/core-ds/core-components/pull/890)

-   CDNIcon теперь занимает всю ширину и высоту IconView

## 5.2.0

### Minor Changes

### [#811](https://github.com/core-ds/core-components/pull/811)

-   Добавлен проп fallback

## 5.1.1

### Patch Changes

### [#793](https://github.com/core-ds/core-components/pull/793)

-   Добавлены недостающие зависимости в package.json

## 5.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 5.0.7

### Patch Changes

### [#778](https://github.com/core-ds/core-components/pull/778)

-   Исправлено отображение цветных иконок

## 5.0.6

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 5.0.5

### Patch Changes

### [#588](https://github.com/core-ds/core-components/pull/588)

-   Добавлен \_\_esModule в cjs экспорт

## 5.0.4

### Patch Changes

### [#526](https://github.com/core-ds/core-components/pull/526)

-   В зависимости добавлена библиотека tslib

## 5.0.3

### Patch Changes

### [#418](https://github.com/core-ds/core-components/pull/418)

-   Исправлена проблема с default-импортом в cjs форматах

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@5.0.1...@alfalab/core-components-cdn-icon@5.0.2) (2022-09-01)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [5.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@5.0.0...@alfalab/core-components-cdn-icon@5.0.1) (2022-08-19)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

# [5.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@4.1.1...@alfalab/core-components-cdn-icon@5.0.0) (2022-08-17)

### Features

-   removed dist directory in published packages ([#200](https://github.com/core-ds/core-components/issues/200)) ([8af8fee](https://github.com/core-ds/core-components/commit/8af8fee53ca0bd19fa2d1ca1422e0df23096e2c8))

### BREAKING CHANGES

-   Изменена директория расположения индексных файлов в опубликованных пакетах (удалена
    директория dist)

Co-authored-by: Vladimir Gevak <VGevak@alfabank.ru>

## [4.1.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@4.1.0...@alfalab/core-components-cdn-icon@4.1.1) (2022-08-17)

### Bug Fixes

-   returned dist directory ([#199](https://github.com/core-ds/core-components/issues/199)) ([fabc15e](https://github.com/core-ds/core-components/commit/fabc15effa1457ca65ec7238206f1b1fc2a2a613))

# [4.1.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@4.0.0...@alfalab/core-components-cdn-icon@4.1.0) (2022-08-04)

### Features

-   react 18 support ([#159](https://github.com/core-ds/core-components/issues/159)) ([2e6693c](https://github.com/core-ds/core-components/commit/2e6693c62f534e333aadb7d3fff4ffd78ac84c63))

# [4.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.7...@alfalab/core-components-cdn-icon@4.0.0) (2022-07-25)

### Features

-   Новый cdn alfabank.servicecdn.ru ([#166](https://github.com/core-ds/core-components/issues/166)) ([e29c89e](https://github.com/core-ds/core-components/commit/e29c89edc8cf60ac23df9570eece9e7811eb11f0))

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.servicecdn.ru data: 'self'`

-   chore(screenshot-utils): change cdn

-   feat(cdn-icon): add prop baseUrl

## [3.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.6...@alfalab/core-components-cdn-icon@3.0.7) (2022-07-18)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [3.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.5...@alfalab/core-components-cdn-icon@3.0.6) (2022-07-15)

### Bug Fixes

-   bump packages version ([#153](https://github.com/core-ds/core-components/issues/153)) ([fd3e082](https://github.com/core-ds/core-components/commit/fd3e08205672129cdce04e1000c673f2cd9c10da))

## [3.0.5](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.4...@alfalab/core-components-cdn-icon@3.0.5) (2022-07-14)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [3.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.3...@alfalab/core-components-cdn-icon@3.0.4) (2022-07-12)

### Bug Fixes

-   **cdn-icon:** edited icon size fit svg ([#141](https://github.com/core-ds/core-components/issues/141)) ([54098bf](https://github.com/core-ds/core-components/commit/54098bff366b8a3715b986d7c3e37556b60bb2bf))

## [3.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.2...@alfalab/core-components-cdn-icon@3.0.3) (2022-06-28)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [3.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@3.0.0...@alfalab/core-components-cdn-icon@3.0.1) (2022-01-27)

### Bug Fixes

-   **cdn-icon:** add className prop ([#957](https://github.com/core-ds/core-components/issues/957)) ([86f2139](https://github.com/core-ds/core-components/commit/86f2139fc56fe1cd2669d05d7953075aa8982e22))

# [3.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@2.0.3...@alfalab/core-components-cdn-icon@3.0.0) (2021-12-08)

-   fix!: новый cdn иконок (#913) (#917) ([224831f](https://github.com/core-ds/core-components/commit/224831f41ed2de49dc1a228dc081b0629cf274b1)), closes [#913](https://github.com/core-ds/core-components/issues/913) [#917](https://github.com/core-ds/core-components/issues/917)

### BREAKING CHANGES

-   Добавьте новый домен в список разрешенных 'img-src': `'self' alfabank.gcdn.co data: 'self'`

This reverts commit 953fbcfec46a40089a5cfde670597315269b05f5.

## [2.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@2.0.2...@alfalab/core-components-cdn-icon@2.0.3) (2021-12-08)

### Bug Fixes

-   revert 0e8124552206f96149d104f65cff1667e857bf01 ([#916](https://github.com/core-ds/core-components/issues/916)) ([953fbcf](https://github.com/core-ds/core-components/commit/953fbcfec46a40089a5cfde670597315269b05f5))

## [2.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@2.0.1...@alfalab/core-components-cdn-icon@2.0.2) (2021-12-08)

### Bug Fixes

-   новый cdn иконок ([#913](https://github.com/core-ds/core-components/issues/913)) ([0e81245](https://github.com/core-ds/core-components/commit/0e8124552206f96149d104f65cff1667e857bf01))

## [2.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@2.0.0...@alfalab/core-components-cdn-icon@2.0.1) (2021-07-09)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

# [2.0.0](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.8...@alfalab/core-components-cdn-icon@2.0.0) (2021-07-08)

### Features

-   upgrade storybook ([#696](https://github.com/core-ds/core-components/issues/696))

## [1.0.8](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.7...@alfalab/core-components-cdn-icon@1.0.8) (2021-04-26)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [1.0.7](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.6...@alfalab/core-components-cdn-icon@1.0.7) (2021-04-01)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [1.0.6](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.4...@alfalab/core-components-cdn-icon@1.0.6) (2021-03-18)

### Bug Fixes

-   one more sborka bug ([#579](https://github.com/core-ds/core-components/issues/579)) ([9fbe0be](https://github.com/core-ds/core-components/commit/9fbe0beca56ec5971de78b3f6cda25305b260efc))

## [1.0.4](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.3...@alfalab/core-components-cdn-icon@1.0.4) (2021-03-04)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [1.0.3](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.2...@alfalab/core-components-cdn-icon@1.0.3) (2021-03-03)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon

## [1.0.2](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.1...@alfalab/core-components-cdn-icon@1.0.2) (2021-02-20)

### Bug Fixes

-   **toast-plate:** polish toast-plate themes ([#527](https://github.com/core-ds/core-components/issues/527)) ([57d73d4](https://github.com/core-ds/core-components/commit/57d73d47b089997b2cc0d85e37b70f068c945e50))

## [1.0.1](https://github.com/core-ds/core-components/compare/@alfalab/core-components-cdn-icon@1.0.0...@alfalab/core-components-cdn-icon@1.0.1) (2021-02-18)

**Note:** Version bump only for package @alfalab/core-components-cdn-icon
