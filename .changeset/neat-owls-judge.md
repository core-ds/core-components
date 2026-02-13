---
'@alfalab/core-components-select-with-tags': minor
'@alfalab/core-components-select': minor
'@alfalab/core-components-custom-picker-button': minor
'@alfalab/core-components': minor
---

##### Select

- Добавлен проп `checkmarkPosition` для управления позицией чекмарка относительно контента ('before' | 'after')
- Компонент `BaseCheckmark` теперь поддерживает проп `content` для передачи контента опции
- Оптимизирована логика рендеринга чекбоксов и иконок в компонентах `OptionBase` и `BaseOption`

##### SelectWithTags

- Добавлена поддержка динамического позиционирования чекмарков в зависимости от `view` (desktop/mobile)
- Для desktop по умолчанию используется `checkmarkPosition='before'`, для mobile - `checkmarkPosition='after'`
- Возможность переопределить позицию через проп `optionProps.checkmarkPosition`

##### CustomPickerButton

- Добавлен хелпер `disableCheckmarks` для автоматического отключения чекмарков у всех опций
