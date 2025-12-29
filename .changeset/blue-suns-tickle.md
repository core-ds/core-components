---
'@alfalab/core-components-popover': patch
'@alfalab/core-components': patch
---

##### Popover

- Позиционирование Popper теперь использует `strategy: 'fixed'`, чтобы поповер с большим контентом не увеличивал `documentElement.scrollHeight` и не ломал скролл страницы.
