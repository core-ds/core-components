# Change Log

## 1.1.0

### Minor Changes

<sup><time>28.05.2024</time></sup>

### [#1158](https://github.com/core-ds/core-components/pull/1158)

-   В toast-plate компоненте badge заменен на status-badge
-   Добавлена возможность принимать кастомные иконки для status-badge

## Миграция для toast-plate компонента

-   Добавлены изменения в пропс getBadgeIcons. Теперь он будет принимать объект в виде:

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

-   `'negative' | 'positive' | 'attention'` - `@deprеcated`
    Их по-прежнему можно передавать в пропс `badge` (компоненты toast, toast-plate, notification), под капотом они автоматически преобразуютеся в `'negative-cross' | 'positive-checkmark' | 'attention-alert'` соответственно

## 1.0.0

### Major Changes

### [#1007](https://github.com/core-ds/core-components/pull/1007)

-   Добавлен новый компонент StatusBadge
