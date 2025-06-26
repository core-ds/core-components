---
'@alfalab/core-components-universal-date-input': minor
---

Добавлена возможность отслеживания источника ввода ('input' / 'calendar') для view = 'date' и 'date-range' (параметр source в колбэке onChange).
Исправлен баг, из-за которого onChange из calendarProps перезаписывался внутренним обработчиком
