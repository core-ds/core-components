# @alfalab/core-components-carousel

## 1.1.0

### Minor Changes

<sup><time>29.05.2026</time></sup>

#### [#2229](https://github.com/core-ds/core-components/pull/2229)

##### Carousel

- Добавлена поддержка короткого свайпа - проп `shortSwipe`
- Добавлены пропсы для более тонкой обработки жестов, для случаев использования `Carousel` внутри компонентов с поддержкой свайпов, например `BottomSheet`:
    - `touchMoveStopPropagation` для остановки всплытия событий при свайпе
    - `captureEvent` для захвата события при свайпе

### Patch Changes

<sup><time>29.05.2026</time></sup>

#### [#2229](https://github.com/core-ds/core-components/pull/2229)

##### Carousel

- Исключены непредвиденные скроллы при свайпе `Carousel` внутри скроллящихся контейнеров
- Уточнена типизация

## 1.0.0

### Major Changes

<sup><time>25.05.2026</time></sup>

#### [#2173](https://github.com/core-ds/core-components/pull/2173)

##### Carousel

- Добавлен новый компонент `Carousel`

### Patch Changes

#### Обновлены зависимости

- @alfalab/core-components-shared@2.2.0
