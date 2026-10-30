// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=34498-5764
// source=packages/status/src/index.ts
// component=Status
import figma from 'figma';
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

import type { InstanceHandle, ResultSection } from 'figma';
const size = instance.getEnum('Size', {
    '20': 20,
    '24': 24,
    '32': 32,
    '40': 40,
});
const shape = instance.getEnum('Shape', {
    Rectangular: 'rectangular',
    Rounded: 'rounded',
});
const hasLeft = instance.getEnum('LeftAddon', { False: false, True: true });
const hasRight = instance.getEnum('RightAddon', { False: false, True: true });
const label = instance.findInstance('Label');
if (!size || !shape || hasLeft === undefined || hasRight === undefined || label.type !== 'INSTANCE')
    throw new Error('Неизвестная структура Status');
const text = label.getString('✎ Label');
const uppercase = label.getEnum('Uppercase', { False: false, True: true });
if (uppercase === undefined) throw new Error('Неизвестный Uppercase Status');
const addons = instance
    .findLayers((n) => n.type === 'INSTANCE' && n.name === 'Addon')
    .filter((n): n is InstanceHandle => n.type === 'INSTANCE');
function addon(node: InstanceHandle | undefined) {
    if (!node) throw new Error('Не найден Addon Status');
    // У Addon_12 (Size=20) есть только Slot: читать несуществующий Type нельзя.
    const type = size === 20 ? undefined : node.getPropertyValue('Type');
    if (size === 20 || type === 'SwapMe') {
        const content = node.getSlot('Slot');
        if (!content) throw new Error('Не найден Slot Status');
        return content;
    }
    if (type === 'Spinner 16') {
        const spinner = node.findInstance('Spinner', { traverseInstances: true });
        if (spinner.type !== 'INSTANCE') throw new Error('Не найден Spinner Status');
        return nestedTemplate(spinner).example;
    }
    const property = type === 'Icon 16' ? 'Icon 16' : type === 'Icon 20' ? 'icon-20' : undefined;
    if (!property) throw new Error('Неизвестный Addon Status');
    const icon = node.getInstanceSwap(property);
    if (!icon || icon.type !== 'INSTANCE') throw new Error('Не найдена иконка Status');
    return nestedTemplate(icon).example;
}
const left = hasLeft ? addon(addons[0]) : undefined;
const right = hasRight ? addon(addons[hasLeft ? 1 : 0]) : undefined;
// View/color заданы layer tokens, а не variants: их передаёт вызывающий код.
export default {
    id: 'core-status',
    imports: ["import { Status, type StatusProps } from '@alfalab/core-components/status';"],
    example: figma.code`function Example({ view, color }: { view: NonNullable<StatusProps['view']>; color: NonNullable<StatusProps['color']> }) {
        return <Status size={${size}} shape="${shape}" view={view} color={color} uppercase={${uppercase ? 'true' : 'false'}} ${left ? figma.code`leftAddons={<>${left}</>}` : ''} ${right ? figma.code`rightAddons={<>${right}</>}` : ''}>{${JSON.stringify(text)}}</Status>;
    }`,
    metadata: { nestable: false },
};
