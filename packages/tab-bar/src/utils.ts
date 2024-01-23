import { getDataTestId } from '@alfalab/core-components-shared';

export function getTabBarTestIds(dataTestId: string) {
    return {
        tabBar: dataTestId,
        tab: getDataTestId(dataTestId, 'tab'),
    };
}
