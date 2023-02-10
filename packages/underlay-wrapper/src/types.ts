import { GapProps } from '@alfalab/core-components-gap';

import { BACKGROUND, BORDER_COLOR, SHADOW } from './consts';

export type BackgroundColorType = typeof BACKGROUND[number];

export type BorderColorType = typeof BORDER_COLOR[number];

export type ShadowType = typeof SHADOW[number];

export type PaddingType = Omit<GapProps['size'], '5xl' | '6xl' | '7xl' | '8xl'>;

export type PaddingPropType = {
    top?: PaddingType;
    right?: PaddingType;
    bottom?: PaddingType;
    left?: PaddingType;
};
