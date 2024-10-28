import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

export const getHeaderWithNavigationWithoutTitle = () => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITHOUT_TITLE,
    },
});
