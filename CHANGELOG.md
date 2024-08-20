## 47.12.0

<sup><time>20.08.2024</time></sup>

### [#1336](https://github.com/core-ds/core-components/pull/1336)

#### Что изменилось
- Добавили пропс groupOptionsProp для прокидки дополнительных пропсов в компонент Optgroup

#### Влияние на компоненты
- Минорное<br />`select`


### [#1338](https://github.com/core-ds/core-components/pull/1338)

#### Что изменилось
- Исправлено отображение имени файла в состоянии ошибки

#### Влияние на компоненты
- Патчи<br />`file-upload-item`


### [#1334](https://github.com/core-ds/core-components/pull/1334)

#### Что изменилось
- Корректно проставляется `inputClassName`

#### Влияние на компоненты
- Патчи<br />`amount-input`



## 47.11.0

<sup><time>16.08.2024</time></sup>

### [#1333](https://github.com/core-ds/core-components/pull/1333)

#### Что изменилось
#### pattern-lock
- Добавлен пропс `disabled`, который позволяет отключать взаимодействие с компонентом

#### pass-code
- Добавлен атрибут `title` с описанием кнопки удаления введенных символов
- Добавлен пропс `rightAddonsTitle`, который позволяет добавлять атрибут `title` для передаваемого аддона

#### toast-plate
- Добавлены атрибуты для улучшения доступности компонента

#### password-input
- Добавлен атрибут `title` с описанием кнопки скрытия / показа введенного пароля

#### Влияние на компоненты
- Минорное<br />`pass-code` `pattern-lock`


- Патчи<br />`password-input` `toast-plate`



## 47.10.0

<sup><time>16.08.2024</time></sup>

### [#1319](https://github.com/core-ds/core-components/pull/1319)

#### Что изменилось
- Добавлен пропс `clickableMonth`. При клике на заголовок месяца будет выделен весь доступный период. Доступен только для мобильного компонента
- Исправлено поведение кнопок в футере для мобильного компонента

#### Влияние на компоненты
- Минорное<br />`calendar`



## 47.9.0

<sup><time>13.08.2024</time></sup>

### [#1320](https://github.com/core-ds/core-components/pull/1320)

#### Что изменилось
- Добавлена функция автозаполнения номера телефона. Для сохранения кода страны при автозаполнении (актуально для Safari) используйте `clearableCountryCode={'preserve'}`, при этом код страны можно удалить как и в случае `clearableCountryCode={true}`.

#### Влияние на компоненты
- Минорное<br />`international-phone-input` `shared`



## 47.8.0

<sup><time>06.08.2024</time></sup>

### [#1328](https://github.com/core-ds/core-components/pull/1328)

#### Что изменилось
- Добавлен пропущенный размер радиуса скругления `--border-radius-32`

#### Влияние на компоненты
- Патчи<br />`vars`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`



## 47.7.0

<sup><time>05.08.2024</time></sup>

### [#1327](https://github.com/core-ds/core-components/pull/1327)

#### Что изменилось
Добавлены новые переменные радиусов скругления:
- `--border-radius-0`
- `--border-radius-4`
- `--border-radius-6`
- `--border-radius-8`
- `--border-radius-10`
- `--border-radius-12`
- `--border-radius-16`
- `--border-radius-20`
- `--border-radius-24`
- `--border-radius-36`

Переменные, помеченые как `deprecated`:
- `--border-radius-xs`
- `--border-radius-s`
- `--border-radius-m`
- `--border-radius-l`
- `--border-radius-xl`
- `--border-radius-xxl`
- `--border-radius-3xl`

#### Влияние на компоненты
- Минорное<br />`vars`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`



## 47.6.0

<sup><time>26.07.2024</time></sup>

### [#1305](https://github.com/core-ds/core-components/pull/1305)

#### Что изменилось
- Добавление заголовка h4

#### Влияние на компоненты
- Минорное<br />`markdown`


### [#1286](https://github.com/core-ds/core-components/pull/1286)

#### Что изменилось
- Добавлены data-test-id для внутренних элементов компонентов Plate и FormControl

#### Влияние на компоненты
- Патчи<br />`form-control` `plate`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`



## 47.5.0

<sup><time>19.07.2024</time></sup>

### [#1261](https://github.com/core-ds/core-components/pull/1261)

#### Что изменилось
- Исправлена фильтрация выбранных элементов в демо
- Проведена декомпозиция option list в компоненте base-select

#### Влияние на компоненты
- Патчи<br />`input-autocomplete` `select`


### [#1300](https://github.com/core-ds/core-components/pull/1300)

#### Что изменилось
- Добавлено новое свойство gap, отвечающее за отступы между элементами флекс-контейнера

#### Влияние на компоненты
- Минорное<br />`generic-wrapper`


### [#1298](https://github.com/core-ds/core-components/pull/1298)

#### Что изменилось
- Добавлены миксины accent_tagline, action_tagline, paragraph_tagline

#### Влияние на компоненты
- Минорное<br />`vars`

<br />

#### Что изменилось
- В компонент Typography.Text добавлен новый вариант начертания - tagline

#### Влияние на компоненты
- Минорное<br />`typography`


### [#1297](https://github.com/core-ds/core-components/pull/1297)

#### Что изменилось
- Обновлена документация
- RUR для пропса currency - deprecated
- Для разработчиков добавлен warning при использовании валюты RUR

#### Влияние на компоненты
- Патчи<br />`amount`


### [#1299](https://github.com/core-ds/core-components/pull/1299)

#### Что изменилось
- Добавлено новое свойство monospaceNumbers, которое делает цифры моноширинными

#### Влияние на компоненты
- Минорное<br />`text`


### [#1294](https://github.com/core-ds/core-components/pull/1294)

#### Что изменилось
- Исправлены отступы компонента
- Добавлен пропс `disabled` для запрета ввода/удаления кода

#### Влияние на компоненты
- Минорное<br />`pass-code`

<br />

#### Что изменилось
- Исправлены отступы компонента
- Исправлен фоновый цвет компонента на прозрачный

#### Влияние на компоненты
- Минорное<br />`pattern-lock`


### [#1301](https://github.com/core-ds/core-components/pull/1301)

#### Что изменилось
- Исправлен скролл при клике на вариант выбора в браузере Safari

#### Влияние на компоненты
- Патчи<br />`select`


### [#1290](https://github.com/core-ds/core-components/pull/1290)

#### Что изменилось
- Добавлено кэширование иконок, чтобы предотвратить их перезагрузку при повторном монтировании

#### Влияние на компоненты
- Патчи<br />`cdn-icon`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`


### [#1303](https://github.com/core-ds/core-components/pull/1303)

#### Что изменилось
- Добавлены новые имена для переменных gap

#### Влияние на компоненты
- Минорное<br />`vars`


### [#1296](https://github.com/core-ds/core-components/pull/1296)

#### Что изменилось
- Исправлено поведение компонента Typography.TitleMobile: теперь он корректно учитывает пропс rowLimit и больше не игнорирует его

#### Влияние на компоненты
- Патчи<br />`typography`



## 47.4.0

<sup><time>16.07.2024</time></sup>

### [#1287](https://github.com/core-ds/core-components/pull/1287)

#### Что изменилось
- Компонент был обернут в forwardRef

#### Влияние на компоненты
- Минорное<br />`navigation-bar`


### [#1284](https://github.com/core-ds/core-components/pull/1284)

#### Что изменилось
- Исправлен вызов `onBlur` при `showSearch={true}`

#### Влияние на компоненты
- Патчи<br />`select`


### [#1275](https://github.com/core-ds/core-components/pull/1275)

#### Что изменилось
- Исправлена верстка компнента Option для корректного расчета высоты списка вариантов выбора

#### Влияние на компоненты
- Патчи<br />`select`


### [#1291](https://github.com/core-ds/core-components/pull/1291)

#### Что изменилось
- Добавлен пропс defaultMatchMediaValue. С помощью него можно задавать fallback значение для хука useMatchMedia внутри компонента.

#### Влияние на компоненты
- Минорное<br />`calendar` `checkbox-group` `code-input` `confirmation` `custom-picker-button`<br /> `filter-tag` `mq` `pass-code` `pattern-lock` `plate`<br /> `radio-group` `tag` `toast` `toast-plate` `typography`<br />


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`


### [#1289](https://github.com/core-ds/core-components/pull/1289)

#### Что изменилось
- Добавлен проп для случаев, когда необходима отзывчивость компонента из-за изменении видимой части браузера при открытии клавиатуры устройства

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`



## 47.3.0

<sup><time>05.07.2024</time></sup>

### [#1190](https://github.com/core-ds/core-components/pull/1190)

#### Что изменилось
- Упрощена работа с периодами. Теперь достаточно использовать только value и onChange. Режим выбора периода управляется пропсой rangeBehavior. Пропсы selectedFrom и selectedTo помечены как deprecated.

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#1273](https://github.com/core-ds/core-components/pull/1273)

#### Что изменилось
- Добавлено предупреждение в консоль о том, что значение soft для view теперь deprecated

#### Влияние на компоненты
- Патчи<br />`status`


### [#1269](https://github.com/core-ds/core-components/pull/1269)

#### Что изменилось
- Пункт 'Выбрать все' скрыт, когда список вариантов пуст

#### Влияние на компоненты
- Патчи<br />`select`


### [#1279](https://github.com/core-ds/core-components/pull/1279)

#### Что изменилось
- Добавлены новые свойства background и borderColor, отвечающие за фон и цвет бордера у компонента при view=custom

#### Влияние на компоненты
- Минорное<br />`plate`


### [#1278](https://github.com/core-ds/core-components/pull/1278)

#### Что изменилось
- Добавлено новое свойство position, отвечающее за позиционирование компонента от верхнего или нижнего края экрана

#### Влияние на компоненты
- Минорное<br />`notification`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`


### [#1277](https://github.com/core-ds/core-components/pull/1277)

#### Что изменилось
- Исправили ширину и высоту для размера '16' с 18px на 16px

#### Влияние на компоненты
- Минорное<br />`spinner`


### [#1272](https://github.com/core-ds/core-components/pull/1272)

#### Что изменилось
- Исправлено позиционирование инпута для группы тегов

#### Влияние на компоненты
- Патчи<br />`radio-group`



## 47.2.0

<sup><time>04.07.2024</time></sup>

### [#1226](https://github.com/core-ds/core-components/pull/1226)

#### Что изменилось
- SVG флагов оптимизированны по размеру, с сохранением качества графики.

#### Влияние на компоненты
- Патчи<br />`international-phone-input`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`



## 47.1.0

<sup><time>04.07.2024</time></sup>

### [#1274](https://github.com/core-ds/core-components/pull/1274)

#### Что изменилось
- Исправлен расчет высоты контента

#### Влияние на компоненты
- Патчи<br />`accordion`

<br />

#### Что изменилось
- Добавлен проп 'limitDynamicOptionGroupSize' для ограчения динамического размера группы вариантов. Если он включен, используется размер, указанный в проп 'size'

#### Влияние на компоненты
- Минорное<br />`select`

<br />

#### Что изменилось
- Добавлен проп 'bodyContentClassName'

#### Влияние на компоненты
- Минорное<br />`accordion`


### [#1282](https://github.com/core-ds/core-components/pull/1282)

#### Что изменилось
- Исправление сборки для темизаций. В каждую тему снова добавлены импорты переменных.

#### Влияние на компоненты
- Патчи<br />`themes`


### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`



## 47.0.0

<sup><time>28.06.2024</time></sup>

### [#1231](https://github.com/core-ds/core-components/pull/1231)

#### Что изменилось
- Удален тип 'card'
- Добавлен трансформер input-type-card, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric'

#### Влияние на компоненты
- Мажорное<br />`input`

<br />

#### Что изменилось
- Добавлен кодмод, который заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input

#### Влияние на компоненты
- Минорное<br />`codemod`


### [#1191](https://github.com/core-ds/core-components/pull/1191)

#### Что изменилось
- Релиз содержит ошибку, используйте следующий

#### Влияние на компоненты
- Мажорное<br />`themes`


### [#1207](https://github.com/core-ds/core-components/pull/1207)

#### Что изменилось
- При взаимодействии нескольких компонентов-модулей, которые включают в себя core-components, React Context создает несколько экземпляров, что приводит к потере z-index. Для решения этой проблемы контекст компонента `Stack` вынесен в глобальную библиотеку.

#### Влияние на компоненты
- Мажорное<br />`stack`


- Патчи<br />`base-modal` `notification-manager` `notification` `popover` `toast`<br />


### [#1233](https://github.com/core-ds/core-components/pull/1233)

#### Что изменилось
Редизайн компонентов PassCode и PatternLock
- Внесены изменения в адаптивность
- Удалены пропсы для вывода кастомных сообщений и ошибок
Эти исправления уменьшили габариты компонентов, что позволит упростить работу с их размещением на странице

## Обновление
Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До
```js
import { PassCode } from '@alfalab/core-components/pass-code';
import { PatternLock } from '@alfalab/core-components/pattern-lock';
```
После
```js
import { PassCodeV1 } from '@alfalab/core-components/pass-code-v1';
import { PatternLockV1 } from '@alfalab/core-components/pattern-lock-v1';
```
Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.

#### Влияние на компоненты
- Мажорное<br />`pass-code` `pass-code-v1` `pattern-lock` `pattern-lock-v1`


- Патчи<br />`gap` `vars`



## 46.5.0

<sup><time>28.06.2024</time></sup>

### [#1215](https://github.com/core-ds/core-components/pull/1215)

#### Что изменилось
- Добавлена возможность переопределять рендер контейнер для группы элементов использующих Portal

#### Влияние на компоненты
- Минорное<br />`portal` `shared`



## 46.4.0

<sup><time>27.06.2024</time></sup>

### [#1250](https://github.com/core-ds/core-components/pull/1250)

#### Что изменилось
- Изменен элемент наблюдения ResizeObserver с contentRef.current на contentCaseRef.current, теперь контейнер контента динамически изменяет высоту при добавлении контента

#### Влияние на компоненты
- Патчи<br />`accordion`


### [#1256](https://github.com/core-ds/core-components/pull/1256)

#### Что изменилось
- Исправили стили для кнопки с view=filled

#### Влияние на компоненты
- Патчи<br />`button`


### [#1266](https://github.com/core-ds/core-components/pull/1266)

#### Что изменилось
- Исправление типизации компонента

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`


### [#1263](https://github.com/core-ds/core-components/pull/1263)

#### Что изменилось
- Добавили новые свойства: showSkeleton и skeletonProps, отвечающие за отображение скелетона и дополнительные пропсы для него

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#1262](https://github.com/core-ds/core-components/pull/1262)

#### Что изменилось
- В некоторых кейсах на iOS не блокируется прокрутка при открытом `bottom-sheet`. Добавлен пропс для обработки таких случаев.

#### Влияние на компоненты
- Патчи<br />`base-modal` `bottom-sheet`


### [#1252](https://github.com/core-ds/core-components/pull/1252)

#### Что изменилось
- Добавлено новое свойство align, отвечающее за выравнивание чекбокса или иконки "галочки". По умолчанию элемент выровнен по центру. Для того чтобы изменить выравнивание, необходимо передать компоненту optionProps={{align: 'start'}}

#### Влияние на компоненты
- Минорное<br />`select`


### [#1259](https://github.com/core-ds/core-components/pull/1259)

#### Что изменилось
- Обновление vars из последней версии ui-primitives

#### Влияние на компоненты
- Минорное<br />`vars`


### [#1254](https://github.com/core-ds/core-components/pull/1254)

#### Что изменилось
- Изменили стили для значения поля ввода, когда количество вводимых символов превышает maxLength, если включено переполнение

#### Влияние на компоненты
- Патчи<br />`textarea`


### [#1255](https://github.com/core-ds/core-components/pull/1255)

#### Что изменилось
- Для предотвращения мерцания компонента в SSR добавлена возможность установки значения по умолчанию для useMatchMedia

#### Влияние на компоненты
- Минорное<br />`button`


### [#1253](https://github.com/core-ds/core-components/pull/1253)

#### Что изменилось
- Удалена темизация click для компонентов Link и IconButton, а также для фона в ToastPlate

#### Влияние на компоненты
- Минорное<br />`themes`


### [#1258](https://github.com/core-ds/core-components/pull/1258)

#### Что изменилось
- Заменили устаревшие цветовые токены на актуальные

#### Влияние на компоненты
- Минорное<br />`calendar` `chart` `checkbox` `confirmation-v1` `custom-button`<br /> `filter-tag` `gallery` `icon-button` `indicator` `intl-phone-input`<br /> `pattern-lock` `product-cover` `pure-cell` `select` `themes`<br /> `table` `typography`



## 46.3.1

<sup><time>26.06.2024</time></sup>

### [#1228](https://github.com/core-ds/core-components/pull/1228)

#### Что изменилось
- Добавлен пропс contentWrapperClassName

#### Влияние на компоненты
- Патчи<br />`navigation-bar`


### [#1264](https://github.com/core-ds/core-components/pull/1264)

#### Что изменилось
- Исправлена ширина контента в пустом состоянии

#### Влияние на компоненты
- Патчи<br />`scrollbar`



## 46.3.0

<sup><time>21.06.2024</time></sup>

### [#1249](https://github.com/core-ds/core-components/pull/1249)

#### Что изменилось
- Добавлен поиск по группам значений

#### Влияние на компоненты
- Минорное<br />`select`


### [#1248](https://github.com/core-ds/core-components/pull/1248)

#### Что изменилось
- увеличена специфичность стилей для кнопок футера

#### Влияние на компоненты
- Патчи<br />`select`


### [#1257](https://github.com/core-ds/core-components/pull/1257)

#### Что изменилось
- Корректная передача пропсов для мобильного варианта компонента

#### Влияние на компоненты
- Патчи<br />`select`



## 46.2.1

<sup><time>17.06.2024</time></sup>

### [#1251](https://github.com/core-ds/core-components/pull/1251)

#### Что изменилось
- Повысили специфичность для отступов контента в мобильной селекте

#### Влияние на компоненты
- Патчи<br />`select`



## 46.2.0

<sup><time>14.06.2024</time></sup>

### [#1235](https://github.com/core-ds/core-components/pull/1235)

#### Что изменилось
- Добавлен параметр displayName для корректного отображения компонентов в React Devtools

#### Влияние на компоненты
- Патчи<br />`action-button` `amount-input` `attach` `bank-card` `base-modal`<br /> `bottom-sheet` `button` `calendar` `calendar-with-skeleton` `chart`<br /> `checkbox` `code-input` `collapse` `custom-button` `custom-picker-button`<br /> `drawer` `filter-tag` `form-control` `hatching-progress-bar` `icon-button`<br /> `icon-view` `indicator` `input` `input-autocomplete` `international-phone-input`<br /> `link` `masked-input` `modal` `navigation-bar-private` `notification`<br /> `notification-manager` `number-input` `pass-code` `password-input` `pattern-lock`<br /> `phone-input` `picker-button` `plate` `popover` `popup-sheet`<br /> `portal` `progress-bar` `pure-cell` `radio` `radio-group`<br /> `scrollbar` `select` `select-with-tags` `side-panel` `slider-input`<br /> `sortable-list` `space` `switch` `tab-bar` `tabs`<br /> `tag` `textarea` `toast` `toast-plate` `underlay`<br /> `universal-date-input`


### [#1246](https://github.com/core-ds/core-components/pull/1246)

#### Что изменилось
- Добавлены пропсы в OptGroup для управления выбранными вариантами

#### Влияние на компоненты
- Минорное<br />`select`


### [#1247](https://github.com/core-ds/core-components/pull/1247)

#### Что изменилось
- Изменили стили типографики для имени файла и текста, отображаемого, когда файл не загружен

#### Влияние на компоненты
- Патчи<br />`attach`


### [#1232](https://github.com/core-ds/core-components/pull/1232)

#### Что изменилось
- Добавили новое свойство block, отвечающее за растягивание компонента на ширину контейнера

#### Влияние на компоненты
- Минорное<br />`filter-tag`


### [#1227](https://github.com/core-ds/core-components/pull/1227)

#### Что изменилось
- Повышена специфичность для стилей, отвечающих за внутренний отступ у кнопок выбора года и месяца

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#1236](https://github.com/core-ds/core-components/pull/1236)

#### Что изменилось
- Исправлена ​​логика смены активного шага

#### Влияние на компоненты
- Патчи<br />`steps`


### [#1220](https://github.com/core-ds/core-components/pull/1220)

#### Что изменилось
- Добавлена поддержка формата мм.гггг

#### Влияние на компоненты
- Минорное<br />`universal-date-input`


### [#1240](https://github.com/core-ds/core-components/pull/1240)

#### Что изменилось
- Исправлена ошибка рендера в ssr

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#1242](https://github.com/core-ds/core-components/pull/1242)

#### Что изменилось
- Исправлен сброс чекбоксов при работе с поиском в мультиселекте

#### Влияние на компоненты
- Патчи<br />`select`


### [#1244](https://github.com/core-ds/core-components/pull/1244)

#### Что изменилось
- Исправлена ширина списка выбора вариантов Select при использовании VirtualOptionsList

#### Влияние на компоненты
- Патчи<br />`scrollbar`



## 46.1.0

<sup><time>13.06.2024</time></sup>

### [#1229](https://github.com/core-ds/core-components/pull/1229)

#### Что изменилось
- Изменили цветовые токены: color-light-neutral-1500 -> color-light-neutral-translucent-1300, color-light-neutral-1500-inverted -> color-light-neutral-translucent-1300-inverted, color-static-neutral-1500 -> color-static-neutral-translucent-1300, color-static-neutral-1500-inverted -> color-static-neutral-translucent-1300-inverted

#### Влияние на компоненты
- Патчи<br />`action-button` `badge` `bank-card` `button` `calendar-range`<br /> `calendar` `checkbox` `circular-progress-bar` `dropzone` `file-upload-item`<br /> `filter-tag` `icon-button` `indicator` `input` `navigation-bar-private`<br /> `pass-code` `progress-bar` `radio` `select` `sortable-list`<br /> `spinner` `status-badge` `steps` `underlay`

<br />

#### Что изменилось
- Изменили цветовой токен: color-light-graphic-primary -> color-light-neutral-0-inverted

#### Влияние на компоненты
- Патчи<br />`pattern-lock`

<br />

#### Что изменилось
- Изменили цветовой токен: color-static-neutral-1500-inverted -> color-static-neutral-0

#### Влияние на компоненты
- Патчи<br />`switch`


### [#1225](https://github.com/core-ds/core-components/pull/1225)

#### Что изменилось
- Добавлено новое свойство transparentBg, отвечающее за включение прозрачного фона у компонента

#### Влияние на компоненты
- Минорное<br />`icon-button`


### [#1239](https://github.com/core-ds/core-components/pull/1239)

#### Что изменилось
- Исправлено положение футера для виртуального списка опций с поиском (при OptionsList={VirtualOptionsList}). Раньше при вводе в инпут поиска положение футера было сверху, теперь футер снизу

#### Влияние на компоненты
- Патчи<br />`select`


### [#1223](https://github.com/core-ds/core-components/pull/1223)

#### Что изменилось
- Добавлены новые значения для свойства view: 'muted-alt' и 'muted'. Значение 'soft' для view теперь deprecated, используйте вместо него 'muted-alt'
- Также добавлен кодмод, который изменяет значение view компонента Status с 'soft' на 'muted-alt'

#### Влияние на компоненты
- Минорное<br />`status`


### [#1234](https://github.com/core-ds/core-components/pull/1234)

#### Что изменилось
- Исправлено поведение scrollToArea при первом рендере, когда еще не выполнены расчеты высоты. Теперь scrollToArea при первом рендере ведет себя так же, как и initialActiveAreaIndex.

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`



