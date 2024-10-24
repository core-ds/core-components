import { HeaderPresetTypesMobile } from '../constants/headerPresetTypesMobile';

export type TModalHeaderPresetMobile = {
    preset?: {
        type: (typeof HeaderPresetTypesMobile)[keyof typeof HeaderPresetTypesMobile];
        title?: string;
        subtitle?: string;
    };
};
