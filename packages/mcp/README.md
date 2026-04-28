# @alfalab/core-components-mcp

MCP-сервер для работы с библиотекой компонентов [@alfalab/core-components](https://github.com/core-ds/core-components).

## Подключение

### Локальный запуск

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

### Прод-вариант

```json
{
  "mcpServers": {
    "core-components-mcp": {
      "command": "npx",
      "args": ["-y", "core-components-mcp@latest"]
    }
  }
}
```

## Инструменты

### `component_list`

Возвращает список всех доступных компонентов с именами и описаниями.

**Параметры:** нет

---

### `component_info`

Возвращает API компонента: `displayName` и полный список пропсов с типами, дефолтными значениями и описаниями.

| Параметр | Тип | Обязательный | Описание |
|---|---|---|---|
| `component` | `string` | да | Имя компонента (например `Button`, `Input`, `ActionButton`) |

---

### `component_demo`

Возвращает демо-примеры для компонента. Без `name` — список всех демо (заголовки и описания). С `name` — полный код конкретного демо (`desktop` и `mobile`).

| Параметр | Тип | Обязательный | Описание |
|---|---|---|---|
| `component` | `string` | да | Имя компонента (например `Button`, `Input`, `ActionButton`) |
| `name` | `string` | нет | Заголовок демо для получения кода |
