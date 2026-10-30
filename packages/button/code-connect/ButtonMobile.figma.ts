// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=47-52208
// source=packages/button/src/mobile/Component.mobile.tsx
// component=ButtonMobile
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
const shape = instance.getEnum('Shape', {
    Rectangular: 'rectangular',
    Rounded: 'rounded',
});
const singleIcon = instance.getEnum('SingleIcon', { False: false, True: true });
const disabledState = instance.getEnum('DisabledState', {
    False: false,
    True: true,
});
const left = instance.getBoolean('LeftAddon');
const right = instance.getBoolean('RightAddon');
const loading = addonType('LeftAddon', left) === 'Spinner';
const leftCode = loading ? undefined : addon('LeftAddon', left);
const rightCode = addon('RightAddon', right);
if (singleIcon && left && right) throw new Error('SingleIcon требует один addon');
const label =
    !singleIcon && instance.getBoolean('Label') ? instance.getString('✎ Label') : undefined;
const hint = instance.getBoolean('Hint') ? instance.getString('✎ Hint') : undefined;
if (hint && size !== undefined && size < 56) throw new Error('Hint поддерживается от Size=56');

export default {
    id: 'core-button-buttonmobile',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        "import { ButtonMobile } from '@alfalab/core-components/button/mobile';",
    ],
    example: figma.code`<ButtonMobile view="${view}" size={${size}} shape="${shape}"
 ${disabledState ? 'disabled' : ''} ${loading ? 'loading' : ''}
 ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''}
 ${rightCode ? figma.code`rightAddons={${rightCode}}` : ''}
 ${figma.helpers.react.renderProp('hint', hint)}
 ${singleIcon ? figma.helpers.react.renderProp('aria-label', instance.getString('✎ Label')) : ''}
>${label === undefined ? '' : figma.code`{${JSON.stringify(label)}}`}</ButtonMobile>`,
    metadata: { nestable: true },
};
