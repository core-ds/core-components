## Тулзы для модификации кода

### Использование

1. Установить к себе на проект:

```bash
$ yarn add --dev @alfalab/core-components-codemod
```

2. Запустить нужные трансформеры:

Какой-то один трансформер:

```bash
$ npx @alfalab/core-components-codemod --transformers=button-xs src/**/*.tsx
```

Можно сразу несколько трансформеров:

```bash
$ npx @alfalab/core-components-codemod --transformers=button-xs,button-views src/**/*.tsx
```

Сейчас замена компонентов доступна только для кода, написанного на `typescript`. Если кому-то нужно мигрировать с `js` - дайте знать, докрутим.

### Список доступных трансформеров

| Название     | Описание                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------- |
| paragraph    | Меняет компонент `Paragraph` из `arui-feather` на актульный компонент из `core-components` |
| label        | Меняет компонент `Label` из `arui-feather` на актульный компонент из `core-components`     |
| heading      | Меняет компонент `Heading` из `arui-feather` на актульный компонент из `core-components`   |
| button-xs    | Изменяет размер кнопки с `xs` на `xxs`                                                     |
| button-views | Меняет вид кнопки с `filled` \| `transparent` на `secondary`, `outlined` на `tertiary`     |
| replace-color-vars | Заменяет цветовые токены при преходе на core-components v27 и выше: |
|              | `--color-light-border-secondary-inverted`: `--color-light-border-underline` |
|              | `--color-light-border-tertiary-inverted`: `--color-light-border-underline-inverted` |
|              | `--color-light-graphic-neutral`: `--color-light-graphic-quaternary` |
|              | `--color-light-bg-neutral`: `--color-light-bg-quaternary` |
|              | `--color-dark-graphic-neutral`: `--color-dark-graphic-quaternary` |
|              | `--color-dark-bg-neutral`: `--color-dark-bg-quaternary` |
|              | `--color-static-bg-neutral-light`: `--color-static-bg-quaternary-light` |
|              | `--color-static-bg-neutral-dark`: `--color-static-bg-quaternary-dark` |

## Разработка

Под капотом - [jscodeshift](https://github.com/facebook/jscodeshift).

### Запуск тестов

```bash
$ npx jest packages/codemod/src --config=jest.codemod.config.js
```
