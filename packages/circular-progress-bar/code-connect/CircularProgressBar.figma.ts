// url=https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ/Web----Core-ProgressBars?node-id=14-1890
// source=packages/circular-progress-bar/src/index.ts
// component=CircularProgressBar
import figma from 'figma';
import type { InstanceHandle, ResultSection } from 'figma';
const instance = figma.selectedInstance;
function validateSections(sections: ResultSection[]): void {
    for (const section of sections) {
        if (
            section.type === 'ERROR' ||
            (section.type === 'INSTANCE' && !section.resultSections?.length)
        )
            throw new Error('Нет исполняемого Code Connect для содержимого CircularProgressBar');
        if (section.type === 'INSTANCE' && section.resultSections)
            validateSections(section.resultSections);
    }
}

const size = instance.getEnum('Size', {
    '16': 16,
    '24': 24,
    '48': 48,
    '64': 64,
    '80': 80,
    '96': 'unsupported',
    '128': 128,
    '144': 144,
});
if (size === 'unsupported')
    throw new Error('Size=96 отсутствует в ComponentSize текущего CircularProgressBar');
if (typeof size !== 'number') throw new Error('Неизвестный Size CircularProgressBar');
function flag(owner: InstanceHandle, name: string): boolean {
    const value = owner.getBoolean(name);
    if (typeof value !== 'boolean') throw new Error('Не найден Boolean: ' + name);
    return value;
}
const contentVisible = flag(instance, 'Content');
const circle = instance.findInstance('Circle');
if (circle.type !== 'INSTANCE') throw new Error('Не найден Circle');
const stroke = flag(circle, 'Stroke');
// Background is a paint override; its color must be provided explicitly if visible.
const background = flag(circle, 'Background');
let title: string | undefined;
let subtitle: string | undefined;
let customContent;
if (contentVisible) {
    const content = instance.findInstance('Content');
    if (content.type !== 'INSTANCE') throw new Error('Не найден Content');
    const type = content.getEnum('Type', {
        SwapMe: 'custom',
        Title: 'title',
        'Title+caption': 'caption',
        Icon: 'custom',
    });
    if (!type) throw new Error('Неизвестный Type содержимого CircularProgressBar');
    if (type === 'title' || type === 'caption') {
        if (size <= 24) throw new Error('Текстовое содержимое недоступно при Size<=24');
        const text = content.findText('_title');
        if (text.type !== 'TEXT') throw new Error('Не найден _title');
        title = text.textContent;
        if (type === 'caption') {
            if (size <= 64) throw new Error('Caption недоступен при Size<=64');
            const caption = content.findText('_caption');
            if (caption.type !== 'TEXT') throw new Error('Не найден _caption');
            subtitle = caption.textContent;
        }
    } else {
        const children = content.findLayers((n) => n.type === 'INSTANCE');
        if (!children.length)
            throw new Error('Замени SwapMe или Icon подключённым содержимым CircularProgressBar');
        customContent = children.map((child) => {
            if (child.type !== 'INSTANCE')
                throw new Error('Неподдержанное содержимое CircularProgressBar');
            if (!child.hasCodeConnect())
                throw new Error(
                    'Нет исполняемого Code Connect для содержимого CircularProgressBar',
                );
            const result = child.executeTemplate();
            validateSections(result.example);
            if (result.metadata?.nestable === false)
                throw new Error('Содержимое CircularProgressBar требует отдельного контекста');
            return result.example;
        });
    }
}
export default {
    id: 'core-circular-progress-bar',
    imports: [
        "import { CircularProgressBar, type CircularProgressBarProps } from '@alfalab/core-components/circular-progress-bar';",
    ],
    example: figma.code`function Example({ value, view${background ? ', circleColor' : ''} }: Pick<CircularProgressBarProps, 'value' | 'view'>${background ? " & { circleColor: NonNullable<CircularProgressBarProps['circleColor']> }" : ''}) {
   return <CircularProgressBar value={value} view={view} size={${size}} stroke={${stroke}} ${background ? 'circleColor={circleColor}' : ''} ${contentVisible && title !== undefined ? figma.code`title={${JSON.stringify(title)}}` : 'title={null}'} ${figma.helpers.react.renderProp('subtitle', subtitle)}>${customContent}</CircularProgressBar>;
 }`,
    metadata: { nestable: false },
};
