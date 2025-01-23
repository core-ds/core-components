import { getDataTestId } from '@alfalab/core-components-shared';

export function getUniversalModalTestIds(dataTestId: string) {
    return {
        modal: dataTestId,
        title: getDataTestId(dataTestId, 'header-title'),
        header: getDataTestId(dataTestId, 'header'),
        content: getDataTestId(dataTestId, 'content'),
        footer: getDataTestId(dataTestId, 'footer'),
    };
}
