---
'@alfalab/core-components-select': patch
---

- Исправлена проблема совместимости с CSP-директивами: заменён метод setAttribute('style', '') на removeAttribute('style') для удаления инлайн-стилей
