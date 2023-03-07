export const SIGNS = ['-', '+'];
export const SEPARATORS = [',', '.'];

export function createSeparatorsRegExp() {
    return new RegExp(`[${SEPARATORS.map((s) => `\\${s}`).join('')}]`, 'g');
}

const getNumberRegExp = (fractionLength?: number): RegExp => {
    let reStr = '[0-9]+';

    if (fractionLength !== 0) {
        reStr = `${reStr}[${SEPARATORS.map((s) => `\\${s}`).join('')}]?[0-9]{0,${
            fractionLength || Number.MAX_SAFE_INTEGER
        }}`;
    }

    return new RegExp(`^${reStr}$`);
};

/**
 * Проверка вводимых значений.
 */
export const getAllowedValue = ({
    value = '',
    fractionLength,
    separator,
    allowSigns,
}: {
    value: string;
    fractionLength?: number;
    separator: string;
    allowSigns: boolean;
}): string => {
    const sign = allowSigns && SIGNS.some((s) => s === value[0]) ? value[0] : '';
    const testedValue = sign ? value.slice(1) : value;

    if (getNumberRegExp(fractionLength).test(testedValue)) {
        return value;
    }

    const [majorPart, minorPart] = testedValue
        .split(separator)
        .map((v) => v.replace(/[^0-9]/g, ''));

    return `${sign}${majorPart}${minorPart ? separator + minorPart.slice(0, fractionLength) : ''}`;
};
