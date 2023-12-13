---
'@alfalab/core-components-modal': minor
'@alfalab/core-components-side-panel': minor
---

- Исправлена ошибка с dataTestId в заголовках. В версии 44.4.0 явно переданный dataTestId в Header не работал.
- Добавлены функции getSidePanelTestIds, getModalTestIds для удобного поиска элементов модальных сущностей. Импортировать их можно из @alfalab/core-components/{modal,side-panel}/shared.
