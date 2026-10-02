# Как внести вклад в core-components

Основная документация для контрибьюторов — в [Storybook](https://core-ds.github.io/core-components/), раздел «For contributors». Её исходники лежат в `docs/*.stories.mdx`. Здесь — короткая выжимка; если она с документацией расходится, ориентируйтесь на документацию и сообщите о расхождении.

## Предложения и вопросы

Идеи и вопросы — через [issues](https://github.com/core-ds/core-components/issues), готовые изменения — через [pull requests](https://github.com/core-ds/core-components/pulls). Как брать задачи — в разделе «Правила контрибьютинга» документа [«Создание компонентов»](../docs/contributing.stories.mdx).

## Разработка

Пакетный менеджер — yarn, его версия закреплена в поле `packageManager` корневого `package.json`.

```bash
git clone git@github.com:core-ds/core-components.git
cd core-components
yarn install
yarn start # Storybook на http://localhost:9009/
```

Как устроены пакеты, зависимости между ними и сигнатуры callback'ов — [«Создание компонентов»](../docs/contributing.stories.mdx) и [«Вопросы и ответы»](../docs/development-faq.stories.mdx). Скриншот-тесты — [«Скриншотное тестирование»](../docs/screenshots.stories.mdx).

## Pull request

- Внешние контрибьюторы работают из форка. PR направляется в `master`.
- Сообщения коммитов и название PR — по [conventional commits](https://www.conventionalcommits.org). Scope, если он указан, — имя пакета без префикса `@alfalab/core-components-` (`fix(button): …`); для пакета `@alfalab/core-components` — `root`. Сообщения коммитов локально проверяет `commitlint` (хук husky), собрать коммит помогает `yarn cm`.
- PR, который меняет публикуемый код пакета, включает changeset (`yarn changeset add`). Как его оформить — в разделе «Выставление Pull request-а» документа [«Создание компонентов»](../docs/contributing.stories.mdx).
- Заполните чек-лист из [шаблона PR](pull_request_template.md). Что смотрят в ревью — [«Чек-лист для Code Review»](../docs/code-review.stories.mdx).

## Кодекс поведения

Участвуя в проекте, вы соглашаетесь с [кодексом поведения](../CODE_OF_CONDUCT.md).
