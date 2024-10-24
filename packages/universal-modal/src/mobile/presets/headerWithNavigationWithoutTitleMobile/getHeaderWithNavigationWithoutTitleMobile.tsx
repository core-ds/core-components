import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

export const getHeaderWithNavigationWithoutTitleMobile = () => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_NAVIGATION_WITHOUT_TITLE,
    },
});
