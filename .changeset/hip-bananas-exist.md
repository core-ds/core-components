---
'@alfalab/core-components-popover': minor
---

* Исправлена работа позиции `Popover`
* Произведена миграция на [`floating-ui`](https://floating-ui.com/docs/react)
* Проп `anchorElement` теперь принимает в том числе `React.RefObject<HTMLElement>`, что является **предпочтительным способом** передачи ссылки на элемент, относительного которого позиционируется `Popover`
* Проп `update` помечен как `deprecated`. Теперь отсутствует необходимость его использования
