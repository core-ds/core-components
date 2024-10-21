import { ElementType } from 'react';

import { FooterPresetTypes } from '../../constants/footerPresetTypes';
import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

export type TMargin = number | 'auto';

export type TModalHeaderPreset = {
    preset?: {
        type: (typeof HeaderPresetTypes)[keyof typeof HeaderPresetTypes];
        title?: string;
        component: ElementType;
    };
};

export type TModalFooterPreset = {
    footerPreset?: {
        type: (typeof FooterPresetTypes)[keyof typeof FooterPresetTypes];
        labelLeft?: string;
        labelRight?: string;
    };
};
