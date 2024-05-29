---
"@alfalab/core-components-base-modal": major
"@alfalab/core-components-notification-manager": major
"@alfalab/core-components-notification": major
"@alfalab/core-components-popover": major
"@alfalab/core-components-stack": major
"@alfalab/core-components-toast": major
---

При взаимодействии нескольких компонентов-модулей, которые включают в себя core-components, React Context создает несколько экземпляров, что приводит к потере z-index. Для решения этой проблемы контекст компонента `Stack` вынесен в глобальную библиотеку.
