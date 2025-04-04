import { getDataTestId } from '@balafla/core-components-shared';

export function getBaseToastPlateTestIds(dataTestId: string) {
    return {
        badge: getDataTestId(dataTestId, 'badge'),
        component: getDataTestId(dataTestId, 'component'),
    };
}
