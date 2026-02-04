---
'@alfalab/core-components': major
'@alfalab/core-components-accordion': major
'@alfalab/core-components-bottom-sheet': major
'@alfalab/core-components-calendar': major
'@alfalab/core-components-calendar-input': major
'@alfalab/core-components-calendar-range': major
'@alfalab/core-components-calendar-with-skeleton': major
'@alfalab/core-components-chart': major
'@alfalab/core-components-circular-progress-bar': major
'@alfalab/core-components-comment': major
'@alfalab/core-components-confirmation': major
'@alfalab/core-components-custom-picker-button': major
'@alfalab/core-components-date-range-input': major
'@alfalab/core-components-date-time-input': major
'@alfalab/core-components-file-upload-item': major
'@alfalab/core-components-gallery': major
'@alfalab/core-components-input-autocomplete': major
'@alfalab/core-components-international-phone-input': major
'@alfalab/core-components-intl-phone-input': major
'@alfalab/core-components-list': major
'@alfalab/core-components-list-header': major
'@alfalab/core-components-markdown': major
'@alfalab/core-components-modal': major
'@alfalab/core-components-navigation-bar': major
'@alfalab/core-components-navigation-bar-private': major
'@alfalab/core-components-picker-button': major
'@alfalab/core-components-popup-sheet': major
'@alfalab/core-components-product-cover': major
'@alfalab/core-components-pure-cell': major
'@alfalab/core-components-select': major
'@alfalab/core-components-select-with-tags': major
'@alfalab/core-components-side-panel': major
'@alfalab/core-components-stepped-progress-bar': major
'@alfalab/core-components-tab-bar': major
'@alfalab/core-components-table': major
'@alfalab/core-components-tabs': major
'@alfalab/core-components-tooltip': major
'@alfalab/core-components-typography': major
'@alfalab/core-components-universal-date-input': major
'@alfalab/core-components-universal-modal': major
---

##### Typography.{Text,Title,TitleMobile}

- Проп `font` помечен как `deprecated`
- Проп `font`, значения которого включает в себя `"alfasans"`, не имеет эффекта для шрифта `Alfa Interface Sans`, но для него сохраняется обратная совместимость по следующему принципу:
    - для компонента `Text`:
        1. для значения `font="alfasans"` соотвествует системный шрифт
    - для компонентов `Title` и `TitleMobile`:
        1. для значения `font="alfasans"` соотвествует шрифт `Styrene`
        2. для значения `font={ font: 'alfasans', systemCompat: boolean }` в зависимости от значения параметра `systemCompat`: `true` - системный шрифт, `false` - шрифт `Styrene`
- Для использования компонентов `Typography.{Text,Title,TitleMobile}` со шрифтом `Alfa Interface Sans` необходимо установить соответствующий пакет (пакеты)
