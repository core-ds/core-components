import { type MaskitoOptions, type MaskitoPreprocessor, maskitoUpdateElement } from '@maskito/core';
import {
    maskitoEventHandler,
    maskitoNumberOptionsGenerator,
    type MaskitoNumberParams,
    maskitoParseNumber,
    maskitoStringifyNumber,
} from '@maskito/kit';

export type NumberParams = Required<
    Pick<
        MaskitoNumberParams,
        | 'decimalSeparator'
        | 'thousandSeparator'
        | 'maximumFractionDigits'
        | 'minimumFractionDigits'
        | 'minusSign'
        | 'min'
        | 'max'
    >
>;

function appendZeroToDataPreprocessorGenerator(
    numberParams: Pick<NumberParams, 'decimalSeparator' | 'maximumFractionDigits'>,
): MaskitoPreprocessor {
    return ({ elementState, data }, actionType) => {
        const { value } = elementState;

        if (
            numberParams.maximumFractionDigits > 0 &&
            actionType === 'insert' &&
            value === '' &&
            (data.startsWith(numberParams.decimalSeparator) || data.startsWith('.'))
        ) {
            return { elementState, data: `${0}${data}` };
        }

        return { elementState, data };
    };
}

const forbidLeadingZeroPreprocessor =
    (numberParams: Pick<NumberParams, 'decimalSeparator'>): MaskitoPreprocessor =>
    ({ elementState, data }, actionType) => {
        const {
            selection: [from, to],
            value,
        } = elementState;

        const idx = value.indexOf(numberParams.decimalSeparator);

        if (
            actionType === 'insert' &&
            data === '0' &&
            value.length > 0 &&
            //
            /**
             * Не даем напечатать первый ноль, а так же если пытаются вставить после ноля
             * Например 0,00, не должны дать вставить ноль перед запятой
             */
            (from === 0 || (from === 1 && idx === 1 && value[0] === '0')) &&
            !(to === value.length)
        ) {
            return { elementState, data: '' };
        }

        return { elementState, data };
    };

function replaceLeadingZeroWithDataPreprocessorGenerator(
    numberParams: Pick<NumberParams, 'minusSign' | 'maximumFractionDigits' | 'decimalSeparator'>,
): MaskitoPreprocessor {
    return ({ elementState, data }, actionType) => {
        const { selection, value } = elementState;
        const REPLACED_VALUES = ['0', `${numberParams.minusSign}0`];

        if (numberParams.maximumFractionDigits) {
            REPLACED_VALUES.push(
                `0${numberParams.decimalSeparator}${'0'.repeat(numberParams.maximumFractionDigits)}`,
            );
        }

        const idx = REPLACED_VALUES.indexOf(value);

        if (
            actionType === 'insert' &&
            /^\d/.test(data) &&
            !(idx === -1) &&
            selection.every((v) => v === REPLACED_VALUES[idx].length)
        ) {
            return {
                elementState: { value: '', selection: [0, 0] },
                data,
            };
        }

        return { elementState, data };
    };
}

export function stringifyNumber(
    val: number | string | null,
    numberParams: NumberParams,
    view: 'default' | 'withZeroMinorPart',
): string {
    if (val === '' || val === null || val === numberParams.minusSign) return '';

    const value = maskitoStringifyNumber(
        Number(`${val}`) / 10 ** numberParams.maximumFractionDigits,
        numberParams,
    );

    const idx = value.indexOf(numberParams.decimalSeparator);

    if (view === 'default' && idx === -1) {
        return value;
    }

    return `${value}${'0'.repeat(idx + 1 + numberParams.maximumFractionDigits - value.length)}`;
}

export function parseNumber(value: string, numberParams: NumberParams): null | number {
    const num = maskitoParseNumber(value, numberParams);

    return Number.isNaN(num) ? null : Math.round(num * 10 ** numberParams.maximumFractionDigits);
}

export function maskitoOptionsGenerator(
    numberParams: NumberParams,
    view: 'default' | 'withZeroMinorPart',
): MaskitoOptions {
    const numberOptions = maskitoNumberOptionsGenerator(numberParams);

    return {
        ...numberOptions,
        plugins: [
            ...(numberOptions.plugins ?? []),
            maskitoEventHandler('blur', (element) => {
                const { value } = element;
                const idx = value.indexOf(numberParams.decimalSeparator);
                const numOrNull = parseNumber(
                    value.slice(0, idx === value.length - 1 ? -1 : value.length),
                    numberParams,
                );

                maskitoUpdateElement(element, stringifyNumber(numOrNull, numberParams, view));
            }),
        ],
        preprocessors: [
            appendZeroToDataPreprocessorGenerator(numberParams),
            forbidLeadingZeroPreprocessor(numberParams),
            replaceLeadingZeroWithDataPreprocessorGenerator(numberParams),
            ...(numberOptions.preprocessors ?? []),
        ],
    };
}
