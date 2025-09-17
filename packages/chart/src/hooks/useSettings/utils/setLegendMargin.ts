import { type BrushProps } from '../../../types/brush.types';
import { type LegendProps } from '../../../types/legend.types';

export const setLegendMargin = (brush: BrushProps, legend: LegendProps): number => {
    let top = 0;

    if (typeof brush?.brushMargin !== 'number' || !legend?.verticalAlign) return top;

    if (legend.verticalAlign === 'top') {
        top = legend.marginTop ? Number(legend.marginTop * -1) : 0;
    } else {
        top = legend?.marginTop ? legend.marginTop + (brush?.brushMargin || 0) : brush?.brushMargin;
    }

    return top;
};
