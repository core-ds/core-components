import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithTitleProps = {
    title: string;
};

export const getHeaderWithTitle = ({ title }: GetHeaderWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_TITLE,
        title,
    },
});
