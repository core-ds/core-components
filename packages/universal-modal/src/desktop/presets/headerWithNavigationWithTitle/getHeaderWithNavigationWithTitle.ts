import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
    bigTitle?: boolean;
    onBack: () => void;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
    onBack,
    bigTitle = false,
}: GetHeaderWithNavigationWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE,
        title,
        onBack,
        bigTitle,
    },
});
