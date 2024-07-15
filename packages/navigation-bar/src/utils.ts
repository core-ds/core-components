import { getDataTestId } from '@alfalab/core-components-shared';

export function getNavigationBarTestIds(dataTestId: string) {
    return {
        navigationBar: dataTestId,
        title: getDataTestId(dataTestId, 'title'),
        subtitle: getDataTestId(dataTestId, 'subtitle'),
    };
}
