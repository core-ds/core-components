---
'@alfalab/core-components-select': major
---
# BREAKING CHANGE

### Переработана работа компонента SelectMobile с подтверждением.

Теперь для использования выбора опций с подтверждением необходимо использовать хук useSelectWithApply, также как и в десктопной версии компонента.

Пример использования:
```
<SelectMobile
    {...props}
    {...useSelectWithApply({
        options,
        selected,
        onChange,
    })}
/>
```
