---
"@alfalab/core-components-bottom-sheet": patch
---

fix(bottom-sheet): исправлено поведение scrollToArea при первом рендере, когда еще не выполнены расчеты высоты. Теперь scrollToArea при первом рендере ведет себя так же, как и initialActiveAreaIndex.
