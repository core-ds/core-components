// url=https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ/Web----Core-ProgressBars?node-id=10-409
// source=packages/stepped-progress-bar/src/index.ts
// component=SteppedProgressBar
import figma from 'figma';
const instance = figma.selectedInstance;
const showDescription = instance.getEnum('Description', { False: false, True: true });
if (typeof showDescription !== 'boolean')
    throw new Error('Неизвестный Description SteppedProgressBar');
// SLOT sections cannot be passed to maxStep/step: inspect actual BarItem states inside Steps.
instance.getSlot('Steps');
const items = instance.findLayers(
    (n) => n.type === 'INSTANCE' && (n.name === 'BarItem' || n.name === 'BarItem_Inverted'),
);
if (!items.length) throw new Error('Steps должен содержать BarItem');
let step = 0;
let blankSeen = false;
for (const item of items) {
    if (item.type !== 'INSTANCE') throw new Error('Шаг должен быть экземпляром BarItem');
    const filled = item.getEnum('View', { Color: true, Blank: false });
    if (typeof filled !== 'boolean') throw new Error('Неизвестный View BarItem');
    if (filled && blankSeen) throw new Error('Заполненные шаги должны идти непрерывно от начала');
    if (filled) step += 1;
    else blankSeen = true;
}
const maxStep = items.length;
let description = '';
if (showDescription) {
    const raw = instance.getString('✎ Description');
    const prefix = /^Шаг (X|\d+) из (Y|\d+):\s*/.exec(raw);
    if (!prefix) throw new Error('Description должен иметь префикс «Шаг X из Y:»');
    if (
        (prefix[1] !== 'X' && Number(prefix[1]) !== step) ||
        (prefix[2] !== 'Y' && Number(prefix[2]) !== maxStep)
    )
        throw new Error('Description не соответствует шагам');
    description = raw.slice(prefix[0].length);
    if (!description) throw new Error('Description без текста не поддерживается API');
}
export default {
    id: 'core-stepped-progress-bar-default',
    imports: [
        "import { SteppedProgressBar, type SteppedProgressBarProps } from '@alfalab/core-components/stepped-progress-bar';",
    ],
    example: figma.code`function Example({ view }: Pick<SteppedProgressBarProps, 'view'>) {
   return <SteppedProgressBar maxStep={${maxStep}} step={${step}} colors="default" ${figma.helpers.react.renderProp('description', showDescription ? description : undefined)} view={view} />;
 }`,
    metadata: { nestable: false },
};
