---
'@alfalab/core-components-date-time-input': major
'@alfalab/core-components-date-range-input': patch
---

- Исправлен borderRadius у календаря
- Исправлена ошибка, из-за которой коллбэки onChange и onComplete в компоненте DateTimeInput не вызывались, если даты выбиралась с помощью календаря
- В компоненте DateTimeInput изменена типизация onChange и onComplete коллбэков. Теперь event опциональный, так как при выборе даты в пикере ChangeEvent в инпуте не происходит
- В компоненте DateTimeInput исправлена ошибка, из-за которой не подставлялось время после закрытия мобильного календаря
- В компоненте DateRangeInput исправлены ошибки, из-за которых в коллбэке onComplete передавалось неверное значение value и при полной очистке инпута период в календаре не сбрасывался
