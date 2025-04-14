---
'@alfalab/core-components-universal-modal': patch
---

Исправлено закрытие `UniversalModalMobile` при использовании пропса `hasCloser`. Теперь не нужно прокидывать `onClose` компоненту `Header`. Хэндлер будет браться с компонента `UniversalModalMobile`.
