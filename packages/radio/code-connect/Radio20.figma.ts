// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=34265-42872
// source=packages/radio/src/Component.tsx
// component=Radio
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const selectedState = instance.getEnum('SelectedState', {
    True: true,
    False: false,
});
const disabledState = instance.getEnum('DisabledState', {
    False: false,
    True: true,
});
const checked = selectedState;

export default {
    id: 'core-radio-radio20',
    imports: ["import { Radio } from '@alfalab/core-components/radio';"],
    example: figma.code`<Radio size={20} colors="default" ${checked ? 'checked' : ''} ${disabledState ? 'disabled' : ''} />`,
    metadata: { nestable: true, props: { checked, disabled: disabledState } },
};
