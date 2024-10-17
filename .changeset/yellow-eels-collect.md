---
'@alfalab/core-components-file-upload-item': major
'@alfalab/core-components-file-upload-item-v1': major
---

Добавлен новый компонент. Старый помечен как `deprecated`.

#### Обновление

Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До

```js
import { FileUploadItem } from '@alfalab/core-components/file-upload-item';
```

После

```js
import { FileUploadItemV1 } from '@alfalab/core-components/file-upload-item-v1';
```

Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.
