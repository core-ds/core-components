import { type ElementState } from '@maskito/core/lib/types';

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

export const CARD_COMPLETE_REGEXP = /^\d{12,19}$/;
export const EXPIRY_COMPLETE_REGEXP = /^\d{2}\/\d{2}$/;
export const CVC_COMPLETE_REGEXP = /^\d{3,4}$/;

export const CARD_MASK = (elementState: ElementState) => {
    const digits = elementState.value.replace(/\D/g, '');

    // 19-значные карты
    if (
        /^62/.test(digits) || // UnionPay
        /^(5[06-9]|6)/.test(digits) // Maestro
    ) {
        return [
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
            ' ',
            /\d/,
            /\d/,
            /\d/,
        ];
    }

    // 16-значные карты
    return [
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
    ];
};

export const EXPIRY_MASK = [/\d/, /\d/, '/', /\d/, /\d/];

export const CVV_MASK = [/\d/, /\d/, /\d/];