## 46.0.0

<sup><time>28.05.2024</time></sup>

### [#1159](https://github.com/core-ds/core-components/pull/1159)

#### Что изменилось
- Добавлено новое свойство allowBackdropBlur, отвечающее за размытие фона
- Добавлен трансформер skeleton-blur, который устанавливает свойство allowBackdropBlur в значение true для компонента Skeleton
- Удалена css переменная --skeleton-gradient-animation-display

#### Влияние на компоненты
- Мажорное<br />`skeleton`

<br />

#### Что изменилось
- Удалена тема click для компонента Skeleton

#### Влияние на компоненты
- Минорное<br />`themes`


### [#1158](https://github.com/core-ds/core-components/pull/1158)

#### Что изменилось
- В toast-plate компоненте badge заменен на status-badge
- Добавлена возможность принимать кастомные иконки для status-badge

## Миграция для toast-plate компонента

- Добавлены изменения в пропс getBadgeIcons. Теперь он будет принимать объект в виде:
```
{
  'positive-checkmark': {
      24: AScoresCircleMIcon,
  },
  'negative-cross': {
    ...
  },
}
```

- `'negative' | 'positive' | 'attention'` - `@deprеcated`
  Их по-прежнему можно передавать в пропс `badge` (компоненты toast, toast-plate, notification), под капотом они автоматически преобразуютеся в `'negative-cross' | 'positive-checkmark' | 'attention-alert'` соответственно

#### Влияние на компоненты
- Мажорное<br />`notification` `toast-plate` `toast`


- Минорное<br />`shared` `status-badge`


### [#1114](https://github.com/core-ds/core-components/pull/1114)

#### Что изменилось
- Изменили компонент, отвечающий за индикатор таба с Badge на Indicator. Следовательно, изменился тип свойства indicatorProps с BadgeProps на IndicatorProps

## Миграция с предыдущей версии

- Для того чтобы передать значение в индикатор необходимо заменить content на value. Например: indicatorProps: { content: 100 } -> indicatorProps: { value: 100 }

#### Влияние на компоненты
- Мажорное<br />`tab-bar`

<br />

#### Что изменилось
- Добавили новые props accentColor и bgColor, отвечающие за цвет активного таба и фон соответственно

#### Влияние на компоненты
- Минорное<br />`tab-bar`


### [#1194](https://github.com/core-ds/core-components/pull/1194)

#### Что изменилось
- Изменен тип параметра на Files[] в обработчике onDrop

#### Влияние на компоненты
- Мажорное<br />`dropzone`



## 45.10.0

<sup><time>24.05.2024</time></sup>

### [#1193](https://github.com/core-ds/core-components/pull/1193)

#### Что изменилось
- Добавили dataTestId к PeriodSlider

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#1216](https://github.com/core-ds/core-components/pull/1216)

#### Что изменилось
- Исправлено поведение фокуса внутри модального окна

#### Влияние на компоненты
- Патчи<br />`base-modal`


### [#1214](https://github.com/core-ds/core-components/pull/1214)

#### Что изменилось
- Добавлена возможность обработки строковых значений для отображения даты

#### Влияние на компоненты
- Патчи<br />`universal-date-input`


### [#1175](https://github.com/core-ds/core-components/pull/1175)

#### Что изменилось
- Внутренний компонент NavigationBar переименован в NavigationBarPrivate

#### Влияние на компоненты
- Минорное<br />`bottom-sheet` `modal` `navigation-bar-private` `popup-sheet` `side-panel`<br />

<br />

#### Что изменилось
- Добавлен новый компонент NavigationBar

#### Влияние на компоненты
- Минорное<br />`navigation-bar`


### [#1204](https://github.com/core-ds/core-components/pull/1204)

#### Что изменилось
- Исправлен отступ в компонентах CheckboxGroup и RadioGroup в соответствии с макетом при их вертикальном расположении. Ранее отступ составлял 16px, теперь он уменьшен до 12px

#### Влияние на компоненты
- Патчи<br />`checkbox-group` `radio-group`


### [#1178](https://github.com/core-ds/core-components/pull/1178)

#### Что изменилось
- При открытии модальных окон в iOS, если браузерный navbar был сжат, то в модалке сохранится возможность взаимодействия со скролом. Текущее поведение исправлено, чтобы воспользоваться, нужно передать пропс iOSLock.

#### Влияние на компоненты
- Патчи<br />`base-modal` `modal`


### [#1189](https://github.com/core-ds/core-components/pull/1189)

#### Что изменилось
- Свойство style перенесено с корневого HTML тега на заголовок табов.

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#1205](https://github.com/core-ds/core-components/pull/1205)

#### Что изменилось
- Для компонента Status было добавлено многоточие для обработки сценариев переполнения

#### Влияние на компоненты
- Минорное<br />`status`


### [#1210](https://github.com/core-ds/core-components/pull/1210)

#### Что изменилось
- Изменены типы принимаемых компонентов

#### Влияние на компоненты
- Патчи<br />`base-modal` `custom-picker-button` `input-autocomplete` `input` `picker-button`<br /> `select` `slider-input` `slider`


### [#1201](https://github.com/core-ds/core-components/pull/1201)

#### Что изменилось
- У кнопок в нижнем аддоне изменился отступ сверху: для десктопа с 20 до 8 пикселей, а на мобильной версии — с 12 до 8 пикселей. Также на десктопе у контейнера Caption был уменьшен верхний отступ с 4 до 0 пикселей

#### Влияние на компоненты
- Патчи<br />`plate`


### [#1203](https://github.com/core-ds/core-components/pull/1203)

#### Что изменилось
- Исправлена форма для компонета SuperEllipse в размере 40 (стала более округлой)

#### Влияние на компоненты
- Минорное<br />`icon-view`


### [#1218](https://github.com/core-ds/core-components/pull/1218)

#### Что изменилось
- Исправлен выбор даты на мобильных устройствах

#### Влияние на компоненты
- Патчи<br />`universal-date-input`


### [#1208](https://github.com/core-ds/core-components/pull/1208)

#### Что изменилось
- Тип GenericWrapperProps был расширен нативными атрибутами, предоставляемыми библиотекой React для элемента HTMLDivElement

#### Влияние на компоненты
- Патчи<br />`generic-wrapper`


### [#1103](https://github.com/core-ds/core-components/pull/1103)

#### Что изменилось
- Добавлен новый компонент ProductCover

#### Влияние на компоненты
- Минорное<br />`product-cover`


### [#1212](https://github.com/core-ds/core-components/pull/1212)

#### Что изменилось
- Исправлено предупреждение, которое возникало из-за передачи FormControlComponent в компонент Button

#### Влияние на компоненты
- Патчи<br />`picker-button`


### [#1209](https://github.com/core-ds/core-components/pull/1209)

#### Что изменилось
- Добавлено новое свойство icon, которое позволяет передать кастомную иконку при использовании типа кнопки compact

#### Влияние на компоненты
- Минорное<br />`picker-button`


### [#1211](https://github.com/core-ds/core-components/pull/1211)

#### Что изменилось
- Добавили dataTestId для иконок, обозначающих успешное действие, ошибку и крестик для очистки
- Компонент Badge заменен на StatusBadge

#### Влияние на компоненты
- Патчи<br />`input`



## 45.9.0

<sup><time>15.05.2024</time></sup>

### [#1188](https://github.com/core-ds/core-components/pull/1188)

#### Что изменилось
- Исправлено закрытие компонента при горизонтальных свайпах

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#1197](https://github.com/core-ds/core-components/pull/1197)

#### Что изменилось
- Исправлен отступ кнопок в компоненте `bottom-sheet` для iOS систем

#### Влияние на компоненты
- Патчи<br />`bottom-sheet` `input-autocomplete` `input` `picker-button`


### [#1195](https://github.com/core-ds/core-components/pull/1195)

#### Что изменилось
- Обновлена зависимость react-focus-lock

#### Влияние на компоненты
- Патчи<br />`base-modal`


### [#1199](https://github.com/core-ds/core-components/pull/1199)

#### Что изменилось
- В PureCell.AmountTitle заменили компонент Typography.Title на Typography.TitleResponsive

#### Влияние на компоненты
- Минорное<br />`pure-cell`


### [#1192](https://github.com/core-ds/core-components/pull/1192)

#### Что изменилось
- В связи с проблемами поддержки свойства gap в Chrome версии 79, было принято решение заменить его использование для создания отступа между элементами Checkmark и подписью в опциях на свойство margin-right, которое было применено к самому элементу Checkmark

#### Влияние на компоненты
- Патчи<br />`select`


### [#1202](https://github.com/core-ds/core-components/pull/1202)

#### Что изменилось
- Добавлена возможность устанавливать тип маски для номера счёта

#### Влияние на компоненты
- Минорное<br />`bank-card`


### [#1198](https://github.com/core-ds/core-components/pull/1198)

#### Что изменилось
- Добавили новое свойство wrapperRef, отвечающее за ref для обертки textarea

#### Влияние на компоненты
- Минорное<br />`textarea`



## 45.8.0

<sup><time>27.04.2024</time></sup>

### [#1173](https://github.com/core-ds/core-components/pull/1173)

#### Что изменилось
- Для компонента Attach с размером 64 исправлен отступ от label. Для остальных размеров сохранены прежние отступы.

#### Влияние на компоненты
- Патчи<br />`attach`


### [#1174](https://github.com/core-ds/core-components/pull/1174)

#### Что изменилось
- Обновление библиотеки ui-primitives и зависящих от нее файлов.

#### Влияние на компоненты
- Патчи<br />`action-button` `amount-input` `amount` `attach` `bottom-sheet`<br /> `button`


### [#1177](https://github.com/core-ds/core-components/pull/1177)

#### Что изменилось
- Добавлены css переменные --pure-cell-clickable-area-hover-opacity и --pure-cell-clickable-area-active-opacity для PureCell темы click

#### Влияние на компоненты
- Патчи<br />`themes`

<br />

#### Что изменилось
- Добавлен пропс onClick для компонента PureCell.Graphics
- Добавлен пропс onClick для компонента PureCell.Main
- Добавлен пропс onClick для компонента PureCell.Addon
- Кликабельные области PureCell изолированы в плане всплытия событий (click, hover, active)

#### Влияние на компоненты
- Минорное<br />`pure-cell`


### [#1183](https://github.com/core-ds/core-components/pull/1183)

#### Что изменилось
- Добавлена возможность изменения текста PeriodSlider для состояния когда ему не переданы даты

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#1171](https://github.com/core-ds/core-components/pull/1171)

#### Что изменилось
- Добавлен параметр reason для onInput события

#### Влияние на компоненты
- Минорное<br />`input-autocomplete` `input`


### [#1182](https://github.com/core-ds/core-components/pull/1182)

#### Что изменилось
- Добавлена возможность устанавливать в сегмент ReactNode
- Обновлена документация

#### Влияние на компоненты
- Патчи<br />`segmented-control`


### [#1181](https://github.com/core-ds/core-components/pull/1181)

#### Что изменилось
- В компоненте Modal.Header теперь учитывается как onClose пропса из Modal, так и из Modal.Header

#### Влияние на компоненты
- Патчи<br />`modal`


### [#1187](https://github.com/core-ds/core-components/pull/1187)

#### Что изменилось
- В компоненте Tab был расширен тип для свойства title до ReactNode

#### Влияние на компоненты
- Патчи<br />`tabs`



## 45.7.0

<sup><time>19.04.2024</time></sup>

### [#1163](https://github.com/core-ds/core-components/pull/1163)

#### Что изменилось
- Обновили версию react-canvas-pattern-lock. Исправили ховер, теперь, если линию не довести до узла, она исчезает

#### Влияние на компоненты
- Минорное<br />`pattern-lock`


### [#1168](https://github.com/core-ds/core-components/pull/1168)

#### Что изменилось
- Для свойства onDelete был добавлен второй параметр, который является опциональным и представляет собой событие event

#### Влияние на компоненты
- Минорное<br />`file-upload-item`


### [#1153](https://github.com/core-ds/core-components/pull/1153)

#### Что изменилось
- Добавили возможность прокидки popoverProps в компонент

#### Влияние на компоненты
- Минорное<br />`select`


### [#1170](https://github.com/core-ds/core-components/pull/1170)

#### Что изменилось
- Устранена проблема, из-за которой невозможно было установить год раньше 1971

#### Влияние на компоненты
- Патчи<br />`universal-date-input`


### [#1164](https://github.com/core-ds/core-components/pull/1164)

#### Что изменилось
- Добавлен новый компонент Accordion

#### Влияние на компоненты
- Минорное<br />`accordion`


### [#1165](https://github.com/core-ds/core-components/pull/1165)

#### Что изменилось
- Добавлено новое свойство style, отвечающее за дополнительные инлайновые стили для враппера

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#1172](https://github.com/core-ds/core-components/pull/1172)

#### Что изменилось
- Повышена специфичность для стилей, отвечающих за размеры кнопки text

#### Влияние на компоненты
- Патчи<br />`button`


### [#1151](https://github.com/core-ds/core-components/pull/1151)

#### Что изменилось
- Исправлена логика закрытия селекта с номерами телефонов при включенном автокомплите. Теперь при переключении между селектами выбора страны и выбора номера телефона, селекты закрываются, а не перекрывают друг друга

#### Влияние на компоненты
- Патчи<br />`international-phone-input`


### [#1169](https://github.com/core-ds/core-components/pull/1169)

#### Что изменилось
- Добавлено свойство offset, которое определяет отступ от верхнего края

#### Влияние на компоненты
- Минорное<br />`notification-manager`


### [#1157](https://github.com/core-ds/core-components/pull/1157)

#### Что изменилось
- Изменили логику добавления бордера при скролле в десктопном компоненте. Теперь бордер добавляется к футеру и хедеру только при перекрытии контента

#### Влияние на компоненты
- Патчи<br />`select`


### [#1166](https://github.com/core-ds/core-components/pull/1166)

#### Что изменилось
- Добавлено новое свойство style, отвечающее за дополнительные инлайновые стили для враппера

#### Влияние на компоненты
- Минорное<br />`segmented-control`



## 45.6.0

<sup><time>08.04.2024</time></sup>

### [#1155](https://github.com/core-ds/core-components/pull/1155)

#### Что изменилось
- Добавлен `iconContainerClassName` для стилизации обёртки иконки

#### Влияние на компоненты
- Минорное<br />`icon-view`


### [#1160](https://github.com/core-ds/core-components/pull/1160)

#### Что изменилось
- Добавлено свойство inputRef, отвечающее за передачу ref на инпут

#### Влияние на компоненты
- Минорное<br />`checkbox`


### [#1162](https://github.com/core-ds/core-components/pull/1162)

#### Что изменилось
- Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено

#### Влияние на компоненты
- Патчи<br />`universal-date-input`



## 45.5.0

<sup><time>29.03.2024</time></sup>

### [#1127](https://github.com/core-ds/core-components/pull/1127)

#### Что изменилось
- Исправлено выравнивание в мобильном компоненте: изменен вид кнопки "Не приходит сообщение" с link на text. Также исправлено выравнивание номеров телефона на экране "Не приходит сообщение?"

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#1100](https://github.com/core-ds/core-components/pull/1100)

#### Что изменилось
- fix(slider): Исправлена проблема, что событие onEnd не вызывалось когда перемещался ползунок стрелками на клавиатуре или тапом в слайдере

#### Влияние на компоненты
- Патчи<br />`slider`


### [#1152](https://github.com/core-ds/core-components/pull/1152)

#### Что изменилось
- Повышена специфичность стилей label

#### Влияние на компоненты
- Патчи<br />`collapse`


### [#1139](https://github.com/core-ds/core-components/pull/1139)

#### Что изменилось
- Исправлена ошибка при вставке номера телефона без указания кода страны (когда цифра 7 находится на второй позиции). Например, раньше при вставке номера 9706531700 номер форматировался в +7 906 531 70 0. Теперь цифра 7 не удаляется из вставляемого телефона

#### Влияние на компоненты
- Патчи<br />`phone-input`


### [#1147](https://github.com/core-ds/core-components/pull/1147)

#### Что изменилось
- Обновили версии пакетов @alfalab/utils и @alfalab/data

#### Влияние на компоненты
- Минорное<br />`amount-input` `amount` `attach` `confirmation-v1` `confirmation`<br /> `intl-phone-input` `pure-cell`


### [#1146](https://github.com/core-ds/core-components/pull/1146)

#### Что изменилось
- Убран margin-left у rightAddons, если title передали пустую строку

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#1154](https://github.com/core-ds/core-components/pull/1154)

#### Что изменилось
- Добавлено новое свойство error, отвечающее за отображение ошибки

#### Влияние на компоненты
- Минорное<br />`switch`


### [#1143](https://github.com/core-ds/core-components/pull/1143)

#### Что изменилось
- Исправлен повторный рендеринг кастомного экрана при каждом обновлении таймера. Теперь таймер не вызывает повторный рендеринг

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#1141](https://github.com/core-ds/core-components/pull/1141)

#### Что изменилось
- Исправлено определение ширины контента. Ранее, при включенном автокомплите, если было выбрано несколько тегов, и их контент занимал половину ширины поля ввода, при вводе любой буквы, а затем ее удалении, добавлялась и удалялась новая строка. Теперь этой проблемы нет

#### Влияние на компоненты
- Патчи<br />`select-with-tags`


### [#1133](https://github.com/core-ds/core-components/pull/1133)

#### Что изменилось
- Добавлена возможность изменять верхний и нижний паддинги компонента независимо друг от друга.
- Добавлена возможность выставлять значение марджина графики.
- Добавлена поддержка 'secondary-large' для текста.

#### Влияние на компоненты
- Минорное<br />`pure-cell`



## 45.4.0

<sup><time>22.03.2024</time></sup>

### [#1131](https://github.com/core-ds/core-components/pull/1131)

#### Что изменилось
- Добавили экспорт типа PureCellProps

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#1137](https://github.com/core-ds/core-components/pull/1137)

#### Что изменилось
- Зафиксирована версия downshift, т.к. более новые версии ломают поведение компонента

#### Влияние на компоненты
- Патчи<br />`select`


### [#1135](https://github.com/core-ds/core-components/pull/1135)

#### Что изменилось
- Исправлена критическая ошибка генерации списка в мобильном календаре с view="month-only" при установке даты больше трех лет назад

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#1118](https://github.com/core-ds/core-components/pull/1118)

#### Что изменилось
- Добавлены новые варианты кнопок: outlined, transparent, text. Они заменяют предыдущие варианты: tertiary, link, ghost соответственно. Link, ghost теперь deprecated
- Добавлен трансформер button-views-45 для замены предыдущих вариантов (link, ghost) кнопок на новые

#### Влияние на компоненты
- Минорное<br />`button`


### [#1138](https://github.com/core-ds/core-components/pull/1138)

#### Что изменилось
- Увеличена специфичность стилей в мобильном селекте

#### Влияние на компоненты
- Патчи<br />`select`


### [#1142](https://github.com/core-ds/core-components/pull/1142)

#### Что изменилось
- Изменили название стран с английского на русский язык

#### Влияние на компоненты
- Патчи<br />`international-phone-input`


### [#1134](https://github.com/core-ds/core-components/pull/1134)

#### Что изменилось
- Убрали hover для мобильных устройств

#### Влияние на компоненты
- Патчи<br />`link`


### [#1129](https://github.com/core-ds/core-components/pull/1129)

#### Что изменилось
- Добавлено новое свойство "multiline", которое позволяет использовать многострочные названия файлов. Также было удалено отображение нижней границы у компонента, если он является единственным или последним в списке

#### Влияние на компоненты
- Минорное<br />`file-upload-item`


### [#1140](https://github.com/core-ds/core-components/pull/1140)

#### Что изменилось
- Добавлен обработчик периода `range` для компонента `PeriodSlider`

#### Влияние на компоненты
- Патчи<br />`calendar`



## 45.3.0

<sup><time>15.03.2024</time></sup>

### [#1122](https://github.com/core-ds/core-components/pull/1122)

#### Что изменилось
- Добавлены десктопная и адаптивная версии компонента

#### Влияние на компоненты
- Минорное<br />`pattern-lock`


### [#1125](https://github.com/core-ds/core-components/pull/1125)

#### Что изменилось
- Изменили токен цвета фона при возникновении ошибки с neutral-translucent/100 на neutral-translucent/200

#### Влияние на компоненты
- Патчи<br />`form-control`


### [#1120](https://github.com/core-ds/core-components/pull/1120)

#### Что изменилось
- Загрузка изображений исправлена: теперь если произошла ошибка при загрузке, битое изображение не будет отображаться

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#1102](https://github.com/core-ds/core-components/pull/1102)

#### Что изменилось
- Добавлена переменная цвета фона для компонента tooltip

#### Влияние на компоненты
- Патчи<br />`tooltip`


### [#1126](https://github.com/core-ds/core-components/pull/1126)

#### Что изменилось
- Добавлены флаги для следующих стран: Caribbean Netherlands, Cyprus, French Guiana, Guadeloupe, Guyana, Kuwait, Malaysia, New Caledonia, Réunion, São Tomé and Príncipe

#### Влияние на компоненты
- Патчи<br />`international-phone-input`



## 45.2.0

<sup><time>04.03.2024</time></sup>

### [#1091](https://github.com/core-ds/core-components/pull/1091)

#### Что изменилось
- Экспортирован мобильный month-only календарь, пофикшены параметры month/defaultMonth для month-only view

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#1115](https://github.com/core-ds/core-components/pull/1115)

#### Что изменилось
- Исправлено использование хука useSelectWithApply в респонсив версии

#### Влияние на компоненты
- Патчи<br />`select`


### [#1094](https://github.com/core-ds/core-components/pull/1094)

#### Что изменилось
Добавлены свойства fullWidth и minSpaceBetweenSteps:

