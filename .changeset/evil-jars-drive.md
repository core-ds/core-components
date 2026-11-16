---
'@alfalab/core-components-config': minor
'@alfalab/core-components': minor
---

- Добавлен новый `CoreConfigProvider`
- `CoreConfigContext` помечен как `deprecated`, в будущих релизах будет убран из публичного API. Используйте `CoreConfigProvider`
- Добавлен новый `DisabledContext`
- Добавлен новый `useDisabled(disabled: boolean | undefined): boolean`
- Добавлена возможность передавать кастомные компоненты
