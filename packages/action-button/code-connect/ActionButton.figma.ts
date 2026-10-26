// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=603-82978
// source=packages/action-button/src/Component.tsx
// component=ActionButton
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const view = instance.getEnum('View', {
    Primary: 'primary',
    Secondary: 'secondary',
});
const inverted = instance.getEnum('Inverted', { False: false, True: true });
const isStatic = instance.getEnum('Static', { False: false, True: true });
const disabledState = instance.getEnum('DisabledState', {
    True: true,
    False: false,
});
if (inverted && isStatic)
    throw new Error('ActionButton: Static=True вместе с Inverted=True не поддерживается colors');
const colors = isStatic ? 'static' : inverted ? 'inverted' : 'default';
const icon = instance.getInstanceSwap('Icon 24');
if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена иконка ActionButton');
const iconCode = icon.executeTemplate().example;
const label = instance.getString('✎ Label');

export default {
    id: 'core-action-button-actionbutton',
    imports: ["import { ActionButton } from '@alfalab/core-components/action-button';"],
    example: figma.code`<ActionButton view="${view}" colors="${colors}" ${disabledState ? 'disabled' : ''} icon={${iconCode}}>{${JSON.stringify(label)}}</ActionButton>`,
    metadata: { nestable: true },
};
