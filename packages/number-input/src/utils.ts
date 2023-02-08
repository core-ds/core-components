import { SEPARATORS } from './Component';

export function createSeparatorsRegExp() {
    return new RegExp(`[${SEPARATORS.map((s) => `\\${s}`).join('')}]`, 'g');
}
