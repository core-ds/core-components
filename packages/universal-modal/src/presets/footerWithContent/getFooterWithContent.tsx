import { FooterPresetTypes } from '../../constants/footerPresetTypes';

type GetFooterWithContentProps = {
    labelLeft: string;
    labelRight: string;
};

export const getFooterWithContent = ({ labelLeft, labelRight }: GetFooterWithContentProps) => ({
    footer: undefined,
    footerPreset: {
        type: FooterPresetTypes.FooterWithContent,
        labelLeft,
        labelRight,
    },
});
