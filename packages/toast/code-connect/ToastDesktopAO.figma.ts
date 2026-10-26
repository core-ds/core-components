// url=https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K/Web-Core?node-id=75-7087
// source=packages/toast/src/desktop/Component.desktop.tsx
// component=ToastDesktop
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

function booleanProperty(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не прочитано логическое свойство ${name}`);
    return value;
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
const colors = instance.getEnum('Inverted', { False: 'default', True: 'inverted' });
if (!colors) throw new Error('Неизвестные цвета уведомления');
const title = instance.getString('Title');
const closer = booleanProperty(instance, 'Closer');
const hasButton = booleanProperty(instance, 'Button');
const block = variantFlag(instance, 'Block');
const hasBadge = booleanProperty(instance, 'Badge');
const left = hasBadge ? childCode(instance, ['Badge']) : undefined;
if (hasBadge && !left) throw new Error('Не найден значок уведомления');
const action = hasButton ? childCode(instance, ['Button']) : undefined;
if (hasButton && !action) throw new Error('Не найдено действие уведомления');

export default {
    id: 'core-ToastDesktopAO',
    imports: [
        "import { ToastDesktop, type ToastDesktopProps } from '@alfalab/core-components/toast/desktop';",
    ],
    example: figma.code`function Example({ open, onClose }: Pick<ToastDesktopProps, "open" | "onClose">) {
  return <ToastDesktop open={open} onClose={onClose} colors="${colors}" title={${JSON.stringify(title)}} closerProps={{ hasCloser: ${closer ? 'true' : 'false'} }} block={${block ? 'true' : 'false'}}
    ${left ? figma.code`leftAddons={<>${left}</>}` : ''} ${action ? figma.code`actionButton={<>${action}</>}` : ''}
  ></ToastDesktop>;
}`,
    metadata: { nestable: false },
};
