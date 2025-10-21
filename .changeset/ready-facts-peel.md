---
'@alfalab/core-components-system-message': patch
'@alfalab/core-components': patch
---

- `SystemMessage.Controls` корректно применяет `direction="column" | "row"`, даже если кнопки передаются внутри `React.Fragment`.
