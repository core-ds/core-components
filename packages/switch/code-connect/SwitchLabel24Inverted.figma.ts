// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39519-16325
// source=packages/switch/src/Component.tsx
// component=Switch
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const hint = instance.getEnum('Hint', { True: true, False: false });
// Имя слоя может меняться; выбираем именно подключённый Switch_24_Inverted.
const control = instance.findConnectedInstance('core-switch-switch24inverted');
if (!control || control.type !== 'INSTANCE')
    throw new Error('Не найден подключённый Switch_24_Inverted');
const props = control.executeTemplate().metadata?.props;
if (!props || typeof props.checked !== 'boolean' || typeof props.disabled !== 'boolean')
    throw new Error('Требуется Code Connect вложенного контрола');
const checked = props.checked;
const disabled = props.disabled;
const label = instance.getString('\u270e Label');
const hintText = hint ? instance.getString('\u270e Hint Message') : undefined;

export default {
    id: 'core-switch-switchlabel24inverted',
    imports: ["import { Switch } from '@alfalab/core-components/switch';"],
    example: figma.code`<Switch colors="inverted"
 ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}


 ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('hint', hintText)}

/>`,
    metadata: { nestable: true, props: { checked, disabled } },
};