- fullWidth - возможность растягивания шагов на всю ширину блока для вертикальной ориентации,

- minSpaceBetweenSteps - возможность задать разное минимальное расстояние между шагами.

#### Влияние на компоненты
- Минорное<br />`steps`


### [#1117](https://github.com/core-ds/core-components/pull/1117)

#### Что изменилось
- Исправлено применение стилей, когда картнинки добавляются через время, а открытие галереи происходит с пустым массивом images

#### Влияние на компоненты
- Патчи<br />`gallery`


### [#1104](https://github.com/core-ds/core-components/pull/1104)

#### Что изменилось
- Добавлена передача optionGroupClassName и size для Optgroup внутри VirtualOptionsList

#### Влияние на компоненты
- Патчи<br />`select`



## 45.1.0

<sup><time>04.03.2024</time></sup>

### [#1098](https://github.com/core-ds/core-components/pull/1098)

#### Что изменилось
- обновлена темизация click

#### Влияние на компоненты
- Патчи<br />`themes`


### [#1092](https://github.com/core-ds/core-components/pull/1092)

#### Что изменилось
- Теперь, если пользователь удаляет номер телефона с помощью кнопки "очистить" (крестика), то выбранный флаг сбрасывается на флаг страны по умолчанию (если задан defaultIso2) или на заглушку - флаг страны не выбран. Ранее, после удаления номера с помощью кнопки "очистить", оставался последний выбранный флаг
- Если код страны не найден и установлено свойство defaultIso2, то теперь будет отображаться заглушка - флаг страны не выбран. Раньше оставался дефолтный флаг

#### Влияние на компоненты
- Патчи<br />`international-phone-input`


### [#1116](https://github.com/core-ds/core-components/pull/1116)

#### Что изменилось
- Добавлено новое свойство transparentMinor, теперь есть возможность отключить полупрозрачность минорной части

#### Влияние на компоненты
- Минорное<br />`amount-input`


### [#1106](https://github.com/core-ds/core-components/pull/1106)

#### Что изменилось
- Повышена специфичность стилей для option в SelectMobile

#### Влияние на компоненты
- Патчи<br />`select`


### [#1112](https://github.com/core-ds/core-components/pull/1112)

#### Что изменилось
- Повышена специфичность стилей для кнопки на экране FATAL_ERROR

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#1105](https://github.com/core-ds/core-components/pull/1105)

#### Что изменилось
- Расширили типы для children в подкомпонентах GraphicsElement, MainElement, FooterElement

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#1110](https://github.com/core-ds/core-components/pull/1110)

#### Что изменилось
- Исправлена логика обработки значения minDate. Ранее при установке minDate=new Date().getTime() возникала ошибка при выборе текущей даты. Теперь данное поведение исправлено

#### Влияние на компоненты
- Патчи<br />`universal-date-input`


### [#1111](https://github.com/core-ds/core-components/pull/1111)

#### Что изменилось
- Добавлен новый пропс onApply, отвечающий за обработку клика по кнопке "Выбрать"
- Добавлена возможность передавать dataTestId в компонент ModalMobile и его слоты (для CalendarMobile), а также в кнопки подтверждения и сброса

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#1108](https://github.com/core-ds/core-components/pull/1108)

#### Что изменилось
- обновлены минорные версии @alfalab/utils и @alfalab/data

#### Влияние на компоненты
- Минорное<br />`amount` `amount-input` `attach` `confirmation-v1` `intl-phone-input`<br /> `pure-cell`


### [#1119](https://github.com/core-ds/core-components/pull/1119)

#### Что изменилось
- Добавлена новая пропса errorVisibleDuration, отвечающая за продолжительность отображения ошибки
- Увеличено дефолтное время отображения ошибки с 300ms до 1300ms

#### Влияние на компоненты
- Минорное<br />`code-input` `confirmation`



## 45.0.0

<sup><time>12.02.2024</time></sup>

### [#1021](https://github.com/core-ds/core-components/pull/1021)

#### Что изменилось
- Для компонента ActionButton добавлен новый способ указать размер - 48. Буквенное значение размера s теперь deprecated, используйте вместо него 48
- Для компонента Attach добавлены новые способы указать размеры - 32, 40, 48, 56, 64. Буквенные значения размеров xxs, xs, s, m, l теперь deprecated, используйте вместо них 32 , 40 , 48 , 56 , 64 соответственно
- Для компонента FilterTag добавлены новые способы указать размеры - 32, 40, 48. Буквенные значения размеров xxs, xs, s теперь deprecated, используйте вместо них 32, 40, 48 соответственно

#### Влияние на компоненты
- Минорное<br />`action-button` `attach` `filter-tag`

<br />

#### Что изменилось
- Добавлены новые способы указать размеры - 48, 56, 64, 72. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 48, 56, 64, 72 соответственно

#### Влияние на компоненты
- Минорное<br />`amount-input` `form-control` `input-autocomplete` `input` `international-phone-input`<br /> `masked-input` `number-input` `password-input` `phone-input` `select`<br /> `select-with-tags` `slider-input` `textarea` `universal-date-input`

<br />

#### Что изменилось
- Добавлены новые способы указать размеры - 32, 40, 48, 56, 64, 72. Буквенные значения размеров xxs, xs, s, m, l, xl теперь deprecated, используйте вместо них 32, 40, 48, 56, 64, 72 соответственно

#### Влияние на компоненты
- Минорное<br />`button` `custom-button` `custom-picker-button` `picker-button` `tag`<br />


### [#1054](https://github.com/core-ds/core-components/pull/1054)

#### Что изменилось
- Файл index.js, который находится в корне пакета, теперь имеет cjs формат.

#### Влияние на компоненты
- Патчи<br />`vars`


### [#1033](https://github.com/core-ds/core-components/pull/1033)

#### Что изменилось
- Добавлены новые способы указать размеры - 500, 600, 800, 1140. Буквенные значения размеров s, m, l, xl теперь deprecated, используйте вместо них 500, 600, 800, 1140 соответственно

#### Влияние на компоненты
- Минорное<br />`modal`

<br />

#### Что изменилось
- Добавлен новый способ указать размер - 500. Буквенное значение размера s теперь deprecated, используйте вместо него 500

#### Влияние на компоненты
- Минорное<br />`side-panel`


### [#1025](https://github.com/core-ds/core-components/pull/1025)

#### Что изменилось
- Добавлены новые способы указать размеры - 24, 48, 64, 80, 128, 144. Буквенные значения размеров xs, s, m, l, xl, xxl теперь deprecated, используйте вместо них 24, 48, 64, 80, 128, 144 соответственно

#### Влияние на компоненты
- Минорное<br />`circular-progress-bar`


### [#1028](https://github.com/core-ds/core-components/pull/1028)

#### Что изменилось
- Добавлены новые способы указать размеры - 32 и 40. Буквенные значения размеров xs и xxs теперь deprecated, используйте вместо них 32 и 40 соответственно

#### Влияние на компоненты
- Минорное<br />`segmented-control`


### [#1041](https://github.com/core-ds/core-components/pull/1041)

#### Что изменилось
- Переименованы свойства. onChange стал называться onInputChange, onComplete стал называться onChange
- Изменены типы свойств value и onChange.
- Исправлена ошибка из-за которой onChange не вызывался в момент очистки инпута

## Миграция с предыдущей версии

- Меняем onChange на onInputChange. (но от использования onInputChange лучше отказаться, если не нужно посимвольно контролировать пользовательский ввод).
- Меняем onComplete на onChange. (Это основной обработчик. Вызывается в момент, когда дата введена полностью, либо полностью стерта. Первый аргумент - дата(или диапазон дат), второй - значение инпута).
- value теперь принимает дату(диапазон дат в случае view=data-range), а не строку как раньше.

Примеры всегда можно посмотреть в [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/universaldateinput--docs)

#### Влияние на компоненты
- Мажорное<br />`universal-date-input`


### [#1026](https://github.com/core-ds/core-components/pull/1026)

#### Что изменилось
- Добавлены новые способы указать размеры - 8, 20, 24, 40. Буквенные значения размеров xs, s, m, l deprecated, используйте вместо них 8, 20, 24, 40 соответственно
- Значение, передаваемое в пропс height, определяет диапазон, для которого применяются определенные стили типографики и внутренних отступов компонента. Например, при height={10} стили будут применяться для диапазона от 9 до 16 (при этом 16 - граничное значение высоты). Были внесены изменения в пограничные значения высоты, при которых происходит изменение типографики и внутренних отступов компонента. Ранее изменение происходило в диапазонах высоты: от 0 до 8, от 9 до 18, от 19 до 24, от 25 до 32 и от 33 до 40. Теперь же эти диапазоны составляют от 0 до 8, от 9 до 16, от 17 до 20, от 21 до 24 и от 25 до 40

#### Влияние на компоненты
- Мажорное<br />`indicator`


### [#1067](https://github.com/core-ds/core-components/pull/1067)

#### Что изменилось
- Добавлен новый компонент Text

#### Влияние на компоненты
- Минорное<br />`text`


### [#1037](https://github.com/core-ds/core-components/pull/1037)

#### Что изменилось
- Добавлены новые способы указать размеры - 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 128, 256. Буквенные значения размеров 3xs, 2xs, xs, s, m, l, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl теперь deprecated, используйте вместо них 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 96, 128, 256 соответственно

#### Влияние на компоненты
- Минорное<br />`gap`


### [#1096](https://github.com/core-ds/core-components/pull/1096)

#### Что изменилось
- Изменены стили для темы click: в bottom-sheet при скролле у header нет нижнего бордера, у back-arrow в navigation-bar теперь primary цвет

#### Влияние на компоненты
- Патчи<br />`navigation-bar` `themes`


### [#1027](https://github.com/core-ds/core-components/pull/1027)

#### Что изменилось
- Добавлены новые способы указать размеры - 4 и 8. Буквенные значения размеров s и m теперь deprecated, используйте вместо них 4 и 8 соответственно

#### Влияние на компоненты
- Минорное<br />`progress-bar`


### [#1029](https://github.com/core-ds/core-components/pull/1029)

#### Что изменилось
- Добавлены новые способы указать размеры - 4 и 2. Буквенные значения размеров m и s теперь deprecated, используйте вместо них 4 и 2 соответственно

#### Влияние на компоненты
- Минорное<br />`slider`


### [#1088](https://github.com/core-ds/core-components/pull/1088)

#### Что изменилось
- Добавлены новые палитры, доступные в ts: decorative, qualitative, sequential, pfm

#### Влияние на компоненты
- Патчи<br />`vars`


### [#1043](https://github.com/core-ds/core-components/pull/1043)

#### Что изменилось
- Тип onChange коллбэка заменен на (value: string) => void

#### Влияние на компоненты
- Мажорное<br />`international-phone-input`

<br />

#### Что изменилось
- Тип onInput коллбэка заменен на (value: string) => void

#### Влияние на компоненты
- Мажорное<br />`input-autocomplete`


### [#1062](https://github.com/core-ds/core-components/pull/1062)

#### Что изменилось
- Обновлена зависимость downshift до 8.3.1

#### Влияние на компоненты
- Минорное<br />`select`


### [#1087](https://github.com/core-ds/core-components/pull/1087)

#### Что изменилось
- Повышена специфичность стилей Checkmark (стили Badge переопределяли стили в Checkmark, из-за чего вместе с точкой отрисовывался и бейдж)

#### Влияние на компоненты
- Патчи<br />`select`


### [#1024](https://github.com/core-ds/core-components/pull/1024)

#### Что изменилось
- Добавлены новые способы указать размеры - 20 и 24. Буквенные значения размеров s и m теперь deprecated, используйте вместо них 20 и 24 соответственно

#### Влияние на компоненты
- Минорное<br />`checkbox` `radio`


### [#1030](https://github.com/core-ds/core-components/pull/1030)

#### Что изменилось
- Добавлены новые способы указать размеры - 16, 24, 48. Буквенные значения размеров xs, s, m теперь deprecated, используйте вместо них 16, 24, 48 соответственно

#### Влияние на компоненты
- Минорное<br />`spinner`



## 44.7.0

<sup><time>06.02.2024</time></sup>

### [#1081](https://github.com/core-ds/core-components/pull/1081)

#### Что изменилось
- Добавлен дополнительный класс для контента - contentClassName

#### Влияние на компоненты
- Патчи<br />`dropzone`


### [#1083](https://github.com/core-ds/core-components/pull/1083)

#### Что изменилось
- Добавлен вызов функции onClear из inputProps

#### Влияние на компоненты
- Минорное<br />`international-phone-input`


### [#1090](https://github.com/core-ds/core-components/pull/1090)

#### Что изменилось
- Теперь подзаголовок "Код отправлен на" не отображается, если номер телефона не передан

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#1077](https://github.com/core-ds/core-components/pull/1077)

#### Что изменилось
- Добавили возможность скрывать текст для кнопки назад (заголовок) в модальных компонентах (BottomSheet, Modal, SidePanel). Для того чтобы скрыть текст кнопки назад, необходимо указать backButtonProps={{ text: null }}

#### Влияние на компоненты
- Патчи<br />`navigation-bar`



## 44.6.0

<sup><time>24.01.2024</time></sup>

### [#1019](https://github.com/core-ds/core-components/pull/1019)

#### Что изменилось
- Добавлен новый проп textStyle, с помощью которого задается стиль текста табов (только primary). Если textStyle указан, то свойство size будет проигнорировано, все отсутпы также зависимы от textStyle.

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#1049](https://github.com/core-ds/core-components/pull/1049)

