# Code Connect для Web :: Core

В основной [библиотеке Web :: Core](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=177-57650&m=dev) опубликованы **148 React-связей**. Подготовлены 142 новых шаблона, ещё шесть входят из набора хеджирования. Шаблоны и проверки подготовлены в ветке `feat/code-connect-button` для PR #2280. Канвас библиотеки не редактировался.

CLI подтвердил 148 уникальных опубликованных узлов и отсутствие отклонённых записей. Итоговый серверный preview: **143 успешных примера, 5 ожидаемых отказов, 0 неожиданных ошибок**. После проверки реального API исправлено чтение Boolean-свойств: используются короткие имена без внутренних `#id` и краевых пробелов; неполученное Boolean-свойство отклоняется явно. Исправления 49 связей отдельно проверены и опубликованы.

Реестр по каждому корню, Figma-ссылки, зависимости и ограничения: [code-connect-web-core.json](./code-connect-web-core.json). Подтверждение публикации и итоговых проверок: [code-connect-web-core-publication.json](./code-connect-web-core-publication.json).

При повторной проверке перед PR исправлены 33 примера с непрозрачными слотами или неподключённым маркером. Разрешённое содержимое сохраняется; недоступное через API передаётся явными типизированными параметрами. Все 33 исправления опубликованы. Повторный просмотр всех 217 связей после публикации: 201 успешный пример, 16 известных ограничений, 0 неожиданных ошибок и 0 служебных заглушек. Непрозрачные регионы требуют явного контекста.

## Пять состояний с ограничениями в preview

Связи опубликованы для этих корней; следующие конкретные состояния не выдают готовый сниппет. Макеты и неподдерживаемый API при публикации не подменялись.

| Figma                                                                                                       | Причина                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [CustomButton](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=3-7695)              | Замени SwapMe содержимым CustomButton                                                                    |
| [ProductCover.Stack](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=20260-111)     | Preset 164x264 Left отсутствует в актуальном StackProps: size исключает 164; требуется решение владельца |
| [SegmentedControl_32](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147335-19531) | Разделители рядом с выбранным сегментом должны быть скрыты, остальные видимы                             |
| [SegmentedControl_40](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147335-16431) | Разделители рядом с выбранным сегментом должны быть скрыты, остальные видимы                             |
| [[D] Tag_Transparent](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=131186-19740) | IndicatorTag не поддерживает Size=56                                                                     |

Для CustomButton требуется фактическое содержимое вместо SwapMe. У SegmentedControl должны быть скрыты границы рядом с выбранным сегментом. ProductCover 164x264 и IndicatorTag 56 требуют решения на стороне API/макета; остальные поддержанные варианты этих корней остаются доступны.

## Покрытие и статусы

`prepared` означает наличие проверенного шаблона; все такие записи опубликованы. Ограничения конкретных вариантов и `requiredContext` остаются частью контракта. `blocked` описывает неподдержанное соответствие или состояние. `excluded` означает обоснованное отсутствие отдельной связи: общий корень другого компонента, внутренняя часть, deprecated-элемент, системный пример или документация.

