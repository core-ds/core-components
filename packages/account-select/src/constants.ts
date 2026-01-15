import { type MaskitoOptions } from '@maskito/core';

import { type Size } from '@alfalab/core-components-product-cover/typings';

export const ADD_CARD_KEY = '#ADD_NEW_CARD';

export const PRODUCT_COVER_SIZE_MAPPER: Record<number, Size> = {
    40: 32,
    48: 32,
    56: 32,
    64: 40,
    72: 48,
};

export const ERRORS = {
    CARD_NUMBER_ERROR: 'Номер карты введён неверно',
    CVV_EMPTY: 'Нужно заполнить CVC',
    EXPIRY_EMPTY: 'Нужно заполнить срок действия',
    EXPIRY_ERROR: 'Срок действия введен неверно',
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
