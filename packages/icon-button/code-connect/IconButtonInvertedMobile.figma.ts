// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=96969-28439
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

// Передаём только явно объявленные импорты дочернего шаблона через его metadata.props.
function templateImports(value: unknown): string[] {
    if (value === undefined) return [];
    if (!Array.isArray(value) || !value.every((declaration) => typeof declaration === 'string')) {
        throw new Error('Вложенный компонент вернул некорректный список импортов');
    }
    return value;
}

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
const icon = nestedTemplate(child);
const loading = icon.metadata?.props?.loading === true;
const imports = [
    ...new Set([
        "import { IconButtonMobile } from '@alfalab/core-components/icon-button/mobile';",
        ...templateImports(icon.metadata?.props?.imports),
    ]),
];

export default {
    id: 'core-icon-button-iconbuttoninvertedmobile',
    imports,
    example: figma.code`<IconButtonMobile size={${size}} view="${view}" colors="inverted"
 ${transparentBg ? 'transparentBg' : ''} ${loading ? 'loading' : ''} icon={${icon.example}} />`,
    metadata: { nestable: true, props: { imports } },
};
