import { createUseMeasure } from '@alfalab/core-components-shared';

export const useMeasureHeight = createUseMeasure<HTMLElement, number>(
    ({ target: { offsetHeight } }) => offsetHeight,
    0,
);
