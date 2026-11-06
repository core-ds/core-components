// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=34265-42887
// source=packages/radio/src/Component.tsx
// component=Radio
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const hint = instance.getEnum('Hint', { True: true, False: false });
const disabledLabel = instance.getEnum('DisabledLabel', {
    False: false,
    True: true,
});
const compactLabel = instance.getEnum('CompactLabel', {
    False: false,
    True: true,
});
if (compactLabel) throw new Error('CompactLabel=True отсутствует в API текущего checkout');
const control = instance.findInstance('Radio');
if (control.type !== 'INSTANCE') throw new Error('Не найден вложенный Radio');
const props = control.executeTemplate().metadata?.props;
if (!props || typeof props.checked !== 'boolean' || typeof props.disabled !== 'boolean')
    throw new Error('Требуется Code Connect вложенного контрола');
const checked = props.checked;
const disabled = props.disabled;
if (disabledLabel !== disabled)
    throw new Error('Состояния DisabledLabel и DisabledState должны совпадать');
const label = instance.getString('\u270e Label');
const hintText = hint ? instance.getString('\u270e Hint Message') : undefined;

export default {
    id: 'core-radio-radiolabel20',
    imports: ["import { Radio } from '@alfalab/core-components/radio';"],
    example: figma.code`<Radio size={20} colors="default"
 ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}


 ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('hint', hintText)}

/>`,
    metadata: { nestable: true, props: { checked, disabled } },
};
