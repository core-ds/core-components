import { ElementType } from 'react';

import { PresetTypes } from '../../constants/presetTypes';

export type TMargin = number | 'auto';

export type TPreset = {
    preset?: {
        type: (typeof PresetTypes)[keyof typeof PresetTypes];
        title?: string;
        component: ElementType;
    };
};
