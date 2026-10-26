// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=603-59968
// source=packages/icon-button/src/desktop/Component.desktop.tsx
// component=IconButtonDesktop
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
    '56': 56,
    '48': 48,
    '40': 40,
    '32': 32,
    '24': 24,
});
const view = instance.getEnum('View', {
    Primary: 'primary',
    Secondary: 'secondary',
    Tertiary: 'tertiary',
    Negative: 'negative',
});
const transparentBg = instance.getEnum('TransparentBg', {
    False: false,
    True: true,
});
const child = instance.findInstance('Icon');
if (child.type !== 'INSTANCE') throw new Error('Не найден Icon');
const icon = child.executeTemplate();
const loading = icon.metadata?.props?.loading === true;

export default {
    id: 'core-icon-button-iconbuttondesktop',
    imports: ["import { IconButtonDesktop } from '@alfalab/core-components/icon-button/desktop';"],
    example: figma.code`<IconButtonDesktop size={${size}} view="${view}"
 ${transparentBg ? 'transparentBg' : ''} ${loading ? 'loading' : ''} icon={${icon.example}} />`,
    metadata: { nestable: true },
};
