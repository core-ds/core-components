---
'@alfalab/core-components': minor
'@alfalab/core-components-toast-plate': minor
---

##### ToastPlate

- Добавлен пропс `closerProps`, с помощью которого можно управлять параметрами кнопки "закрыть" (как новыми так и старыми)

Значения по умолчанию

```
closerProps = {
    hasCloser: false,
    closerWrapperClassName: undefined,
    closerClassName: undefined,
    divider: true,
    view: 'primary'
}
```

Пропсы `hasCloser`, `closerWrapperClassName`, `closerClassName` - отмечены как `deprecated` и будут удалены в будущих версиях. Используйте их в составе `closerProps`
