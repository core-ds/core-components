---
'@alfalab/core-components': major
---

-   Обновлена сборка.
-   Улучшение tree-shaking.
-   Замены зависимости `@alfalab/core-config` на `@alfalab/core-components-config` и `@alfalab/stack-context` на `@alfalab/core-components-stack-context` соответственно.

При обновлении сначала необходимо удалить старые зависимости:

```sh
yarn remove @alfalab/core-config @alfalab/stack-context
```

и затем установить новые:

```sh
yarn add @alfalab/core-components@latest @alfalab/core-components-config @alfalab/core-components-stack-context
```

В коде проекта необходимо заменить:

```diff
- import {} from '@alfalab/core-config';
+ import {} from '@alfalab/core-components-config';

- import {} from '@alfalab/stack-context';
+ import {} from '@alfalab/core-components-stack-context';

```
