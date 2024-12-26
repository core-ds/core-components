# Change Log

## 1.2.2

### Patch Changes

<sup><time>26.12.2024</time></sup>

### [#1509](https://github.com/core-ds/core-components/pull/1509)

-   Добавлено "sideEffects": false, чтобы бандлер лучше делал тришейк.

## 1.2.1

### Patch Changes

<sup><time>13.12.2024</time></sup>

### [#1478](https://github.com/core-ds/core-components/pull/1478)

-   Вендор classnames обновлён 2.3.1 -> 2.5.1

## 1.2.0

### Minor Changes

<sup><time>10.09.2024</time></sup>

### [#1347](https://github.com/core-ds/core-components/pull/1347)

-   Добавлена сборка moderncssm (ES2020, esm, сырые css-модули, отключен импорт базовых токенов)

## 1.1.1

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

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
