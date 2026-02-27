## Тулзы для модификации кода

### Использование

1. Установить к себе на проект:

```bash
$ yarn add --dev @alfalab/core-components-codemod
```

2. Запустить нужные трансформеры:

Какой-то один трансформер:

```bash
$ npx @alfalab/core-components-codemod --transformers=button-xs --glob='src/**/*.tsx'
```

Можно сразу несколько трансформеров:

```bash
$ npx @alfalab/core-components-codemod --transformers=button-xs,button-views --glob='src/**/*.tsx'
```

Сейчас замена компонентов доступна только для кода, написанного на `typescript`. Если кому-то нужно мигрировать с `js` - дайте знать, докрутим.

## Список доступных трансформеров

| Название              | Описание                                                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paragraph             | Меняет компонент `Paragraph` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                          |
| label                 | Меняет компонент `Label` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                              |
| heading               | Меняет компонент `Heading` из `arui-feather` на актульный компонент из `core-components`                                                                                                                                            |
| button-xs             | Изменяет размер кнопки с `xs` на `xxs`                                                                                                                                                                                              |
| button-views          | Меняет вид кнопки с view `filled` на `secondary`, `outlined` на `tertiary`, `transparent` на `secondary`, `primary` на `accent`                                                                                                     |
| replace-color-vars    | Заменяет цветовые токены при переходе на core-components v27 и выше:                                                                                                                                                                |
|                       | `--color-light-border-secondary-inverted`: `--color-light-border-underline`                                                                                                                                                         |
|                       | `--color-light-border-tertiary-inverted`: `--color-light-border-underline-inverted`                                                                                                                                                 |
|                       | `--color-light-graphic-neutral`: `--color-light-graphic-quaternary`                                                                                                                                                                 |
|                       | `--color-light-bg-neutral`: `--color-light-bg-quaternary`                                                                                                                                                                           |
|                       | `--color-dark-graphic-neutral`: `--color-dark-graphic-quaternary`                                                                                                                                                                   |
|                       | `--color-dark-bg-neutral`: `--color-dark-bg-quaternary`                                                                                                                                                                             |
|                       | `--color-static-bg-neutral-light`: `--color-static-bg-quaternary-light`                                                                                                                                                             |
|                       | `--color-static-bg-neutral-dark`: `--color-static-bg-quaternary-dark`                                                                                                                                                               |
| delete-dist           | Удаляет '/dist' в импортах отдельных пакетов. Может принимать дополнительный аргумент командной строки --packages, в котором указывается список компонентов, импорты которых нужно обработать, например (--packages="modal,button") |
| button-breakpoint-768 | Добавляет свойство breakpoint со значением 768 к респонсивной кнопке                                                                                                                                                                |
| button-views-45       | Меняет вид кнопки с view `tertiary` на `outlined`, `link` на `transparent`, `ghost` на `text`                                                                                                                                       |
| skeleton-blur         | Добавляет свойство `allowBackdropBlur` со значение true к компоненту Skeleton                                                                                                                                                       |
| status-soft           | Изменяет view компонента Status с `soft` на `muted-alt`                                                                                                                                                                             |
| input-type-card       | Заменяет атрибут type со значением 'card' на inputMode со значением 'numeric' в компоненте Input                                                                                                                                    |
| spinner               | Меняет `size` на `preset`                                                                                                                                                                                                           |

### 42 мажорный релиз

