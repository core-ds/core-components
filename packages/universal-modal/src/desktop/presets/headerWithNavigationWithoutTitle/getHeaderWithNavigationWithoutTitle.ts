import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithoutTitleProps = {
    onBack: () => void;
};

export const getHeaderWithNavigationWithoutTitle = ({
    onBack,
}: GetHeaderWithNavigationWithoutTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITHOUT_TITLE,
        onBack,
    },
});
