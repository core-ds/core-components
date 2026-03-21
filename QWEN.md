# @alfalab/core-components — Библиотека React компонентов

## Обзор проекта

**core-components** — монорепозиторий с библиотекой React-компонентов для создания веб-интерфейсов в дизайн-системе Альфа-Банка.

- **Документация:** [Storybook](https://core-ds.github.io/core-components/)
- **Репозиторий:** https://github.com/core-ds/core-components
- **Лицензия:** MIT

### Архитектура

Монорепозиторий на базе **yarn workspaces** с пакетной моделью:

- Каждый компонент — отдельный npm-пакет в `packages/*`
- Общие утилиты и темы — отдельные пакеты
- Сборка через **Rollup**, стили через **PostCSS**
- Документация в **Storybook 7.6**

### Технологический стек

| Категория             | Технологии                                                 |
| --------------------- | ---------------------------------------------------------- |
| **Фреймворк**         | React 18 (поддержка 16.9–19)                               |
| **Язык**              | TypeScript 5.5                                             |
| **Сборка**            | Rollup 4, PostCSS                                          |
| **Стили**             | CSS-переменные, PostCSS (mixins, custom-media, preset-env) |
| **Тесты**             | Jest (jsdom + node), Playwright (скриншоты)                |
| **Документация**      | Storybook 7.6, MDX                                         |
| **Пакетный менеджер** | yarn 4.12.0 (yarn berry)                                   |
| **Релизы**            | Changesets                                                 |

## Структура проекта

```
core-components/
├── packages/              # Пакеты с компонентами (120+ пакетов)
│   ├── button/           # Пример пакета компонента
│   │   ├── src/
│   │   │   ├── desktop/  # Десктопная версия
│   │   │   ├── mobile/   # Мобильная версия
│   │   │   ├── shared/   # Общая логика
│   │   │   ├── docs/     # Stories и документация
│   │   │   └── index.ts  # Точка входа
│   │   ├── CHANGELOG.md
│   │   └── package.json
│   ├── input/
│   ├── select/
│   └── ...
├── bin/                   # Скрипты сборки и утилиты
├── .storybook/           # Конфигурация Storybook
├── tools/                # Внутренние инструменты
├── scripts/              # Дополнительные скрипты
├── variants/             # Варианты сборки
├── docs/                 # Дополнительная документация
└── .changeset/           # Changesets для релизов
```

### Структура пакета компонента

```
packages/button/
├── src/
│   ├── components/       # React-компоненты
│   ├── desktop/          # Десктопная специфичная логика
│   ├── mobile/           # Мобильная специфичная логика
│   ├── shared/           # Общие хуки, утилиты, константы
│   ├── docs/             # Stories (*.stories.tsx), документация (*.mdx)
│   ├── __snapshots__/    # Jest snapshot-тесты
│   ├── Component.test.tsx      # Unit-тесты
│   ├── Component.screenshots.test.tsx  # Скриншот-тесты
│   ├── index.ts          # Публичный API
│   ├── typings.ts        # TypeScript-типы
│   └── vars.css          # CSS-переменные компонента
├── CHANGELOG.md          # История изменений пакета
├── package.json          # Зависимости, версия, конфиг сборки
├── tsconfig.json         # TypeScript конфиг
└── tsconfig.build.json   # Конфиг для сборки
```

## Установка и настройка

### Требования

- **Node.js:** версия указана в `.node-version`
- **yarn:** 4.12.0 (управляется `.yarnrc.yml`)

### Установка зависимостей

```bash
yarn install
```

## Основные команды

### Сборка

```bash
# Сборка всех пакетов
yarn build

# Очистка сбилденных артефактов
yarn clean
```

### Разработка

```bash
# Запуск Storybook (песочница с документацией)
yarn start

# Сборка Storybook для продакшена
yarn build-storybook

# Serve собранного Storybook
yarn serve-storybook
```

### Тестирование

```bash
# Запуск всех тестов (Jest)
yarn test

# Скриншот-тесты (Playwright)
yarn test:screenshots

# Скриншот-тесты локально
yarn test:screenshots-local

# Тесты codemod-скриптов
yarn test:codemod
```

### Линтинг

```bash
# Полный линтинг (JS + CSS + зависимости)
yarn lint

# ESLint
yarn lint:js

# Stylelint
yarn lint:css

# Проверка зависимостей
yarn lint:deps

# Проверка форматирования
yarn format
```

### Утилиты

```bash
# Анализ размеров пакетов
yarn analyze-package-sizes

# Генерация тёмных тем
yarn generate-dark-colors

# Обновление цветов/типографики
yarn update-colors
yarn update-typography

# Проверка package.json
yarn check-package-json
```

## Внесение изменений

### Ветка для изменений

- **`master`** — багфиксы
- **`develop`** — новые фичи

### Создание Pull Request

1. Форкните репозиторий
2. Создайте ветку от правильной базы
3. Установите зависимости: `yarn install`
4. Добавьте тесты для нового функционала
5. Убедитесь, что тесты проходят: `yarn test`
6. Обновите snapshot-ы: `yarn test -u`
7. Пройдите линтинг: `yarn lint`

### Коммиты

Проект использует [Commitizen](https://github.com/commitizen/cz-cli):

```bash
yarn cm
```

Формат коммитов: [Conventional Commits](https://www.conventionalcommits.org/)

### Changesets

Для описания изменений в релизе используйте changesets:

```bash
yarn changeset
```

Следуйте интерактивному процессу для создания файла changeset.

## Публикация релизов

### Стандартный релиз

```bash
# Версионирование пакетов
yarn version-packages

# Публикация
yarn release
```

### Snapshot-релиз (для тестирования)

```bash
yarn version-packages:snapshot
yarn release:snapshot
```

## Добавление нового компонента

1. Создайте директорию в `packages/<component-name>/`
2. Инициализируйте `package.json` с правильными зависимостями
3. Добавьте структуру папок (desktop/mobile/shared/docs)
4. Реализуйте компонент с TypeScript типами
5. Добавьте CSS-переменные в `vars.css`
6. Напишите тесты (unit + screenshots)
7. Создайте stories для документации
8. Добавьте changeset

### Пример package.json компонента

```json
{
    "name": "@alfalab/core-components-button",
    "version": "13.1.1",
    "main": "index.js",
    "module": "./esm/index.js",
    "sideEffects": ["**/*.css"],
    "dependencies": {
        "@alfalab/core-components-mq": "^6.0.3",
        "classnames": "^2.5.1",
        "tslib": "^2.4.0"
    },
    "peerDependencies": {
        "react": "^16.9.0 || ^17.0.1 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.9.0 || ^17.0.1 || ^18.0.0 || ^19.0.0"
    },
    "publishConfig": {
        "access": "public",
        "directory": "dist"
    }
}
```

## Конвенции разработки

### Кодстайл

- **TypeScript:** строгий режим, явные типы
- **CSS:** CSS-переменные, BEM-подобный нейминг
- **Имена файлов:** PascalCase для компонентов, camelCase для утилит

### Тестирование

- **Unit-тесты:** Jest + React Testing Library
- **Скриншот-тесты:** Playwright
- **Snapshot-тесты:** для стабильных компонентов

### Доступность (a11y)

- ARIA-атрибуты для интерактивных элементов
- Поддержка навигации с клавиатуры
- Тесты в Storybook a11y addon

### Темизация

Компоненты используют CSS-переменные из `@alfalab/core-components-vars`:

- Цвета: `--color-light-*`, `--color-dark-*`
- Типографика: `--font-family-*`, `--font-size-*`
- Отступы: `--gap-*`, `--border-radius-*`

## Полезные ссылки

- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Changelog](CHANGELOG.md)
- [Список компонентов](packages/)

## Контакты

Вопросы по дизайн-системе направляйте команде Альфа-Бизнес в соответствующие каналы поддержки.
