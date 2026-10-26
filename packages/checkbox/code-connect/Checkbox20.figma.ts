// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=34265-42058
// source=packages/checkbox/src/Component.tsx
// component=Checkbox
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const selectedState = instance.getEnum('SelectedState', {
    False: false,
    True: true,
});
const disabledState = instance.getEnum('DisabledState', {
    False: false,
    True: true,
});
const indeterminateState = instance.getEnum('IndeterminateState', {
    False: false,
    True: true,
});
if (indeterminateState && !selectedState)
    throw new Error('IndeterminateState требует SelectedState=True в Figma');
const checked = selectedState && !indeterminateState;
const indeterminate = indeterminateState;

export default {
    id: 'core-checkbox-checkbox20',
    imports: ["import { Checkbox } from '@alfalab/core-components/checkbox';"],
    example: figma.code`<Checkbox size={20} colors="default" ${checked ? 'checked' : ''} ${disabledState ? 'disabled' : ''} ${indeterminate ? 'indeterminate' : ''} />`,
    metadata: {
        nestable: true,
        props: { checked, disabled: disabledState, indeterminate },
    },
};
