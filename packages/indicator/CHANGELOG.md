# @alfalab/core-components-indicator

## 2.0.1

### Patch Changes

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

-   Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

## 2.0.0

### Major Changes

<sup><time>12.02.2024</time></sup>

### [#1026](https://github.com/core-ds/core-components/pull/1026)

-   Добавлены новые способы указать размеры - 8, 20, 24, 40. Буквенные значения размеров xs, s, m, l deprecated, используйте вместо них 8, 20, 24, 40 соответственно
-   Значение, передаваемое в пропс height, определяет диапазон, для которого применяются определенные стили типографики и внутренних отступов компонента. Например, при height={10} стили будут применяться для диапазона от 9 до 16 (при этом 16 - граничное значение высоты). Были внесены изменения в пограничные значения высоты, при которых происходит изменение типографики и внутренних отступов компонента. Ранее изменение происходило в диапазонах высоты: от 0 до 8, от 9 до 18, от 19 до 24, от 25 до 32 и от 33 до 40. Теперь же эти диапазоны составляют от 0 до 8, от 9 до 16, от 17 до 20, от 21 до 24 и от 25 до 40

## 1.2.0

### Minor Changes

### [#973](https://github.com/core-ds/core-components/pull/973)

-   В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

## 1.1.0

### Minor Changes

### [#713](https://github.com/core-ds/core-components/pull/713)

-   Теперь каждый пакет публикуется с исходниками

## 1.0.1

### Patch Changes

### [#766](https://github.com/core-ds/core-components/pull/766)

-   Удален скрипт отправки статистики (send-stats)

## 1.0.0

### Major Changes

### [#670](https://github.com/core-ds/core-components/pull/670)

-   feat(indicator): Добавлен новый компонент Indicator
