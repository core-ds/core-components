// url=https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K/Web-Core?node-id=28-4716
// source=packages/plate/src/desktop/Component.desktop.tsx
// component=PlateDesktop
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
const prefix = '[D]';
const border = variantFlag(instance, 'Border');
const borderRadius = instance.getEnum('BorderRadius', { '0': '0px', '12': '12px', '16': '16px' });
if (!borderRadius) throw new Error('Неизвестный радиус Plate');
const view = 'common';
const content = nested(instance, `${prefix} Content`);
const main = nested(content, `${prefix} Main`);
const mainType = main.getEnum('Content', {
    LightTitle: 'light',
    BigTitle: 'bold',
    SwapMe: 'custom',
});
if (!mainType) throw new Error('Неизвестное основное содержимое Plate');
const title = mainType !== 'custom' ? main.getString('TitleContent') : undefined;
const caption =
    mainType !== 'custom' && booleanProperty(main, 'Caption')
        ? main.getString('CaptionContent')
        : undefined;
const custom = mainType === 'custom' ? childCode(main) : undefined;
const rightEnabled = variantFlag(content, 'AddonRight');
const bottomEnabled = variantFlag(content, 'AddonBottom');
function addon(enabled: boolean, suffix: string) {
    if (!enabled) return { code: undefined, needsContext: false };
    const owner = nested(content, `${prefix} ${suffix}`);
    const type = owner.getEnum('Content', {
        Button: 'button',
        TwoButtons: 'two',
        SwapMe: 'custom',
    });
    if (!type) throw new Error(`Неизвестный тип ${suffix}`);
    const code = childCode(owner);
    if (type !== 'custom' && !code) throw new Error(`Не найдено содержимое ${suffix}`);
    return { code, needsContext: !code };
}
const right = addon(rightEnabled, 'AddonRight');
const bottom = addon(bottomEnabled, 'AddonBottom');
const hasLeft = booleanProperty(instance, 'AddonLeft');
const leftOwner = hasLeft ? nested(instance, `${prefix} AddonLeft`) : undefined;
const leftType = leftOwner?.getEnum('Content', {
    Status: 'status',
    SwapMe: 'custom',
    IconView: 'icon',
});
if (leftOwner && !leftType) throw new Error('Неизвестный левый аддон Plate');
const leftCode = leftOwner ? childCode(leftOwner) : undefined;
const hasControl = booleanProperty(instance, 'Control');
const control = hasControl ? nested(instance, `${prefix} Control`) : undefined;
const controlType = control?.getEnum('Content', {
    Closer: 'closer',
    Collapsed: 'collapsed',
    Expanded: 'expanded',
    SwapMe: 'custom',
});
if (control && !controlType) throw new Error('Неизвестный контрол Plate');
const controlCode = controlType === 'custom' && control ? childCode(control) : undefined;
const needsLeft = hasLeft && !leftCode;
const needsControl = controlType === 'custom' && !controlCode;
const needsChildren = mainType === 'custom' && !custom;
const fields = [
    needsLeft ? 'leftAddons' : '',
    right.needsContext ? 'rightAddons' : '',
    bottom.needsContext ? 'buttons' : '',
    needsControl ? 'control' : '',
    needsChildren ? 'children' : '',
].filter(Boolean);
const needContext = fields.length > 0;
const limitWidth = variantFlag(content, 'FixedWidth');
const typeFields = fields.map((field) => `${field}: React.ReactNode`).join('; ');
const contentCode = figma.code`<PlateDesktop view="${view}" border={${border ? 'true' : 'false'}} borderRadius="${borderRadius}" rounded={${borderRadius === '0px' ? 'false' : 'true'}} limitContentWidth={${limitWidth ? 'true' : 'false'}}
  hasCloser={${controlType === 'closer' ? 'true' : 'false'}} foldable={${controlType === 'collapsed' || controlType === 'expanded' ? 'true' : 'false'}} ${controlType === 'collapsed' || controlType === 'expanded' ? figma.code`folded={${controlType === 'collapsed' ? 'true' : 'false'}}` : ''}
  ${title === undefined ? '' : figma.code`title={${JSON.stringify(title)}} titleView="${mainType}"`}
  ${leftCode ? figma.code`leftAddons={<>${leftCode}</>}` : needsLeft ? 'leftAddons={leftAddons}' : ''}
  ${rightEnabled || controlType === 'custom' ? figma.code`subAddons={<>${right.code || (right.needsContext ? figma.code`{rightAddons}` : '')}${controlCode || (needsControl ? figma.code`{control}` : '')}</>}` : ''}
  ${bottom.code ? figma.code`buttons={<>${bottom.code}</>}` : bottom.needsContext ? 'buttons={buttons}' : ''}
>${custom || (needsChildren ? figma.code`{children}` : caption === undefined ? '' : figma.code`{${JSON.stringify(caption)}}`)}</PlateDesktop>`;

export default {
    id: 'core-PlateDesktop',
    imports: ["import { PlateDesktop } from '@alfalab/core-components/plate/desktop';"],
    example: needContext
        ? figma.code`function Example({ ${fields.join(', ')} }: { ${typeFields} }) { return ${contentCode}; }`
        : contentCode,
    metadata: {
        nestable: !needContext,
        props: {
            contextFields: fields,
            contextReason: needContext
                ? 'В Figma выбран пустой SwapMe или дочерний шаблон требует контекста; связанные вложенные элементы сохранены динамически'
                : undefined,
        },
    },
};