| Семейство / область      | Шаблоны опубликованы | Требует решения / отсутствует в API | Исключено |
| ------------------------ | -------------------: | ----------------------------------: | --------: |
| InputAutocomplete        |                    0 |                                   0 |         1 |
| InternationalPhoneInput  |                    0 |                                   0 |         1 |
| List/Markdown            |                    0 |                                   0 |         1 |
| Textarea                 |                    0 |                                   0 |         1 |
| action-button            |                    1 |                                   0 |         0 |
| amount                   |                    1 |                                   0 |         0 |
| amount-input             |                    4 |                                   0 |         0 |
| bottom-sheet             |                    6 |                                   0 |         0 |
| button                   |                    4 |                                   0 |         0 |
| checkbox                 |                   12 |                                   0 |         0 |
| checkbox-group           |                    2 |                                   0 |         0 |
| code-input               |                    2 |                                   0 |         0 |
| custom-button            |                    1 |                                   0 |         0 |
| display internal anatomy |                    0 |                                   0 |         1 |
| divider                  |                    0 |                                   0 |         1 |
| documentation            |                    0 |                                   0 |         1 |
| filter-tag               |                    6 |                                   0 |         0 |
| icon-button              |                    5 |                                   0 |         0 |
| icon-view                |                    1 |                                   0 |         0 |
| indicator                |                    1 |                                   0 |         0 |
| input                    |                    4 |                                   0 |         0 |
| link                     |                    1 |                                   0 |         0 |
| list                     |                    1 |                                   0 |         0 |
| markdown                 |                    1 |                                   0 |         0 |
| master-input             |                    0 |                                   0 |         1 |
| modal                    |                    9 |                                   0 |         0 |
| number-input             |                    4 |                                   0 |         0 |
| option-list-parts        |                    0 |                                   0 |         1 |
| picker-button            |                    0 |                                   0 |         2 |
| popover                  |                    1 |                                   0 |         0 |
| popup-sheet              |                    1 |                                   0 |         0 |
| product-cover            |                    2 |                                   1 |         0 |
| radio                    |                    8 |                                   4 |         0 |
| radio-group              |                    2 |                                   0 |         0 |
| scrollbar                |                    4 |                                   0 |         0 |
| segmented-control        |                    2 |                                   4 |         0 |
| select                   |                    4 |                                   0 |         0 |
| select-with-tags         |                    4 |                                   0 |         0 |
| side-panel               |                    6 |                                   0 |         0 |
| skeleton                 |                    8 |                                   0 |         0 |
| slider                   |                    2 |                                   0 |         0 |
| slider-input             |                    4 |                                   0 |         0 |
| spinner                  |                    1 |                                   0 |         0 |
| status                   |                    1 |                                   0 |         0 |
| status-badge             |                    2 |                                   0 |         0 |
| switch                   |                    6 |                                   6 |         0 |
| tag                      |                   10 |                                   0 |         0 |
| tag-group                |                    2 |                                   0 |         0 |
| tooltip                  |                    1 |                                   0 |         0 |
| typography               |                    1 |                                   0 |         0 |
| universal-date-input     |                    4 |                                   0 |         0 |
| universal-modal          |                    6 |                                   0 |         0 |
| webview                  |                    0 |                                   0 |         1 |

Числа относятся к корням, частям и отдельным ограничениям. Header/Content/Footer и платформенные/инвертированные наборы считаются отдельно. Один технический шаблон вложенной иконки входит в общий конфиг. Один корень может иметь опубликованный шаблон и отдельную запись о неподдержанном варианте.

## Неподдержанные соответствия

| Figma                                                                                                                  | Причина                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [RadioLabel_24_Reverse](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-4890)           | В текущем checkout RadioProps нет API положения контрола справа (Reverse); MCP описывает более новый controlPosition           |
| [RadioLabel_24_Reverse_Inverted](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-5033)  | В текущем checkout RadioProps нет API положения контрола справа (Reverse); MCP описывает более новый controlPosition           |
| [RadioLabel_20_Reverse](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-4919)           | В текущем checkout RadioProps нет API положения контрола справа (Reverse); MCP описывает более новый controlPosition           |
| [RadioLabel_20_Reverse_Inverted](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-4976)  | В текущем checkout RadioProps нет API положения контрола справа (Reverse); MCP описывает более новый controlPosition           |
| [Switch_20](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=142917-14155)                      | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [Switch_20_Inverted](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=142951-14801)             | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [SwitchLabel_20](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=142917-14168)                 | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [SwitchLabel_20_Inverted](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=142951-14844)        | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [SwitchLabel_20_Reverse](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-3400)          | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [SwitchLabel_20_Reverse_Inverted](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-3452) | В текущем checkout Switch фиксированного размера: нет size/compact API; native size меняет только input и не реализует Figma20 |
| [SegmentedControl_48](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147561-2045)             | Size=48 отсутствует в runtime API                                                                                              |
| [SegmentedControl_Muted_48](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147566-3663)       | Size=48 отсутствует в runtime API                                                                                              |
| [SegmentedControl_Muted_32](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147335-21134)      | Muted не имеет подтверждённого соответствия в runtime colors                                                                   |
| [SegmentedControl_Muted_40](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=147335-18659)      | Muted не имеет подтверждённого соответствия в runtime colors                                                                   |
| [Preset=164x264 Left](https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=20260-111)               | Local StackProps ConditionalProps excludes size164; no canonical alternate mapping; MCP ProductCover unavailable               |

