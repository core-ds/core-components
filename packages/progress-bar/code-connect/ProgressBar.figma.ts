// url=https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ/Web----Core-ProgressBars?node-id=3-851
// source=packages/progress-bar/src/index.ts
// component=ProgressBar
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', { '4px': 4, '8px': 8 });
if (size === undefined) throw new Error('Неизвестный Size ProgressBar');
export default {
    id: 'core-progress-bar-default',
    imports: [
        "import { ProgressBar, type ProgressBarProps } from '@alfalab/core-components/progress-bar';",
    ],
    example: figma.code`function Example({ value, view }: Pick<ProgressBarProps, 'value' | 'view'>) {
   if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error('value должен быть от 0 до 100');
   return <ProgressBar value={value} view={view} size={${size}} colors="default" />;
 }`,
    metadata: { nestable: false },
};
