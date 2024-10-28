import { FooterPresetTypesMobile } from '../../constants/footerPresetTypesMobile';

type GetFooterWithContentMobileProps = {
    labelLeft: string;
    labelRight: string;
    layout?: 'start' | 'column';
};

export const getFooterWithContentMobile = ({
    labelLeft,
    labelRight,
    layout = 'start',
}: GetFooterWithContentMobileProps) => ({
    footerPreset: {
        type: FooterPresetTypesMobile.FOOTER_WITH_CONTENT,
        labelLeft,
        labelRight,
        layout,
    },
});
