// url=https://www.figma.com/design/PPpVcDOtYG7rS98kFjg18K/Web-Core?node-id=32-3842
// source=packages/system-message/src/mobile/Component.mobile.tsx
// component=SystemMessageMobile
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
const hasGraphic = booleanProperty(instance, 'Graphic');
const graphic = hasGraphic ? nested(instance, 'Graphic') : undefined;
const graphicType = graphic?.getEnum('Type', { IconView: 'icon', Img: 'image' });
if (graphic && !graphicType) throw new Error('Неизвестная графика SystemMessage');
const graphicResult =
    graphic && graphic.hasCodeConnect() === true ? graphic.executeTemplate() : undefined;
const graphicCode =
    graphicResult &&
    resolvedSections(graphicResult.example) &&
    graphicResult.metadata?.nestable !== false
        ? graphicResult.example
        : undefined;
const needsGraphic = !!graphic && !graphicCode;
const hasButtons = booleanProperty(instance, 'Button');
const buttonsOwner = hasButtons ? nested(instance, 'Buttons') : undefined;
const buttonsResult =
    buttonsOwner && buttonsOwner.hasCodeConnect() === true
        ? buttonsOwner.executeTemplate()
        : undefined;
const controlsProps = buttonsResult?.metadata?.props;
const contextualControls =
    controlsProps?.composition === 'system-message-controls' &&
    Array.isArray(controlsProps.contentSections) &&
    Array.isArray(controlsProps.contextFields)
        ? {
              sections: controlsProps.contentSections as ResultSection[],
              fields: controlsProps.contextFields.filter(
                  (field): field is string => typeof field === 'string',
              ),
          }
        : undefined;
const buttons =
    buttonsResult &&
    resolvedSections(buttonsResult.example) &&
    buttonsResult.metadata?.nestable !== false
        ? buttonsResult.example
        : contextualControls && resolvedSections(contextualControls.sections)
          ? contextualControls.sections
          : undefined;
const needsControls = !!buttonsOwner && !buttons;
const controlsDirection = needsControls
    ? buttonsOwner?.getEnum('Axis', { Vertical: 'column', Horizontal: 'row' })
    : undefined;
if (needsControls && !controlsDirection)
    throw new Error('Неизвестная ориентация кнопок SystemMessage');
const contextFields = [
    ...(needsGraphic ? ['graphic'] : []),
    ...(needsControls ? ['controls'] : []),
    ...(contextualControls?.fields || []),
];
const contextTypes = contextFields.map((field) => `${field}: React.ReactNode`).join('; ');

const title = booleanProperty(instance, 'Title') ? instance.getString('TitleContent') : undefined;
const subtitle = booleanProperty(instance, 'Subtitle')
    ? instance.getString('SubtitleContent')
    : undefined;
const caption = booleanProperty(instance, 'Caption')
    ? instance.getString('CaptionContent')
    : undefined;
const content = figma.code`<SystemMessageMobile>
  ${graphicCode || ''} ${needsGraphic ? figma.code`<SystemMessageMobile.Graphic>{graphic}</SystemMessageMobile.Graphic>` : ''}
  ${title === undefined ? '' : figma.code`<SystemMessageMobile.Title>{${JSON.stringify(title)}}</SystemMessageMobile.Title>`}
  ${subtitle === undefined ? '' : figma.code`<SystemMessageMobile.Subtitle>{${JSON.stringify(subtitle)}}</SystemMessageMobile.Subtitle>`}
  ${caption === undefined ? '' : figma.code`<SystemMessageMobile.Caption>{${JSON.stringify(caption)}}</SystemMessageMobile.Caption>`}
  ${buttons || (needsControls ? figma.code`<SystemMessageMobile.Controls direction="${controlsDirection}">{controls}</SystemMessageMobile.Controls>` : '')}
</SystemMessageMobile>`;

export default {
    id: 'core-SystemMessageMobile',
    imports: [
        "import { SystemMessageMobile } from '@alfalab/core-components/system-message/mobile';",
    ],
    example: contextFields.length
        ? figma.code`function Example({ ${contextFields.join(', ')} }: { ${contextTypes} }) { return ${content}; }`
        : content,
    metadata: {
        nestable: contextFields.length === 0,
        props: {
            contextFields,
            contextReason: contextFields.length
                ? 'Графика или кнопки не подключены к коду либо не допускают вложения; содержимое соответствующего слота передаётся из контекста'
                : undefined,
        },
    },
};