#### Что изменилось
- Добавили возможность передавать dataTestId в слоты content и footer.
- Добавлена функция getBottomSheetTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`

<br />

#### Что изменилось
- Добавлена функция get{ComponentName}TestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId

#### Влияние на компоненты
- Минорное<br />`action-button` `button` `form-control` `input` `number-input`<br /> `pass-code` `pattern-lock` `popup-sheet` `sortable-list` `system-message`<br /> `tab-bar` `textarea` `universal-date-input`

<br />

#### Что изменилось
- Добавили возможность передавать dataTestId в компонент Modal и его слоты (для SelectModalMobile), а также в кнопки подтверждения и сброса при множественном выборе.
- Добавлена функция getSelectTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

#### Влияние на компоненты
- Минорное<br />`select`

<br />

#### Что изменилось
- Добавили возможность передавать dataTestId в input, его обертку и слоты.
- Добавлены функции getInputAutocompleteDesktopTestIds и getInputAutocompleteMobileTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

#### Влияние на компоненты
- Минорное<br />`input-autocomplete`

<br />

#### Что изменилось
- Добавили возможность передавать dataTestId в компонент выбора страны и props в input (error, rightAddons).
- Добавлены функции getInternationalPhoneInputDesktopTestIds и getInternationalPhoneInputMobileTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

#### Влияние на компоненты
- Патчи<br />`international-phone-input`

<br />

#### Что изменилось
- В PureCellContext добавлен dataTestId, что позволяет избежать необходимости передавать dataTestId в каждый слот отдельно.
- Добавлена функция getPureCellTestIds для поиска элементов. Подробное описание смотрите во вкладке Разработчику -> Использование dataTestId.

#### Влияние на компоненты
- Минорное<br />`pure-cell`


### [#1072](https://github.com/core-ds/core-components/pull/1072)

#### Что изменилось
- Исправлена ошибка, из-за которой не отображалось изображение в preview, если адрес изображения содержал пробел

#### Влияние на компоненты
- Патчи<br />`gallery`


### [#1079](https://github.com/core-ds/core-components/pull/1079)

#### Что изменилось
- Исправлена ошибка с nested оператором в css, из-за которой svg изображения не растягивались на всю ширину контейнера

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#1076](https://github.com/core-ds/core-components/pull/1076)

#### Что изменилось
- Добавлен проп itemContentClassName

#### Влияние на компоненты
- Минорное<br />`sortable-list`


### [#1080](https://github.com/core-ds/core-components/pull/1080)

#### Что изменилось
- Добавлен новый проп allowBackdropFilter, который включает размытие фона для некоторых вариантов кнопок (secondary, accent + disabled, primary + disabled) и тегов (filled, outlined + checked + disabled)

#### Влияние на компоненты
- Минорное<br />`button` `tag`


### [#1070](https://github.com/core-ds/core-components/pull/1070)

#### Что изменилось
- Добавлен новый weight - semibold
- Исправлена ошибка с жирностью в мобильном заголовке (по-умолчанию жирность мобильного заголовка со шрифтом system должна была быть 600, а была 700)

#### Влияние на компоненты
- Минорное<br />`typography`


### [#1071](https://github.com/core-ds/core-components/pull/1071)

#### Что изменилось
- Исправлено отображение тени в мобильном компоненте (теперь визуально отображается как бордер и не обрезается из-за паддингов в контентной части модалки)

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#1074](https://github.com/core-ds/core-components/pull/1074)

#### Что изменилось
- Исправлена ошибка с выбором диапазона дат. (Если dateFrom была равна dateTo и после этого выбиралась меньшая дата, то получался некорректный диапазон, в котором dateTo < dateFrom)

#### Влияние на компоненты
- Патчи<br />`calendar` `universal-date-input`


### [#1075](https://github.com/core-ds/core-components/pull/1075)

#### Что изменилось
- Исправлена проблема с неверным выделением границ переполнения

#### Влияние на компоненты
- Патчи<br />`textarea`


### [#1069](https://github.com/core-ds/core-components/pull/1069)

#### Что изменилось
- В Slider добавлены колбэки onStart, onEnd.
- В SliderInput добавлены колбэки onSliderStart, onSliderEnd
- Исправлена ошибка в 18 реакте с инициализацией слайдера ("Slider was already initialized")

#### Влияние на компоненты
- Минорное<br />`slider` `slider-input`


### [#1078](https://github.com/core-ds/core-components/pull/1078)

#### Что изменилось
- Исправлена проблема с "прыжками" каретки при редактировании введенного значения (было: '1|2.12.2020' -> type 3 -> 13.12.2020|)

#### Влияние на компоненты
- Патчи<br />`date-input`



## 44.5.1

<sup><time>29.12.2023</time></sup>

### [#1042](https://github.com/core-ds/core-components/pull/1042)

#### Что изменилось
- Исправили выравнивание компонента. (Если бейдж был размещен в контейнере с использованием flexbox, то он центрировался по вертикали этого контейнера)

#### Влияние на компоненты
- Патчи<br />`badge`


### [#1044](https://github.com/core-ds/core-components/pull/1044)

#### Что изменилось
- Добавлена css-переменная для токена фона

#### Влияние на компоненты
- Патчи<br />`tab-bar`


### [#1059](https://github.com/core-ds/core-components/pull/1059)

#### Что изменилось
- Добавлен toggleRef для кнопки переключения таба

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#1051](https://github.com/core-ds/core-components/pull/1051)

#### Что изменилось
- Исправлена проблема, из-за которой компоненты некорректно отображались при уменьшении масштаба страницы

#### Влияние на компоненты
- Патчи<br />`radio` `switch`



## 44.5.0

<sup><time>19.12.2023</time></sup>

### [#1039](https://github.com/core-ds/core-components/pull/1039)

#### Что изменилось
- Исправлена ошибка с dataTestId в заголовках. В версии 44.4.0 явно переданный dataTestId в Header не работал.
- Добавлены функции getSidePanelTestIds, getModalTestIds для удобного поиска элементов модальных сущностей. Импортировать их можно из @alfalab/core-components/{modal,side-panel}/shared.

#### Влияние на компоненты
- Минорное<br />`modal` `side-panel`

<br />

#### Что изменилось
- Исправлены типы getDataTestId функции

#### Влияние на компоненты
- Патчи<br />`shared`


### [#1048](https://github.com/core-ds/core-components/pull/1048)

#### Что изменилось
- Добавлена возможность прокидывать кастомную ошибку в static календарь

#### Влияние на компоненты
- Патчи<br />`calendar-range`


### [#1046](https://github.com/core-ds/core-components/pull/1046)

#### Что изменилось
- Добавлен новый проп useCssGaps. Не всеми старыми браузерами поддерживается flex gaps, поэтому используйте на свой страх и риск

#### Влияние на компоненты
- Минорное<br />`space`


### [#1045](https://github.com/core-ds/core-components/pull/1045)

#### Что изменилось
- Добавлены свойства align и wrapperClassName в skeletonProps

#### Влияние на компоненты
- Минорное<br />`typography`


### [#1038](https://github.com/core-ds/core-components/pull/1038)

#### Что изменилось
- Раньше при появления оверлея в дропозоне контент оставался видимым и из-за прозрачности в цвете оверлея его было видно, теперь скрываем контент при появление оверлея

#### Влияние на компоненты
- Минорное<br />`dropzone`



## 44.4.0

<sup><time>08.12.2023</time></sup>

### [#1009](https://github.com/core-ds/core-components/pull/1009)

#### Что изменилось
- Добавлены два новых размера компонента: 16 и 56. Добавлено новое свойство mainSize, отвечающее за размер основного слота (обычно, это иконка)

#### Влияние на компоненты
- Минорное<br />`icon-view`


### [#1001](https://github.com/core-ds/core-components/pull/1001)

#### Что изменилось
- Изменен отступ до аддонов в размерах xxs, xs с 4px до 6px

#### Влияние на компоненты
- Патчи<br />`filter-tag` `picker-button` `tag`

<br />

#### Что изменилось
- Добавлены свойства hint, textResizing и shape
- Изменен отступ до аддонов в размерах xxs, xs с 4px до 6px

#### Влияние на компоненты
- Минорное<br />`button`


### [#1036](https://github.com/core-ds/core-components/pull/1036)

#### Что изменилось
- Повышена специфичность стилей поповера и инпута поиска

#### Влияние на компоненты
- Патчи<br />`select`


### [#1010](https://github.com/core-ds/core-components/pull/1010)

#### Что изменилось
- Исправлена позиция стрелки поповера в случаях, когда anchorElement более чем в два раз выше или шире самого поповера и position заканчивается на -start или -end

#### Влияние на компоненты
- Патчи<br />`popover`


### [#1018](https://github.com/core-ds/core-components/pull/1018)

#### Что изменилось
- Изменены стили для состояния disabled в соответствии с макетом. Css-переменная --switch-icon-disabled-checked-color переименована в --switch-icon-disabled-color

#### Влияние на компоненты
- Минорное<br />`switch`


### [#1011](https://github.com/core-ds/core-components/pull/1011)

#### Что изменилось
- Исправлена ошибка, из-за которой обработчик onChange вызывался при клике на addon

#### Влияние на компоненты
- Патчи<br />`checkbox` `radio` `switch`

<br />

#### Что изменилось
- Добавлена функция preventDefault

#### Влияние на компоненты
- Минорное<br />`shared`


### [#1008](https://github.com/core-ds/core-components/pull/1008)

#### Что изменилось
- Title, TitleMobile и TitleResponsive обернуты в forwardRef

#### Влияние на компоненты
- Минорное<br />`typography`


### [#1003](https://github.com/core-ds/core-components/pull/1003)

#### Что изменилось
- Цвет primary кнопки мобильного компонента в теме corp изменен на черный

#### Влияние на компоненты
- Минорное<br />`button`


- Патчи<br />`themes`


### [#1007](https://github.com/core-ds/core-components/pull/1007)

#### Что изменилось
- Обновлена зависимость @alfalab/icons-glyph

#### Влияние на компоненты
- Минорное<br />`attach` `badge` `bank-card` `calendar` `calendar-input`<br /> `checkbox` `checkbox-group` `collapse` `confirmation-v1` `date-range-input`<br /> `date-time-input` `dropzone` `file-upload-item` `filter-tag` `gallery`<br /> `input` `international-phone-input` `intl-phone-input` `navigation-bar` `number-input`<br /> `pagination` `pass-code` `password-input` `picker-button` `plate`<br /> `select` `select-with-tags` `sortable-list` `steps` `tabs`<br /> `toast-plate` `universal-date-input`

<br />

#### Что изменилось
- Добавлен новый компонент StatusBadge

#### Влияние на компоненты
- Минорное<br />`status-badge`


### [#1004](https://github.com/core-ds/core-components/pull/1004)

#### Что изменилось
- Добавлены новые размеры - 24, 32, 40, 48, 56

#### Влияние на компоненты
- Минорное<br />`icon-button`


### [#1013](https://github.com/core-ds/core-components/pull/1013)

#### Что изменилось
- Исправлена проблема, из-за которой dataTestId не передавался внутренним компонентам (Header, Content, Footer, Controls)

#### Влияние на компоненты
- Патчи<br />`modal` `side-panel`


### [#1016](https://github.com/core-ds/core-components/pull/1016)

#### Что изменилось
- Изменили CSS-токен для фона в степпере с neutral_inverted/1500 на neutral-translucent/0 в дефолтном наборе цветов и с neutral/1500 на neutral-translucent_inverted/0 в инвертированном

#### Влияние на компоненты
- Патчи<br />`number-input`


### [#1006](https://github.com/core-ds/core-components/pull/1006)

#### Что изменилось
- Удалена темизация corp (стиль перекрытия при фиксации для футера и хедера) для компонентов BottomSheet и Modal

#### Влияние на компоненты
- Минорное<br />`themes`


### [#1017](https://github.com/core-ds/core-components/pull/1017)

#### Что изменилось
- Добавлен проп codeFormat: 'letter' | 'symbolic'

#### Влияние на компоненты
- Минорное<br />`amount-input`



## 44.3.0

<sup><time>30.11.2023</time></sup>

### [#1014](https://github.com/core-ds/core-components/pull/1014)

#### Что изменилось
- Добавлен data-test-id с модификатором inner на wrapper инпута

#### Влияние на компоненты
- Патчи<br />`form-control`


### [#1000](https://github.com/core-ds/core-components/pull/1000)

#### Что изменилось
- Добавлено новое свойство colors, отвечающее за набор цветов в компоненте (возможность переключить на inverted цвета для тёмного фона)

#### Влияние на компоненты
- Минорное<br />`segmented-control`



## 44.2.0

<sup><time>28.11.2023</time></sup>

### [#1005](https://github.com/core-ds/core-components/pull/1005)

#### Что изменилось
- Добавлено свойство title в мобильный компонент. Если свойство передано, то при открытии шторки или модального окна в заголовке будет title, а не label, как раньше

#### Влияние на компоненты
- Минорное<br />`input-autocomplete`



## 44.1.0

<sup><time>27.11.2023</time></sup>

### [#999](https://github.com/core-ds/core-components/pull/999)

#### Что изменилось
- Добавлены свойства onApply и onCancel в мобильный компонент, в которые можно передать обработчики нажатия на кнопки «Применить» и «Отмена» в BottomSheet
- Исправлена ошибка свойства onClear: при нажатии на крестик в поле ввода вызывался обработчик, объявленный внутри компонента, вместо переданного через свойство onClear

#### Влияние на компоненты
- Минорное<br />`input-autocomplete`



## 44.0.0

<sup><time>24.11.2023</time></sup>

### [#972](https://github.com/core-ds/core-components/pull/972)

#### Что изменилось
- в респонсив компоненте useMedia заменен на useMatchMedia
- в s и m размере десктопной модалки размер шрифта заголовка изменен с 20px на 22px

#### Влияние на компоненты
- Патчи<br />`modal`


### [#969](https://github.com/core-ds/core-components/pull/969)

#### Что изменилось
- Добавлен новый компонент TabBar

#### Влияние на компоненты
- Минорное<br />`tab-bar`


### [#966](https://github.com/core-ds/core-components/pull/966)

#### Что изменилось
- В компонентах CustomButton, Link и PickerButton цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`custom-button` `link` `picker-button`


### [#977](https://github.com/core-ds/core-components/pull/977)

#### Что изменилось
- В компонентах Backdrop, BaseModal, BottomSheet, Modal, NavigationBar, Popover, Select, SelectWithTags, SidePanel, ToastPlate и Tooltip цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`backdrop` `base-modal` `bottom-sheet` `modal` `navigation-bar`<br /> `popover` `select` `select-with-tags` `side-panel` `toast-plate`<br /> `tooltip`


### [#984](https://github.com/core-ds/core-components/pull/984)

#### Что изменилось
- Добавлен новый view для PureCell.Text.

#### Влияние на компоненты
- Минорное<br />`pure-cell`

<br />

#### Что изменилось
- view у Typography.Text заменен с component на component-primary

#### Влияние на компоненты
- Минорное<br />`comment`


### [#963](https://github.com/core-ds/core-components/pull/963)

#### Что изменилось
- В компонентах Checkbox и Radio для темы site цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- В компоненте Slider удалены цветовые css переменные для тем intranet и mobile.
- В компоненте Switch добавлена темизация для site

#### Влияние на компоненты
- Мажорное<br />`themes`

<br />

#### Что изменилось
- В компонентах Checkbox, Radio и Switch цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалены css переменные для inactive состояния. Пропс inactive - deprecated

#### Влияние на компоненты
- Мажорное<br />`checkbox` `radio` `switch`

<br />

#### Что изменилось
- В компонентах CheckboxGroup, RadioGroup, SegmentedControl, и Slider цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`checkbox-group` `radio-group` `segmented-control` `slider`


### [#979](https://github.com/core-ds/core-components/pull/979)

#### Что изменилось
- Прекращена поддержка IE

#### Влияние на компоненты
- Мажорное<br />`button` `checkbox` `filter-tag` `form-control` `input`<br /> `password-input` `scrollbar` `select` `tag`


### [#997](https://github.com/core-ds/core-components/pull/997)

#### Что изменилось
- Обновление vars из последней версии ui-primitives

#### Влияние на компоненты
- Минорное<br />`vars`


### [#995](https://github.com/core-ds/core-components/pull/995)

#### Что изменилось
- Исключены пропcы titleSize и subtitle у десктопного заголовка

#### Влияние на компоненты
- Патчи<br />`modal` `side-panel`


### [#994](https://github.com/core-ds/core-components/pull/994)

#### Что изменилось
- Удалено свойство flex-direction: column-reverse у Footer с layout='column'
- Добавлен компонент Controls, который сам правильно расположит кнопки в футере респонсивного компонента.

#### Влияние на компоненты
- Мажорное<br />`modal` `side-panel`


### [#959](https://github.com/core-ds/core-components/pull/959)

#### Что изменилось
- Исправлена ошибка, из-за которой не работал повторный вызов функции обновления позиции поповера (проп update).
- anchorElement переданный через проп теперь сохраняется в useLayoutEffect. Это позволяет предотвратить неверное позиционирование поповера на первый рендер

#### Влияние на компоненты
- Патчи<br />`popover`

<br />

#### Что изменилось
- Новые стили тэгов
- Добавлен мобильный компонент (Выпадающий список открывается в BottomSheet, а не Popover)

#### Влияние на компоненты
- Мажорное<br />`select-with-tags`


### [#982](https://github.com/core-ds/core-components/pull/982)

#### Что изменилось
- В компонентах CalendarInput, CalendarRange, CalendarWithSkeleton, Calendar, Confirmation, DateRangeInput, DateTimeInput, PassCode и Plate цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`calendar-input` `calendar-range` `calendar-with-skeleton` `calendar` `confirmation`<br /> `date-range-input` `date-time-input` `pass-code` `plate`


### [#991](https://github.com/core-ds/core-components/pull/991)

#### Что изменилось
- Исправлена проблема, из-за которой появлялся warning: "findDOMNode is deprecated"

#### Влияние на компоненты
- Патчи<br />`backdrop` `base-modal`


### [#973](https://github.com/core-ds/core-components/pull/973)

#### Что изменилось
- В компонентах Badge,CircularProgressBar,Dropzone,FileUploadItem,HatchingProgressBar,Indicator,IconView,Status,ProgressBar и SteppedProgressBar цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`badge` `circular-progress-bar` `dropzone` `file-upload-item` `hatching-progress-bar`<br /> `icon-view` `indicator` `progress-bar` `status` `stepped-progress-bar`<br />


### [#992](https://github.com/core-ds/core-components/pull/992)

#### Что изменилось
- В компонентах BankCard, CodeInput, Comment, Divider, ListHeader, Pagination, Scrollbar, Skeleton, SortableList, Steps, Tabs, Underlay и UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`bank-card` `code-input` `comment` `divider` `list-header`<br /> `pagination` `scrollbar` `skeleton` `sortable-list` `steps`<br /> `tabs` `underlay` `universal-date-input`


### [#990](https://github.com/core-ds/core-components/pull/990)

#### Что изменилось
- Исправлен баг с отсутствием фокусной обводки у Textarea

#### Влияние на компоненты
- Патчи<br />`textarea`


### [#983](https://github.com/core-ds/core-components/pull/983)

#### Что изменилось
- Кнопка "очистить" вынесена в отдельный компонент и добавлена в shared

#### Влияние на компоненты
- Минорное<br />`input`

<br />

#### Что изменилось
- Добавлен крестик очистки в таргет поле в мобильных компонентах

#### Влияние на компоненты
- Минорное<br />`input-autocomplete`



## 43.2.0

<sup><time>20.11.2023</time></sup>

### [#988](https://github.com/core-ds/core-components/pull/988)

#### Что изменилось
- Повышена специфичность стилей, конфликтующих с base-modal

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#987](https://github.com/core-ds/core-components/pull/987)

#### Что изменилось
- Немного изменена структура файлов в пакетах для корректной сборки в vite

#### Влияние на компоненты
- Патчи<br />`button` `calendar` `calendar-input` `checkbox-group` `code-input`<br /> `confirmation` `custom-picker-button` `date-range-input` `date-time-input` `filter-tag`<br /> `form-control` `input` `input-autocomplete` `international-phone-input` `modal`<br /> `number-input` `picker-button` `plate` `radio-group` `select`<br /> `side-panel` `system-message` `tag` `toast` `toast-plate`<br /> `tooltip` `universal-date-input`


### [#981](https://github.com/core-ds/core-components/pull/981)

#### Что изменилось
- Добавлен новый проп backButtonProps

#### Влияние на компоненты
- Минорное<br />`bottom-sheet` `navigation-bar`


### [#985](https://github.com/core-ds/core-components/pull/985)

#### Что изменилось
- Цвет подложки в активном состоянии для компонента FormControl изменен с neutral/0 и neutral_inverted/0 на neutral-translucent/0 и neutral-translucent_inverted/0

#### Влияние на компоненты
- Минорное<br />`form-control`



## 43.1.3

<sup><time>17.11.2023</time></sup>

### [#975](https://github.com/core-ds/core-components/pull/975)

#### Что изменилось
- Добавлено вертикальное выравнивание к svg

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#967](https://github.com/core-ds/core-components/pull/967)

#### Что изменилось
- Добавлено центрирование контента передаваемого в пропсе rightAddons.

#### Влияние на компоненты
- Патчи<br />`amount`



## 43.1.2

<sup><time>14.11.2023</time></sup>

### [#970](https://github.com/core-ds/core-components/pull/970)

#### Что изменилось
- Исправлен размер иконки календаря

#### Влияние на компоненты
- Патчи<br />`universal-date-input`



## 43.1.1

<sup><time>10.11.2023</time></sup>

### [#968](https://github.com/core-ds/core-components/pull/968)

#### Что изменилось
- Исправлена ошибка, из-за которой выпадающий список не открывался, если выбранный элемент имел установленный tabIndex

#### Влияние на компоненты
- Патчи<br />`select`



## 43.1.0

<sup><time>09.11.2023</time></sup>

### [#961](https://github.com/core-ds/core-components/pull/961)

#### Что изменилось
- Добавлен блюр к полупрозрачным кнопкам

#### Влияние на компоненты
- Патчи<br />`button` `tag`

<br />

#### Что изменилось
- Заменены токены для stepper

#### Влияние на компоненты
- Патчи<br />`number-input`


### [#958](https://github.com/core-ds/core-components/pull/958)

#### Что изменилось
- Добавлен проп labelProps

#### Влияние на компоненты
- Минорное<br />`checkbox` `radio`


### [#957](https://github.com/core-ds/core-components/pull/957)

#### Что изменилось
- Добавлены две новые пропсы slideIndex - индекс текущего изображения и onSlideIndexChange - обработчик изменения текущего изображения

#### Влияние на компоненты
- Минорное<br />`gallery`



## 43.0.0

<sup><time>03.11.2023</time></sup>

### [#946](https://github.com/core-ds/core-components/pull/946)

#### Что изменилось
- Добавлены новые стили (component-secondary и component-primary) для view компонента Typography.Text
- Стиль component-primary дублирует стиль component (view=component deprecated)

#### Влияние на компоненты
- Минорное<br />`typography`


### [#918](https://github.com/core-ds/core-components/pull/918)

#### Что изменилось
- Мобильный компонент приведен в соответствие с десктопным, теперь оба компонента имеют одинаковый список пропсов, за некоторым исключением.
- Удалены пропы onFilter, filter, onClearFilter и др, которые раньше использовались только в мобильном компоненте
- bottomSheetHeaderAddonsProps переименованы в inputProps.
- transitionProps в респонсивном компоненте теперь указывается в mobileProps. <InputAutocomplete mobileProps={{transitionProps}}. В мобильном <InputAutocompleteMobile transitionProps={transitionProps}

## Миграция с предыдущей версии
Из мобильного компонента удалено дополнительное состояние для фильтра,
соответственно были удалены пропы onFilter, filter, onClearFilter.
Теперь при открытии шторки в инпут будет попадать состояние, переданное через проп value, как и у десктопного компонента,
а при вводе значения в инпут будет вызываться коллбэк onInput. При нажатии кнопки "Отмена" также будет вызываться onInput.
После апдейта нужно заменить
```jsx
<InputAutocompleteMobile onFilter={onFilter} filter={filter} value={value} bottomSheetHeaderAddonsProps={{}} bottomSheetProps={{transitionProps}}/>
```
на
```jsx
<InputAutocompleteMobile onInput={onFilter} value={value} inputProps={{}} transitionProps={transitionProps}/>
```

Примеры можете посмотреть в нашем [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/inputautocomplete--docs)

#### Влияние на компоненты
- Мажорное<br />`input-autocomplete`

<br />

#### Что изменилось
- В searchProps добавлена возможность прокинуть кастомную функцию фильтрации
- Фокус в поле поиска устанавливается после вызова transitionProps.onEntered, а не по таймауту как раньше

#### Влияние на компоненты
- Минорное<br />`select`


### [#931](https://github.com/core-ds/core-components/pull/931)

#### Что изменилось
- В компонентах Select и SliderInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалена темизация для intranet и mobile

#### Влияние на компоненты
- Мажорное<br />`select` `slider-input`

<br />

#### Что изменилось
- В компоненте FilterTag цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалены некоторые css переменные для мобильного компонента и темизация для mobile

#### Влияние на компоненты
- Мажорное<br />`filter-tag`

<br />

#### Что изменилось
- В компоненте Button цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалена темизация для intranet, click, mobil

#### Влияние на компоненты
- Мажорное<br />`button`

<br />

#### Что изменилось
- В компонентах FormControl и Input цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалены некоторые css переменные для мобильных компонентов и темизация для intranet и mobile

#### Влияние на компоненты
- Мажорное<br />`form-control` `input`

<br />

#### Что изменилось
- В компоненте Tag цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалены некоторые css переменные для мобильного компонента и темизация для intranet, click, mobile

#### Влияние на компоненты
- Мажорное<br />`tag`

<br />

#### Что изменилось
- В компонентах ActionButton, Badge, IconButton, InternationalPhoneInput, PickerButton, Spinner, StepperInput, UniversalDateInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру)

#### Влияние на компоненты
- Минорное<br />`action-button` `badge` `icon-button` `international-phone-input` `picker-button`<br /> `spinner` `universal-date-input`

<br />

#### Что изменилось
- В компоненте CalendarInput цветовые токены изменены на новые (синхронизация и обновление цветовых токенов в рамках перевода их значений на базовую палитру).
- Удалена темизация для intranet и mobile

#### Влияние на компоненты
- Мажорное<br />`calendar-input`


### [#933](https://github.com/core-ds/core-components/pull/933)

#### Что изменилось
- Добавлен проп wrapperProps

#### Влияние на компоненты
- Минорное<br />`base-modal`

<br />

#### Что изменилось
- Обновлена версия compute-scroll-into-view

#### Влияние на компоненты
- Минорное<br />`tabs`

<br />

#### Что изменилось
- Обновлена зависимость downshift
- Переключаться между modal и bottom-sheet в SelectMobile можно с помощью пропа isBottomSheet
- Исправлена ошибка, из-за которой не работал onScroll в SelectMobile

#### Влияние на компоненты
- Минорное<br />`select`


### [#953](https://github.com/core-ds/core-components/pull/953)

#### Что изменилось
- Изменен порядок кнопок в subAddons

#### Влияние на компоненты
- Патчи<br />`plate`


### [#901](https://github.com/core-ds/core-components/pull/901)

#### Что изменилось
- Добавлена isIOS функция

#### Влияние на компоненты
- Минорное<br />`shared`

<br />

#### Что изменилось
- Изменен тип коллбэка onChange, теперь в payload приходит только число
- Добавлены пропы min, max
- Удален prop allowSign. Теперь, чтобы появилась возможность вводить знак "-", достаточно указать min < 0
- Добавлен проп step.
- Удален StepperInput, используйте вместо него NumberInput с пропом step

# Миграция с предыдущей версии
- Заменить onChange с (event, {value, valueString}) на (event, {value}).
- allowSign был удален, знак "+" больше указать невозможно. "-" можно указать по-умолчанию.
Чтобы запретить указывать знак "-", достаточно передать проп min={0}
- <StepperInput .../> нужно заменить на <NumberInput step={1} .../>

#### Влияние на компоненты
- Мажорное<br />`number-input`


### [#955](https://github.com/core-ds/core-components/pull/955)

#### Что изменилось
- Разрешена вставка значений, содержащих нецифровые символы (123₽ -> 123)

#### Влияние на компоненты
- Патчи<br />`amount-input`


### [#914](https://github.com/core-ds/core-components/pull/914)

#### Что изменилось
- Обновлены цвета, добавлены новые цветовые группы: decorative, pfm, qualitative, sequential

#### Влияние на компоненты
- Минорное<br />`vars` `themes`



## 42.15.0

<sup><time>27.10.2023</time></sup>

### [#947](https://github.com/core-ds/core-components/pull/947)

#### Что изменилось
- DragOverlay теперь рендерится через портал
- Добавлены пропы portalProps и dragOverlayProps

#### Влияние на компоненты
- Минорное<br />`sortable-list`


### [#941](https://github.com/core-ds/core-components/pull/941)

#### Что изменилось
- Исправлен радиус прогресса

#### Влияние на компоненты
- Патчи<br />`slider`


### [#942](https://github.com/core-ds/core-components/pull/942)

#### Что изменилось
- Исправлен кастомный горизонтальный скроллбар

#### Влияние на компоненты
- Патчи<br />`vars`


### [#940](https://github.com/core-ds/core-components/pull/940)

#### Что изменилось
- Немного увеличена высота мобильного календаря
- Кнопки с годами теперь выровнены по левому краю, а не по центру

#### Влияние на компоненты
- Патчи<br />`calendar`

<br />

#### Что изменилось
- getScrollbarSize перенесена в shared

#### Влияние на компоненты
- Минорное<br />`base-modal` `modal` `shared`


### [#944](https://github.com/core-ds/core-components/pull/944)

#### Что изменилось
- Добавлен package.json с module полем в mobile, desktop, shared точки входа

#### Влияние на компоненты
- Минорное<br />`button` `calendar` `calendar-input` `checkbox-group` `code-input`<br /> `confirmation` `custom-picker-button` `date-range-input` `date-time-input` `filter-tag`<br /> `form-control` `icon-view` `input` `input-autocomplete` `international-phone-input`<br /> `markdown` `modal` `number-input` `picker-button` `plate`<br /> `radio-group` `select` `side-panel` `stepper-input` `system-message`<br /> `tabs` `tag` `toast` `toast-plate` `tooltip`<br /> `universal-date-input`


### [#948](https://github.com/core-ds/core-components/pull/948)

#### Что изменилось
- Исправлена анимация появления нотификации

#### Влияние на компоненты
- Патчи<br />`notification-manager`


### [#910](https://github.com/core-ds/core-components/pull/910)

#### Что изменилось
- Предотвращает открытие календаря при взаимодействии с элементами вне поля

#### Влияние на компоненты
- Патчи<br />`calendar-input`


### [#936](https://github.com/core-ds/core-components/pull/936)

#### Что изменилось
- Исправлена проблема с пагинацией при горизонтальной прокрутке

#### Влияние на компоненты
- Патчи<br />`table`


### [#943](https://github.com/core-ds/core-components/pull/943)

#### Что изменилось
- Исправлен баг с некорректным расчетом видимых тэгов

#### Влияние на компоненты
- Патчи<br />`select-with-tags`


### [#939](https://github.com/core-ds/core-components/pull/939)

#### Что изменилось
- Добавлен новый пропс titleProps в компонент PureCell.AmountTitle

#### Влияние на компоненты
- Патчи<br />`pure-cell`



## 42.14.1

<sup><time>24.10.2023</time></sup>

### [#937](https://github.com/core-ds/core-components/pull/937)

#### Что изменилось
- Версия react-markdown снижена до 6.0.2. 6.0.3 сломана

#### Влияние на компоненты
- Патчи<br />`markdown`



## 42.14.0

<sup><time>23.10.2023</time></sup>

### [#927](https://github.com/core-ds/core-components/pull/927)

#### Что изменилось
- Исправлены проблемы со скроллом, когда при открытой шторке контент внутри document.body скроллится

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#915](https://github.com/core-ds/core-components/pull/915)

#### Что изменилось
- Исправлен баг с пересчетом высоты в VirtualOptionsList

#### Влияние на компоненты
- Патчи<br />`select`


### [#926](https://github.com/core-ds/core-components/pull/926)

#### Что изменилось
- Тема site переведена на bluetint палитру

#### Влияние на компоненты
- Минорное<br />`vars` `themes`


### [#921](https://github.com/core-ds/core-components/pull/921)

#### Что изменилось
- initialHeight всегда выставляется в full, если переданы магнитные зоны

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#930](https://github.com/core-ds/core-components/pull/930)

#### Что изменилось
- Исправлена ошибка, из-за которой передача modalHeaderProps.title не давала результата

#### Влияние на компоненты
- Патчи<br />`select`


### [#934](https://github.com/core-ds/core-components/pull/934)

#### Что изменилось
- Исправлена ошибка, из-за которой при увеличении ширины выбранного таба не увеличивалась ширина красной линии под ним

#### Влияние на компоненты
- Патчи<br />`tabs`



## 42.13.0

<sup><time>19.10.2023</time></sup>

### [#919](https://github.com/core-ds/core-components/pull/919)

#### Что изменилось
- Уменьшена специфичность стилей

#### Влияние на компоненты
- Патчи<br />`radio-group`


### [#920](https://github.com/core-ds/core-components/pull/920)

#### Что изменилось
- Исправлен отступ у слота слева

#### Влияние на компоненты
- Патчи<br />`link`


### [#923](https://github.com/core-ds/core-components/pull/923)

#### Что изменилось
- Исправлена ошибка, из-за которой выпадающий список не открывался после ввода символов на Android девайсах

#### Влияние на компоненты
- Патчи<br />`select`


### [#911](https://github.com/core-ds/core-components/pull/911)

#### Что изменилось
- Добавлено распознавание gfm strikethrough синтаксиса (~~strikethrough~~)

#### Влияние на компоненты
- Минорное<br />`markdown`


### [#925](https://github.com/core-ds/core-components/pull/925)

#### Что изменилось
- Добавлен border-radius контенту шторки для фикса черных углов в safari

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`



