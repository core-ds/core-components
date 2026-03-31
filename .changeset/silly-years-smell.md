---
'@alfalab/core-components': minor
'@alfalab/core-components-toast-plate': minor
---

##### ToastPlate

- Добавлен пропс `closer`, с помощью которого можно управлять параметрами кнопки "закрыть" (как новыми так и старыми)

Значения по умолчанию

```
closer = {
    hasCloser: false,
    closerWrapperClassName: undefined,
    closerClassName: undefined,
    divider: true,
    view: 'primary'
}
```

Пропсы `hasCloser`, `closerWrapperClassName`, `closerClassName` - отмечены как `deprecated` и будут удалены в будущих версиях. Используйет из в составе `closer`
