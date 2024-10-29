import { HeaderPresetTypesMobile } from '../../constants/headerPresetTypesMobile';

type GetHeaderWithNavigationWithoutTitleMobileProps = {
    onBack: () => void;
};

export const getHeaderWithNavigationWithoutTitleMobile = ({
    onBack,
}: GetHeaderWithNavigationWithoutTitleMobileProps) => ({
    preset: {
        type: HeaderPresetTypesMobile.HEADER_WITH_NAVIGATION_WITHOUT_TITLE,
        onBack,
    },
});
