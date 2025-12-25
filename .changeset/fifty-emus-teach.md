---
'@alfalab/core-components-base-modal': minor
'@alfalab/core-components-bottom-sheet': minor
'@alfalab/core-components': minor
---

##### BaseModal

- Добавили блокировку фонового скролла через `react-remove-scroll` для `BaseModal` (и компонентов на его базе).
- Добавили проп `scrollLock?: boolean` для управления блокировкой скролла (по умолчанию выключен).
- Пропсы `disableBlockingScroll` и `iOSLock` помечены как deprecated (оставлены для обратной совместимости).

##### BottomSheet

- Подключили блокировку фонового скролла (через `BaseModal` / `react-remove-scroll`).
- Добавили проп `scrollLock?: boolean` (по умолчанию включён), `disableBlockingScroll` и `iOSLock` помечены как deprecated.
