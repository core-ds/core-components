import { getDataTestId } from '@balafla/core-components-shared';

export function getActionButtonTestIds(dataTestId: string) {
    return {
        actionButton: dataTestId,
        spinner: getDataTestId(dataTestId, 'loader'),
    };
}
