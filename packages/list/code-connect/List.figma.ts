// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=494-7599
// source=packages/list/src/index.ts
// component=List
import figma from 'figma';
import type { ResultSection, InstanceHandle } from 'figma';
const instance = figma.selectedInstance;

// CLI не собирает локальные модули: единый контракт проверяет verify-nesting.cjs.
function nestedTemplate(child: InstanceHandle, context?: () => ResultSection[]) {
    const result = child.executeTemplate();
    if (result.metadata?.nestable === false) {
        if (context) return { ...result, example: context() };
        throw new Error(
            `Вложенный компонент ${child.name} требует контекста приложения и не может встраиваться в JSX`,
        );
    }
    return result;
}

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

const marker = instance.findInstance('Marker');
if (marker.type !== 'INSTANCE') throw new Error('Не найден Marker List');
const type = marker.getEnum('Type', {
    Number: 'number',
    Dash: 'dash',
    SwapMe: 'custom',
    '❌ Bullet': 'deprecated',
});
if (!type || type === 'deprecated') throw new Error('Устаревший или неизвестный Marker List');
const text = instance.getString('✎ Text');
const hasCaption = instance.getEnum('Caption', { False: false, True: true });
if (hasCaption === undefined) throw new Error('Неизвестный Caption List');
const caption = hasCaption ? instance.getString('✎ Сaption') : undefined;
let markerContent: ReturnType<typeof slotContent> | undefined;
if (type === 'custom') {
    const content = marker.findLayers((n) => n.type === 'INSTANCE');
    const parts = content
        .filter((n) => n.type === 'INSTANCE')
        .map((n) =>
            n.type === 'INSTANCE'
                ? nestedTemplate(n, () => [{ type: 'SLOT', propertyName: 'marker' }]).example
                : [],
        );
    if (!parts.length) throw new Error('Не найден custom Marker List');
    markerContent = slotContent(parts.flat(), 'marker');
}
const parameters = [type === 'number' ? 'start: number' : '', markerContent?.parameter].filter(
    Boolean,
);
const names = [type === 'number' ? 'start' : '', markerContent?.parameter ? 'marker' : ''].filter(
    Boolean,
);
export default {
    id: 'core-list',
    imports: [
        "import { List } from '@alfalab/core-components/list';",
        ...(markerContent?.parameter ? ["import type { ReactNode } from 'react';"] : []),
    ],
    example: figma.code`${parameters.length ? `function Example({ ${names.join(', ')} }: { ${parameters.join('; ')} }) { return (` : ''}<List tag="${type === 'number' ? 'ol' : 'ul'}" ${type === 'number' ? 'start={start}' : ''} ${markerContent ? figma.code`marker={<>${markerContent.example}</>}` : ''}><List.Item ${figma.helpers.react.renderProp('caption', caption)}>{${JSON.stringify(text)}}</List.Item></List>${parameters.length ? '); }' : ''}`,
    metadata: { nestable: false },
};
