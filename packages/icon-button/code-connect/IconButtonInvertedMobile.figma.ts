// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=96969-28439
// source=packages/icon-button/src/mobile/Component.mobile.tsx
// component=IconButtonMobile
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
    '24': 24,
    '32': 32,
    '40': 40,
    '48': 48,
    '56': 56,
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
    id: 'core-icon-button-iconbuttoninvertedmobile',
    imports: ["import { IconButtonMobile } from '@alfalab/core-components/icon-button/mobile';"],
    example: figma.code`<IconButtonMobile size={${size}} view="${view}" colors="inverted"
 ${transparentBg ? 'transparentBg' : ''} ${loading ? 'loading' : ''} icon={${icon.example}} />`,
    metadata: { nestable: true },
};
