import { getDataTestId } from '@alfalab/core-components-shared';

export function getButtonTestIds(dataTestId: string) {
    return {
        button: dataTestId,
        spinner: getDataTestId(dataTestId, 'loader'),
    };
}
