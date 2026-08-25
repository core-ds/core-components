---
'@alfalab/core-components-universal-modal': patch
---

- `CenterModal`, `SideModal`: механизм ограничения ширины и высоты (`width`/`height` + `margin`) переведён с инлайн-вычисления по вьюпорту (`getWidthStyle`, `getHeightStyle`) на статически сгенерированные CSS-классы (`max-width`/`max-height`), без чтения `window`/`document` и без CSS custom properties