## 42.12.0

<sup><time>10.10.2023</time></sup>

### [#888](https://github.com/core-ds/core-components/pull/888)

#### Что изменилось
- Исправлен отступ в шапке мобильных компонентов с поиском

#### Влияние на компоненты
- Патчи<br />`input-autocomplete` `select`


### [#884](https://github.com/core-ds/core-components/pull/884)

#### Что изменилось
- Добавлен атрибут autocomplete='off'

#### Влияние на компоненты
- Патчи<br />`calendar-input` `date-range-input` `date-time-input` `universal-date-input`


### [#900](https://github.com/core-ds/core-components/pull/900)

#### Что изменилось
- Исправлен формат номера телефона (удалены скобки и тире)

#### Влияние на компоненты
- Патчи<br />`confirmation` `international-phone-input` `phone-input`


### [#898](https://github.com/core-ds/core-components/pull/898)

#### Что изменилось
- Исправлена ошибка, из-за которой компонент ломался после ресайза

#### Влияние на компоненты
- Патчи<br />`collapse`


### [#887](https://github.com/core-ds/core-components/pull/887)

#### Что изменилось
- Переработана механика инпута с включенным disableUserInput

#### Влияние на компоненты
- Патчи<br />`input`

<br />

#### Что изменилось
- **BREAKING CHANGE:** Удалена функция disableUserInput

#### Влияние на компоненты
- Минорное<br />`shared`


### [#899](https://github.com/core-ds/core-components/pull/899)

#### Что изменилось
- Из типов удалены применимые только для селекта свойства

#### Влияние на компоненты
- Патчи<br />`input-autocomplete` `picker-button`


### [#886](https://github.com/core-ds/core-components/pull/886)

#### Что изменилось
- Изменили стили заголовка мобильного компонента

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#893](https://github.com/core-ds/core-components/pull/893)

#### Что изменилось
- Исправлены типы

#### Влияние на компоненты
- Патчи<br />`button`


### [#885](https://github.com/core-ds/core-components/pull/885)

#### Что изменилось
- Исправлен радиус скругления скелетона в click теме

#### Влияние на компоненты
- Патчи<br />`themes`


### [#892](https://github.com/core-ds/core-components/pull/892)

#### Что изменилось
- Добавлен проп view: 'default' | 'withZeroMinorPart'

#### Влияние на компоненты
- Минорное<br />`amount-input`


### [#905](https://github.com/core-ds/core-components/pull/905)

#### Что изменилось
- Исправлена ошибка, из-за которой option оставался в hover состоянии в тот момент, когда курсор мыши находился над заголовком или над футером выпадающего списка

#### Влияние на компоненты
- Патчи<br />`select`


### [#897](https://github.com/core-ds/core-components/pull/897)

#### Что изменилось
- fix(select): search in mobile single mode

#### Влияние на компоненты
- Патчи<br />`select`


### [#891](https://github.com/core-ds/core-components/pull/891)

#### Что изменилось
- Добавлена темизация компонентов Checkbox и Radio для site

#### Влияние на компоненты
- Патчи<br />`themes`


### [#895](https://github.com/core-ds/core-components/pull/895)

#### Что изменилось
- Добавлены css-переменные (--bottom-sheet-top-radius, --bottom-sheet-shadow)

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#890](https://github.com/core-ds/core-components/pull/890)

#### Что изменилось
- CDNIcon теперь занимает всю ширину и высоту IconView

#### Влияние на компоненты
- Патчи<br />`cdn-icon` `icon-view`


### [#903](https://github.com/core-ds/core-components/pull/903)

#### Что изменилось
- Исправлен баг с отсутствием поиска у SelectModalMobile

#### Влияние на компоненты
- Патчи<br />`select`


### [#882](https://github.com/core-ds/core-components/pull/882)

#### Что изменилось
- Исправлена анимация открытия мобильного календаря

#### Влияние на компоненты
- Патчи<br />`date-range-input` `date-time-input`


### [#881](https://github.com/core-ds/core-components/pull/881)

#### Что изменилось
- Исправлен радиус скругления оверлея

#### Влияние на компоненты
- Патчи<br />`dropzone`


### [#902](https://github.com/core-ds/core-components/pull/902)

#### Что изменилось
- Исправлена ошибка c ResizeObserver в компоненте TabsCollapsible, возникающая в старых браузерах

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#896](https://github.com/core-ds/core-components/pull/896)

#### Что изменилось
- selected с элементами из options теперь сравнивается по ключу, а не по ссылке

#### Влияние на компоненты
- Патчи<br />`select`



## 42.11.0

<sup><time>29.09.2023</time></sup>

### [#871](https://github.com/core-ds/core-components/pull/871)

#### Что изменилось
- Добавлена возможность прокинуть кастомый Component

#### Влияние на компоненты
- Минорное<br />`icon-button`


### [#861](https://github.com/core-ds/core-components/pull/861)

#### Что изменилось
- Понижена версия зависимости react-markdown

#### Влияние на компоненты
- Патчи<br />`markdown`


### [#869](https://github.com/core-ds/core-components/pull/869)

#### Что изменилось
- Изменен цвет текста для подсказки, когда файл не загружен и имени файла

#### Влияние на компоненты
- Патчи<br />`attach`


### [#860](https://github.com/core-ds/core-components/pull/860)

#### Что изменилось
- dataTestId добавлен к аддонам и сообщению об ошибке у FormControl

#### Влияние на компоненты
- Минорное<br />`input` `input-autocomplete` `select` `textarea`

<br />

#### Что изменилось
- Добавлены пропcы rightAddonsProps, leftAddonsProps.
- dataTestId добавлен к аддонам и сообщению об ошибке

#### Влияние на компоненты
- Минорное<br />`form-control`


### [#858](https://github.com/core-ds/core-components/pull/858)

#### Что изменилось
- Добавлен новый компонент UniversalDateInput

#### Влияние на компоненты
- Минорное<br />`universal-date-input`

<br />

#### Что изменилось
- useMedia заменен на useMatchMedia

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#862](https://github.com/core-ds/core-components/pull/862)

#### Что изменилось
- Обновлены пакеты иконок

#### Влияние на компоненты
- Минорное<br />`bank-card` `collapse`


### [#879](https://github.com/core-ds/core-components/pull/879)

#### Что изменилось
- Добавлены пропсы rightAddonsProps, leftAddonsProps

#### Влияние на компоненты
- Минорное<br />`input`

<br />

#### Что изменилось
- Исправлены случаи некорректного срабатывания onCalendarClose

#### Влияние на компоненты
- Патчи<br />`calendar-input`


### [#872](https://github.com/core-ds/core-components/pull/872)

#### Что изменилось
- Добавлена возможность скрыть селект с выбором кол-ва строк на страницу

#### Влияние на компоненты
- Минорное<br />`table`


### [#870](https://github.com/core-ds/core-components/pull/870)

#### Что изменилось
- Увеличен отступ для даты загрузки

#### Влияние на компоненты
- Патчи<br />`file-upload-item`


### [#878](https://github.com/core-ds/core-components/pull/878)

#### Что изменилось
- Добавлена новая пропса strokeColor

#### Влияние на компоненты
- Минорное<br />`circular-progress-bar`


### [#877](https://github.com/core-ds/core-components/pull/877)

#### Что изменилось
- Обертка из CssTransitions больше не используется, если это не нужно

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#865](https://github.com/core-ds/core-components/pull/865)

#### Что изменилось
- Добавлен атрибут translate="no". Без этого атрибута компонент ломается при включении перевода страницы

#### Влияние на компоненты
- Патчи<br />`with-suffix`


### [#874](https://github.com/core-ds/core-components/pull/874)

#### Что изменилось
- Теперь в коллбэке onMagnetizeEnd аргументом передается индекс магнитной зоны

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#864](https://github.com/core-ds/core-components/pull/864)

#### Что изменилось
- Тип subtitle изменен на ReactNode

#### Влияние на компоненты
- Патчи<br />`navigation-bar`


### [#880](https://github.com/core-ds/core-components/pull/880)

#### Что изменилось
- Убран "bounce effect" в safari при скролле контента

#### Влияние на компоненты
- Патчи<br />`base-modal`


### [#868](https://github.com/core-ds/core-components/pull/868)

#### Что изменилось
- Исправлены цвета бордера в соответствии с макетом

#### Влияние на компоненты
- Патчи<br />`alert` `plate`


### [#857](https://github.com/core-ds/core-components/pull/857)

#### Что изменилось
- Убрали свойство stylesInput из общего типа BaseCodeInputProps

#### Влияние на компоненты
- Патчи<br />`code-input`


### [#866](https://github.com/core-ds/core-components/pull/866)

#### Что изменилось
- В мобильном календаре с selectorView=full удалена шапка с месяцами
- Изменена анимация открытия мобильного календаря
- Исправлена ошибка, из-за которой не работал скролл к выбранном году в списке

#### Влияние на компоненты
- Патчи<br />`calendar`



## 42.10.0

<sup><time>15.09.2023</time></sup>

### [#825](https://github.com/core-ds/core-components/pull/825)

#### Что изменилось
- Добавлен новый компонент InternationalPhoneInput

#### Влияние на компоненты
- Минорное<br />`international-phone-input`

<br />

#### Что изменилось
- Некоторые внутренние улучшения

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`

<br />

#### Что изменилось
- Добавлены утилиты для работы с маской

#### Влияние на компоненты
- Минорное<br />`shared`



## 42.9.1

<sup><time>15.09.2023</time></sup>

### [#851](https://github.com/core-ds/core-components/pull/851)

#### Что изменилось
- Повышена специфичность стилей Closer

#### Влияние на компоненты
- Патчи<br />`navigation-bar`



## 42.9.0

<sup><time>12.09.2023</time></sup>

### [#836](https://github.com/core-ds/core-components/pull/836)

#### Что изменилось
- Добавлены контролы в scrollable контейнер десктопных табов

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#841](https://github.com/core-ds/core-components/pull/841)

#### Что изменилось
- Добавлен проп radioListClassName

#### Влияние на компоненты
- Минорное<br />`radio-group`


### [#832](https://github.com/core-ds/core-components/pull/832)

#### Что изменилось
- Добавлен проп closeWithClickOutside

#### Влияние на компоненты
- Минорное<br />`toast`


### [#838](https://github.com/core-ds/core-components/pull/838)

#### Что изменилось
- Задана максимальная ширина в 100%, чтобы они не выходили за границы родителя

#### Влияние на компоненты
- Патчи<br />`form-control` `select` `filter-tag`



## 42.8.0

<sup><time>11.09.2023</time></sup>

### [#840](https://github.com/core-ds/core-components/pull/840)

#### Что изменилось
- Добавлен проп onSwipeStart, onSwipeEnd

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`



## 42.7.0

<sup><time>11.09.2023</time></sup>

### [#839](https://github.com/core-ds/core-components/pull/839)

#### Что изменилось
- Добавлен проп onTouchEnd

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#837](https://github.com/core-ds/core-components/pull/837)

#### Что изменилось
- Исправлена ошибка, из-за которой не пересчитывалась высота магнитных зон

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`

<br />

#### Что изменилось
- Добавлена функция isNil

#### Влияние на компоненты
- Минорное<br />`shared`



## 42.6.0

<sup><time>06.09.2023</time></sup>

### [#830](https://github.com/core-ds/core-components/pull/830)

#### Что изменилось
- Добавлен message prop

#### Влияние на компоненты
- Минорное<br />`pass-code` `pattern-lock`



## 42.5.1

<sup><time>05.09.2023</time></sup>

### [#824](https://github.com/core-ds/core-components/pull/824)

#### Что изменилось
- Исправлен автоматический скролл к активному табу, если он находится вне области видимости

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#826](https://github.com/core-ds/core-components/pull/826)

#### Что изменилось
- При нажатии на крестик очистки инпут больше не теряет фокус

#### Влияние на компоненты
- Патчи<br />`input`


### [#829](https://github.com/core-ds/core-components/pull/829)

#### Что изменилось
- Добавлен внутренний стейт в мобильный тултип
- css-свойство display у target элемента заменено c block на inline-block

#### Влияние на компоненты
- Патчи<br />`tooltip`


### [#827](https://github.com/core-ds/core-components/pull/827)

#### Что изменилось
- Реализация бордера заменена с box-shadow на border😀

#### Влияние на компоненты
- Патчи<br />`plate`



## 42.5.0

<sup><time>01.09.2023</time></sup>

### [#817](https://github.com/core-ds/core-components/pull/817)

#### Что изменилось
- Добавлена утилита disableUserInput

#### Влияние на компоненты
- Минорное<br />`shared`

<br />

#### Что изменилось
- Мобильный form-control в теме click приведен к дефолтному виду

#### Влияние на компоненты
- Минорное<br />`themes`

<br />

#### Что изменилось
- Добавлен проп disableUserInput

#### Влияние на компоненты
- Минорное<br />`input`

<br />

#### Что изменилось
- Добавлен новый компонент StepperInput

#### Влияние на компоненты
- Минорное<br />`stepper-input`

<br />

#### Что изменилось
- Добавлена мобильная и десктопная версия компонента

#### Влияние на компоненты
- Минорное<br />`number-input`


### [#805](https://github.com/core-ds/core-components/pull/805)

#### Что изменилось
- feat(select): добавлена возможность фильтрации пунктов

#### Влияние на компоненты
- Минорное<br />`input-autocomplete` `input` `picker-button` `select`


### [#808](https://github.com/core-ds/core-components/pull/808)

#### Что изменилось
- Добавлены новые пропсы progressStrokeColor и circleColor

#### Влияние на компоненты
- Минорное<br />`circular-progress-bar`



## 42.4.0

<sup><time>29.08.2023</time></sup>

### [#813](https://github.com/core-ds/core-components/pull/813)

#### Что изменилось
- Изменили дефолтное значение breakpoint с 768 на 1024

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#815](https://github.com/core-ds/core-components/pull/815)

#### Что изменилось
- Исправлена проблема, из-за которой при включенной пропсе disableUserInput невозможно было переставить фокус клавишей Tab

#### Влияние на компоненты
- Патчи<br />`calendar-input` `date-range-input` `date-time-input`


### [#823](https://github.com/core-ds/core-components/pull/823)

#### Что изменилось
- Незначительные исправления компонента

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`


### [#822](https://github.com/core-ds/core-components/pull/822)

#### Что изменилось
- Убрали свойство colorStylesMap из общего типа BaseTagProps

#### Влияние на компоненты
- Патчи<br />`tag`


### [#811](https://github.com/core-ds/core-components/pull/811)

#### Что изменилось
- Добавлен проп fallback

#### Влияние на компоненты
- Минорное<br />`cdn-icon`


### [#814](https://github.com/core-ds/core-components/pull/814)

#### Что изменилось
- Добавлен проп targetTag
- Исправлена проблема, из-за которой контент тултипа выходил за границы экрана

#### Влияние на компоненты
- Минорное<br />`tooltip`


### [#821](https://github.com/core-ds/core-components/pull/821)

#### Что изменилось
- Исправлено ошибка, из-за которой невозможно было выбрать опцию в мобильном селекте

#### Влияние на компоненты
- Патчи<br />`select`


### [#818](https://github.com/core-ds/core-components/pull/818)

#### Что изменилось
- Исправлена ошибка, из-за которой после анимации не всегда отображался дочерний элемент в safari

#### Влияние на компоненты
- Патчи<br />`collapse`



## 42.3.1

<sup><time>29.08.2023</time></sup>

### [#819](https://github.com/core-ds/core-components/pull/819)

#### Что изменилось
- Исправлена ошибка, из-за которой невозможно было заменить дефолтные кнопки подтверждения

#### Влияние на компоненты
- Патчи<br />`tooltip`



## 42.3.0

<sup><time>28.08.2023</time></sup>

### [#809](https://github.com/core-ds/core-components/pull/809)

#### Что изменилось
- Исправлена ошибка, из-за которой не сбрасывался выбранный диапозон в мобильном календаре

#### Влияние на компоненты
- Патчи<br />`date-range-input`


### [#812](https://github.com/core-ds/core-components/pull/812)

#### Что изменилось
- fix: increased css specificity

#### Влияние на компоненты
- Патчи<br />`drawer` `notification` `side-panel`


### [#800](https://github.com/core-ds/core-components/pull/800)

#### Что изменилось
- Добавлены пропы showSkeleton, skeletonProps для скелетонизации текста

#### Влияние на компоненты
- Минорное<br />`typography`


### [#810](https://github.com/core-ds/core-components/pull/810)

#### Что изменилось
- Повышена специфичность стилей

#### Влияние на компоненты
- Патчи<br />`pagination`


### [#799](https://github.com/core-ds/core-components/pull/799)

#### Что изменилось
- Добавлены новый пропы swipeableMarker и swipeableMarkerClassName

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#803](https://github.com/core-ds/core-components/pull/803)

#### Что изменилось
- Исправили стили для label в мобильных компонентах CheckboxGroup и RadioGroup

#### Влияние на компоненты
- Патчи<br />`checkbox-group` `radio-group`


### [#802](https://github.com/core-ds/core-components/pull/802)

#### Что изменилось
- Исправлена ошибка, из-за которой в поле вставлялась лишняя 7 при вводе значения перед +7

#### Влияние на компоненты
- Патчи<br />`phone-input`



## 42.2.1

<sup><time>23.08.2023</time></sup>

### [#806](https://github.com/core-ds/core-components/pull/806)

#### Что изменилось
- Исправлен коллбек getPortalContainer

#### Влияние на компоненты
- Патчи<br />`with-suffix`


### [#798](https://github.com/core-ds/core-components/pull/798)

#### Что изменилось
- Изменен цвет кнопки с view='link'. Теперь фон будет различаться в зависимости от состояния open

#### Влияние на компоненты
- Патчи<br />`picker-button`


### [#807](https://github.com/core-ds/core-components/pull/807)

#### Что изменилось
- Исправлено выравнивание success иконки в старых браузерах

#### Влияние на компоненты
- Патчи<br />`input`


### [#801](https://github.com/core-ds/core-components/pull/801)

#### Что изменилось
- Исправлена проблема со специфичностью некоторых стилей

#### Влияние на компоненты
- Патчи<br />`button`



## 42.2.0

<sup><time>17.08.2023</time></sup>

### [#785](https://github.com/core-ds/core-components/pull/785)

#### Что изменилось
- Цвет компонента в выбранном состоянии заменен с красного на зеленый

#### Влияние на компоненты
- Минорное<br />`switch` `themes`


### [#791](https://github.com/core-ds/core-components/pull/791)

#### Что изменилось
- Добавлен экспорт back-arrow-addon

#### Влияние на компоненты
- Минорное<br />`navigation-bar`

<br />

#### Что изменилось
- Добавлена easeInOutQuad функция

#### Влияние на компоненты
- Минорное<br />`shared`

<br />

#### Что изменилось
- Добавлен проп contentProps, componentDivProps

#### Влияние на компоненты
- Минорное<br />`base-modal`

<br />

#### Что изменилось
- Добавлен новый компонент PopupSheet

#### Влияние на компоненты
- Минорное<br />`popup-sheet`


### [#790](https://github.com/core-ds/core-components/pull/790)

#### Что изменилось
- Добавлена функция createPaddingStyle

#### Влияние на компоненты
- Минорное<br />`shared`

<br />

#### Что изменилось
- Добавлен проп padding во все составные части компонента
- Теперь проп direction будет влиять на расположение кнопок в десктопной версии компонента

#### Влияние на компоненты
- Минорное<br />`system-message`


### [#787](https://github.com/core-ds/core-components/pull/787)

#### Что изменилось
- Исправлена ошибка, из-за которой появлялся вертикальный скролл при autosize=true

#### Влияние на компоненты
- Патчи<br />`textarea`


### [#789](https://github.com/core-ds/core-components/pull/789)

#### Что изменилось
- Добавлен проп initialScreenHintSlot для возможности замены ссылки "не приходит сообщение" на кастомный контент
- Loader заменен на Spinner

#### Влияние на компоненты
- Минорное<br />`confirmation`


### [#786](https://github.com/core-ds/core-components/pull/786)

#### Что изменилось
- Исправлена ошибка c ResizeObserver в компоненте TabsCollapsible, возникающая в старых версиях firefox

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#794](https://github.com/core-ds/core-components/pull/794)

#### Что изменилось
- Исправлена ошибка, из-за которой невозможно было программно установить фокус

