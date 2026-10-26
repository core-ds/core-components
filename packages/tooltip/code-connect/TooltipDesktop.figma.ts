// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=376-12567
// source=packages/tooltip/src/desktop/Component.desktop.tsx
// component=TooltipDesktop
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

const position = instance.getEnum('TailDirection', {
    '←': 'left',
    '→': 'right',
    '↓': 'bottom',
    '↑': 'top',
});
const colors = instance.getEnum('Colors', { Default: 'default', Inverted: 'inverted' });
const view = instance.getEnum('View', { Hint: 'hint', Tooltip: 'tooltip' });
if (!position || !colors || !view) throw new Error('Неизвестный вариант Tooltip');
const content = instance.findInstance('Content');
if (content.type !== 'INSTANCE') throw new Error('Не найден Content Tooltip');
const preset = content.getPropertyValue('Preset');
if (preset !== 'Text' && preset !== 'SwapMe') throw new Error('Неизвестный Preset Tooltip');
const slot = preset === 'SwapMe' ? content.getSlot('Slot') : undefined;
const slotContentResult = slotContent(slot, 'content');
const contentType =
    slotContentResult.contextCount > 1
        ? `Pick<TooltipDesktopProps, 'children' | 'open'> & { ${slotContentResult.parameter} }`
        : "Pick<TooltipDesktopProps, 'children' | 'open' | 'content'>";
const projected =
    preset === 'Text'
        ? figma.code`${JSON.stringify(content.getString('✎ Text'))}`
        : slot?.length
          ? figma.code`<>${slotContentResult.example}</>`
          : undefined;
export default {
    id: 'core-tooltip-desktop',
    imports: [
        ...(slotContentResult.contextCount > 1 ? ["import type { ReactNode } from 'react';"] : []),
        "import { TooltipDesktop, type TooltipDesktopProps } from '@alfalab/core-components/tooltip/desktop';",
    ],
    example: figma.code`function Example({ children, open, content }: ${contentType}) {
 return <TooltipDesktop position="${position}" colors="${colors}" view="${view}" open={open} content={${projected || 'content'}}>{children}</TooltipDesktop>;
 }`,
    metadata: { nestable: false },
};
