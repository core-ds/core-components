import { FooterPresetTypesMobile } from '../constants/footerPresetTypesMobile';
import { HeaderPresetTypesMobile } from '../constants/headerPresetTypesMobile';

export type TModalHeaderPresetMobile = {
    preset?: {
        type: (typeof HeaderPresetTypesMobile)[keyof typeof HeaderPresetTypesMobile];
        title?: string;
        subtitle?: string;
        onBack: () => void;
    };
};

export type TModalFooterPresetMobile = {
    footerPreset?: {
        type: (typeof FooterPresetTypesMobile)[keyof typeof FooterPresetTypesMobile];
        labelLeft?: string;
        labelRight?: string;
        layout?: 'start' | 'column';
        onClickLabelLeft: () => void;
        onClickLabelRight: () => void;
    };
};
