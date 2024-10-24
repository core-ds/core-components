import { FooterPresetTypesMobile } from '../../constants/footerPresetTypesMobile';

type GetFooterWithContentMobileProps = {
    labelLeft: string;
    labelRight: string;
    layout: 'row' | 'column';
};

export const getFooterWithContentMobile = ({
    labelLeft,
    labelRight,
    layout,
}: GetFooterWithContentMobileProps) => ({
    footer: undefined,
    footerPreset: {
        type: FooterPresetTypesMobile.FOOTER_WITH_CONTENT,
        labelLeft,
        labelRight,
        layout,
    },
});
