---
'@alfalab/core-components-select-with-tags': minor
'@alfalab/core-components-select': minor
'@alfalab/core-components-checkbox': minor
'@alfalab/core-components': minor
---

##### SelectWithTags

- Добавлена поддержка динамического позиционирования чекмарков в зависимости от `view` (desktop/mobile)
- Для desktop по умолчанию используются чекбоксы слева (`checkmarkPosition='before'`)
- Для mobile по умолчанию используются иконки справа (`checkmarkPosition='after'`)
- Возможность переопределить позицию через проп `optionProps.checkmarkPosition`

##### Select

- Убран избыточный проп `hasSelectionMarker` из типов и компонентов
- Точка-маркер выбора теперь рендерится автоматически для дефолтного Option при `checkmarkPosition='before'` и single-select
- Оптимизирована логика рендеринга чекбоксов, иконок и точки-маркера в компоненте `OptionBase`
- Добавлен контейнер `.beforeMarker` для правильного позиционирования элементов при `checkmarkPosition='before'`

##### Checkbox

- Исправлена логика скрытия визуального чекбокса при `showCheckmark=false`
- Компонент теперь корректно рендерит `null` вместо визуального элемента когда чекмарк скрыт
- Оптимизированы CSS-стили для `.checkmarkAfter` (сокращённая запись margin)
