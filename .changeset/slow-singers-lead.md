---
'@alfalab/core-components-universal-modal': patch
'@alfalab/core-components-base-modal': patch
'@alfalab/core-components': patch
---

- Исправлена обработка явного `scrollLock={false}` в `BaseModal`: legacy-блокировка скролла применяется только когда `scrollLock` не передан.
- В `UniversalModal` блокировка скролла теперь управляется через `scrollLock={overlay}` вместо deprecated `disableBlockingScroll`.
