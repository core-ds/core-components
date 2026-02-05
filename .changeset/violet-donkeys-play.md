---
'@alfalab/core-components-bottom-sheet': patch
---

##### BottomSheet

- Исправлен визуальный скачок шторки при динамической смене `magneticAreasProp` (например, skeleton → content).
- При изменении пропа временно отключается CSS transition для мгновенного перехода на новую позицию.