<table>
    <thead>
        <tr>
            <th>Название</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>42-autocomplete</td>
            <td>
                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, InputAutocomplete заменит на InputAutocompleteDesktop.<br />
                - Заменяет responsive точку входа на индекс. InputAutocompleteResponsive заменит на InputAutocomplete<br />
            </td>
        </tr>
        <tr>
            <td>42-calendar</td>
            <td>
                - Заменяет responsive точку входа на индекс. CalendarResponsive заменит на Calendar<br />
                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Calendar заменит на CalendarDesktop<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/calendar/shared.
            </td>
        </tr>
        <tr>
            <td>42-calendar-input</td>
            <td>
                - Заменяет responsive точку входа на индекс. CalendarInputResponsive заменит на CalendarInput<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/calendar-input/shared.
            </td>
        </tr>
        <tr>
            <td>42-confirmation</td>
            <td>
                - Заменяет responsive точку входа на индекс. ConfirmationResponsive заменит на Confirmation<br />
                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Confirmation заменит на ConfirmationDesktop<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/confirmation/shared.
            </td>
        </tr>
        <tr>
            <td>42-date-range-input</td>
            <td>
                 Заменяет responsive точку входа на индекс. DateRangeInputResponsive заменит на DateRangeInput<br />
            </td>
        </tr>
        <tr>
            <td>42-date-time-input</td>
            <td>
                Заменяет responsive точку входа на индекс. DateTimeInputResponsive заменит на DateTimeInput<br />
            </td>
        </tr>
        <tr>
            <td>42-modal</td>
            <td>
                - Заменяет responsive точку входа на индекс. ModalResponsive заменит на Modal<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/modal/shared.
            </td>
        </tr>
        <tr>
            <td>42-picker-button</td>
            <td>
                - Заменяет responsive точку входа на индекс. PickerButtonResponsive заменит на PickerButton<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/picker-button/shared.
            </td>
        </tr>
        <tr>
            <td>42-select</td>
            <td>
                - Заменяет responsive точку входа на индекс. SelectResponsive заменит на Select<br />
                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Select заменит на SelectDesktop<br />
                - Для SelectMobile создаст импорт из @alfalab/core-components/mobile
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/select/shared.
            </td>
        </tr>
        <tr>
            <td>42-side-panel</td>
            <td>
                - Заменяет responsive точку входа на индекс. SidePanelResponsive заменит на SidePanel<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/side-panel/shared.
            </td>
        </tr>
        <tr>
            <td>42-system-message</td>
            <td>
                Заменяет responsive точку входа на индекс. SystemMessageResponsive заменит на SystemMessage<br />
            </td>
        </tr>
        <tr>
            <td>42-tabs</td>
            <td>
                - Заменяет responsive точку входа на индекс. TabsResponsive заменит на Tabs<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/tabs/shared.
            </td>
        </tr>
        <tr>
            <td>42-tooltip</td>
            <td>
                - Заменяет responsive точку входа на индекс. TooltipResponsive заменит на Tooltip<br />
                - Если импортировалась десктопная версия компонента из индекса, то к пути импорта добавит /desktop, Tooltip заменит на TooltipDesktop<br />
                - Переиспользуемые между точками входа сущности выносит в @alfala/core-components/tooltip/shared.
            </td>
        </tr>
        <tr>
            <td>42-tag-click</td>
            <td>
                - <b>В теме click</b> принудительно устанавливает `view="filled"`
            </td>
        </tr>
        <tr>
            <td>42-tag-intranet</td>
            <td>
                - <b>В теме intranet</b> Принудительно устанавливает `view="filled"` и `shape="rectangular"`
            </td>
        </tr>
        <tr>
            <td>42-tag-mobile</td>
            <td>
                - <b>В теме mobile</b> Принудительно устанавливает `view="filled"` и `shape="rectangular"`
            </td>
        </tr>
        <tr>
            <td>42-button</td>
            <td rowspan="11">
                Кодмоды, связанные с появлением responsive, desktop и mobile версий компонентов.
                Заменяют импорт с index на desktop (Например, <code>import { Button } from '@alfalab/core-components/button'</code> заменит на
                <code>import { ButtonDesktop } from '@alfalab/core-components/button/desktop'</code>).
            </td>
        </tr>
        <tr><td>42-checkbox-group</td></tr>
        <tr><td>42-code-input</td></tr>
        <tr><td>42-filter-tag</td></tr>
        <tr><td>42-form-control</td></tr>
        <tr><td>42-input</td></tr>
        <tr><td>42-plate</td></tr>
        <tr><td>42-radio-group</td></tr>
        <tr><td>42-tag</td></tr>
        <tr><td>42-toast</td></tr>
        <tr><td>42-toast-plate</td></tr>
    </tbody>
