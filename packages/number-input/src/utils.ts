/* eslint-disable no-param-reassign */
import {
    MaskitoOptions,
    MaskitoPlugin,
    MaskitoPostprocessor,
    MaskitoPreprocessor,
    maskitoTransform,
} from '@maskito/core';

import { fnUtils } from '@alfalab/core-components-shared';

export const MINUS_SIGN = '-';
export const SEPARATORS = [',', '.'];
export const MAX_SAFE_INTEGER = 2 ** 53 - 1;
export const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;
export const MAX_DIGITS = 15; // с 16 уже упираемся в MAX_SAFE_INTEGER

export function parseNumber(value: string | number | null = '') {
    if (typeof value === 'number') return value;

    const pseudoSeparatorsRegExp = new RegExp(`[${SEPARATORS.join('')}]`, 'gi');

    return value
        ? parseFloat(
              value
                  .replace(new RegExp(`[^${MINUS_SIGN}${SEPARATORS.join('')}0-9]`, 'gi'), '')
                  .replace(pseudoSeparatorsRegExp, '.'),
          )
        : NaN;
}

/**
 * Преобразовать число в строку с заменой экспоненты на десятичную дробь
 */
export function stringifyNumberWithoutExp(value: number): string {
    const valueString = String(value);
    const [numberPart, expPart] = valueString.split('e-');

    let valueWithoutExp = valueString;

    if (expPart) {
        const [, fractionalPart] = numberPart.split('.');
        const decimalDigits = Number(expPart) + (fractionalPart?.length || 0);

        valueWithoutExp = value.toFixed(decimalDigits);
    }

    return valueWithoutExp;
}

const getNumberRegExp = (min: number, fractionLength: number): RegExp => {
    let reStr = '[0-9]*';

    if (min < 0) {
        reStr = `(\\${MINUS_SIGN})?${reStr}`;
    }

    if (fractionLength !== 0) {
        reStr = `${reStr}[${SEPARATORS.map((s) => `\\${s}`).join('')}]?[0-9]{0,${
            fractionLength || MAX_DIGITS
        }}`;
    }

    return new RegExp(`^${reStr}$`);
};

export function createMaskOptions({
    separator,
    fractionLength,
    min,
    max,
}: {
    separator: string;
    fractionLength: number;
    min: number;
    max: number;
}): MaskitoOptions {
    return {
        mask: getNumberRegExp(min, fractionLength),
        preprocessors: [
            createPseudoSeparatorPreprocessor(separator),
            createNotEmptyIntegerPartPreprocessor({ separator, fractionLength }),
            createZeroFractionLengthPreprocessor(fractionLength, separator),
            createRepeatedSeparatorPreprocessor(separator),
        ],
        postprocessors: [
            createLeadingZeroesValidationPostprocessor(separator),
            createMinMaxPostprocessor({ min, max, separator }),
        ],
        plugins: [createNotEmptyPartsPlugin(separator), createMinMaxPlugin({ min, max })],
    };
}

/**
 *  Заполняет целочисленную часть при вводе separator.
 *  @example Type , => 0,
 */
function createNotEmptyIntegerPartPreprocessor({
    separator,
    fractionLength,
}: {
    separator: string;
    fractionLength: number;
}): MaskitoPreprocessor {
    const startWithDecimalSepRegExp = new RegExp(`^\\D*\\${separator}`);

    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const [from] = selection;

        if (
            fractionLength <= 0 ||
            value.includes(separator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return { elementState, data };
        }

        const digitsBeforeCursor = value.slice(0, from).match(/\d+/);

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}

/**
 * Не позволяет вводить невалидный разделитель.
 */
function createPseudoSeparatorPreprocessor(separator: string): MaskitoPreprocessor {
    const pseudoSeparatorsRegExp = new RegExp(`[${SEPARATORS.join('')}]`, 'gi');

    return ({ elementState, data }) => {
        const { value, selection } = elementState;

        return {
            elementState: {
                selection,
                value: value.replace(pseudoSeparatorsRegExp, separator),
            },
            data: data.replace(pseudoSeparatorsRegExp, separator),
        };
    };
}

/**
 * Помогает верно обрезать значения при вставке, если fractionLength===0
 * @example paste 123,123 -> 123
 */
function createZeroFractionLengthPreprocessor(
    fractionLength: number,
    separator: string,
): MaskitoPreprocessor {
    if (fractionLength > 0) {
        return (state) => state;
    }

    const decimalPartRegExp = new RegExp(`\\${separator}.*$`, 'g');

    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const [from, to] = selection;
        const newValue = value.replace(decimalPartRegExp, '');

        return {
            elementState: {
                selection: [Math.min(from, newValue.length), Math.min(to, newValue.length)],
                value: newValue,
            },
            data: data.replace(decimalPartRegExp, ''),
        };
    };
}

