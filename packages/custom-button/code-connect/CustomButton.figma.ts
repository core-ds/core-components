// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=3-7695
// source=packages/custom-button/src/Component.tsx
// component=CustomButton
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
const leftCode = addon('LeftAddon', instance.getBoolean('LeftAddon'));
const rightCode = addon('RightAddon', instance.getBoolean('RightAddon'));
const children = instance.findLayers((node) => node.type === 'INSTANCE', {
    path: ['Content'],
});
if (!children.length) throw new Error('Замени SwapMe содержимым CustomButton');
const content = children.map((node) => {
    if (node.type !== 'INSTANCE') throw new Error('Ожидается компонент Content');
    if (node.name === 'SwapMe') throw new Error('Замени SwapMe содержимым CustomButton');
    return nestedTemplate(node).example;
});

export default {
    id: 'core-custom-button-custombutton',
    imports: [
        "import React from 'react';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
        "import { CustomButton } from '@alfalab/core-components/custom-button';",
    ],
    example: figma.code`function Example({ backgroundColor, contentColor, stateType }: Pick<React.ComponentProps<typeof CustomButton>, 'backgroundColor' | 'contentColor' | 'stateType'>) {
 return <CustomButton backgroundColor={backgroundColor} contentColor={contentColor} stateType={stateType}
 ${leftCode ? figma.code`leftAddons={${leftCode}}` : ''} ${rightCode ? figma.code`rightAddons={${rightCode}}` : ''}
 >${content}</CustomButton>;
}`,
    metadata: { nestable: false },
};
