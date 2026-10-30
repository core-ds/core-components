// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=96969-28358
// source=packages/icon-button/src/mobile/Component.mobile.tsx
// component=IconButtonMobile
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
const icon = nestedTemplate(child);
const loading = icon.metadata?.props?.loading === true;

export default {
    id: 'core-icon-button-iconbuttonmobile',
    imports: ["import { IconButtonMobile } from '@alfalab/core-components/icon-button/mobile';"],
    example: figma.code`<IconButtonMobile size={${size}} view="${view}"
 ${transparentBg ? 'transparentBg' : ''} ${loading ? 'loading' : ''} icon={${icon.example}} />`,
    metadata: { nestable: true },
};
