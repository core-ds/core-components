import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
    onBack: () => void;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
    onBack,
}: GetHeaderWithNavigationWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE,
        title,
        onBack,
    },
});
