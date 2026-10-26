// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=132182-13980
// source=packages/tag/src/mobile/Component.mobile.tsx
// component=TagMobile
import figma from 'figma';
import type { InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

function addon(name: string, enabled: boolean, owner: InstanceHandle = instance) {
    if (!enabled) return undefined;
    const child = owner.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден ${name}`);
    const type = child.getEnum('Type', {
        SwapMe: 'slot',
        'Icon-16': 'icon16',
        'Icon-20': 'icon20',
        'Icon-24': 'icon24',
        Spinner: 'spinner',
        Indicator: 'indicator',
        Icon_20: 'segment20',
        Icon_24: 'segment24',
    });
    if (type === 'slot') {
        const slot = child.getSlot('Slot');
        if (slot?.length) return slot;
        throw new Error(`Заполни Slot у ${name}`);
    }
    if (type === 'spinner' || type === 'indicator') {
        const nested = child.findInstance(type === 'spinner' ? 'Spinner' : 'Indicator');
        if (nested.type !== 'INSTANCE') throw new Error(`Не найдено содержимое ${name}`);
        return nested.executeTemplate().example;
    }
    const prop =
        type === 'icon16'
            ? 'Icon-16'
            : type === 'icon20'
              ? 'Icon-20'
              : type === 'icon24'
                ? 'Icon-24'
                : 'Instance';
    const content = child.getInstanceSwap(prop);
    if (!content || content.type !== 'INSTANCE') throw new Error(`Проверь содержимое ${name}`);
    const rendered = content.executeTemplate().example;
    if (type === 'icon20')
        return figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${rendered}, props)} />`
            .sections;
    return rendered;
}
function addonType(name: string, enabled: boolean) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    return child.type === 'INSTANCE' ? child.getPropertyValue('Type') : undefined;
}
const size = instance.getEnum('Size', {
    '32': 32,
    '40': 40,
    '56': 56,
    '48': 48,
});
const shape = instance.getEnum('Shape', {
    Rectangular: 'rectangular',
    Rounded: 'rounded',
});
const selectedState = instance.getEnum('SelectedState', {
    False: false,
    True: true,
});
const disabledState = instance.getEnum('DisabledState', {
    False: false,
    True: true,
});
const singleIcon = instance.getEnum('SingleIcon', { False: false, True: true });
const indicator = instance.getEnum('Indicator', {
    Hidden: 'hidden',
    Collapsed: 'dot',
    Digit: 'count',
});
const clearButton = instance.getEnum('ClearButton', { False: false });
const indicatorTag = singleIcon || indicator !== 'hidden';
if (indicatorTag && size === 56) throw new Error('IndicatorTag не поддерживает Size=56');
const leftCode = addon('LeftAddon', instance.getBoolean('LeftAddon'));
const rightCode = !clearButton ? addon('RightAddon', instance.getBoolean('RightAddon')) : undefined;
let indicatorCode;
if (indicator === 'dot') indicatorCode = figma.code`indicatorProps={{ mode: 'dot' }}`;
if (indicator === 'count') {
    const child = instance.findInstance('Indicator');
    if (child.type !== 'INSTANCE') throw new Error('Не найден Indicator');
    const texts = child.findLayers((node) => node.type === 'TEXT', {
        traverseInstances: true,
    });
    const value = Number(
        texts.map((node) => (node.type === 'TEXT' ? node.textContent : '')).join(''),
    );
    if (!Number.isFinite(value)) throw new Error('Индикатор должен содержать число');
    indicatorCode = figma.code`indicatorProps={{ mode: 'count', value: ${value} }}`;
}
const label =
    !indicatorTag && instance.getBoolean('Label') ? instance.getString('✎ Label') : undefined;

export default {
    id: 'core-tag-tagtransparentinvertedmobile',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        "import { TagMobile } from '@alfalab/core-components/tag/mobile';",
        "import { IndicatorTag } from '@alfalab/core-components/tag';",
    ],
    example: figma.code`<TagMobile view="transparent" size={${size}} shape="${shape}" colors="inverted"
 ${selectedState ? 'checked' : ''} ${disabledState ? 'disabled' : ''} ${clearButton ? 'showClear' : ''}
 ${indicatorTag ? 'Component={IndicatorTag}' : ''} ${indicatorCode || ''}
 ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
 ${rightCode ? figma.code`rightAddons={${rightCode}}` : ''}
 ${indicatorTag ? figma.helpers.react.renderProp('aria-label', instance.getString('✎ Label')) : ''}
>${label === undefined ? '' : figma.code`{${JSON.stringify(label)}}`}</TagMobile>`,
    metadata: { nestable: true },
};
