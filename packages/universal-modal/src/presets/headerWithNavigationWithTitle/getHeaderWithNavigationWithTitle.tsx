import { PresetTypes } from '../../constants/presetTypes';

type GetHeaderWithNavigationWithTitleProps = {
    title: string;
};

export const getHeaderWithNavigationWithTitle = ({
    title,
}: GetHeaderWithNavigationWithTitleProps) => ({
    header: undefined,
    preset: {
        type: PresetTypes.HeaderWithNavigationWithTitle,
        title,
    },
});
