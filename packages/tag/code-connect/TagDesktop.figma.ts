// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=110-28440
// source=packages/tag/src/desktop/Component.desktop.tsx
// component=TagDesktop
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

const size = instance.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56 });
const shape = instance.getEnum('Shape', { Rectangular: 'rectangular', Rounded: 'rounded' });
const checked = instance.getEnum('SelectedState', { False: false, True: true });
const disabled = instance.getEnum('DisabledState', { False: false, True: true });
const singleIcon = instance.getEnum('SingleIcon', { False: false, True: true });
const clear = instance.getEnum('ClearButton', { False: false, True: true });
const indicator = instance.getEnum('Indicator', {
    Hidden: 'hidden',
    Collapsed: 'dot',
    Digit: 'count',
});
const indicatorTag = singleIcon || indicator !== 'hidden';
if (indicatorTag && size === 56)
    throw new Error('IndicatorTag не поддерживает Size=56; требуется решение владельца');
const leftCode = addon('LeftAddon', instance.getBoolean('LeftAddon'));
const rightCode = !clear ? addon('RightAddon', instance.getBoolean('RightAddon')) : undefined;
let indicatorCode;
if (indicator === 'dot') indicatorCode = figma.code`indicatorProps={{ mode: 'dot' }}`;
if (indicator === 'count') {
    const value = Number(childText('Indicator'));
    if (!Number.isFinite(value)) throw new Error('Значение индикатора должно быть числом');
    indicatorCode = figma.code`indicatorProps={{ mode: 'count', value: ${value} }}`;
}
const label =
    !indicatorTag && instance.getBoolean('Label') ? instance.getString('✎ Label') : undefined;
export default {
    id: 'core-tag-filled-desktop',
    imports: [
        "import React from 'react';",
        "import { TagDesktop } from '@alfalab/core-components/tag/desktop';",
        "import { IndicatorTag } from '@alfalab/core-components/tag';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
    ],
    example: figma.code`<TagDesktop view="filled" size={${size}} shape="${shape}"
        ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} ${clear ? 'showClear' : ''}
        ${indicatorTag ? 'Component={IndicatorTag}' : ''} ${indicatorCode || ''}
        ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
        ${rightCode ? figma.code`rightAddons={${rightCode}}` : ''}
        ${indicatorTag ? figma.helpers.react.renderProp('aria-label', instance.getString('✎ Label')) : ''}
    >${label === undefined ? '' : figma.code`{${JSON.stringify(label)}}`}</TagDesktop>`,
    metadata: { nestable: true },
};
