import { MaskitoOptions } from '@maskito/core';
import { Size } from '@alfalab/core-components-product-cover/typings';

export const ADD_CARD_KEY = '#ADD_NEW_CARD';

export const PRODUCT_COVER_SIZE_MAPPER: Record<number, Size> = {
    40: 32,
    48: 32,
    56: 40,
    64: 40,
    72: 48,
};

export const CARD_MASK: MaskitoOptions = {
    mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ],
};

export const EXPIRY_MASK: MaskitoOptions = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/],
};

export const CVV_MASK: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/],
};
