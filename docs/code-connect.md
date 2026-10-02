# Figma Code Connect

Привязка компонентов библиотеки к component set в Figma (Web :: Core), чтобы в Dev Mode и через Figma MCP показывались сниппеты с реальными импортами `@alfalab/core-components/*` и props.

Конфиг — `figma.config.json` в корне. Шаблоны — `packages/**/code-connect/**/*.figma.tsx`. Документация Figma: [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect).

Скрипты: `yarn figma:connect:publish`, `yarn figma:connect:unpublish`.

## Button

Файлы: `packages/button/code-connect/` (`Button.figma.tsx`, `Diamonds.figma.tsx`).

| Figma        | Код                                    |
| ------------ | -------------------------------------- |
| `[D] Button` | `ButtonDesktop`                        |
| `[M] Button` | `ButtonMobile`                         |
| `*_Inverted` | тот же компонент + `colors="inverted"` |

Смаплено:

- `view`, `size`, `shape`, `disabled`
- `children` (Label), `hint`
- `leftAddons` / `rightAddons` — по boolean + `Type` у вложенного 🔩 Addon (эталон diamonds; `figma.children` не проходит через FRAME)
- `loading` — LeftAddon + Addon `Type=Spinner`

Не мапятся (нет свойств в Figma): `block`, `textResizing`, `nowrap`, `allowBackdropBlur`.

На один component set — одна CLI-привязка.
