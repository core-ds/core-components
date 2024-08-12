---
'@alfalab/core-components-spinner': major
'@alfalab/core-components-shared': minor
---

Крупное обновление Спиннера

* Обновленный вид спиннера.
* Добавлены новые пропсы для тонкой настройки внешнего вида:
    - `preset` - преднастроенный вариант спиннера;
    - `size` - теперь отвечает за размер кольца спиннера;
    - `lineWidth` - толщина линии спиннера;
    - `style` - позволяет регулировать отступы, цвет и т.п.
* Добавлен `codemod` для бесшовной миграции `Spinner`:
    ```bash
    npx @alfalab/core-components-codemod --transformers=spinner --glob='src/**/*.tsx'
    ```
    | Внимание |
    |---|
    | `codemod` может не работать в случаях использования [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) в коде. |
