import { getDataTestId } from '@balafla/core-components-shared';

export function getPopupSheetTestIds(dataTestId: string) {
    return {
        popupSheet: dataTestId,
        closer: getDataTestId(dataTestId, 'closer'),
    };
}
