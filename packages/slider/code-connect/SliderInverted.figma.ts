// url=https://www.figma.com/design/lGWq8DtnUcSkRasagBuwq6/Web----Core?node-id=102817-22048
// source=packages/slider/src/index.ts
// component=Slider
import figma from 'figma';
const instance = figma.selectedInstance;
const size = instance.getEnum('Size', { '2': 2, '4': 4 });
const range = instance.getEnum('Mode', { Single: false, Range: true });
const pips = instance.getEnum('Pips', { False: false, True: true });
const dots = instance.getEnum('Dots', { False: false, True: true });
if (!size || range === undefined || pips === undefined || dots === undefined)
    throw new Error('Неизвестный вариант Slider');
// Числовой domain, значения и pips отсутствуют в Figma properties.
export default {
    id: 'core-SliderInverted',
    imports: ["import { Slider, type SliderProps } from '@alfalab/core-components/slider';"],
    example: figma.code`function Example({ min, max, step, value${range ? ', valueTo' : ''}${pips ? ', pips' : ''}, invertedThemeClassName }: { min: number; max: number; step: number; value: number; ${range ? 'valueTo: number; ' : ''}${pips ? "pips: NonNullable<SliderProps['pips']>; " : ''}invertedThemeClassName: string; }) {
        return <div className={invertedThemeClassName}><Slider size={${size}} min={min} max={max} step={step} value={value} ${range ? 'valueTo={valueTo}' : ''} ${pips ? 'pips={pips}' : ''} dots={${dots ? 'true' : 'false'}} /></div>;
    }`,
    metadata: { nestable: false },
};
