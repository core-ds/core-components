# Code Connect — дополнительные библиотеки Web :: Core

Опубликованы **69 связей** в восьми библиотеках Figma; сервер подтвердил каждую публикацию, ошибок загрузки нет.

Набор включает публичные компоненты и необходимые для их сборки части. Проверены 32 страницы с 305 корневыми компонентами и наборами вариантов: 69 опубликованы, 6 имеют несовпадения с публичным API, 230 исключены. Число связей не равно числу семейств компонентов.

| Библиотека Figma                                                                  | Связей | Несовпадений API | Исключено |
| --------------------------------------------------------------------------------- | -----: | ---------------: | --------: |
| [Web :: Core Navigation](https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG)     |     10 |                1 |        61 |
| [Web :: Core Misc](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp)           |      4 |                5 |        40 |
| [Web :: Core Notification](https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K)   |     21 |                0 |        13 |
| [Web :: Core File Upload](https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ)    |      7 |                0 |         9 |
| [Web :: Core Wrappers](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR)       |     14 |                0 |        17 |
| [Web :: Core ProgressBars](https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ)   |      6 |                0 |        26 |
| [Web :: Core Authentication](https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf) |      5 |                0 |        40 |
| [Web :: Core Pickers](https://www.figma.com/design/JVZ7gCqW42KnxGsu19aqyF)        |      2 |                0 |        24 |

Прежние 148 связей основного Web :: Core не входят в новый конфиг и этим выпуском не перепубликовываются. Общий объём двух наборов после подтверждённой публикации — 217 связей.

## Проверки

- TypeScript всех 69 шаблонов и официальный CLI parse: успешно.
- Проверок исполнения: 681; сгенерированных TSX-примеров: 560. Типизация против API текущей ветки — без ошибок.
- Проверены список восьми разрешённых файлов, уникальность узлов и идентификаторов шаблонов, типы свойств Figma и полнота сопоставления вариантов.
- После подключения существующей декларации masked-input к проверяющему подтверждён прежний набор: 513 сценариев, 423 примера и 32 проверки выбора TagGroup.
- Серверный preview Figma: проверено 69, успешно 58, защитных остановок 11.

Это проверка шаблонов и серверного генератора. Графический интерфейс Dev Mode вручную не проверялся.

## Шесть компонентов без связи

| Компонент                                                                                             | Причина                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [🚧 TabbarIsland](https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=16468-1714) | TabbarIsland отсутствует в экспортированном API core-components; TabBar не воспроизводит островную форму и отдельные меню/контент. Требуется API или подтверждённая замена.             |
| [SortableListItem](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web----Core?node-id=5-7281)    | Figma SortableListItem — одиночный элемент. Публичный API экспортирует только SortableList с items и renderItem; SortableItem не экспортирован, CornerRadius=0 также отсутствует в API. |
| [[D] Carousel](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web----Core?node-id=8416-4999)     | Figma Carousel v2 содержит Slides/TopAddon/Overflow SLOT; текущий экспорт Carousel принимает items[] и не имеет TopAddon/Overflow. Нельзя сохранить композицию без выдуманного API.     |
| [[M] Carousel](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web----Core?node-id=8433-7837)     | Figma Carousel v2 содержит Slides/TopAddon/Overflow SLOT; текущий экспорт Carousel принимает items[] и не имеет TopAddon/Overflow. Нельзя сохранить композицию без выдуманного API.     |
| [Steps_Vertical](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web----Core?node-id=4474-1309)   | Корень Figma представляет один шаг с LastStep, а публичный Steps принимает коллекцию children и сам вычисляет последний шаг; внутренний Step не экспортирован.                          |
| [Steps_Horizontal](https://www.figma.com/design/uNrOBNzxQawt0D9CnURLEp/Web----Core?node-id=4518-3511) | Корень Figma представляет один шаг с LastStep, а публичный Steps принимает коллекцию children и сам вычисляет последний шаг; внутренний Step не экспортирован.                          |

## Ограничения примеров

- Реальные данные продукта, не представленные свойствами Figma, передаются параметрами примера: страницы, даты, идентификаторы, ссылки, файлы, прогресс, обработчики. Произвольные рабочие данные шаблоны не придумывают.
- Непрозрачные слоты Accordion/Underlay требуют явные параметры ReactNode; готовые секции сохраняются динамически.
- Контекстные примеры имеют `nestable:false`; их функцию нельзя вставлять внутрь JSX другого компонента. Родитель получает необходимые значения через свой типизированный контекст либо показывает явное ограничение.
- В Calendar модель дат приходит из продукта: иллюстративная сетка Figma несогласована с заголовком месяца; шаблон не пытается угадать календарь.
- Вложенные экземпляры разрешаются динамически. Пустой SwapMe и отсутствующий Code Connect у ассета могут останавливать конкретный пример. Полный каталог иконок и ассетов не подключался.
- Не все состояния Figma поддерживаются текущим API. Например, CircularProgressBar Size=96, Dropzone Active и отдельные сочетания Attach/FileUpload явно отклоняются. Точные ограничения находятся в шаблонах, реестре и проверках.

## Защитные остановки в текущих состояниях Figma

Связь может быть опубликована, даже когда конкретное дефолтное состояние содержит пустую заглушку или неподдержанное сочетание. Такие состояния перечислены ниже; это не ошибка загрузки Code Connect.

| Узел                                                                                                   | Состояние / причина                                                       |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [🔩 [D] Addon](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=13-27061)       | Замени пустой SwapMe содержимым PureCell.Addon                            |
| [🔩 [M] Addon](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=203-2656)       | Замени пустой SwapMe содержимым PureCell.Addon                            |
| [🔩 [D] Footer](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=16-3859)       | Замени пустой SwapMe содержимым PureCell.Footer                           |
| [🔩 [M] Footer](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=203-2676)      | Замени пустой SwapMe содержимым PureCell.Footer                           |
| [🔩 [D] Graphics](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=13-25888)    | Замени пустой SwapMe содержимым PureCell.Graphics                         |
| [🔩 [M] Graphics](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=203-2643)    | Замени пустой SwapMe содержимым PureCell.Graphics                         |
| [[D] PureCell](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=92-3751)        | Нет исполняемого Code Connect для Graphics: вложенный инстанс не разрешён |
| [[M] PureCell](https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Web----Core?node-id=203-2470)       | Нет исполняемого Code Connect для Graphics: вложенный инстанс не разрешён |
| [CircularProgressBar](https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ/Web----Core?node-id=14-1890) | Замени SwapMe или Icon подключённым содержимым CircularProgressBar        |
| [PassCode](https://www.figma.com/design/jDJxQE1knc3NySMBYYiBYf/Web----Core?node-id=2346-1498)          | Не разрешён вложенный INSTANCE для правой ячейки Key                      |
| [NavigationBar](https://www.figma.com/design/GBJfADE8j6Ar17QDEHFYnG/Web----Core?node-id=2832-8162)     | BottomAddon=True не содержит настоящего SLOT или INSTANCE_SWAP            |

## Реестр и повторная проверка

- `docs/code-connect-web-core-libraries.json`: каждый из 305 корней, его статус, причина, свойства Figma и путь шаблона.
- `prepared` означает наличие файла шаблона; поле `publication` отдельно показывает факт публикации.
- `blocked` означает реальное несовпадение публичного API; связь не создаётся.
- `excluded` означает устаревший компонент, внутреннюю анатомию без отдельного публичного API или демонстрационный шаблон; для него самостоятельная связь не нужна.
- `figma.web-core-libraries.config.json`: только 69 новыхшаблонов; прежние конфиги сохранены.
- `docs/code-connect-web-core-libraries-publication.json`: подтверждённые URL публикации и результаты серверного preview, без секретов.

```sh
node node_modules/typescript/bin/tsc -p tsconfig.web-core-libraries-code-connect.json
node tools/code-connect/verify-web-core-libraries.cjs
node node_modules/@figma/code-connect/bin/figma connect parse --config figma.web-core-libraries.config.json --skip-update-check --exit-on-unreadable-files --outFile /tmp/web-core-libraries.json
```

Для серверных команд используется официальный Code Connect CLI 1.4.9 и `FIGMA_ACCESS_TOKEN`. Перед повторным выпуском нужны preview и dry-run; публикация с `--force` заменяет существующие связи только узлов нового конфига. Токен в репозитории не хранится.

Код подготовлен в ветке `feat/code-connect-button`; изменения для проверки и слияния собраны в PR #2280. Canvas, права доступа,Figma-компоненты и runtime-код библиотеки не менялись.
