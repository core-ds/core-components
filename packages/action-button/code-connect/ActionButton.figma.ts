// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=603-82978
// source=packages/action-button/src/Component.tsx
// component=ActionButton
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
const iconCode = nestedTemplate(icon).example;
const label = instance.getString('✎ Label');

export default {
    id: 'core-action-button-actionbutton',
    imports: ["import { ActionButton } from '@alfalab/core-components/action-button';"],
    example: figma.code`<ActionButton view="${view}" colors="${colors}" ${disabledState ? 'disabled' : ''} icon={${iconCode}}>{${JSON.stringify(label)}}</ActionButton>`,
    metadata: { nestable: true },
};
