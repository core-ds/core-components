// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=121328-27150
// source=packages/popover/src/Component.tsx
// component=Popover
import figma from 'figma';
import type { ResultSection } from 'figma';
const instance = figma.selectedInstance;
function slotContent(sections: ResultSection[] | undefined, name: string) {
    const source = sections ?? [];
    function opaque(section: ResultSection) {
        return (
            section.type === 'SLOT' ||
            (section.type === 'CODE' &&
                /^\s*\{\/\* [^\r\n]* — no Code Connect template found \*\/\}\s*$/.test(
                    section.code,
                )) ||
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
        contextCount,
        // Несколько непрозрачных регионов сохраняют своё место; отдельные значения передаются массивом.
        parameter: contextCount
            ? `${name}: ${contextCount > 1 ? 'ReactNode[]' : 'ReactNode'}`
            : undefined,
    };
}

const fixed = instance.getEnum('FixedHeight', { True: true, False: false });
if (fixed === undefined) throw new Error('Неизвестный FixedHeight OptionList');
const header = slotContent(
    instance.getBoolean('Header') ? instance.getSlot('HeaderContent') : undefined,
    'header',
);
const footer = slotContent(
    instance.getBoolean('Footer') ? instance.getSlot('FooterContent') : undefined,
    'footer',
);
const bodySlot = instance.getSlot('Body');
// The library's default Body contains only a decorative scrollbar, not options.
const decorativeOnly =
    bodySlot?.connectedInstances?.length === 1 &&
    /^Scrollbar/.test(bodySlot.connectedInstances[0].name);
const body = slotContent(
    bodySlot?.length && !decorativeOnly ? bodySlot : figma.code`{body}`.sections,
    'body',
);
const parameters = [header.parameter, body.parameter, footer.parameter].filter(Boolean);
const names = [header.parameter ? 'header' : '', footer.parameter ? 'footer' : ''].filter(Boolean);
export default {
    id: 'core-option-list-desktop',
    imports: [
        "import React from 'react';",
        ...(parameters.length ? ["import type { ReactNode } from 'react';"] : []),
        "import { Popover, type PopoverProps } from '@alfalab/core-components/popover';",
    ],
    example: figma.code`function Example({ open, anchorElement, body, surfaceProps${names.length ? `, ${names.join(', ')}` : ''} }: Pick<PopoverProps, 'open' | 'anchorElement'> & {
 ${body.parameter || 'body: React.ReactNode'};
 ${header.parameter ? `${header.parameter};` : ''}
 ${footer.parameter ? `${footer.parameter};` : ''}
 surfaceProps: Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'style'> & { style: React.CSSProperties${fixed ? " & { height: NonNullable<React.CSSProperties['height']> }" : ''} };
 }) {
 return <Popover open={open} anchorElement={anchorElement} position="bottom-start">
 <div {...surfaceProps} style={{ ...surfaceProps.style${fixed ? ", overflowY: 'auto'" : ''} }}>
 ${header.example}
 ${body.example}
 ${footer.example}
 </div></Popover>;
 }`,
    metadata: { nestable: false },
};
