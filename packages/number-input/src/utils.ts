export const SIGNS = ['-', '+'];
export const SEPARATORS = [',', '.'];

export function createSeparatorsRegExp() {
    return new RegExp(`[${SEPARATORS.map((s) => `\\${s}`).join('')}]`, 'g');
}
