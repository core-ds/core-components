import { TextProps } from '@balafla/core-components-typography';

export const WIDTH_TO_SIZE: Record<number, number> = {
    16: 24,
    32: 51,
    40: 65,
    48: 76,
    96: 152,
    128: 205,
    164: 264,
};

export const TYPOGRAPHY_VIEW_FOR_SIZE: Record<number, TextProps['view']> = {
    16: 'secondary-small',
    32: 'secondary-small',
    40: 'secondary-medium',
    48: 'secondary-medium',
    96: 'secondary-medium',
    128: 'primary-small',
    164: 'primary-medium',
};

export const SECOND_CARD_SIZE: Record<number, number> = {
    16: 16,
    32: 32,
    40: 40,
    128: 96,
};
