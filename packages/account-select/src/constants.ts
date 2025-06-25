import { MaskitoOptions } from '@maskito/core';

export const ADD_CARD_KEY = '#ADD_NEW_CARD';

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
