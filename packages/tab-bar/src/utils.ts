import { getDataTestId } from '@balafla/core-components-shared';

export function getTabBarTestIds(dataTestId: string) {
    return {
        tabBar: dataTestId,
        tab: getDataTestId(dataTestId, 'tab'),
    };
}
