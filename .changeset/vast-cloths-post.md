---
'@alfalab/core-components-stepped-progress-bar': patch
'@alfalab/core-components': patch
---

##### SteppedProgressBar

- Вернули публичный экспорт `SteppedProgressBarView`, чтобы не приходилось вычислять типы через массивы.
- Исправили тип `view`: теперь он поддерживает одиночное значение и массив цветов без `Array<Array<...>>`.
