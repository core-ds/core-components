---
'@alfalab/core-components-universal-date-input': patch
'@alfalab/core-components': patch
---

##### DateInput

- Исправлено сохранение `lastValidDate` при неполном времени для `view="date-time"`,
  теперь автокоррекция возвращает именно последнюю валидную дату/время вместо `minDate`;
