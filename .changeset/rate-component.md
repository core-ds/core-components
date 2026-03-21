---
'@alfalab/core-components-rate': major
---

feat(rate): добавлен новый компонент Rate

Компонент для выбора рейтинга (оценки) с помощью иконок.

### Основные возможности:
- Контролируемый и неконтролируемый режим
- Сброс значения по повторному клику (allowClear)
- Кастомные символы (character prop)
- Подсказки для каждого элемента (tooltips)
- Размеры: s, m, l
- Keyboard navigation (Enter, Space)
- Accessibility (ARIA attributes)

### Пример использования:

```tsx
import { Rate } from '@alfalab/core-components-rate';

// Базовое использование
<Rate defaultValue={3} />

// С кастомным символом
import { StarCircleMIcon } from '@alfalab/icons-glyph/StarCircleMIcon';
<Rate character={<StarCircleMIcon />} defaultValue={4} />

// С подсказками
<Rate tooltips={['bad', 'ok', 'good', 'great', 'perfect']} defaultValue={3} />

// Отключенное состояние
<Rate disabled defaultValue={4} />
```