#### Влияние на компоненты
- Патчи<br />`phone-input`


### [#792](https://github.com/core-ds/core-components/pull/792)

#### Что изменилось
- Исправлена ошибка, из-за которой не всегда выбиралась минимально допустимая дата при указанном minDate

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#793](https://github.com/core-ds/core-components/pull/793)

#### Что изменилось
- Добавлены недостающие зависимости в package.json

#### Влияние на компоненты
- Патчи<br />`calendar` `calendar-input` `cdn-icon` `custom-picker-button` `date-range-input`<br /> `date-time-input` `drawer` `file-upload-item` `input-autocomplete` `markdown`<br /> `navigation-bar` `plate` `pure-cell` `select` `sortable-list`<br />



## 42.1.0

<sup><time>10.08.2023</time></sup>

### [#767](https://github.com/core-ds/core-components/pull/767)

#### Что изменилось
- Добавлен новый компонент Markdown

#### Влияние на компоненты
- Минорное<br />`markdown`



## 42.0.0

<sup><time>08.08.2023</time></sup>

### [#703](https://github.com/core-ds/core-components/pull/703)

#### Что изменилось
- Кастомный js скроллбар заменен на css версию

#### Влияние на компоненты
- Мажорное<br />`drawer` `side-panel`


### [#702](https://github.com/core-ds/core-components/pull/702)

#### Что изменилось
- Утилиты и константы экспортируются из shared

#### Влияние на компоненты
- Мажорное<br />`calendar-input`

<br />

#### Что изменилось
- Из index теперь экспортируется responsive версия компонента. Десктопная версия импортируется отсюда -> @alfalab/core-components-calendar/desktop
- Утилиты и константы экспортируются из shared

#### Влияние на компоненты
- Мажорное<br />`calendar`

<br />

#### Что изменилось
- Удалена responsive точка входа. (В проектах нужно заменить импорт @alfalab/core-components-calendar/responsive на @alfalab/core-components-calendar)

#### Влияние на компоненты
- Мажорное<br />`calendar` `calendar-input` `date-range-input` `date-time-input`


### [#708](https://github.com/core-ds/core-components/pull/708)

#### Что изменилось
- Удалена responsive точка входа

#### Влияние на компоненты
- Мажорное<br />`system-message`


### [#687](https://github.com/core-ds/core-components/pull/687)

#### Что изменилось
- Компонент Button заменен на mobile/desktop версии для мобильных и десктопных версий компонентов

#### Влияние на компоненты
- Минорное<br />`calendar` `input-autocomplete` `pass-code` `pattern-lock` `select`<br /> `tooltip`

<br />

#### Что изменилось
- Для компонента Button добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`button`


### [#742](https://github.com/core-ds/core-components/pull/742)

#### Что изменилось
- Для компонента ToastPlate добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`toast-plate`

<br />

#### Что изменилось
- Для компонента Toast добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`toast`


### [#709](https://github.com/core-ds/core-components/pull/709)

#### Что изменилось
- Удалена responsive точка входа.
- Из индексного файла теперь тянется responsive версия компонента
- Prop defaultMatch заменен на defaultMatchMediaValue и имеет теперь другой тип
- Добавлена мобильная версия - TooltipMobile

#### Влияние на компоненты
- Мажорное<br />`tooltip`


### [#743](https://github.com/core-ds/core-components/pull/743)

#### Что изменилось
- Для компонента Plate добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`plate`


### [#711](https://github.com/core-ds/core-components/pull/711)

#### Что изменилось
- Удалена responsive точка входа

#### Влияние на компоненты
- Мажорное<br />`custom-picker-button`

<br />

#### Что изменилось
- Удалена responsive точка входа. Responsive компонент теперь экспортируется из индексного файла
- Пресеты и утилиты вынесены в shared (@alfalab/core-components/select/shared)
- Десктопный компонент теперь экспортируется из desktop -> import {SelectDesktop} from '@alfalab/core-components/select/desktop'

#### Влияние на компоненты
- Мажорное<br />`select`

<br />

#### Что изменилось
- Добавлен проп style

#### Влияние на компоненты
- Минорное<br />`skeleton`

<br />

#### Что изменилось
- Удалена responsive точка входа.

#### Влияние на компоненты
- Мажорное<br />`picker-button`

<br />

#### Что изменилось
- Удалена responsive точка входа. Responsive компонент теперь экспортируется из индексного файла
- Десктопный компонент теперь экспортируется из desktop -> import {InputAutocompleteDesktop} from '@alfalab/core-components/input-autocomplete/desktop'

#### Влияние на компоненты
- Мажорное<br />`input-autocomplete`


### [#719](https://github.com/core-ds/core-components/pull/719)

#### Что изменилось
- Поведение плейсхолдера и лейбла изменено на стандартное. Теперь, в дефолтном состоянии, в инпутах с внутренним положением лейбла отображается лейбл, а не плейсхолдер.

#### Влияние на компоненты
- Минорное<br />`input-autocomplete` `select`


### [#716](https://github.com/core-ds/core-components/pull/716)

#### Что изменилось
- Компонент FormControl заменен на mobile/desktop версии для мобильных и десктопных версий компонентов

#### Влияние на компоненты
- Минорное<br />`select` `input-autocomplete`

<br />

#### Что изменилось
- Компонент Input заменен на mobile/desktop версии для мобильных и десктопных версий компонентов

#### Влияние на компоненты
- Минорное<br />`date-time-input` `date-range-input`

<br />

#### Что изменилось
- Для компонента FormControl добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`form-control`

<br />

#### Что изменилось
- Для компонента Input добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`input`


### [#705](https://github.com/core-ds/core-components/pull/705)

#### Что изменилось
- Удалена responsive точка входа. Теперь responsive компонент импортируется из индексного файла.

#### Влияние на компоненты
- Мажорное<br />`confirmation`


### [#734](https://github.com/core-ds/core-components/pull/734)

#### Что изменилось
- Для компонента RadioGroup добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`radio-group`

<br />

#### Что изменилось
- Для компонента CheckboxGroup добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`checkbox-group`

<br />

#### Что изменилось
- В компонентах Radio и Checkbox для выбранных контролов токен фона был изменен на --color-light-graphic-primary в темах default и site

#### Влияние на компоненты
- Минорное<br />`radio` `checkbox`


### [#731](https://github.com/core-ds/core-components/pull/731)

#### Что изменилось
- Добавлены пропсы onOffsetChange, onMagnetizeEnd,  swipeableContent, swipeThreshold,  headerOffset
- Исправлена ошибка, из-за которой компонент закрывался после события скролла.
- Исправлена ошибка, из-за которой шторка неверно позиционировалась после свайпа влево/вправо

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#700](https://github.com/core-ds/core-components/pull/700)

#### Что изменилось
- Для компонента Tag добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`tag`

<br />

#### Что изменилось
- Для компонента FilterTag добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`filter-tag`


### [#713](https://github.com/core-ds/core-components/pull/713)

#### Что изменилось
- Новый пакет с общими утилитами и т.п

#### Влияние на компоненты
- Минорное<br />`shared`

<br />

#### Что изменилось
- Теперь каждый пакет публикуется с исходниками

#### Влияние на компоненты
- Минорное<br />`action-button` `alert` `amount` `amount-input` `attach`<br /> `backdrop` `badge` `bank-card` `base-modal` `bottom-sheet`<br /> `button` `calendar` `calendar-input` `calendar-range` `calendar-with-skeleton`<br /> `card-image` `cdn-icon` `chart` `checkbox` `checkbox-group`<br /> `circular-progress-bar` `code-input` `collapse` `comment` `confirmation`<br /> `confirmation-v1` `custom-button` `custom-picker-button` `date-input` `date-range-input`<br /> `date-time-input` `divider` `drawer` `dropzone` `file-upload-item`<br /> `filter-tag` `form-control` `gallery` `gap` `generic-wrapper`<br /> `global-store` `grid` `hatching-progress-bar` `icon-button` `icon-view`<br /> `indicator` `input` `input-autocomplete` `intl-phone-input` `keyboard-focusable`<br /> `link` `list` `list-header` `loader` `masked-input`<br /> `modal` `mq` `navigation-bar` `notification` `notification-manager`<br /> `number-input` `pagination` `pass-code` `password-input` `pattern-lock`<br /> `phone-input` `picker-button` `plate` `popover` `portal`<br /> `progress-bar` `pure-cell` `pure-input` `radio` `radio-group`<br /> `scrollbar` `segmented-control` `select` `select-with-tags` `side-panel`<br /> `skeleton` `slider` `slider-input` `sortable-list` `space`<br /> `spinner` `stack` `status` `stepped-progress-bar` `steps`<br /> `switch` `system-message` `table` `tabs` `tag`<br /> `textarea` `time-input` `toast` `toast-plate` `tooltip`<br /> `typography` `underlay` `with-suffix`


### [#781](https://github.com/core-ds/core-components/pull/781)

#### Что изменилось
- Исправлена ошибка, из-за которой не срабатывал onBlur в мобильном селекте

#### Влияние на компоненты
- Патчи<br />`select`


### [#644](https://github.com/core-ds/core-components/pull/644)

#### Что изменилось
- Удален компонент Modal.Closer (он больше не работает). Вместо него нужно использовать проп hasCloser у Modal.Header

#### Влияние на компоненты
- Мажорное<br />`modal`


### [#706](https://github.com/core-ds/core-components/pull/706)

#### Что изменилось
- Удалена responsive точка входа. Теперь responsive компонент импортируется из индексного файла.

#### Влияние на компоненты
- Мажорное<br />`modal`


### [#771](https://github.com/core-ds/core-components/pull/771)

#### Что изменилось
- Исправлена типографика в компоненте TitleResponsive для шрифта system с headline-system на headline-system-mobile

#### Влияние на компоненты
- Мажорное<br />`typography`


### [#704](https://github.com/core-ds/core-components/pull/704)

#### Что изменилось
- Хуки, общие компоненты и некоторые типы теперь экспортируются из shared (@alfalab/core-components/tabs/shared)
- Удалена responsive точка входа.
- Prop defaultMatch заменен на defaultMatchMediaValue и имеет теперь другой тип
- Удален prop collapsible, вместо него теперь отдельный компонент TabsCollapsible (@alfalab/core-components/tabs/collapsible)

#### Влияние на компоненты
- Мажорное<br />`tabs`


### [#782](https://github.com/core-ds/core-components/pull/782)

#### Что изменилось
- Исправлена ошибка, из-за которой не фиксировался TSortableHeadCell тип заголовка со stickyHeader

#### Влияние на компоненты
- Патчи<br />`table`


### [#707](https://github.com/core-ds/core-components/pull/707)

#### Что изменилось
- Удалена responsive точка входа

#### Влияние на компоненты
- Мажорное<br />`side-panel`


### [#783](https://github.com/core-ds/core-components/pull/783)

#### Что изменилось
- Расширен тип пропа icon, теперь разрешено передавать ReactElement

#### Влияние на компоненты
- Минорное<br />`icon-button`


### [#739](https://github.com/core-ds/core-components/pull/739)

#### Что изменилось
- Для компонента CodeInput добавлены мобильная и адаптивная версии компонента. Responsive компонент теперь экспортируется из индексного файла

#### Влияние на компоненты
- Мажорное<br />`code-input`



## 41.20.0

<sup><time>07.08.2023</time></sup>

### [#780](https://github.com/core-ds/core-components/pull/780)

#### Что изменилось
- Добавлены пропсы keepMounted, disableAutofocus, disableRestoreFocus, disableEscapeKeyDown

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#775](https://github.com/core-ds/core-components/pull/775)

#### Что изменилось
- Исправлен перенос контента в options для селекта с выбором кода страны

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#774](https://github.com/core-ds/core-components/pull/774)

#### Что изменилось
- Исправлены границы выделения выбранного периода при динамической установке значений

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#777](https://github.com/core-ds/core-components/pull/777)

#### Что изменилось
- Исправлена ошибка с фокусом в 16 реакте

#### Влияние на компоненты
- Патчи<br />`code-input`


### [#778](https://github.com/core-ds/core-components/pull/778)

#### Что изменилось
- Исправлено отображение цветных иконок

#### Влияние на компоненты
- Патчи<br />`cdn-icon`


### [#776](https://github.com/core-ds/core-components/pull/776)

#### Что изменилось
- Добавлена возможность передавать дополнительные props в компонент PureCell

#### Влияние на компоненты
- Патчи<br />`pure-cell`



## 41.19.0

<sup><time>02.08.2023</time></sup>

### [#772](https://github.com/core-ds/core-components/pull/772)

#### Что изменилось
- Добавлен новый пропс shapeClassName для возможности стилизации формы шейпа

#### Влияние на компоненты
- Минорное<br />`icon-view`


### [#766](https://github.com/core-ds/core-components/pull/766)

#### Что изменилось
- Удален скрипт отправки статистики (send-stats)

#### Влияние на компоненты
- Патчи<br />`action-button` `alert` `amount` `amount-input` `attach`<br /> `backdrop` `badge` `bank-card` `base-modal` `bottom-sheet`<br /> `button` `calendar` `calendar-input` `calendar-range` `calendar-with-skeleton`<br /> `card-image` `cdn-icon` `chart` `checkbox` `checkbox-group`<br /> `circular-progress-bar` `code-input` `collapse` `comment` `confirmation`<br /> `confirmation-v1` `custom-button` `custom-picker-button` `date-input` `divider`<br /> `drawer` `filter-tag` `form-control` `gallery` `gap`<br /> `generic-wrapper` `grid` `hatching-progress-bar` `icon-button` `icon-view`<br /> `indicator` `input` `input-autocomplete` `intl-phone-input` `keyboard-focusable`<br /> `link` `list` `list-header` `loader` `masked-input`<br /> `modal` `mq` `notification` `notification-manager` `number-input`<br /> `pass-code` `phone-input` `picker-button` `plate` `popover`<br /> `portal` `progress-bar` `pure-cell` `pure-input` `radio`<br /> `radio-group` `scrollbar` `segmented-control` `select` `select-with-tags`<br /> `side-panel` `skeleton` `slider` `slider-input` `sortable-list`<br /> `space` `spinner` `status` `stepped-progress-bar` `steps`<br /> `switch` `system-message` `tabs` `tag` `textarea`<br /> `toast` `toast-plate` `tooltip` `typography` `underlay`<br /> `with-suffix`


### [#756](https://github.com/core-ds/core-components/pull/756)

#### Что изменилось
- Добавлены два коллбэка - onCalendarOpen и onCalendarClose

#### Влияние на компоненты
- Минорное<br />`calendar-input`


### [#768](https://github.com/core-ds/core-components/pull/768)

#### Что изменилось
- В компоненты CalendarInput, DateRangeInput, DateTimeInput добавлен проп disableUserInput отвечающий за запрет ввода с клавиатуры

#### Влияние на компоненты
- Минорное<br />`calendar-input` `date-range-input` `date-time-input`


### [#760](https://github.com/core-ds/core-components/pull/760)

#### Что изменилось
- Добавлены вызовы inputProps хендлеров

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`



## 41.18.0

<sup><time>26.07.2023</time></sup>

### [#754](https://github.com/core-ds/core-components/pull/754)

#### Что изменилось
- Pадиус скругления изменен на 12px во всех темах

#### Влияние на компоненты
- Минорное<br />`dropzone` `themes`


### [#753](https://github.com/core-ds/core-components/pull/753)

#### Что изменилось
- Добавлен пропс className в слот main

#### Влияние на компоненты
- Минорное<br />`pure-cell`


### [#757](https://github.com/core-ds/core-components/pull/757)

#### Что изменилось
- Перевели единицы измерения на русский язык

#### Влияние на компоненты
- Патчи<br />`file-upload-item`


### [#758](https://github.com/core-ds/core-components/pull/758)

#### Что изменилось
- В CalendarMobile добавлен проп onMonthTitleClick

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#752](https://github.com/core-ds/core-components/pull/752)

#### Что изменилось
- Свойство inputClassName передано компоненту инпута

#### Влияние на компоненты
- Патчи<br />`calendar-input`



## 41.17.0

<sup><time>20.07.2023</time></sup>

### [#741](https://github.com/core-ds/core-components/pull/741)

#### Что изменилось
- Перевод corp темизации на bluetint цвета, приведение компонентов Input, Select к core темизации

#### Влияние на компоненты
- Минорное<br />`button` `tabs` `themes` `vars`


### [#732](https://github.com/core-ds/core-components/pull/732)

#### Что изменилось
- Добавлены пропсы размера и выбора закругления определенного угла рамки. Добавлен контент и contentProps с пропсами для настройки отображения контента

#### Влияние на компоненты
- Минорное<br />`underlay`



## 41.15.0

<sup><time>18.07.2023</time></sup>

### [#738](https://github.com/core-ds/core-components/pull/738)

#### Что изменилось
- fix(steps): make checkIsStepCustom's return value nullable

#### Влияние на компоненты
- Минорное<br />`steps`


### [#698](https://github.com/core-ds/core-components/pull/698)

#### Что изменилось
- Исправлена ошибка, из-за которой возникал отступ справа от "глаза" когда комопонент в состоянии ошибки

#### Влияние на компоненты
- Патчи<br />`password-input`


### [#746](https://github.com/core-ds/core-components/pull/746)

#### Что изменилось
- Динамический импорт библиотеки libphonenumber-js в cjs сборках заменен на require

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#745](https://github.com/core-ds/core-components/pull/745)

#### Что изменилось
- Добавлен usePortal проп

#### Влияние на компоненты
- Минорное<br />`base-modal` `bottom-sheet`


### [#717](https://github.com/core-ds/core-components/pull/717)

#### Что изменилось
- Добавлен проп codeFormat в Amount.Pure

#### Влияние на компоненты
- Патчи<br />`amount`



## 41.14.1

<sup><time>06.07.2023</time></sup>

### [#735](https://github.com/core-ds/core-components/pull/735)

#### Что изменилось
- Изменены боковые отступы для компонента CalendarWithSkeleton

#### Влияние на компоненты
- Патчи<br />`calendar-with-skeleton`


### [#736](https://github.com/core-ds/core-components/pull/736)

#### Что изменилось
- Добавлена возможность переопределять props в компоненте InputAutocompleteModalMobile

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`



## 41.14.0

<sup><time>29.06.2023</time></sup>

### [#730](https://github.com/core-ds/core-components/pull/730)

#### Что изменилось
- Параметры `event` и `payload` в пропе `onClick` передаются всегда

#### Влияние на компоненты
- Минорное<br />`tag`



## 41.13.0

<sup><time>22.06.2023</time></sup>

### [#723](https://github.com/core-ds/core-components/pull/723)

