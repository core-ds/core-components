// url=https://www.figma.com/design/QJ8ZKwY1eyR1uuUI3hH3MZ/Web-Core?node-id=70-2393
// source=packages/dropzone/src/Component.tsx
// component=Dropzone
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
const state = instance.getEnum('State', { Default: 'default', Active: 'active', Error: 'error' });
if (!state) throw new Error('Неизвестное состояние Dropzone');
if (state === 'active')
    throw new Error(
        'Active появляется во время drag-enter; публичного пропса для принудительного состояния нет',
    );
const swap = instance.getInstanceSwap('Content');
if (!swap || swap.type !== 'INSTANCE') throw new Error('Не найден контент Dropzone');
const text = swap.findText('description');
const content =
    text.type === 'TEXT' ? figma.code`{${JSON.stringify(text.textContent)}}` : render(swap);

export default {
    id: 'core-Dropzone',
    imports: ["import { Dropzone } from '@alfalab/core-components/dropzone';"],
    example: figma.code`<Dropzone error={${state === 'error' ? 'true' : 'false'}}>${content}</Dropzone>`,
    metadata: { nestable: true },
};
