---
'@alfalab/core-components-input-autocomplete': major
---

- Мобильный компонент приведен в соответствие с десктопным, теперь оба компонента имеют одинаковый список пропсов, за некоторым исключением.
- Удалены пропы onFilter, filter, onClearFilter и др, которые раньше использовались только в мобильном компоненте

## Миграция с предыдущей версии
Из мобильного компонента удалено дополнительное состояние для фильтра,
соответственно были удалены пропы onFilter, filter, onClearFilter.
Теперь при открытии шторки в инпут будет попадать состояние, переданное через проп value, как и у десктопного компонента,
а при вводе значения в инпут будет вызываться коллбэк onInput. При нажатии кнопок "Отмена" и "Продолжить" также будет вызываться onInput.
После апдейта нужно заменить
```jsx
<InputAutocompeteMobile onFilter={onFilter} filter={filter} value={value} />
```
на
```jsx
<InputAutocompeteMobile onInput={onFilter} value={value} />
```

Примеры можете посмотреть в нашем [сторибуке](https://core-ds.github.io/core-components/master/?path=/docs/inputautocomplete--docs)
