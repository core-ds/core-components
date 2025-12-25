---
'@alfalab/core-components': minor
'@alfalab/core-components-code-input': minor
'@alfalab/core-components-confirmation': minor
---

##### BaseCodeInput

- Добавлен проп `restrictFocus` для включения последовательного ввода:
    - при клике на ячейку правее первой пустой — фокус остается на первой
    - фокус разрешается только на уже заполненные ячейки и первую пустую ячейку

- Добавлено поведение автоматического фокуса на первый инпут при клике на любое пустое поле

##### Confirmation

- Добавлена поддержка пропа `restrictFocus` для использования в `CodeInput`
