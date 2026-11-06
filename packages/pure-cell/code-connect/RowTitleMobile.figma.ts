// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=203-2691
// source=packages/pure-cell/src/components/text/component.tsx
// component=PureCell.Text (RowTitle content)
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
const view = instance.getEnum('Type', {
    'Title 16-20': 'component-primary',
    'Subtitle 14-20': 'primary-small',
    'Subtitle 13-16': 'secondary-large',
    'Title 14-18': 'component-secondary',
    Amount: 'component-primary',
});
if (!view) throw new Error('Неизвестный пресет PureCell.RowTitle');
const isAmount = instance.getPropertyValue('Type') === 'Amount';
let content: ResultSection[];
if (isAmount) {
    const amount = instance.findInstance('Amount');
    if (amount.type !== 'INSTANCE') throw new Error('Не найдена сумма PureCell.RowTitle');
    content = nested(amount);
} else {
    const text = instance.findText('Text');
    if (text.type !== 'TEXT') throw new Error('Не найден текст PureCell.RowTitle');
    content = figma.code`{${JSON.stringify(text.textContent)}}`.sections;
}
// Самостоятельный типографический фрагмент сохраняет независимый view заголовка/значения.
// Цвет наследуется от PureCell.Text; при необходимости его задаёт контекст родительского примера.
export default {
    id: 'core-pure-cell-rowtitle-mobile',
    imports: ["import { Typography } from '@alfalab/core-components/typography';"],
    example: figma.code`<Typography.Text view="${view}">${content}</Typography.Text>`,
    metadata: { nestable: true, props: { view } },
};
