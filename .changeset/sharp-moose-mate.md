---
"@alfalab/core-components-universal-date-input": patch
---

Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено
