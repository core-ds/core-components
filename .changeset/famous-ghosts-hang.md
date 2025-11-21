---
'@alfalab/core-components-checkbox': minor
'@alfalab/core-components': minor
---

##### Checkbox

- Добавлен prop `position` для управления положением чекбокса относительно контента ('before' | 'after')
- Добавлен prop `showCheckmark` для управления видимостью визуального чекбокса (по умолчанию `true`)
- При `showCheckmark: false` чекбокс скрывается, но контент (`label`, `hint`, `error`) продолжает отображаться
- Логика позиционирования и видимости чекбокса полностью инкапсулирована внутри компонента
