---
'@alfalab/core-components-select': major
---

### Переработана работа компонента SelectMobile с подтверждением.

Теперь для использования выбора опций с подтверждением необходимо использовать внешнее состояние, также как и в десктопной версии компонента.

Пример использования:
```
    const [selected, setSelected] = React.useState([]);

    const handleChange = ({ selectedMultiple }) => {
        setSelected(selectedMultiple.map((option) => option.key));
    };

    <SelectMobile
        selected={selected}
        onChange={handleChange}
        {...otherProps}
    />
```