</table>

Для запуска всех трансформеров можно воспользоваться командой

```
npx @alfalab/core-components-codemod --transformers=42-autocomplete,42-button,42-calendar,42-calendar-input,42-checkbox-group,42-code-input,42-confirmation,42-date-range-input,42-date-time-input,42-filter-tag,42-form-control,42-input,42-modal,42-picker-button,42-plate,42-radio-group,42-select,42-side-panel,42-system-message,42-tabs,42-tag,42-toast,42-toast-plate,42-tooltip --glob='src/**/*.tsx'
```

### 50 мажорный релиз

<table>
    <thead>
        <tr>
            <th>Название</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>50-replace-transparent-color-vars</td>
            <td>
                Заменяет цветовые токены из палитры <code>colors-transparent.css</code> <br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-replace-transparent-color-vars --glob='src/**/*.css'</code>
            </td>
        </tr>
        <tr>
            <td>50-progress-bar</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-progress-bar --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-modal</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-modal --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-segmented-control</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-segmented-control --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-radio</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-radio --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-form-control</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-form-control --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-checkbox</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-checkbox --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-indicator</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-indicator --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-slider</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-slider --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-action-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-action-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-filter-tag</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-filter-tag --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-gap</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-gap --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-circular-progress-bar</td>
            <td>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-circular-progress-bar --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-attach</td>
            <td>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-attach --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-custom-picker-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-custom-picker-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-icon-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-icon-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-picker-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-picker-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-custom-button</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-custom-button --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-amount-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-amount-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-calendar-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-calendar-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-date-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-date-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-date-range-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-date-range-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-date-time-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-date-time-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-international-phone-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-international-phone-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-intl-phone-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-intl-phone-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-masked-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-masked-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-number-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-number-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-password-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-password-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-phone-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-phone-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-slider-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-slider-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-time-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-time-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-universal-date-input</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-universal-date-input --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-select</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-select --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-tag</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-tag --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-underlay</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-underlay --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-sortable-list</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-sortable-list --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-input-autocomplete</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-input-autocomplete --glob='src/**/*.tsx'</code>
            </td>
        </tr>
        <tr>
            <td>50-select-with-tags</td>
            <td>
                - Заменяет буквенные размеры на числовые<br/><br/>
                <b>Запуск</b><br/>
                <code>npx @alfalab/core-components-codemod --transformers=50-select-with-tags --glob='src/**/*.tsx'</code>
            </td>
        </tr>
    </tbody>

</table>

Для запуска всех (кроме 50-replace-transparent-color-vars) трансформеров можно воспользоваться командой

```
npx @alfalab/core-components-codemod --transformers=50-progress-bar,50-button,50-modal,50-segmented-control,50-radio,50-form-control,50-checkbox,50-indicator,50-slider,50-action-button,50-filter-tag,50-gap,50-circular-progress-bar,50-attach,50-custom-picker-button,50-icon-button,50-picker-button,50-custom-button,50-input,50-amount-input,50-calendar-input,50-date-input,50-date-range-input,50-date-time-input,50-international-phone-input,50-intl-phone-input,50-masked-input,50-number-input,50-password-input,50-phone-input,50-slider-input,50-time-input,50-universal-date-input,50-select,50-tag,50-underlay,50-sortable-list,50-input-autocomplete,50-select-with-tags --glob='src/**/*.tsx'
```

## Разработка

Под капотом - [jscodeshift](https://github.com/facebook/jscodeshift).

### Запуск тестов

```bash
yarn workspace @alfalab/core-components-codemod test
```
