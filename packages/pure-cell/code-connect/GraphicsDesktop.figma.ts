// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=13-25888
// source=packages/pure-cell/src/components/graphics/component.tsx
// component=PureCell.Graphics
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
    IconView: 'IconView',
    'Icon 24': 'Icon 24',
    'Icon 16': 'Icon 16',
});
if (!preset) throw new Error('Неизвестный пресет PureCell.Graphics');
let content: ResultSection[];
if (preset === 'Icon 24' || preset === 'Icon 16') {
    const child = instance.getInstanceSwap(preset === 'Icon 24' ? 'Icon 24' : 'Icon 16');
    if (!child || child.type !== 'INSTANCE')
        throw new Error('Не найдена выбранная иконка PureCell.Graphics');
    content = nested(child);
} else content = children(instance);
if (!content.length) throw new Error('Замени пустой SwapMe содержимым PureCell.Graphics');
export default {
    id: 'core-pure-cell-graphics-desktop',
    imports: ["import { PureCell } from '@alfalab/core-components/pure-cell';"],
    example: figma.code`<PureCell.Graphics>${content}</PureCell.Graphics>`,
    metadata: { nestable: true, props: { wrapper: 'graphics', preset } },
};
