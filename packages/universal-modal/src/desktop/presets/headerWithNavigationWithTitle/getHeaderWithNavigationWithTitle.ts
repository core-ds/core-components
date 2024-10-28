import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
}: GetHeaderWithNavigationWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_NAVIGATION_WITH_TITLE,
        title,
    },
});
