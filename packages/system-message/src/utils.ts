import { getDataTestId } from '@alfalab/core-components-shared';

export function getSystemMessageTestIds(dataTestId: string) {
    return {
        systemMessage: dataTestId,
        caption: getDataTestId(dataTestId, 'caption'),
        controls: getDataTestId(dataTestId, 'controls'),
        graphic: getDataTestId(dataTestId, 'graphic'),
        subtitle: getDataTestId(dataTestId, 'subtitle'),
        title: getDataTestId(dataTestId, 'title'),
    };
}
