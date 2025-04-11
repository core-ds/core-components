---
'@alfalab/core-components-universal-modal': patch
---

Исправлено закрытие модалки при использовании пропса `hasCloser`. Теперь не нужно прокидывать `onClose` компоненту `Header` - хэндлер будет браться с компонента `UniversalModal`
