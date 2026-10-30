// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=52544-32663
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
    id: 'core-radio-radiolabel24inverted',
    imports: ["import { Radio } from '@alfalab/core-components/radio';"],
    example: figma.code`<Radio size={24} colors="inverted"
 ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}


 ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('hint', hintText)}

/>`,
    metadata: { nestable: true, props: { checked, disabled } },
};
