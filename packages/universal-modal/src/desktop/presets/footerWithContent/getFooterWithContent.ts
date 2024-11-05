import { fnUtils } from '@alfalab/core-components-shared';

import { FooterPresetTypes } from '../../constants/footerPresetTypes';

type GetFooterWithContentProps = {
    labelLeft: string;
    labelRight: string;
    layout?: 'start' | 'column';
    bigButton?: boolean;
    onClickLabelLeft: () => void;
    onClickLabelRight: () => void;
};

export const getFooterWithContent = ({
    labelLeft,
    labelRight,
    layout = 'start',
    bigButton = false,
    onClickLabelLeft = fnUtils.noop,
    onClickLabelRight = fnUtils.noop,
}: GetFooterWithContentProps) => ({
    footerPreset: {
        type: FooterPresetTypes.FOOTER_WITH_CONTENT,
        labelLeft,
        labelRight,
        layout,
        bigButton,
        onClickLabelLeft,
        onClickLabelRight,
    },
});
