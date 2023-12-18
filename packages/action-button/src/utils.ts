import { getDataTestId } from '@alfalab/core-components-shared';

export function getActionButtonTestIds(dataTestId: string) {
    return {
        actionButton: dataTestId,
        spinner: getDataTestId(dataTestId, 'loader'),
    };
}