/**
 *  Запрещает вводить второй сепаратор
 */
function createRepeatedSeparatorPreprocessor(separator: string): MaskitoPreprocessor {
    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const [from, to] = selection;

        return {
            elementState,
            data:
                !value.includes(separator) || value.slice(from, to + 1).includes(separator)
                    ? data
                    : data.replace(new RegExp(`\\${separator}`), ''),
        };
    };
}

/**
 * Удаляет лишние нули в начале целой части.
 * @example 0,|00005 => Backspace => |5
 * @example -0,|00005 => Backspace => -|5
 * @example "000000" => 0|
 * @example 0| => Type "5" => 5|
 */
function createLeadingZeroesValidationPostprocessor(separator: string): MaskitoPostprocessor {
    const trimLeadingZeroes = (value: string): string =>
        value
            .replace(new RegExp('^(\\D+)?0+(?=0)'), '$1')
            .replace(new RegExp('^(\\D+)?0+(?=[1-9])'), '$1');

    const countTrimmedZeroesBefore = (value: string, index: number): number => {
        const valueBefore = value.slice(0, index);
        const followedByZero = value.slice(index).startsWith('0');

        return (
            valueBefore.length - trimLeadingZeroes(valueBefore).length + (followedByZero ? 1 : 0)
        );
    };

    return ({ value, selection }) => {
        const [from, to] = selection;
        const hasSeparator = value.includes(separator);
        const [integerPart, decimalPart = ''] = value.split(separator);
        const zeroTrimmedIntegerPart = trimLeadingZeroes(integerPart);

        if (integerPart === zeroTrimmedIntegerPart) {
            return { value, selection };
        }

        const newFrom = from - countTrimmedZeroesBefore(value, from);
        const newTo = to - countTrimmedZeroesBefore(value, to);

        return {
            value: zeroTrimmedIntegerPart + (hasSeparator ? separator : '') + decimalPart,
            selection: [Math.max(newFrom, 0), Math.max(newTo, 0)],
        };
    };
}

/**
 * Валидирует значение с учетом min max значений.
 * Работает совместно с createMinMaxPlugin
 */
function createMinMaxPostprocessor({
    min,
    max,
    separator,
}: {
    min: number;
    max: number;
    separator: string;
}): MaskitoPostprocessor {
    return ({ value, selection }) => {
        const parsedNumber = parseNumber(value);

        const limitedValue =
            /**
             * Здесь невозможно ограничить нижнюю границу, если пользователь вводит положительное число.
             * То же самое для верхней границы и отрицательного числа.
             * Если min=5, то без этого условия не получится ввести 40, похожая ситуация и с отрицательным max
             */
            parsedNumber > 0 ? Math.min(parsedNumber, max) : Math.max(parsedNumber, min);

        if (!Number.isNaN(parsedNumber) && limitedValue !== parsedNumber) {
            const newValue = `${limitedValue}`.replace('.', separator);

            return {
                value: newValue,
                selection: [newValue.length, newValue.length],
            };
        }

        return {
            value,
            selection,
        };
    };
}

export function createMinMaxPlugin({ min, max }: { min: number; max: number }): MaskitoPlugin {
    return (element, options) => {
        const listener = () => {
            const parsedNumber = parseNumber(element.value);

            const clampedNumber = fnUtils.clamp(parsedNumber, min, max);

            if (!Number.isNaN(parsedNumber) && parsedNumber !== clampedNumber) {
                element.value = maskitoTransform(stringifyNumberWithoutExp(clampedNumber), options);
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };

        const evListenerOptions = { capture: true };

        element.addEventListener('blur', listener, evListenerOptions);

        return () => element.removeEventListener('blur', listener, evListenerOptions);
    };
}

export function createNotEmptyPartsPlugin(separator: string): MaskitoPlugin {
    return (element) => {
        const listener = () => {
            const newValue = element.value
                // 0,9000000 -> 0,9
                .replace(new RegExp(`(\\${separator}\\d*?)(0+$)`), '$1')
                // ,2 => 0,2
                .replace(new RegExp(`^(\\D+)?\\${separator}`), `$10${separator}`)
                // 0, -> 0
                .replace(new RegExp(`\\${separator}$`), '')
                // -0 -> 0
                .replace(new RegExp(`^${MINUS_SIGN}0$`), '0')
                // - -> ''
                .replace(new RegExp(`^${MINUS_SIGN}$`), '');

            if (newValue !== element.value) {
                element.value = newValue;
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };

        const evListenerOptions = { capture: true };

        element.addEventListener('blur', listener, evListenerOptions);

        return () => element.removeEventListener('blur', listener, evListenerOptions);
    };
}
