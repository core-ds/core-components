import { getDataTestId } from '@alfalab/core-components-shared';

export function getBaseToastPlateTestIds(dataTestId: string) {
    return {
        badge: getDataTestId(dataTestId, 'badge'),
        component: getDataTestId(dataTestId, 'component'),
    };
}
