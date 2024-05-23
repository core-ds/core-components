---
"@alfalab/core-components-base-modal": patch
"@alfalab/core-components-notification-manager": patch
"@alfalab/core-components-notification": patch
"@alfalab/core-components-popover": patch
"@alfalab/core-components-stack": patch
"@alfalab/core-components-toast": patch
---

При взаимодействии нескольких компонентов-модулей, которые включают в себя core-components, React Context создает несколько экземпляров, что приводит к потере z-index. Для решения этой проблемы контекст компонента `Stack` вынесен в глобальную библиотеку.
