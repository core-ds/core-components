---
'@alfalab/core-components-slider-input': patch
---

- Исправлен проброс пропа `bold` во внутренний инпут — как в стандартный `Input`, так и в компонент, переданный через проп `Input`
- Начертание задаётся пропом `fontWeight`, как в `Input`. Проп `bold` помечен устаревшим, используйте `fontWeight`
