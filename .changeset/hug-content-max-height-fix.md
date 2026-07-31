---
'@alfalab/core-components-universal-modal': patch
---

- Исправлена регрессия в `UniversalModal` (desktop): для `height="hugContent"` без переданного пропа `margin` не применялось ограничение `max-height`, из-за чего модалка растягивалась по высоте контента и не появлялся внутренний скролл вместо ограничения по высоте вьюпорта
