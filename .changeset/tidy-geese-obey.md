---
'@alfalab/core-components-pass-code': major
'@alfalab/core-components-pass-code-v1': major
'@alfalab/core-components-pattern-lock': major
'@alfalab/core-components-pattern-lock-v1': major
'@alfalab/core-components-gap': patch
'@alfalab/core-components-vars': patch
---

Редизайн компонентов PassCode и PatternLock
- Внесены изменения в адаптивность
- Удалены пропсы для вывода кастомных сообщений и ошибок
Эти исправления уменьшили габариты компонентов, что позволит упростить работу с их размещением на странице

## Обновление
Для упрощенного перехода между версиями библиотеки, после обновления вам необходимо исправить импорты.

До
```js
import { PassCode } from '@alfalab/core-components/pass-code';
import { PatternLock } from '@alfalab/core-components/pattern-lock';
```
После
```js
import { PassCodeV1 } from '@alfalab/core-components/pass-code-v1';
import { PatternLockV1 } from '@alfalab/core-components/pattern-lock-v1';
```
Таким образом, в вашем приложении продолжат работу старые версии компонентов.
В дальнейшем поддержка `v1` версий будет прекращена.
