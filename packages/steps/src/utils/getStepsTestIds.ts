import { getDataTestId } from '@balafla/core-components-shared';

export function getStepsTestIds(dataTestId: string) {
    return {
        steps: dataTestId,
        step: getDataTestId(dataTestId, 'step'),
    };
}
