---
'@alfalab/core-components-spinner': major
'@alfalab/core-components-action-button': patch
'@alfalab/core-components-button': patch
'@alfalab/core-components-confirmation': patch
'@alfalab/core-components-custom-button': patch
'@alfalab/core-components-file-upload-item': patch
'@alfalab/core-components-shared': patch
---

Крупное обновление Спиннера

* Обновленный вид спиннера.
* Добавлены новые пропсы для тонкой настройки внешнего вида:
    - `size` - теперь отвечает за размер кольца спиннера;
    - `lineWidth` - толщина линии спиннера;
    - `style` - позволяет регулировать отступы, цвет и т.п.
* Добавлен преднастроенный вариант спиннера `SpinnerPreset`.
* Добавлен `codemod` для бесшовной миграции со старого `Spinner` на `SpinnerPreset`:
    ```bash
    npx @alfalab/core-components-codemod --transformers=spinner --glob='src/**/*.tsx'
    ```
    | Внимание |
    |---|
    | `codemod` может не работать в случаях использования [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) в коде. |
