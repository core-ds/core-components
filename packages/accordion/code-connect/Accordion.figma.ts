// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=15691-10544
// source=packages/accordion/src/Component.tsx
// component=Accordion
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
const expanded = instance.getEnum('Content', { True: true, False: false });
const position = instance.getEnum('ControlSide', { Left: 'start', Right: 'end' });
if (typeof expanded !== 'boolean' || !position) throw new Error('Неизвестный вариант Accordion');
function slot(name: string, fullName: string) {
    return instance.getSlot(name) ?? instance.getSlot(fullName);
}
const header = slotContent(slot('Header', 'Header#15691:6'), 'header');
const control = slotContent(slot('Control', 'Control#15691:7'), 'control');
const body = slotContent(slot('Body', 'Body#15691:8'), 'children');
const parameters = [header.parameter, control.parameter, body.parameter].filter(Boolean);
const names = [
    header.parameter ? 'header' : '',
    control.parameter ? 'control' : '',
    body.parameter ? 'children' : '',
].filter(Boolean);
const contextual = parameters.length > 0;
// Content управляет начальным раскрытием; body остаётся доступным при дальнейшем переключении.
// Непрозрачное содержимое требует ReactNode, а готовые секции сохраняются динамически.
export default {
    id: 'core-accordion',
    imports: [
        "import { Accordion } from '@alfalab/core-components/accordion';",
        ...(contextual ? ["import type { ReactNode } from 'react';"] : []),
    ],
    example: figma.code`${contextual ? `function Example({ ${names.join(', ')} }: { ${parameters.join('; ')} }) { return (` : ''}<Accordion controlPosition="${position}" defaultExpanded={${expanded ? 'true' : 'false'}}
        header={<>${header.example}</>} control={${control.example.length ? figma.code`<>${control.example}</>` : 'null'}}>${body.example}</Accordion>${contextual ? '); }' : ''}`,
    metadata: { nestable: !contextual },
};
