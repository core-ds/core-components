// url=https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K/Web-Core?node-id=52-5608
// source=packages/system-message/src/components/controls/Component.tsx
// component=SystemMessageDesktop.Controls
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;
// Живой runtime может вернуть INSTANCE-заглушку даже при hasCodeConnect=true.
function resolvedSections(sections: ResultSection[]): boolean {
    return sections.every((section) => {
        if (section.type === 'ERROR') return false;
        if (section.type === 'INSTANCE')
            return !!section.resultSections && resolvedSections(section.resultSections);
        if (section.type === 'CODE' && section.code.includes('no Code Connect template found'))
            return false;
        return true;
    });
}

function variantFlag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getEnum(name, { False: false, True: true });
    if (value === undefined) throw new Error(`Неизвестный вариант ${name}`);
    return value;
}
function render(child: InstanceHandle) {
    if (child.hasCodeConnect() !== true)
        throw new Error(`Для вложенного ${child.name} отсутствует Code Connect`);
    const result = child.executeTemplate();
    if (!resolvedSections(result.example))
        throw new Error(`Для вложенного ${child.name} отсутствует готовый код`);
    if (result.metadata?.nestable === false)
        throw new Error('Вложенный компонент требует контекста приложения');
    return result.example;
}
const direction = instance.getEnum('Axis', { Vertical: 'column', Horizontal: 'row' });
if (!direction) throw new Error('Неизвестная ориентация кнопок');
const primary = variantFlag(instance, 'PrimaryButton');
const secondary = variantFlag(instance, 'SecondaryButton');
const buttons = instance.findLayers((node) => node.type === 'INSTANCE');
if (buttons.length !== Number(primary) + Number(secondary))
    throw new Error('Состав кнопок не совпадает с вариантами Figma');
let content = figma.code``;
const contextFields: string[] = [];
for (let index = 0; index < buttons.length; index++) {
    const child = buttons[index];
    if (child.type !== 'INSTANCE') continue;
    const result = child.hasCodeConnect() === true ? child.executeTemplate() : undefined;
    if (result && resolvedSections(result.example) && result.metadata?.nestable !== false) {
        content = figma.code`${content}${result.example}`;
    } else {
        const field = `button${index + 1}`;
        contextFields.push(field);
        content = figma.code`${content}{${field}}`;
    }
}
const contextTypes = contextFields.map((field) => `${field}: React.ReactNode`).join('; ');
const contentCode = figma.code`<SystemMessageDesktop.Controls direction="${direction}">${content}</SystemMessageDesktop.Controls>`;

export default {
    id: 'core-SystemMessageControlsDesktopCorporate',
    imports: [
        "import { SystemMessageDesktop } from '@alfalab/core-components/system-message/desktop';",
    ],
    example: contextFields.length
        ? figma.code`function Example({ ${contextFields.join(', ')} }: { ${contextTypes} }) { return ${contentCode}; }`
        : contentCode,
    metadata: {
        nestable: contextFields.length === 0,
        props: {
            composition: 'system-message-controls',
            contentSections: contentCode.sections,
            requiresParent: 'SystemMessageDesktop',
            contextFields,
            contextReason: contextFields.length
                ? 'Обязательные элементы кнопок не подключены к коду либо требуют контекста; связанные кнопки сохранены'
                : undefined,
        },
    },
};
