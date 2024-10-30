import { fnUtils } from '@alfalab/core-components-shared';

import { FooterPresetTypesMobile } from '../../constants/footerPresetTypesMobile';

type GetFooterWithContentMobileProps = {
    labelLeft: string;
    labelRight: string;
    layout?: 'start' | 'column';
    onClickLabelLeft: () => void;
    onClickLabelRight: () => void;
};

export const getFooterWithContentMobile = ({
    labelLeft,
    labelRight,
    layout = 'start',
    onClickLabelLeft = fnUtils.noop,
    onClickLabelRight = fnUtils.noop,
}: GetFooterWithContentMobileProps) => ({
    footerPreset: {
        type: FooterPresetTypesMobile.FOOTER_WITH_CONTENT,
        labelLeft,
        labelRight,
        layout,
        onClickLabelLeft,
        onClickLabelRight,
    },
});