#### Что изменилось
- Добавлен проп disableFocusLock, отключающий ловушку фокуса

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`



## 41.12.0

<sup><time>22.06.2023</time></sup>

### [#694](https://github.com/core-ds/core-components/pull/694)

#### Что изменилось
- Добавлен prop showHeaderWithSelectAll, с помощью которого добавляется чекбокс "Выбрать все" в заголовок выпадающего списка
- Убраны hover-эффекты у опций в мобильной версии

#### Влияние на компоненты
- Минорное<br />`select`


### [#712](https://github.com/core-ds/core-components/pull/712)

#### Что изменилось
- обновлены минорные версии @alfalab/utils и @alfalab/data

#### Влияние на компоненты
- Минорное<br />`amount-input` `amount` `attach` `confirmation-v1` `confirmation`<br /> `intl-phone-input`



## 41.11.0

<sup><time>02.06.2023</time></sup>

### [#677](https://github.com/core-ds/core-components/pull/677)

#### Что изменилось
- Добавлены новые цвета и режимы

#### Влияние на компоненты
- Минорное<br />`custom-button` `themes`


### [#686](https://github.com/core-ds/core-components/pull/686)

#### Что изменилось
- Добавлена темизация для АО компоненту SideBar

#### Влияние на компоненты
- Минорное<br />`themes`


### [#675](https://github.com/core-ds/core-components/pull/675)

#### Что изменилось
- feat(icon-view): Добавлены шейпы Rectangle и NoShape

#### Влияние на компоненты
- Минорное<br />`icon-view`


### [#692](https://github.com/core-ds/core-components/pull/692)

#### Что изменилось
- Исправлена ошибка, из-за которой отображался некорректный номер при вставке телефона, начинающегося на +7 или 8, из буфера в инпут

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#693](https://github.com/core-ds/core-components/pull/693)

#### Что изменилось
- Фикс параметра borderRadius, добавлен параметр overflow

#### Влияние на компоненты
- Минорное<br />`underlay`



## 41.10.0

<sup><time>31.05.2023</time></sup>

### [#685](https://github.com/core-ds/core-components/pull/685)

#### Что изменилось
- Добавлен проп spinnerClassName

#### Влияние на компоненты
- Минорное<br />`button`


### [#678](https://github.com/core-ds/core-components/pull/678)

#### Что изменилось
- Добавлен компонент InputAutocompleteModalMobile

#### Влияние на компоненты
- Минорное<br />`input-autocomplete`

<br />

#### Что изменилось
- Добавлен мобильный entryPoint.

#### Влияние на компоненты
- Минорное<br />`select`


### [#673](https://github.com/core-ds/core-components/pull/673)

#### Что изменилось
- В мобильных модальных компонентах кнопка подтверждения теперь находится справа

#### Влияние на компоненты
- Минорное<br />`calendar` `input-autocomplete` `select`


### [#689](https://github.com/core-ds/core-components/pull/689)

#### Что изменилось
- showFooter по-умолчанию выставлен в true

#### Влияние на компоненты
- Патчи<br />`select`


### [#680](https://github.com/core-ds/core-components/pull/680)

#### Что изменилось
- Добавлен новый компонент CustomPickerButton

#### Влияние на компоненты
- Минорное<br />`custom-picker-button`


- Патчи<br />`picker-button`


### [#684](https://github.com/core-ds/core-components/pull/684)

#### Что изменилось
- Компонент Loader заменен на Spinner

#### Влияние на компоненты
- Минорное<br />`action-button`


### [#664](https://github.com/core-ds/core-components/pull/664)

#### Что изменилось
- Для скролла в десктопном календаре используется CSS реализация
- В мобильном календаре скролл вынесен на обертку ModalMobile

#### Влияние на компоненты
- Минорное<br />`calendar`


- Патчи<br />`calendar-input` `calendar-range` `calendar-with-skeleton` `date-range-input` `date-time-input`<br />


### [#676](https://github.com/core-ds/core-components/pull/676)

#### Что изменилось
- Обновлена зависимость @alfalab/hooks

#### Влияние на компоненты
- Патчи<br />`action-button` `button` `calendar` `calendar-input` `checkbox`<br /> `confirmation` `confirmation-v1` `filter-tag` `gallery` `input`<br /> `input-autocomplete` `intl-phone-input` `keyboard-focusable` `link` `plate`<br /> `pure-cell` `pure-input` `radio` `segmented-control` `select-with-tags`<br /> `spinner` `switch` `tag` `textarea` `toast`<br /> `tooltip`


### [#690](https://github.com/core-ds/core-components/pull/690)

#### Что изменилось
- Исправлена ошибка, из-за которой не выбиралась опция в React 18 на мобильных устройствах

#### Влияние на компоненты
- Патчи<br />`select`



## 41.9.0

<sup><time>25.05.2023</time></sup>

### [#681](https://github.com/core-ds/core-components/pull/681)

#### Что изменилось
- Поправлен размер шрифта у заголовка

#### Влияние на компоненты
- Патчи<br />`side-panel`


### [865f8b492](https://github.com/core-ds/core-components/commit/865f8b4922e46a8011187447783fc26216846591)

#### Что изменилось
- Убран лишний пробел на мобильном hint-экране

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#670](https://github.com/core-ds/core-components/pull/670)

#### Что изменилось
- feat(indicator): Добавлен новый компонент Indicator

#### Влияние на компоненты
- Минорное<br />`indicator`


### [#679](https://github.com/core-ds/core-components/pull/679)

#### Что изменилось
- Добавлено значение auto для растягивания контента по всей высоте компонента Addon

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#665](https://github.com/core-ds/core-components/pull/665)

#### Что изменилось
- В компонент CalendarRange добавлено свойство returnInvalidDates, которое возвращает в коллбеке onChange невалидные даты

#### Влияние на компоненты
- Минорное<br />`calendar-range`



## 41.8.0

<sup><time>19.05.2023</time></sup>

### [#668](https://github.com/core-ds/core-components/pull/668)

#### Что изменилось
- Токен белого цвета изменен на static

#### Влияние на компоненты
- Патчи<br />`switch`


### [#674](https://github.com/core-ds/core-components/pull/674)

#### Что изменилось
- Изменена дефолтная высота компонента

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#657](https://github.com/core-ds/core-components/pull/657)

#### Что изменилось
- В компонент Calendar добавлено свойство showCurrentYearSelector , отвечающее за отображение текущего года

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#667](https://github.com/core-ds/core-components/pull/667)

#### Что изменилось
- Изменены токены цвета иконок на static

#### Влияние на компоненты
- Патчи<br />`checkbox` `radio` `themes`


### [#635](https://github.com/core-ds/core-components/pull/635)

#### Что изменилось
- Расширена область нажатия для кнопок в компонентах DateRangeInput, DateTimeInput, PasswordInput

#### Влияние на компоненты
- Патчи<br />`date-range-input` `date-time-input` `password-input`

<br />

#### Что изменилось
- В компонент IconButton добавлен пропс alignIcon, отвечающий за выравнивание иконки

#### Влияние на компоненты
- Минорное<br />`icon-button`

<br />

#### Что изменилось
- Обновлена версия пакета @alfalab/icons-glyph в зависимостях

#### Влияние на компоненты
- Патчи<br />`attach` `bank-card` `calendar` `checkbox` `confirmation-v1`<br /> `confirmation` `dropzone` `file-upload-item` `gallery` `input`<br /> `modal` `navigation-bar` `pass-code` `password-input` `picker-button`<br /> `select-with-tags` `select` `sortable-list` `steps` `toast-plate`<br />


### [#659](https://github.com/core-ds/core-components/pull/659)

#### Что изменилось
- dataTestId теперь устанавливается и на кнопку таба, а не только на контент

#### Влияние на компоненты
- Минорное<br />`tabs`


### [#672](https://github.com/core-ds/core-components/pull/672)

#### Что изменилось
-   Добавлена возможность прокидывать обработчик нажатия на период в шапке со слайдером

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#666](https://github.com/core-ds/core-components/pull/666)

#### Что изменилось
- Для активного таба токены фона и текста изменены на static

#### Влияние на компоненты
- Патчи<br />`segmented-control`



## 41.7.0

<sup><time>12.05.2023</time></sup>

### [#661](https://github.com/core-ds/core-components/pull/661)

#### Что изменилось
- Добавлен параметр maxDialCodeLength в компонент intl-phone-input, который задаёт максимальную длину телефонного кода страны

#### Влияние на компоненты
- Минорное<br />`intl-phone-input`



## 41.6.0

<sup><time>04.05.2023</time></sup>

### [#658](https://github.com/core-ds/core-components/pull/658)

#### Что изменилось
Изменения для Corp theme:
  1. Перевод цветовой палитры с bluetint на indigo
  2. Приведение компонентов Select, Input, Button к прошлому виду

#### Влияние на компоненты
- Минорное<br />`button` `tabs` `themes` `vars`



## 41.5.0

<sup><time>03.05.2023</time></sup>

### [#643](https://github.com/core-ds/core-components/pull/643)

#### Что изменилось
- Добавлен новый проп extraBounds, за счет которого можно увеличить площадь прослушивания события touchMove

#### Влияние на компоненты
- Минорное<br />`pattern-lock`


### [#652](https://github.com/core-ds/core-components/pull/652)

#### Что изменилось
- Исправлены ошибки, из-за которых onChange вызывался на первый рендер компонента и не работал проп onInputChange

#### Влияние на компоненты
- Патчи<br />`calendar-range`


### [#636](https://github.com/core-ds/core-components/pull/636)

#### Что изменилось
- В компоненте Button удалена темизация site для всех view, кроме 'primary'

#### Влияние на компоненты
- Минорное<br />`button` `themes`


### [#647](https://github.com/core-ds/core-components/pull/647)

#### Что изменилось
- Исправлена ошибка, из-за которой неверно вычислялось свойство контекста hasScroll в мобильной версии компонента

#### Влияние на компоненты
- Патчи<br />`side-panel`


### [#654](https://github.com/core-ds/core-components/pull/654)

#### Что изменилось
- Удалены лишние dependencies, добавлены отсутствующие

#### Влияние на компоненты
- Патчи<br />`bottom-sheet` `confirmation` `filter-tag` `intl-phone-input` `modal`<br /> `pagination` `pattern-lock` `phone-input` `picker-button` `side-panel`<br /> `slider` `slider-input` `tabs` `time-input` `underlay`<br />


### [#655](https://github.com/core-ds/core-components/pull/655)

#### Что изменилось
- Исправлена генерация идентификаторов для изображений

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#649](https://github.com/core-ds/core-components/pull/649)

#### Что изменилось
- Исправлен паттерн с positiveOnly={false}

#### Влияние на компоненты
- Патчи<br />`amount-input`


### [#648](https://github.com/core-ds/core-components/pull/648)

#### Что изменилось
- Немного изменен функционал определения высоты выпадающего списка. Сейчас, если задан параметр visibleOptions и кол-во опций превышает этот параметр только на единицу, то будут отображаться все опции

#### Влияние на компоненты
- Минорное<br />`select`



## 41.4.0

<sup><time>26.04.2023</time></sup>

### [#633](https://github.com/core-ds/core-components/pull/633)

#### Что изменилось
- Исправлена ошибка, из-за которой при пустом значении defaultCountryIso2 неверно форматировались российские номера

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#645](https://github.com/core-ds/core-components/pull/645)

#### Что изменилось
- Изменение вида primary и accent кнопок в corp theme

#### Влияние на компоненты
- Минорное<br />`themes`


### [#629](https://github.com/core-ds/core-components/pull/629)

#### Что изменилось
- Исправлены заголовки в теме click

#### Влияние на компоненты
- Патчи<br />`system-message` `themes`


### [#646](https://github.com/core-ds/core-components/pull/646)

#### Что изменилось
- Исправлена ошибка с типами в responsive компоненте

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`



## 41.3.1

<sup><time>25.04.2023</time></sup>

### [#622](https://github.com/core-ds/core-components/pull/622)

#### Что изменилось
- Убраны отрицательные отступы справа для списка тэгов, теперь тэги не будут выходить за пределы контейнера

#### Влияние на компоненты
- Патчи<br />`checkbox-group` `radio-group`


### [#642](https://github.com/core-ds/core-components/pull/642)

#### Что изменилось
- Исправлена ошибка с прокидкой пропсов в OptionsList в мобильной версии компонента

#### Влияние на компоненты
- Патчи<br />`select`



## 41.3.0

<sup><time>20.04.2023</time></sup>

### [#631](https://github.com/core-ds/core-components/pull/631)

#### Что изменилось
Перевод Corp темы с indigo на bluetint
Приведение компонентов Button, Input в Corp теме к default Core view

#### Влияние на компоненты
- Минорное<br />`button` `tabs` `themes` `vars`



## 41.2.0

<sup><time>20.04.2023</time></sup>

### [#623](https://github.com/core-ds/core-components/pull/623)

#### Что изменилось
- Tокены 'dark' заменены на аналогичные 'light'

#### Влияние на компоненты
- Патчи<br />`filter-tag` `tag` `themes` `vars`


### [#632](https://github.com/core-ds/core-components/pull/632)

#### Что изменилось
- Исправлено название свойства strokeDasharray (strokeDashArray -> strokeDasharray)

#### Влияние на компоненты
- Патчи<br />`chart`


### [#630](https://github.com/core-ds/core-components/pull/630)

#### Что изменилось
- Исправлен тип magneticAreas

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#616](https://github.com/core-ds/core-components/pull/616)

#### Что изменилось
- Добавлены пропсы dayAddons - отвечает за дополнительный контент под числом, shape - форма ячейки дня (круглая или прямоугольная)

#### Влияние на компоненты
- Минорное<br />`calendar`


### [#619](https://github.com/core-ds/core-components/pull/619)

#### Что изменилось
- Добавлена пропса colors отвечающая за смену default и inverted режимов

#### Влияние на компоненты
- Минорное<br />`stepped-progress-bar`


### [#625](https://github.com/core-ds/core-components/pull/625)

#### Что изменилось
- Исправлен радиус скругления для прямоугольной формы компонента

#### Влияние на компоненты
- Патчи<br />`segmented-control`


### [#621](https://github.com/core-ds/core-components/pull/621)

#### Что изменилось
- Добавлены пропсы color - цветовое оформление бейджа при view='count' и iconUnderlayColor - цвет подложки под иконкой

#### Влияние на компоненты
- Минорное<br />`badge`



## 41.1.0

<sup><time>18.04.2023</time></sup>

### [#618](https://github.com/core-ds/core-components/pull/618)

#### Что изменилось
- Исправлено скругление рамки при использовании `view="hint"`

#### Влияние на компоненты
- Патчи<br />`tooltip`


### [#628](https://github.com/core-ds/core-components/pull/628)

#### Что изменилось
- Добавлена переменная --navigation-bar-closer-mobile-color для управления цветом мобильной версии Closer.
- Добавлена темизация click мобильной версии Closer

#### Влияние на компоненты
- Минорное<br />`navigation-bar` `themes`


### [#613](https://github.com/core-ds/core-components/pull/613)

#### Что изменилось
- Обновлен дизайн в компоненте Textarea

#### Влияние на компоненты
- Патчи<br />`form-control` `textarea`



## 41.0.1

<sup><time>17.04.2023</time></sup>

### [#624](https://github.com/core-ds/core-components/pull/624)

#### Что изменилось
- Исправлена ошибка, из-за которой не исчезали точки при стирании кода на старых iPhone

#### Влияние на компоненты
- Патчи<br />`pass-code`



## 41.0.0

<sup><time>14.04.2023</time></sup>

### [#615](https://github.com/core-ds/core-components/pull/615)

#### Что изменилось
- Обновлена зависимость react-swipeable до 7.0.0

#### Влияние на компоненты
- Патчи<br />`notification`

<br />

#### Что изменилось
- Проп invisible теперь привязан к пропу open CssTransitionGroup

#### Влияние на компоненты
- Патчи<br />`backdrop`

<br />

