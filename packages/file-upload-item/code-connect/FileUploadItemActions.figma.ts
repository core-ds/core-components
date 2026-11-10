// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=3073-1518
// source=packages/file-upload-item/src/Component.tsx
// component=FileUploadItem.Actions
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
function childCode(owner: InstanceHandle, path?: string[]) {
    const children = owner.findLayers(
        (node) => node.type === 'INSTANCE' && !node.name.startsWith('Placeholder_'),
        path ? { path } : undefined,
    );
    let code = figma.code``;
    for (const child of children)
        if (child.type === 'INSTANCE') {
            if (child.hasCodeConnect() !== true) return undefined;
            const result = child.executeTemplate();
            if (!resolvedSections(result.example)) return undefined;
            if (result.metadata?.nestable === false) return undefined;
            code = figma.code`${code}${result.example}`;
        }
    return children.length ? code : undefined;
}
const preset = instance.getEnum('Preset', { SwapMe: 'custom', Controls: 'controls' });
if (!preset) throw new Error('Неизвестный правый аддон FileUploadItem');
const content = preset === 'custom' ? childCode(instance) : undefined;

export default {
    id: 'core-FileUploadItemActions',
    imports: ["import { FileUploadItem } from '@alfalab/core-components/file-upload-item';"],
    example:
        preset === 'controls'
            ? figma.code`<FileUploadItem.Actions />`
            : content ||
              figma.code`function Example({ children }: { children: React.ReactNode }) { return <>{children}</>; }`,
    metadata: {
        nestable: preset === 'controls' || !!content,
        props: { requiresParent: 'FileUploadItem' },
    },
};
