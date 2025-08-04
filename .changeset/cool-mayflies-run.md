---
'@alfalab/core-components': major
---

Обновлена сборка.

Улучшение tree-shaking.

Замены зависимости:

```diff
- '@alfalab/core-config'
+ '@alfalab/core-components-config'

- '@alfalab/stack-context'
+ '@alfalab/core-components-stack-context'
```

При обновлении сначала необходимо удалить старые зависимости:

```sh
yarn remove @alfalab/core-config @alfalab/stack-context
```

и затем установить новые:

```sh
yarn add @alfalab/core-components@latest @alfalab/core-components-config @alfalab/core-components-stack-context
```

В коде необходимо заменить:

```diff
- import {} from '@alfalab/core-config';
+ import {} from '@alfalab/core-components-config';

- import {} from '@alfalab/stack-context';
+ import {} from '@alfalab/core-components-stack-context';

```
