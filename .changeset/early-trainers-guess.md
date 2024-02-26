---
"@alfalab/core-components-tab-bar": major
---

- Изменили компонент, отвечающий за индикатор таба с Badge на Indicator. Следовательно, изменился тип свойства indicatorProps с BadgeProps на IndicatorProps

## Миграция с предыдущей версии

- Для того чтобы передать значение в индикатор необходимо заменить content на value. Например: indicatorProps: { content: 100 } -> indicatorProps: { value: 100 }
