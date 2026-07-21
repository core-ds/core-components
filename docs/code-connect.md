# Figma Code Connect

Привязка компонентов библиотеки к component set в Figma (Web :: Core), чтобы в Dev Mode и через Figma MCP показывались сниппеты с реальными импортами `@alfalab/core-components/*` и props.

Требования: Figma Organization/Enterprise, Full или Dev seat. Документация: [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect), [CLI quickstart](https://developers.figma.com/docs/code-connect/quickstart-guide/).

## Установка

Зависимость: `@figma/code-connect` в корневом `devDependencies`. Конфиг — `figma.config.json`. Шаблоны — `packages/**/code-connect/**/*.figma.tsx` (вне `src`, чтобы не попадать в build пакета).

Токен (Personal Access Token: **Code Connect: Write**, **File content: Read**):

```bash
# из общего хранилища VibeMinus:
set -a && source ~/Desktop/VibeMinus/.secrets.env && set +a
```

или `export FIGMA_ACCESS_TOKEN=…`.

## Публикация

```bash
yarn figma:connect:publish
# если уже были UI-привязки:
yarn figma:connect:publish --force
```

Снять привязку:

```bash
yarn figma:connect:unpublish -- --node='https://www.figma.com/design/…?node-id=…' --label=React
```

## Проверка

1. [Web :: Core](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core) → инстанс Button.
2. Dev Mode → Inspect: импорт `@alfalab/core-components/button/...` и props по вариантам.

## Button

Файлы: `packages/button/code-connect/` (`Button.figma.tsx`, `Addon.figma.tsx`, `Diamonds.figma.tsx`).

| Figma        | Код                                    |
| ------------ | -------------------------------------- |
| `[D] Button` | `ButtonDesktop`                        |
| `[M] Button` | `ButtonMobile`                         |
| `*_Inverted` | тот же компонент + `colors="inverted"` |

Смаплено:

- `view`, `size`, `shape`, `disabled`
- `children` (Label), `hint`
- `leftAddons` / `rightAddons` (через 🔩 Addon + вложенный glyph)
- `SingleIcon` (отдельные сниппеты без children)
- `loading` (LeftAddon + Addon `Type=Spinner`)

Не мапятся (нет свойств компонента в Figma): `block`, `textResizing`, `nowrap`, `allowBackdropBlur`.

Канон маппинга — bridge Button в Core-skills. При расхождении править `.figma.tsx` вместе с bridge.

## CI

Автопубликация в CI пока не настроена — publish вручную после merge.
