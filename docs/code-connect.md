# Figma Code Connect

Привязка компонентов библиотеки к component set в Figma (Web :: Core), чтобы в Dev Mode и через Figma MCP показывались сниппеты с реальными импортами `@alfalab/core-components/*` и props.

Опубликованный полный набор использует `figma.web-core.config.json` и шаблоны `packages/**/code-connect/**/*.figma.ts`. Для восьми дополнительных библиотек используется отдельный `figma.web-core-libraries.config.json`; состав, статус публикации и ограничения — в [отчёте](code-connect-web-core-libraries.md). Исходный `figma.config.json` с `.figma.tsx` сохранён как прежняя конфигурация. Документация Figma: [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect).

Прежние команды `yarn figma:connect:publish` и `yarn figma:connect:unpublish` используют `figma.config.json` с `.figma.tsx` Button. Для набора из 148 шаблонов используйте `bash tools/code-connect/publish-web-core.sh`; для восьми дополнительных библиотек — команды с `--config figma.web-core-libraries.config.json` из [отчёта](code-connect-web-core-libraries.md). Не запускайте прежние команды для новых наборов.

## Общая проверка

`yarn figma:connect:check` проверяет типы шаблонов, официальный parse трёх конфигов и API сгенерированных примеров. Команда не использует токен и не публикует связи; она включена в CI.

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

Объём — desktop-наборы из выбранного экрана; мобильные, инвертированные и устаревшие Corporate-наборы в этот конфиг не включены. Исходные `.figma.tsx`, старый конфиг и существующие скрипты не изменены. Новый конфиг не включает старую привязку Button, чтобы при проверке не было двух шаблонов для одного набора.

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

Для последующих изменений опубликованного полного набора используйте `--config figma.web-core.config.json`. Слияние ветки Figma и слияние Git-ветки сами по себе не выполняют эту публикацию. Не запускайте старый и новый конфиги вместе для одного набора Button.

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
