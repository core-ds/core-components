// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=145560-3451
// source=packages/switch/src/Component.tsx
// component=Switch
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const hint = instance.getEnum('Hint', { False: false, True: true });
const control = instance.findInstance('Switch_24_Inverted');
if (control.type !== 'INSTANCE') throw new Error('Не найден вложенный Switch');
const props = control.executeTemplate().metadata?.props;
if (!props || typeof props.checked !== 'boolean' || typeof props.disabled !== 'boolean')
    throw new Error('Требуется Code Connect вложенного контрола');
const checked = props.checked;
const disabled = props.disabled;
const label = instance.getString('\u270e Label');
const hintText = hint ? instance.getString('\u270e Hint Message') : undefined;

export default {
    id: 'core-switch-switchlabel24reverseinverted',
    imports: ["import { Switch } from '@alfalab/core-components/switch';"],
    example: figma.code`<Switch colors="inverted" reversed
 ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}


 ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('hint', hintText)}

/>`,
    metadata: { nestable: true, props: { checked, disabled } },
};
