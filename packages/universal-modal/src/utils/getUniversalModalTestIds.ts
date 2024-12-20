import { getDataTestId } from '@alfalab/core-components-shared';

export function getUniversalModalTestIds(dataTestId: string) {
    return {
        modal: dataTestId,
        header: getDataTestId(dataTestId, 'header'),
        title: getDataTestId(dataTestId, 'header-title'),
        content: getDataTestId(dataTestId, 'content'),
        footer: getDataTestId(dataTestId, 'footer'),
    };
}
