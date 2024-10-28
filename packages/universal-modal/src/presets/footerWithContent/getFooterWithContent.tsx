import { FooterPresetTypes } from '../../constants/footerPresetTypes';

type GetFooterWithContentProps = {
    labelLeft: string;
    labelRight: string;
    layout?: 'start' | 'column';
};

export const getFooterWithContent = ({
    labelLeft,
    labelRight,
    layout = 'start',
}: GetFooterWithContentProps) => ({
    footer: undefined,
    footerPreset: {
        type: FooterPresetTypes.FooterWithContent,
        labelLeft,
        labelRight,
        layout,
    },
});
