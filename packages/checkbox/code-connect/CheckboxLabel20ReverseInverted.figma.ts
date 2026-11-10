// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-3309
// source=packages/checkbox/src/Component.tsx
// component=Checkbox
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const hint = instance.getEnum('Hint', { True: true, False: false });
const errorMessage = instance.getEnum('ErrorMessage', {
    False: false,
    True: true,
});
const disabledLabel = instance.getEnum('DisabledLabel', {
    False: false,
    True: true,
});
const compactLabel = instance.getEnum('CompactLabel', {
    False: false,
    True: true,
});
if (compactLabel) throw new Error('CompactLabel=True отсутствует в API текущего checkout');
const control = instance.findInstance('Checkbox');
if (control.type !== 'INSTANCE') throw new Error('Не найден вложенный Checkbox');
const props = control.executeTemplate().metadata?.props;
if (!props || typeof props.checked !== 'boolean' || typeof props.disabled !== 'boolean')
    throw new Error('Требуется Code Connect вложенного контрола');
const checked = props.checked;
const disabled = props.disabled;
const indeterminate = props.indeterminate === true;
if (disabledLabel !== disabled)
    throw new Error('Состояния DisabledLabel и DisabledState должны совпадать');
const label = instance.getString('\u270e Label');
const hintText = hint ? instance.getString('\u270e Hint message') : undefined;
const errorText = errorMessage ? instance.getString('✎ Error message') : undefined;

export default {
    id: 'core-checkbox-checkboxlabel20reverseinverted',
    imports: ["import { Checkbox } from '@alfalab/core-components/checkbox';"],
    example: figma.code`<Checkbox size={20} colors="inverted" position="after"
 ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}
 ${indeterminate ? 'indeterminate' : ''}

 ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('hint', errorText ? undefined : hintText)}
 ${figma.helpers.react.renderProp('error', errorText)}
/>`,
    metadata: { nestable: true, props: { checked, disabled, indeterminate } },
};
