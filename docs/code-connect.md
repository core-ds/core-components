# Figma Code Connect

Шаблоны связывают библиотечные компоненты Figma с реальными импортами `@alfalab/core-components/*` и props. Примеры доступны в Dev Mode и через Figma MCP.

## Конфигурация и публикация

Канонический конфиг — `figma.config.json`: **218 шаблонов `.figma.ts`**. В него входят 148 связей основного Web :: Core, 69 связей восьми дополнительных библиотек и одна связь [Diamonds в Icons](https://www.figma.com/design/ZcdUPebEhHfSZ91zgmv2cK/Icons?node-id=92210-20888). Diamonds не входит в число 148 связей основного файла.

`figma.web-core.config.json`, `figma.web-core-libraries.config.json` и `figma.hedging.config.json` — поднаборы тех же реализаций, а не отдельные версии привязок. Все используют метку `React`. Прежние `.figma.tsx` Button/Diamonds удалены: для одного узла больше нет конкурирующей реализации в другом формате.

Проверка полного набора и пробный выпуск:

```sh
yarn figma:connect:check
yarn figma:connect:publish --dry-run
```

`yarn figma:connect:publish` явно использует канонический конфиг. Команды массового снятия связей в `package.json` нет. Для согласованного выпуска только 148 связей основного файла остаётся `bash tools/code-connect/publish-web-core.sh`; дополнительные библиотеки можно выпускать с `--config figma.web-core-libraries.config.json`.

Для серверного preview и публикации через CLI нужен `FIGMA_ACCESS_TOKEN`. Проверка `figma:connect:check` его не использует и ничего не публикует. Факт выпуска подтверждается отдельным ответом Figma; локальная правка шаблона сама по себе опубликованную связь не обновляет. Состав, подтверждения прежней публикации и ограничения находятся в [основном отчёте](code-connect-web-core.md) и [отчёте дополнительных библиотек](code-connect-web-core-libraries.md). Документация Figma: [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect).

## Проверки и вложенность

`yarn figma:connect:check` проверяет три TypeScript-конфига, официальный parse канонического набора и трёх поднаборов, API сгенерированных примеров, композицию дочерних шаблонов и Button с настоящей привязкой Diamonds. Команда включена в CI.

Сгенерированный TSX проверяется в режиме `react-jsx` только с импортами, объявленными самим шаблоном и вложенными шаблонами. Проверяющая обвязка не добавляет `import React` за автора примера. Для Attach Desktop и Mobile отдельно проверяется ветка Icon-20 с `React.cloneElement`.

Перед вставкой дочернего `.example` в JSX учитывается `metadata.nestable`. Значение `false` означает контекстный пример: его функцию нельзя вставлять внутрь другого JSX. Родитель либо запрашивает необходимые данные через явный типизированный контекст, либо останавливает преобразование с объяснением. Готовый вложенный JSX сохраняется без подмены.

## Button и Diamonds

Файлы — `packages/button/code-connect/*.figma.ts`.

| Figma        | Код                                    |
| ------------ | -------------------------------------- |
| `[D] Button` | `ButtonDesktop`                        |
| `[M] Button` | `ButtonMobile`                         |
| `*_Inverted` | тот же компонент + `colors="inverted"` |

Сопоставлены `view`, `size`, `shape`, `disabled`, подпись, подсказка и аддоны. Выбранная иконка разрешается через её дочерний Code Connect; Diamonds не подставляется вместо произвольного ассета. Для дефолтных Diamonds используется единственный шаблон `Diamonds.figma.ts` с объявленным импортом реальной иконки 20 или 24. Он возвращает SVG-компонент без адаптера. Единственный `Icon20Adapter` добавляет родитель Button для своего 20dp-слота, поэтому двойной адаптации нет.

Параметры `block`, `textResizing`, `nowrap`, `allowBackdropBlur` не опубликованы как свойства Figma и автоматически не восстанавливаются. Проверка композиции Button 32/40 с Diamonds использует дочерний шаблон и его импорты, а не готовую строку иконки из тестовых данных.

## Подготовка к декабрьскому макету хеджирования

Изолированный конфиг `figma.hedging.config.json` включает шесть новых шаблонов `.figma.ts`:

| Figma Web :: Core        | Шаблон / компонент кода                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `[D] Button`             | `packages/button/code-connect/ButtonDesktop.figma.ts` → `ButtonDesktop`                                                      |
| `[D] Tag_Filled`         | `packages/tag/code-connect/TagDesktop.figma.ts` → `TagDesktop`                                                               |
| `[D] Input`              | `packages/input/code-connect/InputDesktop.figma.ts` → `InputDesktop`                                                         |
| `[D] UniversalDateInput` | `packages/universal-date-input/code-connect/UniversalDateInputDesktop.figma.ts` → `UniversalDateInputDesktop`, `view="date"` |
| `Amount`                 | `packages/amount/code-connect/Amount.figma.ts` → `Amount`                                                                    |
| `IconView`               | `packages/icon-view/code-connect/IconView.figma.ts` → `SuperEllipse`, `Circle`, `Rectangle` или `NoShape`                    |

Объём — desktop-наборы из выбранного экрана; мобильные, инвертированные и устаревшие Corporate-наборы в этот конфиг не включены. Набор использует те же `.figma.ts`, что и канонический конфиг; дополнительных реализаций Button в нём нет.

### Локальная проверка без публикации

Из корня репозитория:

```sh
node node_modules/typescript/bin/tsc -p tsconfig.code-connect.json
node node_modules/@figma/code-connect/bin/figma connect parse --config figma.hedging.config.json --skip-update-check --exit-on-unreadable-files --outFile /tmp/hedging-code-connect.json
node tools/code-connect/verify-hedging.cjs
```

Последняя команда проверяет исполнение на моделируемых состояниях и типы сгенерированных примеров против локального кода библиотеки. Это не проверка визуального результата в Figma. Токен не нужен.

### Проверка через Figma и порядок выпуска

Ветка Figma `Code connect` относится к основному `Web :: Core`. В её интерфейсе при подготовке была отключена кнопка Connect components. Автоматический перенос Code Connect при слиянии ветки не проверен и не предполагается.

Новые шаблоны ссылаются на компоненты основной библиотеки `lGWq8DtnUcSkRasagBuwq6`. Проверка через сервис Figma запускается отдельно:

```sh
node node_modules/@figma/code-connect/bin/figma connect preview --config figma.hedging.config.json --skip-update-check --output json
```

CLI требует `FIGMA_ACCESS_TOKEN`. Полный набор из 148 связей, включая эти шесть, опубликован и проверен через серверный preview; результаты и ограничения — в [общем отчёте](./code-connect-web-core.md). Токен передавался только в памяти процесса и не сохранён в репозитории.

Для последующих изменений основного набора используйте `--config figma.web-core.config.json`; для канонического набора вместе с дополнительными библиотеками и Diamonds — `--config figma.config.json`. Слияние ветки Figma и слияние Git-ветки сами по себе не выполняют публикацию.

### Границы шаблонов

- Код вложенных компонентов и иконок получается через их Code Connect (`executeTemplate`), а не через фиксированную подстановку diamonds. Неподключённый вложенный компонент остаётся явной зависимостью: его связь нужно проверить/подготовить до выпуска. Эти шесть шаблонов не добавляют связи для всех ассетов страницы.
- Технические области Addon читаются как slot или instance swap внутри родителя; Spinner, ClearButton и StatusPositive преобразуются в соответствующие props. Для 20dp-иконки адаптер передаёт свойства и класс в фактически выбранную иконку.
- `UniversalDateInputDesktop` здесь поддерживает одиночную дату `ДД.ММ.ГГГГ`. Диапазон, время и месяц требуют отдельных правил. При `picker=true` передаётся настоящий `Calendar`.
- `IndicatorTag` размера 56 не поддерживается текущим кодом: шаблон сообщает об этом явно, без замены размера на 40.
- `Amount` разбирает знак и разрядные пробелы, переводит значение в минорные единицы и проверяет безопасный числовой диапазон. Custom-валюта без подтверждённого кода и разная прозрачность Minor/Currency требуют решения отдельно.
- Цвет и URL фонового изображения IconView не опубликованы как свойства компонента Figma. Шаблон выносит их в параметры `Example`, не подставляя произвольные значения. Вложенный IconView, которому тоже нужны такие параметры, сообщает о нехватке контекста; его нельзя автоматически вставить как готовый JSX.
- Обработчики взаимодействия остаются задачей продукта. Поля используют `defaultValue`, чтобы пример не становился контролируемым полем без обработчика изменений.

Для шести шаблонов сохранены локальные проверки TypeScript и сценарии исполнения/проверки API. Они включены в опубликованный полный набор; состояние выпуска описано в общем отчёте.

## Остальные компоненты Web :: Core

Опубликованный набор шаблонов, ограничения текущего API и команды проверки: [code-connect-web-core.md](./code-connect-web-core.md). Конфиг — `figma.web-core.config.json`; детальный реестр — `docs/code-connect-web-core.json`. Опубликованы 148 связей; подробности — в общем отчёте.
