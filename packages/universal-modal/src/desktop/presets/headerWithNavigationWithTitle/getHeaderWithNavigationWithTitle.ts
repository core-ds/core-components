import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
    bigTitle?: boolean;
    lineClamp?: boolean;
    onBack: () => void;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
    onBack,
    bigTitle = false,
    lineClamp = false,
}: GetHeaderWithNavigationWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE,
        title,
        onBack,
        bigTitle,
        lineClamp,
    },
});
