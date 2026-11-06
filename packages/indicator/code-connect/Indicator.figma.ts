// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=387-2751
// source=packages/indicator/src/index.ts
// component=Indicator
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
    '8': 8,
    '16': 16,
    '20': 20,
    '24': 24,
    '32': 32,
    '40': 40,
});
const view = instance.getEnum('View', {
    Red: 'red',
    Gray: 'grey',
    White: 'white',
});
const border = instance.getEnum('Border', { False: false, True: true });
if (!size || !view || border === undefined) throw new Error('Неизвестный вариант Indicator');
const value = size === 8 ? '' : instance.getString('✎ Value').trim();
const numeric =
    value !== '' && /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0;
const overflow = value === '99+';
if (value && !numeric && !overflow)
    throw new Error(
        'Indicator требует положительное целое число; исходное значение не восстановлено',
    );
// 99+ не позволяет восстановить число: исходный count передаётся явно.
export default {
    id: 'core-indicator',
    imports: ["import { Indicator } from '@alfalab/core-components/indicator';"],
    example: figma.code`${overflow ? 'function Example({ count }: { count: number }) { if (!Number.isSafeInteger(count) || count <= 99) throw new Error("count должен быть целым числом больше 99"); return (' : ''}<Indicator size={${size}} view="${view}" border={${border ? 'true' : 'false'}} ${overflow ? 'value={count}' : numeric ? figma.code`value={${Number(value)}}` : ''} />${overflow ? '); }' : ''}`,
    metadata: { nestable: false },
};
