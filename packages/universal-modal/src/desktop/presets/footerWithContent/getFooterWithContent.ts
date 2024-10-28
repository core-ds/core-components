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
    footerPreset: {
        type: FooterPresetTypes.FOOTER_WITH_CONTENT,
        labelLeft,
        labelRight,
        layout,
    },
});
