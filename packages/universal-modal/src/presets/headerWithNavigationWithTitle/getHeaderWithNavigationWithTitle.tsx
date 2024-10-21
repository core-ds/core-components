import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
}: GetHeaderWithNavigationWithTitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypes.HeaderWithNavigationWithTitle,
        title,
    },
});
