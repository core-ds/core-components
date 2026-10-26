// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-50695
// source=packages/button/src/desktop/Component.desktop.tsx
// component=ButtonDesktop
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

function childText(name: string, owner: InstanceHandle = instance): string {
    const child = owner.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден текстовый блок ${name}`);
    return child
        .findLayers((node) => node.type === 'TEXT', { traverseInstances: true })
        .filter((node) => node.type === 'TEXT')
        .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
        .join('');
}

// Addon — техническая область Figma. Читаем её реальный swap/slot,
// а код вложенного компонента получаем из его собственного Code Connect.
function addon(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден ${name}`);
    const type = child.getPropertyValue('Type');
    if (type === 'Spinner' || type === 'ClearButton' || type === 'StatusPositive') return undefined;
    if (type === 'SwapMe' && child.slots) {
        const slot = child.getSlot('Slot');
        if (slot && slot.length) return slot;
    }
    const swapName =
        type === 'Icon-16'
            ? 'Icon-16'
            : type === 'Icon-20'
              ? 'Icon-20'
              : type === 'Icon-24'
                ? 'Icon-24'
                : 'Instance';
    const content = child.getInstanceSwap(swapName);
    if (!content || content.type !== 'INSTANCE') throw new Error(`Проверь содержимое ${name}`);
    const rendered = content.executeTemplate().example;
    if (type === 'Icon-20') {
        return figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${rendered}, props)} />`
            .sections;
    }
    return rendered;
}

function addonType(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    return child.type === 'INSTANCE' ? child.getPropertyValue('Type') : undefined;
}

const view = instance.getEnum('View', {
    Accent: 'accent',
    Primary: 'primary',
    Secondary: 'secondary',
    Outlined: 'outlined',
    Transparent: 'transparent',
    Text: 'text',
});
const size = instance.getEnum('Size', {
    '32': 32,
    '40': 40,
    '48': 48,
    '56': 56,
    '64': 64,
    '72': 72,
});
const shape = instance.getEnum('Shape', { Rectangular: 'rectangular', Rounded: 'rounded' });
const disabled = instance.getEnum('DisabledState', { False: false, True: true });
const singleIcon = instance.getEnum('SingleIcon', { False: false, True: true });
const left = instance.getBoolean('LeftAddon');
const right = instance.getBoolean('RightAddon');
const loading = addonType('LeftAddon', left) === 'Spinner';
const leftCode = addon('LeftAddon', left);
const rightCode = addon('RightAddon', right);
const label =
    !singleIcon && instance.getBoolean('Label') ? instance.getString('✎ Label') : undefined;
const hint = instance.getBoolean('Hint') ? instance.getString('✎ Hint') : undefined;

export default {
    id: 'core-button-desktop',
    imports: [
        "import React from 'react';",
        "import { ButtonDesktop } from '@alfalab/core-components/button/desktop';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
    ],
    example: figma.code`<ButtonDesktop view="${view}" size={${size}} shape="${shape}"
        ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}
        ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
        ${rightCode ? figma.code`rightAddons={${rightCode}}` : ''}
        ${figma.helpers.react.renderProp('hint', hint)}
        ${singleIcon ? figma.helpers.react.renderProp('aria-label', instance.getString('✎ Label')) : ''}
    >${label === undefined ? '' : figma.code`{${JSON.stringify(label)}}`}</ButtonDesktop>`,
    metadata: { nestable: true },
};
