// url=https://www.figma.com/design/xsWJdFDoAyA8VkbuMxP4yR/Wrappers?node-id=203-2470
// source=packages/pure-cell/src/component.tsx
// component=PureCell
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
function flag(name: string) {
    const value = instance.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error(`Не найден Boolean ${name} PureCell`);
    return value;
}
const side = instance.getEnum('GraphicsSide', {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    None: 'none',
});
if (!side) throw new Error('Неизвестный GraphicsSide PureCell');
const row2 = flag('Row 2');
const hasFooter = flag('Footer');
const row2Value = flag('Row 2 Value');
const hasAddon = flag('Addon');
const row1Value = flag('Row 1 Value');
function wrapper(name: string, enabled: boolean, expected: string) {
    if (!enabled) return undefined;
    const child = instance.findInstance(name);
    if (child.type !== 'INSTANCE') throw new Error(`Не найден ${name} PureCell`);
    // Live runtime может вернуть комментарий вместо ошибки при отсутствии рабочего дочернего подключения.
    if (!child.hasCodeConnect()) throw new Error(`Для ${child.name} нет рабочего Code Connect`);
    const result = child.executeTemplate();
    assertExecutable(result.example, child.name);
    if (result.metadata?.nestable === false)
        throw new Error(`Вложенный ${name} требует отдельного контекста`);
    if (result.metadata?.props?.wrapper === expected) return result.example;
    if (expected === 'graphics')
        return figma.code`<PureCell.Graphics>${result.example}</PureCell.Graphics>`.sections;
    if (expected === 'addon')
        return figma.code`<PureCell.Addon>${result.example}</PureCell.Addon>`.sections;
    return figma.code`<PureCell.Footer>${result.example}</PureCell.Footer>`.sections;
}
const graphics = wrapper('Graphics', side !== 'none', 'graphics');
const addon = wrapper('Addon', hasAddon, 'addon');
const footer = wrapper('Footer', hasFooter, 'footer');
// Row — обычный FRAME. Дочерние независимые инстансы читаются в порядке строк.
// Поиск не пересекает границы вложенных INSTANCE; частичный path=[Main] не совпадает с полным Figma path.
const titles = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === 'RowTitle');
const values = instance.findLayers((node) => node.type === 'INSTANCE' && node.name === 'RowValue');
// Figma может вернуть все инстансы либо исключить скрытые Boolean/родительской строкой.
// Два узла сохраняют исходные индексы строк; отфильтрованный набор индексируется по видимым значениям.
const enabledValues = [row1Value, row2 && row2Value];
const visibleValueCount = enabledValues.filter(Boolean).length;
const allValues = values.length === 2;
if (!allValues && values.length !== visibleValueCount)
    throw new Error('Неоднозначный набор RowValue PureCell: количество не соответствует строкам');
function valueForRow(index: number) {
    return values[allValues ? index : enabledValues.slice(0, index).filter(Boolean).length];
}
function row(index: number, enabled: boolean, valueEnabled: boolean) {
    if (!enabled) return undefined;
    const title = titles[index];
    if (!title || title.type !== 'INSTANCE')
        throw new Error(`Не найден RowTitle строки ${index + 1}`);
    const titleCode = nested(title);
    let valueCode;
    if (valueEnabled) {
        const value = valueForRow(index);
        if (!value || value.type !== 'INSTANCE')
            throw new Error(`Не найден RowValue строки ${index + 1}`);
        valueCode = nested(value);
    }
    return figma.code`<PureCell.Text titleColor="primary" {...row${index + 1}Props}${valueCode ? figma.code` value={${valueCode}}` : ''}>${titleCode}</PureCell.Text>`
        .sections;
}
const row1Code = row(0, true, row1Value);
const row2Code = row(1, row2, row2Value);
// Цвет, ограничения строк и паддинги не являются properties Figma.
// primary — явный запасной цвет для обязательного titleColor, не чтение цвета Figma.
// Необязательные параметры примера используют реальный API, а children/value задаёт макет.
export default {
    id: 'core-pure-cell-mobile',
    imports: [
        "import { PureCell } from '@alfalab/core-components/pure-cell';",
        "import type { ComponentProps } from 'react';",
    ],
    example: figma.code`function Example({ cellProps, row1Props, row2Props }: {
        cellProps?: Omit<ComponentProps<typeof PureCell>, 'children' | 'direction'>;
        row1Props?: Omit<Partial<ComponentProps<typeof PureCell.Text>>, 'children' | 'value'>;
        row2Props?: Omit<Partial<ComponentProps<typeof PureCell.Text>>, 'children' | 'value'>;
    } = {}) {
        return <PureCell {...cellProps} direction="${side === 'top' ? 'vertical' : 'horizontal'}">
            ${side === 'left' || side === 'top' ? graphics : ''}
            <PureCell.Content><PureCell.Main>${row1Code}${row2Code}</PureCell.Main>${addon}${footer}</PureCell.Content>
            ${side === 'right' ? graphics : ''}
        </PureCell>;
    }`,
    metadata: { nestable: false },
};
