import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

type GetHeaderWithTitleProps = {
    title: string;
    bigTitle?: boolean;
};

export const getHeaderWithTitle = ({ title, bigTitle = false }: GetHeaderWithTitleProps) => ({
    preset: {
        type: HeaderPresetTypes.HEADER_WITH_TITLE,
        title,
        bigTitle,
    },
});
