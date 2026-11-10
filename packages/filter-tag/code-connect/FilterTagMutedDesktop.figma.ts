// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=131393-26142
// source=packages/filter-tag/src/desktop/Component.desktop.tsx
// component=FilterTagDesktop
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;

// CLI не собирает локальные модули: единый контракт проверяет verify-nesting.cjs.
function nestedTemplate(child: InstanceHandle, context?: () => ResultSection[]) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === false) {
        if (context) return { ...result, example: context() };
        throw new Error(
            `Вложенный компонент ${child.name} требует контекста приложения и не может встраиваться в JSX`,
        );
    }
    return result;
}

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
        return nestedTemplate(nested).example;
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
    const rendered = nestedTemplate(content).example;
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
const size = instance.getEnum('Size', { '32': 32, '40': 40, '48': 48 });
const shape = instance.getEnum('Shape', { Rectangular: 'rectangular' });
const selectedState = instance.getEnum('SelectedState', {
    True: true,
    False: false,
});
const disabledState = instance.getEnum('DisabledState', {
    False: false,
    True: true,
});
const chevron = instance.getEnum('Chevron', { False: false, True: true });
const clearButton = instance.getEnum('ClearButton', {
    True: true,
    False: false,
});
const multipleValue = instance.getEnum('MultipleValue', {
    False: false,
    True: true,
});
const leftCode = addon('LeftAddon', instance.getBoolean('LeftAddon'));
const labelVisible = instance.getBoolean('Label');
const label = instance.getString('✎ Label');
const value = instance.getString('✎ Value');
const amount = multipleValue ? instance.getString('✎ AmountItems') : undefined;
const divider = true;
const content = multipleValue
    ? `${labelVisible ? label : ''} (${amount})`
    : selectedState
      ? `${labelVisible ? label + (divider ? ': ' : ' ') : ''}${value}`
      : labelVisible
        ? label
        : '';
const arrow = instance.findInstance('Arrow');
const open =
    arrow.type === 'INSTANCE' ? arrow.getEnum('Open', { False: false, True: true }) : false;

export default {
    id: 'core-filter-tag-filtertagmuteddesktop',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        "import { FilterTagDesktop } from '@alfalab/core-components/filter-tag/desktop';",
    ],
    example: figma.code`<FilterTagDesktop view="muted" size={${size}} shape="${shape}"
 ${selectedState ? 'checked' : ''} ${disabledState ? 'disabled' : ''} ${open ? 'open' : ''}
 showClear={${clearButton}} showArrow={${chevron}}
 ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
>{${JSON.stringify(content)}}</FilterTagDesktop>`,
    metadata: { nestable: true },
};
