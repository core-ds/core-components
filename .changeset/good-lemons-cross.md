---
'@alfalab/core-components-universal-modal': patch
---

##### UniversalModal

- Расчёт `max-height` для режима `hugContent` перенесён из inline-стилей в CSS
- Исправлено определение нижнего и верхнего отступов для подкомпонента `Content`. Предыдущая реализация приводила к визуальным артефактам при открытии в режиме `hugContent`
- Удалён проп `size` из `ContentDesktopProps`, который не использовался в коде
