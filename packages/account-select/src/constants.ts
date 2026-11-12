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

export const EXPIRY_COMPLETE_REGEXP = /^\d{2}\/\d{2}$/;

export const CARD_NUMBER_LENGTH = 16;

export const CARD_MASK = Array.from({ length: CARD_NUMBER_LENGTH }, (_, index) =>
    index > 0 && index % 4 === 0 ? [' ', /\d/] : [/\d/],
).flat();

export const EXPIRY_MASK = [/\d/, /\d/, '/', /\d/, /\d/];

export const CVV_MASK = [/\d/, /\d/, /\d/];
