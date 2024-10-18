import { PresetTypes } from '../../constants/presetTypes';

type GetHeaderWithTitleProps = {
    title: string;
};

export const getHeaderWithTitle = ({ title }: GetHeaderWithTitleProps) => ({
    header: undefined,
    preset: {
        type: PresetTypes.HeaderWithTitle,
        title,
    },
});
