---
"@alfalab/core-components-notification": major
"@alfalab/core-components-shared": minor
"@alfalab/core-components-status-badge": minor
"@alfalab/core-components-toast-plate": major
"@alfalab/core-components-toast": major
---

- В toast-plate компоненте badge заменен на status-badge
- Добавлена возможность принимать кастомные иконки для status-badge

## Миграция для toast-plate компонента

- Добавлены изменения в пропс getBadgeIcons. Теперь он будет принимать объект в виде: 
```
{
  'positive-checkmark': {
      24: AScoresCircleMIcon,
  },
  'negative-cross': {
    ...
  },
}
```

- `'negative' | 'positive' | 'attention'` - `@deprеcated`
  Их по-прежнему можно передавать в пропс `badge` (компоненты toast, toast-plate, notification), под капотом они автоматически преобразуютеся в `'negative-cross' | 'positive-checkmark' | 'attention-alert'` соответственно
