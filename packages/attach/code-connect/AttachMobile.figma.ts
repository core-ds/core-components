// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=71-4988
// source=packages/attach/src/Component.tsx
// component=Attach
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
function nested(owner: InstanceHandle, name: string): InstanceHandle {
    const child = owner.findInstance(name);
    if (!child || child.type !== 'INSTANCE') throw new Error(`Не найден блок ${name}`);
    return child;
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
const button = nested(instance, '[M] Button');
const size = instance.getEnum('Size', { '32': 32, '40': 40, '48': 48, '56': 56, '64': 64 });
if (size === undefined) throw new Error('Неизвестный размер Attach');
const showLabel = booleanProperty(instance, 'Label');
const label = nested(instance, 'Label');
const loading = variantFlag(label, 'Loading');
const progress = booleanProperty(label, 'ProgressBar');
const noFileText = showLabel ? label.getString('✎ Label') : '';
const buttonText = booleanProperty(button, 'Label') ? button.getString('✎ Label') : '';
const disabled = variantFlag(button, 'DisabledState');
const view = button.getEnum('View', {
    Accent: 'accent',
    Primary: 'primary',
    Secondary: 'secondary',
    Outlined: 'outlined',
    Transparent: 'transparent',
    Text: 'text',
});
const shape = button.getEnum('Shape', { Rectangular: 'rectangular', Rounded: 'rounded' });
if (!view || !shape) throw new Error('Неизвестный вариант кнопки Attach');
const hint = booleanProperty(button, 'Hint') ? button.getString('✎ Hint') : undefined;
const singleIcon = variantFlag(button, 'SingleIcon');
if (singleIcon) throw new Error('Attach не поддерживает кнопку без текстового содержимого');
const addonContext: string[] = [];
function requireAddon(name: string) {
    addonContext.push(name === 'LeftAddon' ? 'leftAddons' : 'rightAddons');
}
function addon(name: string) {
    if (!booleanProperty(button, name)) return undefined;
    const owner = nested(button, name);
    const kind = owner.getEnum('Type', {
        'Icon-16': 'Icon-16',
        'Icon-20': 'Icon-20',
        'Icon-24': 'Icon-24',
        SwapMe: 'custom',
        Spinner: 'Spinner',
        Indicator: 'Indicator',
    });
    if (!kind) throw new Error(`Неизвестный аддон ${name}`);
    if (kind === 'custom') {
        const code = childCode(owner);
        if (!code) requireAddon(name);
        return code;
    }
    if (kind === 'Spinner' || kind === 'Indicator')
        throw new Error('Состояние аддона требует отдельного соответствия Attach');
    const swap = owner.getInstanceSwap(kind);
    if (!swap || swap.type !== 'INSTANCE') throw new Error(`Не найдено содержимое ${name}`);
    const result = swap.hasCodeConnect() === true ? swap.executeTemplate() : undefined;
    const code =
        result && resolvedSections(result.example) && result.metadata?.nestable !== false
            ? result.example
            : undefined;
    if (!code) {
        requireAddon(name);
        return undefined;
    }
    return kind === 'Icon-20'
        ? figma.code`<Icon20Adapter icon={(props: React.SVGProps<SVGSVGElement>) => React.cloneElement(${code}, props)} />`
        : code;
}
const left = addon('LeftAddon');
const right = addon('RightAddon');
// Attach всегда подставляет paperclip, если leftAddons пуст: такое состояние не принуждаем.
if (!booleanProperty(button, 'LeftAddon'))
    throw new Error('Публичный Attach всегда отображает paperclip слева');

export default {
    id: 'core-AttachMobile',
    imports: [
        "import { Attach, type AttachProps } from '@alfalab/core-components/attach';",
        "import { Icon20Adapter } from '@alfalab/core-components/shared/icon-20-adapter';",
    ],
    example: figma.code`function Example({ onChange${loading ? ', files' : ''}${loading && progress ? ', progressBarPercent' : ''}${addonContext.length ? ', ' + addonContext.join(', ') : ''} }: Pick<AttachProps, 'onChange'>${loading ? ' & { files: File[] }' : ''}${loading && progress ? ' & { progressBarPercent: number }' : ''}${addonContext.length ? figma.code` & { ${addonContext.map((field) => `${field}: NonNullable<React.ReactNode>`).join('; ')} }` : ''}) {
  return <Attach size={${size}} disabled={${disabled ? 'true' : 'false'}} buttonContent={${JSON.stringify(buttonText)}} noFileText={${JSON.stringify(noFileText)}} onChange={onChange} ${loading ? 'value={files}' : 'value={null}'} ${loading && progress ? 'progressBarPercent={progressBarPercent}' : ''}
    buttonProps={{ view: '${view}', shape: '${shape}', ${hint === undefined ? '' : figma.code`hint: ${JSON.stringify(hint)},`} ${left ? figma.code`leftAddons: <>${left}</>,` : addonContext.includes('leftAddons') ? 'leftAddons,' : ''} ${right ? figma.code`rightAddons: <>${right}</>,` : addonContext.includes('rightAddons') ? 'rightAddons,' : ''} }} />;
}`,
    metadata: {
        nestable: false,
        props: {
            contextFields: addonContext,
            contextReason:
                'File[] и процент загрузки отсутствуют в Figma; несвязанные аддоны требуют ReactNode из контекста, связанные значки сохранены динамически',
        },
    },
};
