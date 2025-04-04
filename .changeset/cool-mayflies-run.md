---
'@balafla/core-components': major
---

Обновлена сборка.

Улучшение tree-shaking.

Замены зависимости:

```diff
- '@alfalab/core-config'
+ '@balafla/core-components-config'

- '@alfalab/stack-context'
+ '@balafla/core-components-stack-context'
```

При обновлении сначала необходимо удалить старые зависимости:

```sh
yarn remove @alfalab/core-config @alfalab/stack-context
```

и затем установить новые:

```sh
yarn add @balafla/core-components@latest @balafla/core-components-config @balafla/core-components-stack-context
```

В коде необходимо заменить:

```diff
- import {} from '@alfalab/core-config';
+ import {} from '@balafla/core-components-config';

- import {} from '@alfalab/stack-context';
+ import {} from '@balafla/core-components-stack-context';

```
