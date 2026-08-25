---
'@alfalab/core-components-universal-modal': patch
---

- `CenterModal`, `SideModal`: механизм ограничения ширины (`width` + `margin.left`/`margin.right`) переведён с инлайн-вычисления по вьюпорту (`getWidthStyle`) на статически сгенерированные CSS-классы (`max-width`), без чтения `window`/`document` и без CSS custom properties
