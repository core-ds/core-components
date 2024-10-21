import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithTitleProps = {
    title: string;
};

export const getHeaderWithTitle = ({ title }: GetHeaderWithTitleProps) => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypes.HeaderWithTitle,
        title,
    },
});
