# @alfalab/core-components-mcp

MCP-сервер для работы с библиотекой компонентов [@alfalab/core-components](https://github.com/core-ds/core-components).

## Подключение

### Dev

```json
{
    "mcpServers": {
        "core-components-mcp-dev": {
            "command": "npm",
            "args": ["run", "dev"],
            "cwd": "path/to/folder"
        }
    }
}
```

### Prod

```json
{
    "mcpServers": {
        "core-components-mcp": {
            "command": "npx",
            "args": ["-y", "@alfalab/core-components-mcp@latest"]
        }
    }
}
```

## Скилл

Пакет включает skill-файл для AI-агентов (opencode, Claude и других совместимых инструментов). Скилл содержит паттерны работы с библиотекой, описание доступных MCP-инструментов и примеры импортов.

### Установка

Запустите команду в корне проекта:

```bash
npx @alfalab/core-components-mcp@latest add-skill
```

Скилл будет размещён в `.agents/skills/core-components/SKILL.md` относительно директории вызова. Если скилл уже существует — он будет обновлён до актуальной версии.

---

## Скрипты

### `inspect`

Запускает MCP Inspector для локальной проверки сервера:

```bash
yarn inspect
```

### `generate-data`

Перегенерирует данные компонентов для MCP-сервера:

```bash
yarn generate-data
```

Скрипт:

- ищет entry point компонентов в `packages/*/src`;
- собирает пропсы, описание и демо;
- пересоздаёт каталог `src/data/v<version>`;
- обновляет `src/version.ts` по версии из `packages/root/package.json`.

## Инструменты

### `component_list`

Возвращает список всех доступных компонентов с именами и описаниями.

**Параметры:** нет

---

### `component_info`

Возвращает API компонента: `displayName` и полный список пропсов с типами, дефолтными значениями и описаниями.

| Параметр    | Тип      | Обязательный | Описание                                                    |
| ----------- | -------- | ------------ | ----------------------------------------------------------- |
| `component` | `string` | да           | Имя компонента (например `Button`, `Input`, `ActionButton`) |

---

### `component_demo`

Возвращает демо-примеры для компонента. Без `name` — список всех демо (заголовки и описания). С `name` — полный код конкретного демо (`desktop` и `mobile`).

| Параметр    | Тип      | Обязательный | Описание                                                    |
| ----------- | -------- | ------------ | ----------------------------------------------------------- |
| `component` | `string` | да           | Имя компонента (например `Button`, `Input`, `ActionButton`) |
| `name`      | `string` | нет          | Заголовок демо для получения кода                           |
