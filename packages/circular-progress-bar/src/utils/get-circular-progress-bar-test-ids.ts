import { getDataTestId } from '@alfalab/core-components-shared';

export function getCircularProgressBarTestIds(dataTestId: string) {
    return {
        progressBar: dataTestId,
        title: getDataTestId(dataTestId, 'title'),
        subtitle: getDataTestId(dataTestId, 'subtitle'),
        circleProgressBar: getDataTestId(dataTestId, 'circle-progress-bar'),
        circleProgressValue: getDataTestId(dataTestId, 'circle-progress-value'),
    };
}