Отдельные состояния внутри опубликованных корней тоже отклоняются: `CompactLabel=True` у Checkbox/Radio отсутствует в текущем API; устаревшие варианты List/Markdown, недопустимые размеры/данные и несогласованные состояния не подменяются ближайшим вариантом. Проверяемые отказы перечислены в `guardedStates` реестра.

## Контекст и сборка

- TagGroup содержит оба явно выбранных режима: single через RadioGroup и multiple через CheckboxGroup. Значения и обработчики задаются потребителем; исходная выбранность читается из Figma.
- Select/SelectWithTags требуют реальных options, выбранных значений и обработчиков. Stepper/Slider/даты требуют предметного диапазона, шага или сценария.
- Text, Skeleton, IconView, ProductCover и часть других компонентов требуют контекста для параметров, не опубликованных как component properties.
- Modal, SidePanel и UniversalModal подключаются через настоящие части Header/Content/Footer соответствующего родителя. Overlap сам по себе не определяет sticky.
- BottomSheet Header/Body/Footer дают фрагменты props одного BottomSheet. Их объединяют с open/onClose.
- OptionList — Popover с динамическими слотами и оформлением/семантикой списка из потребителя. Пустой или декоративный Body требует реального содержимого. PopupSheet требует содержимого вместо SwapMe; Tooltip — элемента-триггера.
- Swaps/slots получают вложенный код через Code Connect. Весь каталог ассетов этой задачей не подключается; фиксированные diamonds не подставляются.

## Проверки

Прошли TypeScript всех 148 шаблонов, CLI parse 148 связей без дублирующихся URL/ID, **513 сценариев и 423 успешных примера** с проверкой API, а также 32 проверки поведения TagGroup. Дополнительно сохранённый набор хеджирования: 32 сценария и 26 успешных примеров. Полный серверный preview перечислен выше.

Из корня core-components:

```sh
node node_modules/typescript/bin/tsc -p tsconfig.web-core-code-connect.json
node node_modules/@figma/code-connect/bin/figma connect parse --config figma.web-core.config.json --skip-update-check --exit-on-unreadable-files --outFile /tmp/web-core-code-connect.json
node tools/code-connect/verify-web-core.cjs
node tools/code-connect/verify-hedging.cjs
```

Модель проверки Boolean-getters согласована с живой диагностикой Figma. Для SLOT отдельно подтверждено, что API принимает короткое имя и полное имя с `#id`. Проверка API и серверного исполнения не подтверждает визуальную эквивалентность. Дополнительная проверка через графический Dev Mode ограничена состоянием Desktop Figma: приложение показывало offline.

## Повторная публикация

Активный конфиг этого набора — `figma.web-core.config.json`. Исходный `figma.config.json` и `.figma.tsx` сохранены; они включают старую привязку Button. Одновременная публикация обоих конфигов может создать конкурирующие связи.

```sh
bash tools/code-connect/publish-web-core.sh
```

Запуск локально проверяет ровно 148 уникальных связей основного Web :: Core, затем использует официальный `publish --force --batch-size 20` с отдельным конфигом. `--force` заменяет конфликтующие связи, созданные в UI, полными шаблонами; используйте команду для согласованного набора узлов из конфига. Ручное отключение связей не требуется.

Если `FIGMA_ACCESS_TOKEN` не передан окружением, запуск запрашивает его скрытым вводом в терминале. Токен не сохраняется в репозитории и не передаётся аргументом процесса. Нужны Code Connect: Write и File content: Read — [требования Figma](https://developers.figma.com/docs/code-connect/quickstart-guide/). Токен не следует отправлять в чат. Результат публикации подтверждается ответом CLI с точным числом успешных и отклонённых узлов; одного exit code 0 недостаточно.
