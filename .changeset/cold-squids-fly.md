---
'@alfalab/core-components-bottom-sheet': patch
---

- Исправлен регресс из #1923 — при первом открытии шторки контент просвечивал под закрепленным футером
- Фон футера наследуется от шторки. Для переопределения используйте `footerClassName`
- Переменные `--bottom-sheet-footer-background-color` и `--bottom-sheet-footer-background-color-inverted` больше не используются
