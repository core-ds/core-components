---
'@alfalab/core-components-number-input': major
---

- Изменен тип коллбэка onChange, теперь в payload приходит только число
- Добавлены пропы min, max
- Удален prop allowSign. Теперь, чтобы появилась возможность вводить знак "-", достаточно указать min < 0
- Добавлен проп step.
- Удален StepperInput, используйте вместо него NumberInput с пропом step

# Миграция с предыдущей версии
- Заменить onChange с (event, {value, valueString}) на (event, {value}).
- allowSign был удален, знак "+" больше указать невозможно. "-" можно указать по-умолчанию.
Чтобы запретить указывать знак "-", достаточно передать проп min={0}
- <StepperInput .../> нужно заменить на <NumberInput step={1} .../>
