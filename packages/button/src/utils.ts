import { getDataTestId } from '@balafla/core-components-shared';

export function getButtonTestIds(dataTestId: string) {
    return {
        button: dataTestId,
        spinner: getDataTestId(dataTestId, 'loader'),
    };
}
