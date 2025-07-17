import { getDataTestId } from '@alfalab/core-components-shared';

export function getCheckboxGroupTestIds(dataTestId: string) {
    return {
        checkbox: dataTestId,
        label: getDataTestId(dataTestId, 'label'),
        hint: getDataTestId(dataTestId, 'hint'),
        error: getDataTestId(dataTestId, 'error'),
    };
}
