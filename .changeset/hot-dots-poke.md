---
"@alfalab/core-components-intl-phone-input": major
---

- Добавлено состояние невыбранной страны — `canBeEmptyCountry`
- Добавлена возможность отключить селект выбора стран — `hideCountrySelect`
- Колбэк `onCountryChange` теперь может принимать undefined в случаях, когда установлен пропс `canBeEmptyCountry: true`
- Добавлен режим приоритета ввода российского номера (при дефолтно выбранном российском флаге ввод числа добавит +7) — `ruNumberPriority`
- Добавлен пропс `clear` для сброса страны при очистке поля
