# Core-DS MCP Server

Легковесный сервер Model Context Protocol (MCP) для изучения дизайн-системы "core-ds".

## Обзор

Этот MCP сервер предоставляет инструменты для изучения и понимания библиотеки компонентов "core-ds", предоставляя информацию о компонентах, их документации, примерах использования и определениях типов.

## Инструменты

1. **`list_components`** — выводит список всех доступных имён компонентов в библиотеке core-ds
2. **`get_component_stories`** — получает примеры использования из файлов \*.stories.tsx для конкретного компонента
3. **`get_component_props`** — получает основной файл компонента для просмотра TypeScript интерфейсов/типов

## Установка

1. В папке `/mcp` установите зависимости:

    ```bash
    npm install
    ```

2. Соберите проект:
    ```bash
    npm run build
    ```

## Использование

1. Скачать репозиторий `core-components` версии, которая используется на проекте.
2. Если в нём ещё нет папки `/mcp`, скопировать свежую версию в проект.

Сервер ожидает, что репозиторий компонентов расположен по пути `../core-components`. Вы также можете указать пользовательский путь с помощью переменной окружения `CORE_DS_PATH`.

## Как использовать с Cline

Чтобы использовать этот MCP сервер с Cline, добавьте следующую конфигурацию в настройки Cline:

```json
{
    "mcpServers": {
        "core-ds-expert": {
            "disabled": false,
            "timeout": 60,
            "type": "stdio",
            "command": "node",
            "args": ["/path/to/core-components/mcp/dist/index.js"],
            "env": {
                "CORE_DS_PATH": "/path/to/core-components"
            }
        }
    }
}
```

## Как использовать с KiloCode

Для использования MCP сервера с KiloCode, добавьте конфигурацию в файл настроек KiloCode:

```json
{
    "mcp": {
        "servers": {
            "core-ds-expert": {
                "command": "node",
                "args": ["/path/to/core-components/mcp/dist/index.js"],
                "env": {
                    "CORE_DS_PATH": "/path/to/core-components"
                }
            }
        }
    }
}
```

Или укажите путь к серверу в настройках KiloCode через UI:

1. Откройте настройки KiloCode
2. Перейдите в раздел "MCP Servers"
3. Добавьте новый сервер с именем `core-ds-expert`
4. Укажите команду `node` и аргументы `[ "/path/to/core-components/mcp/dist/index.js" ]`
5. Добавьте переменную окружения `CORE_DS_PATH` с путем к репозиторию core-components

## Как использовать с Continue Dev

Для настройки MCP сервера в Continue Dev, отредактируйте файл конфигурации `~/.continue/config.json`:

```json
{
    "mcpServers": [
        {
            "name": "core-ds-expert",
            "command": "node",
            "args": ["/path/to/core-components/mcp/dist/index.js"],
            "env": {
                "CORE_DS_PATH": "/path/to/core-components"
            }
        }
    ]
}
```

Альтернативно, вы можете использовать файл `.continue/mcp.json` в корне вашего проекта:

```json
{
    "mcpServers": {
        "core-ds-expert": {
            "command": "node",
            "args": ["/path/to/core-components/mcp/dist/index.js"],
            "env": {
                "CORE_DS_PATH": "/path/to/core-components"
            }
        }
    }
}
```

После настройки:

1. Перезапустите Continue Dev
2. MCP сервер будет автоматически подключен
3. Используйте инструменты через чат Continue для изучения компонентов core-ds

## Примеры запросов

После настройки MCP сервера, вы можете использовать следующие типы запросов в чате с AI-ассистентом:

### Получить список всех компонентов

**Пример запроса:**

```
Покажи список всех доступных компонентов в core-ds
```

**Что делает:** Вызовет метод `list_components` и вернёт список всех имён компонентов.

**Пример ответа:**

```
Доступные компоненты: Accordion, ActionButton, Alert, Amount, Badge, Button, Calendar, Checkbox, Input, Modal, Select, Switch, Table, Tabs, Tag...
```

### Получить примеры использования компонента

**Пример запроса:**

```
Покажи примеры использования компонента Button
```

**Что делает:** Вызовет метод `get_component_stories` для компонента Button и вернёт примеры из файлов \*.stories.tsx.

**Пример ответа:**

```
Примеры использования Button:

1. Базовое использование:
<Button>Нажми меня</Button>

2. С вариантом оформления:
<Button view="primary">Primary</Button>
<Button view="secondary">Secondary</Button>

3. С размером:
<Button size="s">Small</Button>
<Button size="m">Medium</Button>
<Button size="l">Large</Button>
```

### Получить свойства (props) компонента

**Пример запроса:**

```
Какие свойства у компонента Input?
```

**Что делает:** Вызовет метод `get_component_props` и вернёт TypeScript интерфейсы компонента.

**Пример ответа:**

```
Основные свойства компонента Input:

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 's' | 'm' | 'l';
  ...
}
```

### Комбинированные запросы

**Пример запроса:**

```
Найди компонент для ввода телефона и покажи как его использовать
```

**Что делает:** AI-ассистент может использовать несколько методов MCP для поиска подходящего компонента и получения примеров его использования.

## Примечания

- Замените `/path/to/core-components` на фактический путь к вашему репозиторию core-components
- Убедитесь, что проект собран (`npm run build`) перед использованием MCP сервера
- Сервер использует stdio транспорт для коммуникации
