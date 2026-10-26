// url=https://www.figma.com/design/kuet6sJd4irsHK8ea6kQZZ/Web----Core-ProgressBars?node-id=14-1576
// source=packages/hatching-progress-bar/src/index.ts
// component=HatchingProgressBar
import figma from 'figma';
export default {
    id: 'core-hatching-progress-bar',
    imports: [
        "import { HatchingProgressBar, type HatchingProgressBarProps } from '@alfalab/core-components/hatching-progress-bar';",
    ],
    example: figma.code`function Example({ value, hatchValue, view }: Pick<HatchingProgressBarProps, 'value' | 'hatchValue' | 'view'>) {
  if (![value, hatchValue].every(n => Number.isFinite(n) && n >= 0 && n <= 100)) throw new Error('value и hatchValue должны быть от 0 до 100');
  return <HatchingProgressBar value={value} hatchValue={hatchValue} view={view} />;
 }`,
    metadata: { nestable: false },
};
