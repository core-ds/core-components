---
'@alfalab/core-components-typography': major
'@alfalab/core-components-accordion': patch
'@alfalab/core-components-circular-progress-bar': patch
'@alfalab/core-components-confirmation': patch
'@alfalab/core-components-list': patch
'@alfalab/core-components-list-header': patch
'@alfalab/core-components-modal': patch
'@alfalab/core-components-navigation-bar-private': patch
'@alfalab/core-components-product-cover': patch
'@alfalab/core-components-pure-cell': patch
'@alfalab/core-components-side-panel': patch
'@alfalab/core-components-tab-bar': patch
---

Рефакторинг компонента Typography:
- Компоненты TitleDesktop и TitleMobile отделены от Title (проп device остался только в Title)
- Компонент Title помечен как deprecated в пользу TitleDesktop и TitleMobile
- В корневой импорт, к текущему компаунду, добавлены атомарные всех компонентов (TitleDesktop, TitleMobile, TitleResponsive, Text)
- Вынесены коммон-переменные и типы для переиспользования в компонентах, тестах, стори
- Более четкое разделение desktop/mobile в стилях
- Названия стилей дополнены постфиксом
- Названия стилей переведены в camelCase / snake_case
- Фикс в типах: пропс defaultMatchMediaValue перемещён в компонент TitleResponsive
- В package.json добавлено sideEffects: false
