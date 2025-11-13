---
'@alfalab/core-components-stepped-progress-bar': minor
'@alfalab/core-components': minor
---

- Расширена поддержка кастомных цветов в пропсе `view`: теперь можно прокидывать любые CSS-строки (hex, rgba, токены `var(...)`)
- Пресетные цвета (`positive`, `negative`, `attention` и т.д.) используют CSS классы как раньше
- Кастомные цвета автоматически применяются через `style={{ background }}`
