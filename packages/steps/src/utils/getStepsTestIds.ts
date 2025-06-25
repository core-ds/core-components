import { getDataTestId } from '@alfalab/core-components-shared';

export function getStepsTestIds(dataTestId: string) {
    return {
        steps: dataTestId,
        step: getDataTestId(dataTestId, 'step'),
    };
}
