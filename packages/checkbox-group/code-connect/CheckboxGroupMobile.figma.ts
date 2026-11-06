// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=173-43257
// source=packages/checkbox-group/src/mobile/Component.mobile.tsx
// component=CheckboxGroupMobile
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

const type = instance.getEnum('Type', {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
});
const errorState = instance.getEnum('ErrorState', { False: false, True: true });
const label = instance.getBoolean('GroupTitle') ? instance.getString('✎ Group title') : undefined;
const error = errorState
    ? instance.getBoolean('ErrorMessage')
        ? instance.getString('✎ Error message')
        : true
    : undefined;
const hint =
    !errorState && instance.getBoolean('Hint') ? instance.getString('✎ Hint message') : undefined;
const items = instance.getSlot('Items');
if (!items || !items.length) throw new Error('Заполни Items');
const content = slotContent(items, 'items');

export default {
    id: 'core-checkbox-group-checkboxgroupmobile',
    imports: [
        "import React from 'react';",
        ...(content.parameter ? ["import type { ReactNode } from 'react';"] : []),
        "import { CheckboxGroupMobile } from '@alfalab/core-components/checkbox-group/mobile';",
    ],
    example: figma.code`${content.parameter ? `function Example({ items }: { ${content.parameter} }) { return (` : ''}<CheckboxGroupMobile direction="${type}" ${figma.helpers.react.renderProp('label', label)}
 ${figma.helpers.react.renderProp('error', error)} ${figma.helpers.react.renderProp('hint', hint)}>${content.example}</CheckboxGroupMobile>${content.parameter ? '); }' : ''}`,
    metadata: { nestable: !content.parameter },
};
