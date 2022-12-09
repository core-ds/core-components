<div class="github-doc">

## Библиотека React компонентов для создания веб-интерфейсов

[![Release](https://github.com/core-ds/core-components/actions/workflows/release.yml/badge.svg)](https://github.com/core-ds/core-components/actions/workflows/release.yml)
[![Tests](https://github.com/core-ds/core-components/actions/workflows/build.yml/badge.svg)](https://github.com/core-ds/core-components/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/core-ds/core-components/badge.svg)](https://coveralls.io/github/core-ds/core-components)
[![Demo build](https://github.com/core-ds/core-components/actions/workflows/main.yml/badge.svg)](https://github.com/core-ds/core-components/actions/workflows/main.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[Cторибук](https://core-ds.github.io/core-components/) с документацией и песочницей.

</div>

## Установка

Установка всех компонентов:

```bash
yarn add @alfalab/core-components
```

Каждый компонент публикуется отдельным пакетом, поэтому вы можете подключить только нужный, не устанавливая библиотеку целиком:

```bash
yarn add @alfalab/core-components-button
```

## Использование

```jsx
import { Button } from '@alfalab/core-components/button';
```

## Темизация

[Гайд по настройке темизации](https://core-ds.github.io/core-components/master/?path=/docs/инструкции-темизация--page)

## Поддерживаемые браузеры

Мы поддерживаем две последние стабильные версии всех популярных браузеров. Исключение — IE11+ и Android 5+ (Mobile Chrome).

#### Desktop

-   Chrome
-   Yandex
-   Firefox
-   Edge
-   IE 11+
-   Safari

#### Mobile

-   Android 5+
-   iOS

## Разработка

```bash
$ git clone git@github.com:core-ds/core-components.git
$ cd core-components
$ yarn install
$ yarn start
```

Сторибук будет доступен по адресу http://localhost:9009/

### Сигнатуры коллбэков

> Компоненты передают в функции обратного вызова два аргумента:
>
> 1. `event: SyntheticEvent` - объект события, инициировавшего вызов.
> 2. `payload: {}` - объект с дополнительными данными. Например `{ amount: 5000 }`

### Импорт компонентов внутри компонентов

Так как у нас монорепозиторий, то все пакеты должны быть независимы. Если при разработке компонента вам потребовался другой компонент, то его нужно добавить как зависимость. Пример можно посмотреть в [Тултипе](https://github.com/core-ds/core-components/tree/master/packages/tooltip). Также нужно добавить пару опций в `tsconfig.json`:

```json
{
    "compilerOptions": {
        "paths": {
            "@alfalab/core-components-popover": ["../popover/src"] // для корректоной сборки rollup
        }
    },
    "references": [{ "path": "../popover" }] // для корректной работы IDE
}
```

### Выставление Pull request-а

Для версионирования и публикации пакетов используется инструмент [Changesets](https://github.com/changesets/changesets).
Если PR затрагивает функциональность одного из пакетов, то он должен включать в себя набор изменений.
Набор изменений представляет собой файл формата md, который находится внутри директории .changeset и содержит описание сделанных изменений.

Файл с набором изменений можно сгенерировать двумя способами:

1. с помощью CLI команды `yarn changeset add`.
   После ввода команды будет предложено выбрать пакет, в котором было произведено изменение, тип релиза (major, minor, patch) и ввести описание изменения.
2. с помощью [changeset bot](https://github.com/changesets/bot).
   В этом случае на странице с pull request-ом будет отображено сообщение с баннером 'No Changeset'
   и ниже ссылка для создания набора изменений - Click here if you're a maintainer who wants to add a changeset to this PR.
   По клику на нее генерируется и открывается на редактирование md-файл. В нем нужно ввести понятное описание сделанных изменений на русском языке,
   а также добавить или удалить названия пакетов (только в случае если бот неверно их определил).

Описание изменения может состоять из произвольного количества строк в формате md.
Вот несколько особенностей, на которые стоит обращать внимание:

1. форматируется только первая строка описания (добавляется дефис "-", если его не было),
   вторая и последующие строки попадут в CHANGELOG так, как вы их запишете (сохранится разметка md)
2. при добавлении нового компонента нужно указать '0.0.0' версию пакета в package.json,
   в наборе изменений указать мажорный ('major') тип релиза, а в описание обязательно добавить фразу 'новый компонент ${name}'.
   Пример приведен ниже.

    ```
    ---
    '@alfalab/core-components-gap': major
    ---

    Добавлен новый компонент Gap
    ```

## Запуск bash скриптов на Windows

Для запуска bash скриптов на OS Windows необходимо сперва установить WSL
(как это сделать можно почитать [тут](https://docs.microsoft.com/ru-ru/windows/wsl/)).
Далее в PowerShell или CMD ввести команду bash, после чего уже запускать npm команды, использующие bash скрипты.

## Релизы

Для выпуска новых версий используйте следущие команды:

```bash
$ yarn pub:patch # соберет и выпустит patch-версию
$ yarn pub:minor # соберет и выпустит minor-версию
$ yarn pub:major # соберет и выпустит major-версию
```

### Как выпустить бета-версию:

1. Собираем пакет

```bash
$ yarn build
```

2. Переходим в папку с собранным пакетом и обновляем версию

```bash
$ cd dist
$ npm version 2.0.0-beta.0 // подставить нужную версию
```

3. Публикуем пакет

```bash
npm publish --tag beta
```

Также можно воспользоваться экшеном "Beta release".
Для этого нужно перейти во вкладку Actions на Github, выбрать workflow "Beta release",
указать ветку, из которой будет выпущена бетка, а также версию выпускаемого пакета.

## Коммиты

На проекте подключен `commitlint` для линтинга коммитов. На основании коммитов формируется `CHANGELOG.MD`.
Мы придерживаемся [AngularJS commit conventions.](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
Коммиты можно делать с помощью утилиты `commitizen`:

```bash
$ git add .
$ yarn cm # запустит утилиту commitizen для создания коммита
$ git push
```

## Сборка компонентов

Компоненты поставляются в трех видах:

1. `ES5`

2. `ES5 с css-модулями`

3. `ES2020`

Импорт `ES5`:

```tsx
import { Button } from '@alfalab/core-components/button';
// или
import { Button } from '@alfalab/core-components-button';
```

Импорт `ES5` с css-модулями:

```tsx
import { Button } from '@alfalab/core-components/button/cssm';
// или
import { Button } from '@alfalab/core-components-button/cssm';
```

Импорт `ES2020`:

```tsx
import { Button } from '@alfalab/core-components/button/modern';
// или
import { Button } from '@alfalab/core-components-button/modern';
```

## Правила контрибьютинга

Мы открыты к любым предложениям по развитию библиотеки.
Отправляйте свои идеи и вопросы через [pull requests](https://github.com/core-ds/core-components/pulls) или [issues](https://github.com/core-ds/core-components/issues).

-   Уважаем тех, кто видит проблему и кидает PR.
-   Не знаете что делать – можно брать любую задачу без Assignee, назначив её на себя.
-   Знаете что делать и есть возможность – кидайте PR.
-   Знаете что делать, но нет времени – добавьте задачу (issue).

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

## Мейнтейнеры

-   [Александр Яценко](https://github.com/reme3d2y)
-   [Владимир Гевак](https://github.com/Lacronts)
-   [Евгений Купава](https://github.com/EGNKupava)
-   [Валерия Чуричева](https://github.com/Valeri8888)
-   [Евгений Сергеев](https://github.com/SiebenSieben)
