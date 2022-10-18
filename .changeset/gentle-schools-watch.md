---
'@alfalab/core-components-base-modal': patch
'@alfalab/core-components-portal': minor
---

- В portal добавлен проп immediateMount, с помощью которого можно мгновенно отрендерить дочерние элементы через портал.
- В base-modal исправлена проблема с доступом к ref-ам контента, который рендерился через portal.
