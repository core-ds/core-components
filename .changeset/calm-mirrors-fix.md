---
'@alfalab/core-components-with-suffix': patch
'@alfalab/core-components-tooltip': patch
'@alfalab/core-components-masked-input': patch
'@alfalab/core-components-popover': patch
'@alfalab/core-components-textarea': patch
'@alfalab/core-components-calendar': patch
'@alfalab/core-components-amount-input': patch
'@alfalab/core-components': patch
---

Исправлена ошибка `Maximum update depth exceeded` для react v18: нестабильный `mergeRefs` вместе с `setState` в callback ref больше не будет уходить бесконечный цикл для `with-suffix`, `tooltip`, `masked-input`, `popover`, `textarea`, `calendar`, `amount-input`
