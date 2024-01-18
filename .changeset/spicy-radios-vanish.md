---
'@alfalab/core-components-calendar': patch
'@alfalab/core-components-universal-date-input': patch
---

Исправлена ошибка с выбором диапазона дат. (Если dateFrom была равна dateTo и после этого выбиралась меньшая дата, то получался некорректный диапазон, в котором dateTo < dateFrom)
