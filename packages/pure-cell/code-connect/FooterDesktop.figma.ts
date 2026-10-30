// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=16-3859
// source=packages/pure-cell/src/components/footer/component.tsx
// component=PureCell.Footer
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;
function assertExecutable(sections: ResultSection[], name: string): void {
    for (const section of sections) {
        if (section.type === 'ERROR')
            throw new Error(`Нет исполняемого Code Connect для ${name}: ${section.message}`);
        if (section.type === 'INSTANCE') {
            if (!section.resultSections?.length)
                throw new Error(
                    `Нет исполняемого Code Connect для ${name}: вложенный инстанс не разрешён`,
                );
            assertExecutable(section.resultSections, name);
        }
    }
}
function nested(child: InstanceHandle) {
    // Live runtime может вернуть комментарий вместо ошибки при отсутствии рабочего дочернего подключения.
    if (!child.hasCodeConnect()) throw new Error(`Для ${child.name} нет рабочего Code Connect`);
    const result = child.executeTemplate();
    assertExecutable(result.example, child.name);
    if (result.metadata?.nestable === false)
        throw new Error(`Вложенный ${child.name} требует отдельного контекста`);
    return result.example;
}
function children(owner: InstanceHandle): ResultSection[] {
    const nodes = owner.findLayers((node) => node.type === 'INSTANCE');
    let result = figma.code``.sections;
    for (const child of nodes) {
        if (child.type === 'INSTANCE') result = figma.code`${result}${nested(child)}`.sections;
    }
    return nodes.length ? result : [];
}
const preset = instance.getEnum('Type', {
    SwapMe: 'SwapMe',
    'Text 14': 'Text 14',
    'Text 14 + Button': 'Text 14 + Button',
    Button: 'Button',
    'Two Buttons': 'Two Buttons',
    Comment: 'Comment',
});
if (!preset) throw new Error('Неизвестный пресет PureCell.Footer');
const text =
    preset === 'Text 14' || preset === 'Text 14 + Button'
        ? instance.findText('ExtraSubtitle')
        : undefined;
if (text && text.type !== 'TEXT') throw new Error('Не найден текст PureCell.Footer');
const content = children(instance);
if (preset === 'SwapMe' && !content.length)
    throw new Error('Замени пустой SwapMe содержимым PureCell.Footer');
if (preset !== 'SwapMe' && preset !== 'Text 14' && !content.length)
    throw new Error('Не найдено содержимое PureCell.Footer');
export default {
    id: 'core-pure-cell-footer-desktop',
    imports: ["import { PureCell } from '@alfalab/core-components/pure-cell';"],
    example: figma.code`<PureCell.Footer>${text?.type === 'TEXT' ? figma.code`<PureCell.ExtraSubtitle>{${JSON.stringify(text.textContent)}}</PureCell.ExtraSubtitle>` : ''}${content}</PureCell.Footer>`,
    metadata: { nestable: true, props: { wrapper: 'footer', preset } },
};
