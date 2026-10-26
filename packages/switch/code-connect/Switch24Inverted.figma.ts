// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=39519-16312
// source=packages/switch/src/Component.tsx
// component=Switch
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
    id: 'core-switch-switch24inverted',
    imports: ["import { Switch } from '@alfalab/core-components/switch';"],
    example: figma.code`<Switch colors="inverted" ${checked ? 'checked' : ''} ${disabledState ? 'disabled' : ''} />`,
    metadata: { nestable: true, props: { checked, disabled: disabledState } },
};
