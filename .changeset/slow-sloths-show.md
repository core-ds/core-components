---
'@alfalab/core-components': patch
'@alfalab/core-components-themes': patch
---

##### Themes

- Из темизации `click` и `site` для `form-control` удалена переменная `--form-control-mobile-sub-paddings` которая переопределяла отступы для `outer label`, `hint`, `error`. Переопределяемое значение теперь совпадает с текущим значением компонента.
