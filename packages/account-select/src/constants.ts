export const ADD_CARD_KEY = '#ADD_NEW_CARD';

// Маски для каждого поля
export const CARD_MASK = [
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
export const EXPIRY_MASK = [/\d/, /\d/, '/', /\d/, /\d/];
export const CVV_MASK = [/\d/, /\d/, /\d/];
