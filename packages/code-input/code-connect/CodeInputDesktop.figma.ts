// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=777-44649
// source=packages/code-input/src/desktop/Component.desktop.tsx
// component=CodeInputDesktop
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

// Runtime Code Connect хранит короткие имена без #id и краевых пробелов.
// Не допускаем, чтобы отсутствующее свойство (ErrorHandle) включало часть поля.
function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') {
        throw new Error(`Не прочитано логическое свойство ${name}`);
    }
    return value;
}

function flag(owner: InstanceHandle, name: string) {
    const value = owner.getEnum(name, { False: false, True: true });
    if (value === undefined) throw new Error(`Неизвестное значение ${name}`);
    return value;
}
const compact = flag(instance, 'Compact');
const hasError = flag(instance, 'ErrorState');
const error = hasError
    ? booleanProperty(instance, 'ErrorMessage')
        ? instance.getString('✎ Error message')
        : true
    : undefined;
const digits = instance
    .findLayers((n) => n.type === 'INSTANCE' && n.name === 'CodeInputDigit', {
        traverseInstances: true,
    })
    .filter((n): n is InstanceHandle => n.type === 'INSTANCE');
if (!digits.length || (compact ? digits.length <= 6 : digits.length > 6))
    throw new Error('Число ячеек не соответствует Compact');
const disabledStates = digits.map((d) => flag(d, 'DisabledState'));
if (disabledStates.some(Boolean) && !disabledStates.every(Boolean))
    throw new Error('Смешанная блокировка ячеек не представлена в CodeInput');
const disabled = disabledStates.every(Boolean);
let emptySeen = false;
let initialValues = '';
for (const digit of digits) {
    const filled = flag(digit, 'FilledState');
    // ActiveState/ErrorState на ячейках — состояние ввода и ошибки компонента.
    flag(digit, 'ActiveState');
    flag(digit, 'ErrorState');
    if (!filled) {
        emptySeen = true;
        continue;
    }
    if (emptySeen)
        throw new Error('CodeInput не представляет пропуски между заполненными ячейками');
    const value = digit.getString('Digit');
    if (!/^\d$/.test(value)) throw new Error('В ячейке ожидается одна цифра');
    initialValues += value;
}

export default {
    id: 'core-code-input-desktop',
    imports: ["import { CodeInputDesktop } from '@alfalab/core-components/code-input/desktop';"],
    example: figma.code`<CodeInputDesktop fields={${digits.length}} ${disabled ? 'disabled' : ''}
        ${figma.helpers.react.renderProp('initialValues', initialValues || undefined)}
        ${figma.helpers.react.renderProp('error', error)} />`,
    metadata: { nestable: true },
};
