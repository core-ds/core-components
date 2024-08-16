import { getDataTestId } from '@alfalab/core-components-shared';

export function getPlateTestIds(dataTestId: string) {
    return {
        wrapper: dataTestId,
        title: getDataTestId(dataTestId, 'title'),
    };
}