#### Что изменилось
- Добавлены магнитные области. Полное описание изменений в [#615](https://github.com/core-ds/core-components/pull/615)

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`

<br />

#### Что изменилось
- Компонент был обернут в forwardRef

#### Влияние на компоненты
- Минорное<br />`navigation-bar`


### [#620](https://github.com/core-ds/core-components/pull/620)

#### Что изменилось
- Обновлённая типографика: миксины promo-mobile и promo-system-mobile

#### Влияние на компоненты
- Минорное<br />`vars`


### [#599](https://github.com/core-ds/core-components/pull/599)

#### Что изменилось
### Переработана работа компонента SelectMobile с подтверждением.

Теперь для использования выбора опций с подтверждением необходимо использовать внешнее состояние, также как и в десктопной версии компонента.

#### Влияние на компоненты
- Мажорное<br />`select`


### [#607](https://github.com/core-ds/core-components/pull/607)

#### Что изменилось
- Добавлены новые пропс valueTo - второе значение диапазона и behaviour - определяет поведение ползунка

#### Влияние на компоненты
- Минорное<br />`slider`



## 40.2.0

<sup><time>11.04.2023</time></sup>

### [#604](https://github.com/core-ds/core-components/pull/604)

#### Что изменилось
- Добавлен новый prop backgroundColor

#### Влияние на компоненты
- Минорное<br />`bottom-sheet` `vars`


### [#612](https://github.com/core-ds/core-components/pull/612)

#### Что изменилось
- Исправлены отступы

#### Влияние на компоненты
- Патчи<br />`calendar` `calendar-input`


### [#603](https://github.com/core-ds/core-components/pull/603)

#### Что изменилось
- Исправлена ошибка, из-за которой трек слайдера исчезал при зуме

#### Влияние на компоненты
- Патчи<br />`slider`


### [#556](https://github.com/core-ds/core-components/pull/556)

#### Что изменилось
- Заданы статичные цвета для компонента Gallery. Добавлены новые css-переменные.

#### Влияние на компоненты
- Минорное<br />`gallery` `vars`


### [#614](https://github.com/core-ds/core-components/pull/614)

#### Что изменилось
- Добавлен новый необязательный prop container для прокидывания в компонент Portal

#### Влияние на компоненты
- Минорное<br />`notification-manager`



## 40.1.0

<sup><time>29.03.2023</time></sup>

### [#606](https://github.com/core-ds/core-components/pull/606)

#### Что изменилось
- Кнопки в состоянии disabled в теме click теперь соответствуют default

#### Влияние на компоненты
- Минорное<br />`themes`


### [#605](https://github.com/core-ds/core-components/pull/605)

#### Что изменилось
- Переработан кастомный скроллбар. Теперь используется CSS реализация.

#### Влияние на компоненты
- Минорное<br />`textarea`


### [#589](https://github.com/core-ds/core-components/pull/589)

#### Что изменилось
- Добавлен новый пропс allowOverflow отвечающий за добавление логики переполнения, если количество символов превышает maxLength

#### Влияние на компоненты
- Минорное<br />`textarea`



## 40.0.0

<sup><time>24.03.2023</time></sup>

### [#597](https://github.com/core-ds/core-components/pull/597)

#### Что изменилось
- Изменен цвет фона инпута

#### Влияние на компоненты
- Патчи<br />`code-input`


### [#602](https://github.com/core-ds/core-components/pull/602)

#### Что изменилось
- Небольшое исправление компонента

#### Влияние на компоненты
- Патчи<br />`picker-button`


### [#586](https://github.com/core-ds/core-components/pull/586)

#### Что изменилось
- Исправлен порядок обновления pips и value. Раньше при одновременном изменении pips и value слайдер устанавливался на неверную позицию

#### Влияние на компоненты
- Патчи<br />`slider`


### [#584](https://github.com/core-ds/core-components/pull/584)

#### Что изменилось
- Удалены хардкод стили выпадающего списка. Теперь стили такие же как и у селекта

#### Влияние на компоненты
- Патчи<br />`picker-button`


### [#582](https://github.com/core-ds/core-components/pull/582)

#### Что изменилось
Дефолтная тема сменит палитру Indigo на палитру Bluetint.

Основные изменения:
- Изменятся оттенки серого, тёмный режим начнёт выглядеть хорошо, а веб интерфейсы в дефолтной теме будут еще больше похожи на нативные мобильные.
- Вместе с изменением палитры будет перекрашена Primary-кнопка. Она станет чёрной, как в мобилке. Недавно добавленная Accent-кнопка останется красной.

Если в своём продукте вы хотите чтобы кнопки, которые используются у вас в интерфейсе, остались красными, то используйте [кодмод](https://www.npmjs.com/package/@alfalab/core-components-codemod/v/2.3.1), который заменит во всех кнопках view=primary на view=accent. Тогда они останутся красными.

Также если вы используете индексный файл с переменными (vars/index.css) , то рекомендуем вам [перейти на один из бандлов](https://github.com/core-ds/core-components/tree/master/packages/vars/src/bundle), подготовленных под продукты (например, vars/bundle/click.css).
В этих бандлах всегда будет правильный набор переменных для вашего продукта. Если в продукте встречаются очень старые deprecated цвета из файла vars/colors.css, дополнительно подключите его (Он всё ещё есть в индексном файле, но в бандлы его уже не добавляли).

#### Влияние на компоненты
- Мажорное<br />`button` `themes` `vars`


### [#588](https://github.com/core-ds/core-components/pull/588)

#### Что изменилось
- Добавлен \_\_esModule в cjs экспорт

#### Влияние на компоненты
- Патчи<br />`base-modal` `collapse` `drawer` `intl-phone-input` `modal`<br /> `space` `toast` `action-button` `alert` `amount`<br /> `amount-input` `attach` `backdrop` `badge` `bank-card`<br /> `bottom-sheet` `button` `calendar` `calendar-input` `calendar-range`<br /> `calendar-with-skeleton` `card-image` `cdn-icon` `chart` `checkbox`<br /> `checkbox-group` `circular-progress-bar` `code-input` `comment` `confirmation`<br /> `confirmation-v1` `custom-button` `date-input` `date-range-input` `date-time-input`<br /> `divider` `dropzone` `file-upload-item` `filter-tag` `form-control`<br /> `gallery` `gap` `generic-wrapper` `global-store` `grid`<br /> `hatching-progress-bar` `icon-button` `icon-view` `input` `input-autocomplete`<br /> `keyboard-focusable` `link` `list` `list-header` `loader`<br /> `masked-input` `mq` `navigation-bar` `notification` `notification-manager`<br /> `number-input` `pagination` `pass-code` `password-input` `pattern-lock`<br /> `phone-input` `picker-button` `plate` `popover` `portal`<br /> `progress-bar` `pure-cell` `pure-input` `radio` `radio-group`<br /> `scrollbar` `segmented-control` `select` `select-with-tags` `side-panel`<br /> `skeleton` `slider` `slider-input` `sortable-list` `spinner`<br /> `stack` `status` `stepped-progress-bar` `steps` `switch`<br /> `system-message` `table` `tabs` `tag` `textarea`<br /> `themes` `time-input` `toast-plate` `tooltip` `typography`<br /> `underlay` `vars` `with-suffix`


### [#601](https://github.com/core-ds/core-components/pull/601)

#### Что изменилось
- Добавлена очистка таймера при анмаунте компонента

#### Влияние на компоненты
- Патчи<br />`toast`


### [#587](https://github.com/core-ds/core-components/pull/587)

#### Что изменилось
- Добавлена переменная в css для фона в компоненте IconView

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#558](https://github.com/core-ds/core-components/pull/558)

#### Что изменилось
- Добавлены пропсы childrenRef и childrenClassName, добавлен стиль white-space: nowrap;

#### Влияние на компоненты
- Минорное<br />`tag`


### [#580](https://github.com/core-ds/core-components/pull/580)

#### Что изменилось
- Исправлена ошибка, из-за которой неверно удалялись символы из выбранного диапозона

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#598](https://github.com/core-ds/core-components/pull/598)

#### Что изменилось
- Исправлена ошибка, из-за которой у Select-а в задизейбленном состоянии менялся фон при фокусировке

#### Влияние на компоненты
- Патчи<br />`select`



## 39.4.0

<sup><time>20.03.2023</time></sup>

### [#579](https://github.com/core-ds/core-components/pull/579)

#### Что изменилось
- Добавлены новые правила форматирования для DateInput, DateRangeInput, DateTimeInput

#### Влияние на компоненты
- Минорное<br />`date-input` `date-range-input` `date-time-input`


### [#595](https://github.com/core-ds/core-components/pull/595)

#### Что изменилось
- Добавлены пропы closerClassName и closerWrapperClassname

#### Влияние на компоненты
- Патчи<br />`toast-plate`



## 39.3.0

<sup><time>20.03.2023</time></sup>

### [#565](https://github.com/core-ds/core-components/pull/565)

#### Что изменилось
- Исправлена ошибка, из-за которой не вызывался onChange, если было передано недопустимое значение

#### Влияние на компоненты
- Патчи<br />`number-input`


### [#585](https://github.com/core-ds/core-components/pull/585)

#### Что изменилось
- Исправлены стили бордера выпадающего списка

#### Влияние на компоненты
- Патчи<br />`select`


### [#576](https://github.com/core-ds/core-components/pull/576)

#### Что изменилось
- Добавлен новый компонент SystemMessage

#### Влияние на компоненты
- Минорное<br />`system-message`


### [#571](https://github.com/core-ds/core-components/pull/571)

#### Что изменилось
- Добавлен новый breakpoint - mobile-xs

#### Влияние на компоненты
- Минорное<br />`grid`


### [#567](https://github.com/core-ds/core-components/pull/567)

#### Что изменилось
- Ограничена максимальная ширина компонента ModalMobile до 600px

#### Влияние на компоненты
- Патчи<br />`modal`


### [#568](https://github.com/core-ds/core-components/pull/568)

#### Что изменилось
- Ограничена максимальная ширина компонента SidePanelMobile до 600px

#### Влияние на компоненты
- Патчи<br />`side-panel`



## 39.2.1

<sup><time>03.03.2023</time></sup>

### [#557](https://github.com/core-ds/core-components/pull/557)

#### Что изменилось
- Добавлены бордеры у выпадающих меню

#### Влияние на компоненты
- Патчи<br />`bottom-sheet` `calendar-input` `calendar-with-skeleton` `date-range-input` `date-time-input`<br /> `picker-button` `select` `tooltip`


### [#554](https://github.com/core-ds/core-components/pull/554)

#### Что изменилось
- Изменена ширина бордера с 2 пикселей на 1

#### Влияние на компоненты
- Патчи<br />`dropzone`



## 39.2.0

<sup><time>03.03.2023</time></sup>

### [#547](https://github.com/core-ds/core-components/pull/547)

#### Что изменилось
- Исправлена ошибка, из-за которой контент с z-index, отличным от auto, наезжал на sticky footer

#### Влияние на компоненты
- Патчи<br />`bottom-sheet`


### [#566](https://github.com/core-ds/core-components/pull/566)

#### Что изменилось
- Изменен цвет иконки в теме click

#### Влияние на компоненты
- Патчи<br />`icon-view` `themes`


### [#564](https://github.com/core-ds/core-components/pull/564)

#### Что изменилось
- Значение value при сбросе изменено на null

#### Влияние на компоненты
- Патчи<br />`number-input`


### [#561](https://github.com/core-ds/core-components/pull/561)

#### Что изменилось
- Замена css-переменных для миксина кнопок в corp теме на переменные из default темы

#### Влияние на компоненты
- Минорное<br />`themes`


### [#546](https://github.com/core-ds/core-components/pull/546)

#### Что изменилось
- Обновление vars из последней версии ui-primitives, deprecated и 'old' цвета отмечены комментарием /* deprecated */

#### Влияние на компоненты
- Патчи<br />`themes` `vars`


### [#574](https://github.com/core-ds/core-components/pull/574)

#### Что изменилось
- Сброшена темизация скругления в теме intranet для shape: rounded

#### Влияние на компоненты
- Минорное<br />`tag` `themes`


### [#550](https://github.com/core-ds/core-components/pull/550)

#### Что изменилось
- Исправлен цвет выделения диапазона в темной теме

#### Влияние на компоненты
- Патчи<br />`calendar` `themes` `vars`


### [#569](https://github.com/core-ds/core-components/pull/569)

#### Что изменилось
- Исправлены типы в InputAutocompleteResponsive

#### Влияние на компоненты
- Патчи<br />`input-autocomplete`


### [#555](https://github.com/core-ds/core-components/pull/555)

#### Что изменилось
- Убрана фокусная рамка

#### Влияние на компоненты
- Патчи<br />`scrollbar`


### [#563](https://github.com/core-ds/core-components/pull/563)

#### Что изменилось
- Исправлены стили диапозона в календаре

#### Влияние на компоненты
- Патчи<br />`calendar`


### [#549](https://github.com/core-ds/core-components/pull/549)

#### Что изменилось
- Исправлена ошибка, из-за которой контент с z-index, отличным от auto, наезжал на sticky footer и header

#### Влияние на компоненты
- Патчи<br />`modal`


### [#551](https://github.com/core-ds/core-components/pull/551)

#### Что изменилось
- Исправлена высота плашки при наличии аддонов

#### Влияние на компоненты
- Патчи<br />`plate`


### [#548](https://github.com/core-ds/core-components/pull/548)

#### Что изменилось
- Исправлена ошибка, из-за которой контент с z-index, отличным от auto, наезжал на sticky footer и header

#### Влияние на компоненты
- Патчи<br />`side-panel`


### [#562](https://github.com/core-ds/core-components/pull/562)

#### Что изменилось
- Исправлена ошибка, из-за которой компоненты обёрнутые в PureCell.Text не получали стили от Typography

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#542](https://github.com/core-ds/core-components/pull/542)

#### Что изменилось
- Добавили props colorMarker и caption, отвечающие за цвет маркера и дополнительный текст. Изменили размер контейнера для маркера

#### Влияние на компоненты
- Минорное<br />`list`



## 39.1.1

<sup><time>02.03.2023</time></sup>

### [#559](https://github.com/core-ds/core-components/pull/559)

#### Что изменилось
- Фикс доступности с клавиатуры, добавление скриншот тестов для компонентов с использованием Tag

#### Влияние на компоненты
- Патчи<br />`checkbox-group` `radio-group`


### [#545](https://github.com/core-ds/core-components/pull/545)

#### Что изменилось
- Добавлен пропс hideCountdownSection, с помощью которого можно скрыть секцию с обратным отсчетом и кнопкой с повторным запросом кода

#### Влияние на компоненты
- Патчи<br />`confirmation`


### [#570](https://github.com/core-ds/core-components/pull/570)

#### Что изменилось
- Исправлено выравнивание по центру

#### Влияние на компоненты
- Патчи<br />`navigation-bar`



## 39.1.0

<sup><time>28.02.2023</time></sup>

### [c8ff5d47b](https://github.com/core-ds/core-components/commit/c8ff5d47b5326a0ffbb5f0b751fa45d80770a8e9)

#### Что изменилось
- Удален line-height

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#540](https://github.com/core-ds/core-components/pull/540)

#### Что изменилось
- Изменена нода с overflow: auto в SidePanelMobile

#### Влияние на компоненты
- Патчи<br />`base-modal` `bottom-sheet` `modal` `navigation-bar` `side-panel`<br />


### [#543](https://github.com/core-ds/core-components/pull/543)

#### Что изменилось
- Исправлен цвет лоадера в mobile, click, intranet темах

#### Влияние на компоненты
- Патчи<br />`button` `themes`


### [#528](https://github.com/core-ds/core-components/pull/528)

#### Что изменилось
- Добавлен новый компонент SegmentedControl.

#### Влияние на компоненты
- Минорное<br />`segmented-control`



## 39.0.0

<sup><time>17.02.2023</time></sup>

### [#494](https://github.com/core-ds/core-components/pull/494)

#### Что изменилось
- В ModalContext у base-modal добавлен ref на div-обертку модальных окон
- У компонентов Modal, SidePanel и BottomSheet обновлён компонент заголовка и изменены основные отступы<br />

#### Влияние на компоненты
- Мажорное<br />`bottom-sheet` `modal` `side-panel`


- Минорное<br />`base-modal` `navigation-bar`


- Патчи<br />`themes`


### [#531](https://github.com/core-ds/core-components/pull/531)

#### Что изменилось
- Добавлены static цвета для Typography

#### Влияние на компоненты
- Минорное<br />`typography`


### [#532](https://github.com/core-ds/core-components/pull/532)

#### Что изменилось
- Добавлен новый компонент SortableList

#### Влияние на компоненты
- Минорное<br />`sortable-list`


### [#521](https://github.com/core-ds/core-components/pull/521)

#### Что изменилось
- Исправлена ошибка, из-за которой не вызывался onLoad callback

#### Влияние на компоненты
- Патчи<br />`card-image`


### [#511](https://github.com/core-ds/core-components/pull/511)

#### Что изменилось
- Добавлен новый компонент Underlay

#### Влияние на компоненты
- Минорное<br />`underlay`



## 38.4.0

<sup><time>15.02.2023</time></sup>

### [#516](https://github.com/core-ds/core-components/pull/516)

#### Что изменилось
- Добавлена кнопка "Забыли код?"

#### Влияние на компоненты
- Минорное<br />`pattern-lock`


### [#517](https://github.com/core-ds/core-components/pull/517)

#### Что изменилось
- Изменили внутренний компонент с MaskedInput на Input

#### Влияние на компоненты
- Патчи<br />`number-input`


### [#498](https://github.com/core-ds/core-components/pull/498)

#### Что изменилось
- Добавлены новые пропс shape и view отвечающие за форму и стиль тега

#### Влияние на компоненты
- Минорное<br />`filter-tag` `tag`


### [#490](https://github.com/core-ds/core-components/pull/490)

#### Что изменилось
- Добавлен новый пропс onClose - обработчик закрытия календаря

#### Влияние на компоненты
- Патчи<br />`date-range-input`


### [#513](https://github.com/core-ds/core-components/pull/513)

#### Что изменилось
- Изменены типы onChange коллбэка.

#### Влияние на компоненты
- Патчи<br />`checkbox` `checkbox-group` `radio` `radio-group` `switch`<br />


### [#504](https://github.com/core-ds/core-components/pull/504)

#### Что изменилось
- Исправлена ошибка с label в SelectMobile. Теперь, чтобы задать заголовок выпадающему списку достаточно передать только проп label. До исправления заголовок устанавливался только пропом placeholder

#### Влияние на компоненты
- Патчи<br />`select`


### [#534](https://github.com/core-ds/core-components/pull/534)

#### Что изменилось
- Удалены restProps

#### Влияние на компоненты
- Патчи<br />`filter-tag`


### [#525](https://github.com/core-ds/core-components/pull/525)

#### Что изменилось
- Исправлены отступы с labelView='outer'

#### Влияние на компоненты
- Патчи<br />`select-with-tags`


### [#507](https://github.com/core-ds/core-components/pull/507)

#### Что изменилось
- Исправлены ошибки, из-за которых компонент неверно реагировал на изменение свойства value извне и неверно отображался активный месяц в календаре

#### Влияние на компоненты
- Патчи<br />`date-range-input`


### [#524](https://github.com/core-ds/core-components/pull/524)

#### Что изменилось
- Исправлен баг, из-за которого отсутствовал hover-эффект на старых браузерах

#### Влияние на компоненты
- Патчи<br />`filter-tag`


### [#537](https://github.com/core-ds/core-components/pull/537)

#### Что изменилось
- Доработан скрипт сборки тем

#### Влияние на компоненты
- Патчи<br />`vars` `themes`


### [#527](https://github.com/core-ds/core-components/pull/527)

#### Что изменилось
- Добавлен новый view: 'accent'

#### Влияние на компоненты
- Минорное<br />`button`


### [#526](https://github.com/core-ds/core-components/pull/526)

#### Что изменилось
- В зависимости добавлена библиотека tslib

#### Влияние на компоненты
- Патчи<br />`action-button` `alert` `amount` `amount-input` `attach`<br /> `backdrop` `badge` `bank-card` `base-modal` `bottom-sheet`<br /> `button` `calendar` `calendar-input` `calendar-range` `calendar-with-skeleton`<br /> `card-image` `cdn-icon` `chart` `checkbox` `checkbox-group`<br /> `circular-progress-bar` `code-input` `collapse` `comment` `confirmation`<br /> `confirmation-v1` `custom-button` `date-input` `date-range-input` `date-time-input`<br /> `divider` `drawer` `dropzone` `file-upload-item` `filter-tag`<br /> `form-control` `gallery` `gap` `generic-wrapper` `grid`<br /> `hatching-progress-bar` `icon-button` `icon-view` `input` `input-autocomplete`<br /> `intl-phone-input` `keyboard-focusable` `link` `list` `list-header`<br /> `loader` `masked-input` `modal` `mq` `notification`<br /> `notification-manager` `number-input` `pagination` `pass-code` `password-input`<br /> `pattern-lock` `phone-input` `picker-button` `plate` `popover`<br /> `portal` `progress-bar` `pure-cell` `pure-input` `radio`<br /> `radio-group` `scrollbar` `select` `select-with-tags` `side-panel`<br /> `skeleton` `slider` `slider-input` `space` `spinner`<br /> `stack` `status` `stepped-progress-bar` `steps` `switch`<br /> `table` `tabs` `tag` `textarea` `time-input`<br /> `toast` `toast-plate` `tooltip` `typography` `with-suffix`<br />


### [#522](https://github.com/core-ds/core-components/pull/522)

#### Что изменилось
- Исправлена TS ошибка "ref does not exist on type"

#### Влияние на компоненты
- Патчи<br />`calendar-input` `date-range-input` `date-time-input` `calendar` `input-autocomplete`<br />



## 38.3.0

<sup><time>13.02.2023</time></sup>

<div className="sb-alert">Версия не рекомендуется к использованию, сломана темизация, используйте 38.4.0 и выше.</div>

### [#529](https://github.com/core-ds/core-components/pull/529)

#### Что изменилось
- В `PureCell.Text` добавлена пропса `titleWeight` и два варианта `view`

#### Влияние на компоненты
- Минорное<br />`pure-cell`



## 38.2.0

<sup><time>10.02.2023</time></sup>

<div className="sb-alert">Версия не рекомендуется к использованию, сломана темизация, используйте 38.4.0 и выше.</div>

### [#520](https://github.com/core-ds/core-components/pull/520)

#### Что изменилось
- Исправлено некорректное поведение collapsible вкладок в браузере Firefox

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#499](https://github.com/core-ds/core-components/pull/499)

#### Что изменилось
- Исправлен размер 40 для компонента Сircle

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#509](https://github.com/core-ds/core-components/pull/509)

#### Что изменилось
- Добавлен экспорт TooltipResponsiveProps

#### Влияние на компоненты
- Патчи<br />`tooltip`


### [#512](https://github.com/core-ds/core-components/pull/512)

#### Что изменилось
- fix(intl-phone-input): исправлена вставка в пустое поле номера без "+"

#### Влияние на компоненты
- Патчи<br />`intl-phone-input`


### [#510](https://github.com/core-ds/core-components/pull/510)

#### Что изменилось
- В Select исправлено выделение опций на iOS с пропом `Options={BaseOptions}`
- В Checkbox добавлен проп hiddenInput, с помощью которого можно скрыть нативный input<br />

#### Влияние на компоненты
- Минорное<br />`checkbox`


- Патчи<br />`select`


### [#497](https://github.com/core-ds/core-components/pull/497)

#### Что изменилось
- fix(select): virtual options list

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


- Патчи<br />`select`


### [#505](https://github.com/core-ds/core-components/pull/505)

#### Что изменилось
- Исправлена позиция лоадера при display: block

#### Влияние на компоненты
- Патчи<br />`button`


### [#523](https://github.com/core-ds/core-components/pull/523)

#### Что изменилось
- Обновлена зависимость react-focus-lock

#### Влияние на компоненты
- Патчи<br />`base-modal`


### [#486](https://github.com/core-ds/core-components/pull/486)

#### Что изменилось
- Добавлен файл main.css с базовыми стилями

#### Влияние на компоненты
- Минорное<br />`vars`



## 38.0.0

<sup><time>07.02.2023</time></sup>

### [#500](https://github.com/core-ds/core-components/pull/500)

#### Что изменилось
- Обвновлён bundle site.css для перехода на палитру bluetint

#### Влияние на компоненты
- Мажорное<br />`vars`


### [#493](https://github.com/core-ds/core-components/pull/493)

#### Что изменилось
- Удаление темизации click для компонентов input, button, form-control, slider, slider-input, backdrop. Теперь эти компоненты соответствуют default теме.
<br />
Компоненты button, radio, checkbox теперь соответствуют теме mobile.<br />
<br />
Переработан компонент select в теме click, вместо badge используется checkbox для multiple и CheckmarkMIcon для одинчного выбора.<br />
<br />
Замена токена --circular-progress-bar-bg-color на --circular-progress-bar-stroke-color<br />

#### Влияние на компоненты
- Мажорное<br />`themes`


### [#503](https://github.com/core-ds/core-components/pull/503)

#### Что изменилось
- Обновление палитры bluetint: корректировка контраста text и graphic цветов

#### Влияние на компоненты
- Патчи<br />`vars`


### [#491](https://github.com/core-ds/core-components/pull/491)

#### Что изменилось
- Обновлены внутренние переменные (themes/default.css) для размеров кнопок (xxs добавлен, xs исправлен)

#### Влияние на компоненты
- Мажорное<br />`themes`


- Патчи<br />`button` `filter-tag` `tag`



## 37.5.1

<sup><time>07.02.2023</time></sup>

### [#508](https://github.com/core-ds/core-components/pull/508)

#### Что изменилось
- Исправлена ошщибка "replace is not a funcion", если кастомный инпут в onChange обработчике возвращал число, а не строку

#### Влияние на компоненты
- Патчи<br />`slider-input`


### [#502](https://github.com/core-ds/core-components/pull/502)

#### Что изменилось
- Исправлен экспорт css-переменных в js. Теперь js-файл есть как в рут пакете, так и core-components-vars

#### Влияние на компоненты
- Патчи<br />`vars`



## 37.5.0

<sup><time>02.02.2023</time></sup>

### [#492](https://github.com/core-ds/core-components/pull/492)

#### Что изменилось
- Добавлены тени для палитры bluetint (shadows-bluetint.css) и продуктовые бандлы переменных (vars/bundle/corp.css и др.)

#### Влияние на компоненты
- Минорное<br />`vars`


### [#455](https://github.com/core-ds/core-components/pull/455)

#### Что изменилось
- Добавлен новый компонент NumberInput

#### Влияние на компоненты
- Минорное<br />`number-input`


### [#464](https://github.com/core-ds/core-components/pull/464)

#### Что изменилось
- Исправлена ошибка из-за которой tooltip не закрывался на touch устройствах

#### Влияние на компоненты
- Патчи<br />`tooltip`


### [06cb65be9](https://github.com/core-ds/core-components/commit/06cb65be9eade56697f8e5494b8960d5917a5fad)

#### Что изменилось
- Добавлено свойство container. Теперь есть возможность указать ноду, в которой будет рендериться bottom-sheet

#### Влияние на компоненты
- Минорное<br />`bottom-sheet`


### [#470](https://github.com/core-ds/core-components/pull/470)

#### Что изменилось
- Обновлена версия react-transition-group

#### Влияние на компоненты
- Патчи<br />`backdrop` `base-modal` `bottom-sheet` `calendar-with-skeleton` `modal`<br /> `notification-manager` `pass-code` `popover` `toast`


### [#476](https://github.com/core-ds/core-components/pull/476)

#### Что изменилось
- Исправлено вычисление свойств minDate и maxDate, если они в одном месяце

#### Влияние на компоненты
- Патчи<br />`calendar-range`


### [#472](https://github.com/core-ds/core-components/pull/472)

#### Что изменилось
- Убрано свойство size из fieldProps. Теперь можно прокидывать любое значение

#### Влияние на компоненты
- Патчи<br />`select`


### [#465](https://github.com/core-ds/core-components/pull/465)

#### Что изменилось
- Исправлена ошибка из-за которой происходил рассинхрон состояний

#### Влияние на компоненты
- Патчи<br />`radio-group`



## 37.4.0

<sup><time>30.01.2023</time></sup>

### [#469](https://github.com/core-ds/core-components/pull/469)

#### Что изменилось
- Для компонента Typography добавлен новый пропс rowLimit отвечающий за ограничение максимального количества строк
- Для компонентов PureCell и Plate изменено отсечение текста в несколько строк<br />

#### Влияние на компоненты
- Минорное<br />`typography`


- Патчи<br />`pure-cell` `plate`


### [#484](https://github.com/core-ds/core-components/pull/484)

#### Что изменилось
- Исправлен тип для значения по-умолчанию у хука useMatchMedia
- В side-panel добавлена возможность указать значение по-умолчанию для useMatchMedia<br />

#### Влияние на компоненты
- Патчи<br />`mq` `side-panel`


### [#462](https://github.com/core-ds/core-components/pull/462)

#### Что изменилось
- Исправлены размеры border-radius у кнопок в темах mobile и intranet

#### Влияние на компоненты
- Патчи<br />`themes`


### [#473](https://github.com/core-ds/core-components/pull/473)

#### Что изменилось
- Исправлены темы mobile и intranet в компонентах FormControl, Select, CalendarInput

#### Влияние на компоненты
- Патчи<br />`themes`



## 37.3.0

<sup><time>25.01.2023</time></sup>

### [#467](https://github.com/core-ds/core-components/pull/467)

#### Что изменилось
- Исправлены типы у Table и TRow. Теперь Table может состоять только из TBody, а TRow из одной ячейки

#### Влияние на компоненты
- Патчи<br />`table`


### [#477](https://github.com/core-ds/core-components/pull/477)

#### Что изменилось
- Исправлен тип у свойства backgroundIcon

#### Влияние на компоненты
- Патчи<br />`icon-view`


### [#468](https://github.com/core-ds/core-components/pull/468)

#### Что изменилось
- Исправлен баг в textarea, при передаче пропа value не работала механика переполнения

#### Влияние на компоненты
- Патчи<br />`textarea`


### [#450](https://github.com/core-ds/core-components/pull/450)

#### Что изменилось
- Добавлен экспорт css-переменных из палитры bluetint в js файл

#### Влияние на компоненты
- Минорное<br />`vars`


### [#483](https://github.com/core-ds/core-components/pull/483)

#### Что изменилось
- Экспорт пропсов из индексного файла компонента

#### Влияние на компоненты
- Патчи<br />`textarea`



## 37.2.1

<sup><time>25.01.2023</time></sup>

### [#474](https://github.com/core-ds/core-components/pull/474)

#### Что изменилось
- Добавлен role="none" для элемента, который используется только для вычисления размера контейнера.
Рефакторинг тестов.<br />

#### Влияние на компоненты
- Патчи<br />`textarea`



## 37.2.0

<sup><time>20.01.2023</time></sup>

### [#463](https://github.com/core-ds/core-components/pull/463)

#### Что изменилось
- Исправлен отступ элементов в выпадающем списке

#### Влияние на компоненты
- Патчи<br />`select`


### [#456](https://github.com/core-ds/core-components/pull/456)

#### Что изменилось
- Добавлен новый пропс stateType, отвечающий за затемнение / осветление цвета фона

#### Влияние на компоненты
- Минорное<br />`custom-button`


### [#451](https://github.com/core-ds/core-components/pull/451)

#### Что изменилось
- Фокусная рамка таба больше не обрезается

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#453](https://github.com/core-ds/core-components/pull/453)

#### Что изменилось
- Отключен hover-эффект на touch устройствах

#### Влияние на компоненты
- Патчи<br />`button`


### [#459](https://github.com/core-ds/core-components/pull/459)

#### Что изменилось
- Исправлена ошибка 'Cannot read property 'clientHeight' of null' при `scrollable={true}`

#### Влияние на компоненты
- Патчи<br />`tabs`


### [#441](https://github.com/core-ds/core-components/pull/441)

#### Что изменилось
- Исправлено скрытие pips при ошибке или подсказке

#### Влияние на компоненты
- Патчи<br />`slider-input`


### [#443](https://github.com/core-ds/core-components/pull/443)

#### Что изменилось
- Исправлена ошибка с анимацией при множественных ререндерах

#### Влияние на компоненты
- Патчи<br />`calendar`



## 37.1.2

<sup><time>18.01.2023</time></sup>

### [#466](https://github.com/core-ds/core-components/pull/466)

#### Что изменилось
- Обновлена версия библиотеки react-canvas-pattern-lock до 1.0.2

#### Влияние на компоненты
- Патчи<br />`pattern-lock`



## 37.1.1

<sup><time>16.01.2023</time></sup>

### [af01ec20e](https://github.com/core-ds/core-components/commit/af01ec20ec987a524a73aa1f0686652979d383fc)

#### Что изменилось
- grid-row-gap и grid-column-gap заменены на margin

#### Влияние на компоненты
- Патчи<br />`pure-cell`


### [#449](https://github.com/core-ds/core-components/pull/449)

#### Что изменилось
- Убран правый отступ у контейнера аддонов, если нет стрелки действия

#### Влияние на компоненты
- Патчи<br />`picker-button`


### [#448](https://github.com/core-ds/core-components/pull/448)

#### Что изменилось
- Исправлен interactive режим

#### Влияние на компоненты
- Патчи<br />`steps`


CHANGELOG за 2022 год доступен [здесь](https://github.com/core-ds/core-components/blob/master/CHANGELOG.2022.md)
