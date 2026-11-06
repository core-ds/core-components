// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=203-2656
// source=packages/pure-cell/src/components/addon/component.tsx
// component=PureCell.Addon
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
    'Icon 24': 'Icon 24',
    'Icon 16': 'Icon 16',
    IconButton: 'IconButton',
    'IconButton Group': 'IconButton Group',
    Indicator: 'Indicator',
    Button: 'Button',
});
if (!preset) throw new Error('Неизвестный пресет PureCell.Addon');
let content: ResultSection[];
if (preset === 'Icon 24' || preset === 'Icon 16') {
    const child = instance.getInstanceSwap(preset === 'Icon 24' ? 'Icon M (24)' : 'Icon S (16)');
    if (!child || child.type !== 'INSTANCE')
        throw new Error('Не найдена выбранная иконка PureCell.Addon');
    content = nested(child);
} else content = children(instance);
if (!content.length) throw new Error('Замени пустой SwapMe содержимым PureCell.Addon');
export default {
    id: 'core-pure-cell-addon-mobile',
    imports: ["import { PureCell } from '@alfalab/core-components/pure-cell';"],
    example: figma.code`<PureCell.Addon>${content}</PureCell.Addon>`,
    metadata: { nestable: true, props: { wrapper: 'addon', preset } },
};
