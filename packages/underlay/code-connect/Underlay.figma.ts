// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=15683-847
// source=packages/underlay/src/Component.tsx
// component=Underlay
import figma from 'figma';
import type { ResultSection } from 'figma';
const instance = figma.selectedInstance;
function slotContent(sections: ResultSection[] | undefined, name: string) {
    const source = sections ?? [];
    function opaque(section: ResultSection) {
        return (
            section.type === 'SLOT' ||
            (section.type === 'INSTANCE' && !section.resultSections?.length)
        );
    }
    function count(parts: ResultSection[]): number {
        return parts.reduce(
            (total, section) =>
                total +
                (opaque(section)
                    ? 1
                    : section.type === 'INSTANCE'
                      ? count(section.resultSections ?? [])
                      : 0),
            0,
        );
    }
    const contextCount = count(source);
    let contextIndex = 0;
    function render(parts: ResultSection[]): ResultSection[] {
        const result: ResultSection[] = [];
        for (const section of parts) {
            if (section.type === 'ERROR')
                throw new Error(`Ошибка содержимого ${name}: ${section.message}`);
            if (opaque(section)) {
                const expression = contextCount > 1 ? `${name}[${contextIndex++}]` : name;
                result.push(...figma.code`{${expression}}`.sections);
            } else if (section.type === 'INSTANCE') {
                result.push({ ...section, resultSections: render(section.resultSections ?? []) });
            } else result.push(section);
        }
        return result;
    }
    return {
        example: render(source),
        // Несколько непрозрачных регионов сохраняют своё место; отдельные значения передаются массивом.
        parameter: contextCount
            ? `${name}: ${contextCount > 1 ? 'ReactNode[]' : 'ReactNode'}`
            : undefined,
    };
}
const axis = instance.getEnum('Axis', { Horizontal: 'horizontal', Vertical: 'vertical' });
if (!axis) throw new Error('Неизвестный Axis Underlay');
const content = slotContent(
    instance.getSlot('Content') ?? instance.getSlot('Content#15683:1'),
    'children',
);
// Оформление не является component properties; непрозрачный слот требует явный ReactNode.
// Готовые секции сохраняются, ось контента всегда берётся из Figma.
export default {
    id: 'core-underlay',
    imports: [
        "import { Underlay } from '@alfalab/core-components/underlay';",
        `import type { ComponentProps${content.parameter ? ', ReactNode' : ''} } from 'react';`,
    ],
    example: figma.code`function Example({ underlayProps, contentProps${content.parameter ? ', children' : ''} }: {
        underlayProps?: Omit<ComponentProps<typeof Underlay>, 'children' | 'contentProps'>;
        contentProps?: Omit<NonNullable<ComponentProps<typeof Underlay>['contentProps']>, 'axis'>;
        ${content.parameter ? `${content.parameter};` : ''}
    }${content.parameter ? '' : ' = {}'}) {
        return <Underlay {...underlayProps} contentProps={{ ...contentProps, axis: '${axis}' }}>${content.example}</Underlay>;
    }`,
    metadata: { nestable: false },
};
