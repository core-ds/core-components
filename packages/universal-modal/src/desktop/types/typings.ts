import { ElementType } from 'react';

import { FooterPresetTypes } from '../../constants/footerPresetTypes';
import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

export type TMargin =
    | 0
    | 2
    | 4
    | 8
    | 12
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 64
    | 72
    | 80
    | 96
    | 128
    | 'auto';

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
        layout?: 'start' | 'column';
    };
};
