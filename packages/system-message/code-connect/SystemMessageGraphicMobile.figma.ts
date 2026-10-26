// url=https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K/Web-Core?node-id=32-3688
// source=packages/system-message/src/components/graphic/Component.tsx
// component=SystemMessageMobile.Graphic
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

function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
}
const type = instance.getEnum('Type', { IconView: 'icon', Img: 'image' });
if (!type) throw new Error('Неизвестный тип графики');
const icon = type === 'icon' ? nested(instance, 'IconView') : undefined;
const graphicResult = icon && icon.hasCodeConnect() === true ? icon.executeTemplate() : undefined;
const graphic =
    graphicResult &&
    resolvedSections(graphicResult.example) &&
    graphicResult.metadata?.nestable !== false
        ? graphicResult.example
        : undefined;

export default {
    id: 'core-SystemMessageGraphicMobile',
    imports: [
        "import { SystemMessageMobile } from '@alfalab/core-components/system-message/mobile';",
    ],
    example: graphic
        ? figma.code`<SystemMessageMobile.Graphic>${graphic}</SystemMessageMobile.Graphic>`
        : figma.code`function Example({ children }: { children: React.ReactNode }) {
  return <SystemMessageMobile.Graphic>{children}</SystemMessageMobile.Graphic>;
}`,
    metadata: {
        nestable: !!graphic,
        props: {
            requiresParent: 'SystemMessageMobile',
            contextReason: graphic
                ? undefined
                : 'Изображение не имеет URL в Figma, либо выбранный IconView не подключён к коду или требует контекста цвета/изображения',
        },
    },
};
