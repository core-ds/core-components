---
'@alfalab/core-components-steps': patch
'@alfalab/core-components': patch
---

##### Steps

- Исправлена визуализация статусных индикаторов шага: для состояний `critical error`, `error`, `warning`, `waiting` и `positive` теперь используется `StatusBadge`.
- Сохранена обратная совместимость для `checkIsStepCustom`: кастомный индикатор по-прежнему принимает старые пропсы `Badge`.
