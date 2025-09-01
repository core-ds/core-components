# Траблшутинг для старых версий Chrome

Гайд содержит информацию о проблемах совместимости с устаревшими версиями Chrome и способах их решения в библиотеке Core Components.

## Основные проблемы и решения

### 1. Проблемы с DOCTYPE

**Проблема**: Отсутствие `<!DOCTYPE html>` в `arui-private` приводит к активации режима совместимости (Quirks Mode) в браузере, что вызывает:

-   Неправильное применение CSS стилей
-   Некорректное вычисление размеров элементов
-   Проблемы с позиционированием и выравниванием
-   Нарушение работы flexbox и grid layouts
-   Неправильное отображение margin и padding
-   Проблемы с z-index и наложением элементов

**Решение**:

```html
<!DOCTYPE html>
<html>
    <!-- остальной контент -->
</html>
```

**Важно**: DOCTYPE должен быть указан в самом начале HTML документа, до любых других тегов.

### 2. Проблемы с CSS свойством `gap`

**Проблема**: [Свойство `gap` не поддерживается в Chrome 79 и ниже.](https://github.com/core-ds/core-components/pull/1192)

**Решение**:

```css
/* Вместо gap */
.container {
    gap: 8px;
}

/* Используем margin */
.container {
    /* gap заменен на margin-right для элементов */
}
.item {
    margin-right: 8px;
}
```

### 3. Проблемы с `outline` в Chrome 79

**Проблема**: [Неправильное отображение outline в компонентах `Accordion` и `Segment`.](https://github.com/core-ds/core-components/pull/916)

Для получения нужного поведения можно воспользоваться компонентом `<KeyboardFocusable />` или хуком `@alfalab/hooks/useFocus`. Стили для фокусной обводки доступны через миксин `focus-outline`.

**Решение**:

Используется миксин `@mixin focus-outline` из `packages/vars/src/mixins.css`:

```css
@define-mixin focus-outline {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
}
```

### 4. Проблемы с ResizeObserver

**Проблема**: [`ResizeObserver` не поддерживается в старых браузерах.](https://github.com/core-ds/core-components/pull/902)

**Решение**:

Используется полифилл `@juggle/resize-observer`:

```typescript
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
const observer = new ResizeObserver(callback);
```

### 5. Проблемы с выравниванием иконок

**Проблема**: Неправильное выравнивание success иконок в старых браузерах.

**Причина**: Особенности шрифта Segoe на Windows и Roboto на Android.

**Решение**:

-   Контроль выравнивания через CSS
-   Переход на единый шрифт (планируется)
