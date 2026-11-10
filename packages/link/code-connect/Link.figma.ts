// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=493-7843
// source=packages/link/src/index.ts
// component=Link
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

const typographyView = instance.getEnum('Size', {
    'S (14-20)': 'primary-small',
    'S (14-20) (Size-20 icons)': 'primary-small',
    'M (16-24)': 'primary-medium',
    'L (18-24)': 'primary-large',
});
const iconSize = instance.getEnum('Size', {
    'S (14-20)': '16',
    'S (14-20) (Size-20 icons)': '20',
    'M (16-24)': '24',
    'L (18-24)': '24',
});
const underlineNode = instance.findInstance('Underline', {
    traverseInstances: true,
});
if (!typographyView || !iconSize || underlineNode.type !== 'INSTANCE')
    throw new Error('Не найдена структура Link');
const line = underlineNode.getEnum('Line', {
    Solid: 'solid',
    Pseudo: 'pseudo',
    None: 'none',
});
if (!line) throw new Error('Неизвестная линия Link');
function addon(side: 'Left' | 'Right') {
    if (!instance.getBoolean(`${side} Addon`)) return undefined;
    const icon = instance.getInstanceSwap(`${side} icon ${iconSize}`);
    if (!icon || icon.type !== 'INSTANCE') throw new Error(`Не найдена ${side} иконка Link`);
    return nestedTemplate(icon).example;
}
const left = addon('Left');
const right = addon('Right');
const text = instance.getString('✎ Label');
// URL/handler и palette/view не являются component properties.
export default {
    id: 'core-link',
    imports: [
        "import { Link, type LinkProps } from '@alfalab/core-components/link';",
        "import { Typography } from '@alfalab/core-components/typography';",
    ],
    example: figma.code`function Example({ ${line === 'pseudo' ? 'onClick' : 'href'}, ${line === 'none' ? '' : 'view, '}colors }: { ${line === 'pseudo' ? "onClick: NonNullable<LinkProps['onClick']>" : 'href: string'}; ${line === 'none' ? '' : "view: NonNullable<LinkProps['view']>; "}colors: NonNullable<LinkProps['colors']> }) {
        return <Typography.Text view="${typographyView}"><Link ${line === 'pseudo' ? 'pseudo onClick={onClick}' : 'href={href}'} ${line === 'none' ? 'underline={false} view="default"' : 'view={view}'} colors={colors} ${left ? figma.code`leftAddons={${left}}` : ''} ${right ? figma.code`rightAddons={${right}}` : ''}>{${JSON.stringify(text)}}</Link></Typography.Text>;
    }`,
    metadata: { nestable: false },
};
