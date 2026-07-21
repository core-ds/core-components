# Figma Code Connect

Привязка компонентов библиотеки к component set в Figma (Web :: Core), чтобы в Dev Mode и через Figma MCP показывались сниппеты с реальными импортами `@alfalab/core-components/*` и props.

Требования: Figma Organization/Enterprise, Full или Dev seat. Документация: [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect), [CLI quickstart](https://developers.figma.com/docs/code-connect/quickstart-guide/).

## Установка

Зависимость уже в корневом `devDependencies`: `@figma/code-connect`. Конфиг — `figma.config.json` в корне репозитория. Шаблоны — `packages/**/code-connect/**/*.figma.tsx` (рядом с пакетом, вне `src`, чтобы не попадать в build/tsconfig пакета).

Токен Figma (Personal Access Token) со scope **Code Connect: Write** и **File content: Read**:

```bash
export FIGMA_ACCESS_TOKEN=figd_...
```

## Публикация

```bash
yarn figma:connect:publish
```

Эквивалент: `npx figma connect publish` (токен из `FIGMA_ACCESS_TOKEN` или `--token=`).

Снять привязку:

```bash
yarn figma:connect:unpublish -- --node='https://www.figma.com/design/…?node-id=…' --label=React
```

Без `--node` CLI снимает все опубликованные из текущего include — используйте осторожно.

## Проверка

1. Откройте [Web :: Core](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core).
2. Выберите инстанс подключённого компонента (например `[D] Button`).
3. Dev Mode → Inspect: сниппет с импортом из `@alfalab/core-components/...` и props по вариантам инстанса.

## Button (v1)

Файл: `packages/button/code-connect/Button.figma.tsx`.

| Figma                 | Код                                   |
| --------------------- | ------------------------------------- |
| `[D] Button`          | `ButtonDesktop`                       |
| `[M] Button`          | `ButtonMobile`                        |
| `[D] Button_Inverted` | `ButtonDesktop` + `colors="inverted"` |
| `[M] Button_Inverted` | `ButtonMobile` + `colors="inverted"`  |

Смаплено: `view`, `size`, `shape`, `disabled`, `children` (Label), `hint`.

Не в v1: `leftAddons` / `rightAddons`, SingleIcon, loading, block, textResizing, nowrap, allowBackdropBlur.

Канон маппинга Figma ↔ code для команды ДС — bridge Button в репозитории инструкций Core-skills (`04-targets/01-bridge/03-components/01-buttons/01-button/bridge.md`). При расхождении править `.figma.tsx` вместе с bridge.

## CI

Автопубликация в CI в первом PR не настроена: publish вручную после merge в `master` (нужен секрет с токеном и политика org).
