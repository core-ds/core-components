# @alfalab/core-components-mcp

## 0.2.1

### Patch Changes

<sup><time>03.07.2026</time></sup>

#### [#2267](https://github.com/core-ds/core-components/pull/2267)

- Исправлена генерация данных. Теперь index файлы формируются более точно.

## 0.2.0

### Minor Changes

<sup><time>29.06.2026</time></sup>

#### [#2240](https://github.com/core-ds/core-components/pull/2240)

##### Новый инструмент `component_changelog`

Добавлен MCP-инструмент для работы с историей изменений компонентов. Поддерживает три режима:

- **full** — полный changelog текущей мажорной версии компонента
- **single** — запись для конкретной версии (`version`)
- **diff** — все изменения между двумя версиями (`v1`, `v2`)

Записи, содержащие только обновления зависимостей без изменений самого компонента, автоматически исключаются из выдачи.

##### Генерация данных

- Сгенерированы данные для `v50.16.0`
- Исправлен путь генерации данных

##### Реструктуризация скилл-файлов

MCP-специфичный контент вынесен из `SKILL.md` в отдельный файл `MCP.md`:

- `SKILL.md` — основной скилл: правила использования MCP-инструментов, паттерны импортов, темизация, CSS-переменные
- `MCP.md` — справочник по MCP-инструментам: когда вызывать каждый инструмент, воркфлоу, примеры

Команда `add-skill` теперь копирует все `.md`-файлы из папки `skills/`, а не только `SKILL.md` — новые справочные файлы подхватываются автоматически.

##### Обновлён SKILL.md

- Добавлено описание `component_changelog` с примерами вызовов для всех трёх режимов
- Добавлен сценарий «upgrading a component» в раздел workflow
- Добавлено правило: если компонент не найден в MCP — агент сообщает об этом явно, не fallback на общие React-паттерны
- Добавлена таблица deprecated-компонентов с заменами и инструкция по миграции: агент сообщает о deprecated-статусе и предлагает перейти на актуальный компонент
- Добавлено явное правило: для получения любых данных о компонентах всегда использовать MCP-инструменты — прямое чтение `CHANGELOG.md`, `package.json` и исходных файлов запрещено
- Добавлена заметка о переименовании peer-зависимостей в `@alfalab/core-components@49`: `@alfalab/core-config` → `@alfalab/core-components-config`, `@alfalab/stack-context` → `@alfalab/core-components-stack-context`

## 0.1.0

### Minor Changes

<sup><time>01.06.2026</time></sup>

#### [#2217](https://github.com/core-ds/core-components/pull/2217)

Добавлен skill-файл для AI-агентов (opencode, Claude и других совместимых инструментов).

Для установки выполните команду в корне проекта:

```bash
npx @alfalab/core-components-mcp@latest add-skill
```

Скилл будет размещён в `.agents/skills/core-components/SKILL.md` относительно директории вызова.

## 0.0.3

### Patch Changes

<sup><time>14.05.2026</time></sup>

#### [#2215](https://github.com/core-ds/core-components/pull/2215)

- Исправлен путь к данным

## 0.0.2

### Patch Changes

<sup><time>14.05.2026</time></sup>

#### [#2213](https://github.com/core-ds/core-components/pull/2213)

- Исправление команды для запуска

## 0.0.1

### Patch Changes

<sup><time>13.05.2026</time></sup>

#### [#2193](https://github.com/core-ds/core-components/pull/2193)

- Первоначальный релиз
