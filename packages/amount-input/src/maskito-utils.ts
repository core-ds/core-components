/* eslint-disable no-plusplus */
import {
    type MaskitoElement,
    type MaskitoOptions,
    type MaskitoPlugin,
    type MaskitoPostprocessor,
    type MaskitoPreprocessor,
    maskitoTransform,
    maskitoUpdateElement,
} from '@maskito/core';
import { type MaskitoNumberParams } from '@maskito/kit';
import escapeRegExp from 'lodash/escapeRegExp';
import noop from 'lodash/noop';

import { type AmountInputProps } from './types';

type SelectionRange = [from: number, to: number];

interface NumberParts {
    minus: string;
    integerPart: string;
    decimalPart: string;
    decimalSeparator: string;
}

export type NumberParams = Required<
    Pick<
        MaskitoNumberParams,
        | 'decimalPseudoSeparators'
        | 'decimalSeparator'
        | 'maximumFractionDigits'
        | 'minusPseudoSigns'
        | 'minusSign'
        | 'thousandSeparator'
    >
>;

const NUMBER_DECIMAL_SEPARATOR = '.';

export const COMPONENT_DECIMAL_SEPARATOR = ',';
export const DEFAULT_DECIMAL_SEPARATORS = [
    NUMBER_DECIMAL_SEPARATOR,
    COMPONENT_DECIMAL_SEPARATOR,
    'б',
    'ю',
];

const NUMBER_MINUS_SIGN = '\u002d';

export const COMPONENT_MINUS_SIGN = '\u2212';
export const DEFAULT_MINUS_SIGNS = [NUMBER_MINUS_SIGN, '\u2013', '\u2014', COMPONENT_MINUS_SIGN];

const ZERO_AS_STRING = '0';

export function toValueAsString(value: number | string | null): string {
    return `${value ?? ''}`;
}

function getNotEmptySelection(
    value: string,
    [from, to]: SelectionRange,
    isForward: boolean,
): SelectionRange {
    if (from !== to) {
        return [from, to];
    }

    const notEmptySelection = isForward ? [from, to + 1] : [from - 1, to];

    return notEmptySelection.map((x) => Math.min(Math.max(x, 0), value.length)) as SelectionRange;
}

export function isInputValueCorrect(value: string, numberParams: NumberParams): boolean {
    const { decimalSeparator } = numberParams;
    const { minus, integerPart, decimalPart } = toNumberParts(value, numberParams);

    return (
        !value ||
        (integerPart === ZERO_AS_STRING && (!minus || /[1-9]/.test(decimalPart))) ||
        (/^[1-9]/.test(integerPart) && !value.endsWith(decimalSeparator))
    );
}

/**
 * -0,00 => 0,00
 * -0 => 0
 */
function dropMinusZeroPlugin(numberParams: NumberParams): MaskitoPlugin {
    const { minusSign } = numberParams;

    return maskitoEventHandler(
        'blur',
        (element) => {
            const { minus, integerPart, decimalPart, ...numberParts } = toNumberParts(
                element.value,
                numberParams,
            );

            if (minus === minusSign && integerPart === ZERO_AS_STRING && /^0*$/.test(decimalPart)) {
                const newValue = fromNumberParts(
                    { ...numberParts, integerPart, decimalPart },
                    numberParams,
                );

                maskitoUpdateElement(element, newValue);
            }
        },
        { capture: true },
    );
}

export function isCorrectValue(
    value: string | number | null,
    {
        integerLength,
        integersOnly,
        minority,
    }: Required<Pick<AmountInputProps, 'minority' | 'integersOnly' | 'integerLength'>>,
): boolean {
    const isValueInteger = value === 0 || (value && Number.isInteger(Number(value)));

    if (
        isValueInteger &&
        // minority must be 1 or a multiple of 10
        /^10*$/.test(toValueAsString(minority))
    ) {
        const { integerPart } = toNumberParts(toValueAsString(value), {
            minusSign: NUMBER_MINUS_SIGN,
            decimalSeparator: NUMBER_DECIMAL_SEPARATOR,
            maximumFractionDigits: 0,
        });
        const maximumFractionDigits = toFractionDigits(minority);
        const maximumIntegerDigits = toIntegerDigits(integerLength, maximumFractionDigits);

        return (
            integerPart.length <= maximumIntegerDigits + maximumFractionDigits &&
            (!integersOnly ||
                integerPart === ZERO_AS_STRING ||
                integerPart.endsWith(ZERO_AS_STRING.repeat(maximumFractionDigits)))
        );
    }

    return !value;
}

function deleteThousandSeparatorPreprocessorGenerator({
    thousandSeparator,
}: Pick<NumberParams, 'thousandSeparator'>): MaskitoPreprocessor {
    return ({ elementState, data }, inputType) => {
        if (inputType.includes('delete')) {
            const { value } = elementState;
            const [from, to] = elementState.selection;

            if (to - from === 1 && value[from] === thousandSeparator) {
                return {
                    elementState: {
                        value,
                        selection: inputType.includes('Forward') ? [from, to + 1] : [from - 1, to],
                    },
                    data,
                };
            }
        }

        return { elementState, data };
    };
}

export function toFractionDigits(minority: number) {
    return Math.min(Math.trunc(Math.log10(minority)), `${Number.MAX_SAFE_INTEGER}`.length - 2);
}

export function toIntegerDigits(integerLength: number, maximumFractionDigits: number): number {
    return Math.min(integerLength, `${Number.MAX_SAFE_INTEGER}`.length - maximumFractionDigits - 1);
}

/**
 * number operations like multiplication and division were not used intentionally
 */
export function toDecimalView(
    value: number | string | null,
    minority: number,
): number | string | null {
    const maximumFractionDigits = toFractionDigits(minority);

    if (maximumFractionDigits && value) {
        const { minus, integerPart } = toNumberParts(`${value}`, {
            minusSign: NUMBER_MINUS_SIGN,
            decimalSeparator: NUMBER_DECIMAL_SEPARATOR,
            maximumFractionDigits: 0,
        });
        const digits = integerPart.padStart(maximumFractionDigits + 1, ZERO_AS_STRING);

        return fromNumberParts(
            {
                minus,
                integerPart: digits.slice(0, -maximumFractionDigits),
                decimalPart: digits.slice(-maximumFractionDigits).replace(/0+$/, ''),
            },
            { decimalSeparator: NUMBER_DECIMAL_SEPARATOR },
        );
    }

    return value;
}

/**
 * number operations like multiplication and division were not used intentionally
 */
export function fromDecimalView(value: string | null, minority: number): number | null {
    if (value) {
        const maximumFractionDigits = toFractionDigits(minority);
        const { minus, integerPart, decimalPart } = toNumberParts(value, {
            minusSign: NUMBER_MINUS_SIGN,
            decimalSeparator: NUMBER_DECIMAL_SEPARATOR,
            maximumFractionDigits,
        });

        return Number(
            fromNumberParts({
                minus,
                integerPart,
                decimalPart: decimalPart.padEnd(maximumFractionDigits, ZERO_AS_STRING),
            }),
        );
    }

    return null;
}

export function stringifyNumber(value: number | string | null, numberParams: NumberParams): string {
    if (
        value === null ||
        value === '' ||
        Number.isNaN(Number(value)) ||
        !Number.isFinite(Number(value))
    ) {
        return '';
    }

    const { minus, integerPart, decimalPart } = toNumberParts(toValueAsString(value), {
        minusSign: NUMBER_MINUS_SIGN,
        decimalSeparator: NUMBER_DECIMAL_SEPARATOR,
        maximumFractionDigits: numberParams.maximumFractionDigits,
    });
    const valueAsString = fromNumberParts(
        {
            minus: minus ? numberParams.minusSign : '',
            integerPart,
            decimalPart,
        },
        numberParams,
    );
    const maximumIntegerDigits = toIntegerDigits(
        `${Number.MAX_SAFE_INTEGER}`.length - 1,
        numberParams.maximumFractionDigits,
    );
    const options = maskitoOptionsGenerator(numberParams, false, 'default', maximumIntegerDigits);

    return maskitoTransform(valueAsString, options);
}

export function toNumberFormat(value: string, numberParams: NumberParams): string {
    const { minus, decimalPart, integerPart } = toNumberParts(value, numberParams);
    const escapedThousandSeparator = escapeRegExp(numberParams.thousandSeparator);

    return fromNumberParts(
        {
            minus: minus ? NUMBER_MINUS_SIGN : '',
            integerPart: integerPart.replace(new RegExp(escapedThousandSeparator, 'g'), ''),
            decimalPart,
        },
        { decimalSeparator: NUMBER_DECIMAL_SEPARATOR },
    );
}

export function parseNumber(value: string, numberParams: NumberParams): string | null {
    return value ? toNumberFormat(value, numberParams) : null;
}

export function processDecimalPart(
    value: string,
    numberParams: NumberParams,
    view: 'default' | 'withZeroMinorPart',
): string {
    const { decimalPart, decimalSeparator, ...numberParts } = toNumberParts(value, numberParams);
    const nextDecimalPart =
        view === 'withZeroMinorPart' || /[1-9]/.test(decimalPart)
            ? decimalPart.padEnd(numberParams.maximumFractionDigits, ZERO_AS_STRING)
            : decimalPart.replace(/0+$/, '');

    return fromNumberParts({ ...numberParts, decimalPart: nextDecimalPart }, numberParams);
}

/**
 * copy-paste of createPseudoCharactersPreprocessor
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/processors/pseudo-character-preprocessor.ts#L11
 */
function createPseudoCharactersPreprocessor({
    validCharacter,
    pseudoCharacters,
    ...params
}: NumberParams & {
    validCharacter: string;
    pseudoCharacters: readonly string[];
}): MaskitoPreprocessor {
    const pseudoCharactersRegExp = new RegExp(`[${pseudoCharacters.join('')}]`, 'gi');

    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const numberParts = toNumberParts(value, params);

        return {
            elementState: {
                selection,
                value: fromNumberParts(numberParts, params).replace(
                    pseudoCharactersRegExp,
                    validCharacter,
                ),
            },
            data: data.replace(pseudoCharactersRegExp, validCharacter),
        };
    };
}

function createCleanDataPreprocessor({
    minusSign,
    decimalSeparator,
}: NumberParams): MaskitoPreprocessor {
    return ({ elementState, data }) => ({
        elementState,
        data: data.replace(
            new RegExp(`[^0-9${escapeRegExp(minusSign)}${escapeRegExp(decimalSeparator)}]`, 'g'),
            '',
        ),
    });
}

function createNumberDataPreprocessor(numberParams: NumberParams): MaskitoPreprocessor {
    const { maximumFractionDigits } = numberParams;
    const { minusSign, decimalSeparator } = numberParams;

    return ({ elementState, data }) => {
        if (
            new RegExp(
                `^${escapeRegExp(minusSign)}?[0-9]*(${escapeRegExp(decimalSeparator)}[0-9]*)?$`,
            ).test(data)
        ) {
            const { decimalPart, ...numberParts } = toNumberParts(data, numberParams);

            return {
                elementState,
                data: fromNumberParts(
                    {
                        ...numberParts,
                        decimalPart: decimalPart.slice(0, maximumFractionDigits),
                    },
                    numberParams,
                ),
            };
        }

        return {
            elementState,
            data: '',
        };
    };
}

function createValidNumberPreprocessor({
    maximumIntegerDigits,
    ...numberParams
}: NumberParams & { maximumIntegerDigits: number }): MaskitoPreprocessor {
    const { maximumFractionDigits, minusSign, decimalSeparator } = numberParams;
    const cleanDataPreprocessor = createCleanDataPreprocessor(numberParams);

    return ({ elementState, data }, inputType) => {
        const { value, selection } = elementState;
        const [from, to] = selection;

        const { data: nextValue = '' } = cleanDataPreprocessor(
            { elementState, data: value.slice(0, from) + data + value.slice(to) },
            inputType,
        );

        if (
            new RegExp(
                `^${escapeRegExp(minusSign)}?[0-9]*(${escapeRegExp(decimalSeparator)}[0-9]*)?$`,
            ).test(nextValue)
        ) {
            const { integerPart, decimalPart } = toNumberParts(nextValue, numberParams);

            if (
                integerPart.length <= maximumIntegerDigits &&
                decimalPart.length <= maximumFractionDigits
            ) {
                return { elementState, data };
            }
        }

        return {
            elementState: {
                value,
                selection,
            },
            data: '',
        };
    };
}

/**
 * copy-paste of createThousandSeparatorPostprocessor
 * @see  https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/processors/thousand-separator-postprocessor.ts#L11
 */
function createThousandSeparatorPostprocessor(numberParams: NumberParams): MaskitoPostprocessor {
    const { thousandSeparator } = numberParams;
    const isAllSpaces = (...chars: string[]): boolean => chars.every((x) => /\s/.test(x));

    return ({ value, selection }) => {
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;
        const { minus, integerPart, decimalSeparator, decimalPart } = toNumberParts(
            value,
            numberParams,
        );
        const deletedChars =
            fromNumberParts({ minus, integerPart, decimalSeparator, decimalPart }, numberParams)
                .length -
            (minus + integerPart + (decimalSeparator ? decimalSeparator + decimalPart : '')).length;

        if (deletedChars > 0 && initialFrom && initialFrom <= deletedChars) {
            from -= deletedChars;
        }

        if (deletedChars > 0 && initialTo && initialTo <= deletedChars) {
            to -= deletedChars;
        }

        const processedIntegerPart = Array.from(integerPart).reduceRight(
            (formattedValuePart, char, i) => {
                const isLeadingThousandSeparator = !i && char === thousandSeparator;
                const isPositionForSeparator =
                    !isLeadingThousandSeparator &&
                    Boolean(formattedValuePart.length) &&
                    (formattedValuePart.length + 1) % 4 === 0;
                const isSeparator =
                    char === thousandSeparator || isAllSpaces(char, thousandSeparator);

                if (isPositionForSeparator && isSeparator) {
                    return thousandSeparator + formattedValuePart;
                }

                if (!isPositionForSeparator && isSeparator) {
                    if (from && i <= initialFrom) {
                        from--;
                    }

                    if (to && i <= initialTo) {
                        to--;
                    }

                    return formattedValuePart;
                }

                if (!isPositionForSeparator) {
                    return char + formattedValuePart;
                }

                if (i < initialFrom) {
                    from++;
                }

                if (i < initialTo) {
                    to++;
                }

                return char + thousandSeparator + formattedValuePart;
            },
            '',
        );

        return {
            value: fromNumberParts(
                {
                    minus,
                    integerPart: processedIntegerPart,
                    decimalSeparator,
                    decimalPart,
                },
                numberParams,
            ),
            selection: [from, to],
        };
    };
}

/**
 * copy-paste of toNumberParts
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/utils/number-parts.ts#L14
 */
export function toNumberParts(
    value: string,
    params: Pick<NumberParams, 'decimalSeparator' | 'maximumFractionDigits' | 'minusSign'> &
        Partial<Pick<NumberParams, 'decimalPseudoSeparators' | 'minusPseudoSigns'>>,
): NumberParts {
    const {
        decimalSeparator,
        minusSign,
        minusPseudoSigns = [],
        decimalPseudoSeparators = [],
        maximumFractionDigits,
    } = params;
    const [integerWithMinus, decimalPart = ''] = decimalSeparator
        ? value.split(decimalSeparator)
        : [value];
    const minuses = [minusSign, ...minusPseudoSigns].map((x) => `\\${x}`).join('');
    const [, minus = '', integerPart = ''] =
        new RegExp(`^([${minuses}])?(.*)`).exec(integerWithMinus) || [];

    return {
        minus,
        integerPart,
        decimalPart,
        decimalSeparator:
            decimalSeparator && maximumFractionDigits > 0
                ? (new RegExp(
                      `[${[decimalSeparator, ...decimalPseudoSeparators].map(escapeRegExp).join('')}]`,
                      'i',
                  ).exec(value)?.[0] ?? '')
                : '',
    };
}

/**
 * copy-paste of fromNumberParts
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/utils/number-parts.ts#L58
 */
export function fromNumberParts(
    { minus = '', integerPart = '', decimalPart = '', decimalSeparator = '' }: Partial<NumberParts>,
    params: Pick<NumberParams, 'decimalSeparator'> = { decimalSeparator },
): string {
    const separator = decimalPart ? params.decimalSeparator : decimalSeparator;

    return `${minus}${integerPart}${separator}${decimalPart}`;
}

/**
 * copy-paste of maskitoSelectionChangeHandler
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/plugins/selection-change.ts#L3
 */
function selectionChangeHandler(
    handler: (
        element: MaskitoElement,
        options: Required<MaskitoOptions>,
        event: Event,
        selection: SelectionRange,
    ) => void,
): MaskitoPlugin {
    return (element, options) => {
        const document = element.ownerDocument;
        let isPointerDown = 0;
        const onPointerDown = (): number => isPointerDown++;
        const onPointerUp = (): void => {
            isPointerDown = Math.max(--isPointerDown, 0);
        };
        const { selectionStart, selectionEnd } = element;
        const selection: SelectionRange = [selectionStart ?? 0, selectionEnd ?? 0];

        const listener = (event: Event): void => {
            if (!element.matches(':focus')) {
                return;
            }

            if (isPointerDown) {
                document.addEventListener('mouseup', listener, {
                    once: true,
                    passive: true,
                });

                return;
            }

            handler(element, options, event, selection);
        };

        document.addEventListener('selectionchange', listener, { passive: true });
        // Safari does not fire `selectionchange` on focus after programmatic update of textfield value
        element.addEventListener('focus', listener, { passive: true });
        element.addEventListener('mousedown', onPointerDown, { passive: true });
        document.addEventListener('mouseup', onPointerUp, { passive: true });

        return () => {
            document.removeEventListener('selectionchange', listener);
            element.removeEventListener('focus', listener);
            element.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('mouseup', onPointerUp);
        };
    };
}

/**
 * copy-paste of createLeadingZeroesValidationPlugin
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/plugins/leading-zeroes-validation.plugin.ts#L15
 */
function createLeadingZeroesValidationPlugin({ thousandSeparator }: NumberParams): MaskitoPlugin {
    return maskitoEventHandler(
        'blur',
        (element) => {
            const escapedThousandSeparator = escapeRegExp(thousandSeparator);

            const newValue = element.value
                .replace(
                    // all leading zeroes followed by another zero
                    new RegExp(`^([^0-9]+)?[0${escapedThousandSeparator}]+(?=0)`),
                    '$1',
                )
                .replace(
                    // zero followed by not-zero digit
                    new RegExp(`^([^0-9]+)?[0${escapedThousandSeparator}]+(?=[1-9])`),
                    '$1',
                );

            maskitoUpdateElement(element, newValue);
        },
        { capture: true },
    );
}

/**
 * copy-paste of createNotEmptyIntegerPlugin
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/plugins/not-empty-integer.plugin.ts#L14
 */
function createNotEmptyIntegerPlugin(params: NumberParams): MaskitoPlugin {
    const { decimalSeparator } = params;

    if (!decimalSeparator) {
        return noop;
    }

    return maskitoEventHandler(
        'blur',
        (element) => {
            const numberParts = toNumberParts(element.value, params);
            const newValue = fromNumberParts(numberParts, params).replace(
                new RegExp(`^([^0-9]+)?${escapeRegExp(decimalSeparator)}`),
                `$10${decimalSeparator}`,
            );

            maskitoUpdateElement(element, newValue);
        },
        { capture: true },
    );
}

/**
 * copy-paste of createNotEmptyIntegerPartPreprocessor
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/processors/not-empty-integer-part-preprocessor.ts#L11
 */
function createNotEmptyIntegerPartPreprocessor(params: NumberParams): MaskitoPreprocessor {
    const { maximumFractionDigits, decimalSeparator } = params;
    const startWithDecimalSepRegExp = new RegExp(`^[^0-9]*${escapeRegExp(decimalSeparator)}`);

    return ({ elementState, data }) => {
        const { value, selection } = elementState;
        const [from, to] = selection;

        if (
            maximumFractionDigits <= 0 ||
            value.slice(0, from).includes(decimalSeparator) ||
            value.slice(to).includes(decimalSeparator) ||
            !data.match(startWithDecimalSepRegExp)
        ) {
            return { elementState, data };
        }

        const digitsBeforeCursor = /[0-9]+/.exec(value.slice(0, from));

        return {
            elementState,
            data: digitsBeforeCursor ? data : `0${data}`,
        };
    };
}

function maskitoEventHandler<K extends keyof HTMLElementEventMap>(
    name: K,
    handler: (
        element: MaskitoElement,
        options: Required<MaskitoOptions>,
        event: HTMLElementEventMap[K],
    ) => void,
    eventListenerOptions?: AddEventListenerOptions,
): MaskitoPlugin;
function maskitoEventHandler(
    name: string,
    handler: (element: MaskitoElement, options: Required<MaskitoOptions>, event: Event) => void,
    eventListenerOptions?: AddEventListenerOptions,
): MaskitoPlugin;
function maskitoEventHandler(
    name: string,
    handler: (element: MaskitoElement, options: Required<MaskitoOptions>, event: Event) => void,
    eventListenerOptions?: AddEventListenerOptions,
): MaskitoPlugin {
    return (element, maskitoOptions) => {
        const listener = (event: Event): void => handler(element, maskitoOptions, event);

        element.addEventListener(name, listener, eventListenerOptions);

        return () => element.removeEventListener(name, listener, eventListenerOptions);
    };
}

const maskitoRejectEvent = (onReject: () => void = noop): MaskitoPlugin =>
    mergePlugins([
        /**
         * copy-paste of maskitoRejectEvent
         * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/plugins/reject-event.ts#L3
         */
        maskitoEventHandler(
            'beforeinput',
            (element) => {
                const { value } = element;

                element.addEventListener(
                    'beforeinput',
                    (event) => {
                        if (
                            event.defaultPrevented &&
                            (event.inputType.startsWith('delete')
                                ? event.inputType !== 'deleteByDrag'
                                : element.value) &&
                            value === element.value
                        ) {
                            dispatchInputRejectEvent(element);
                        }
                    },
                    { once: true },
                );
            },
            { capture: true },
        ),
        maskitoEventHandler('maskitoReject', onReject),
    ]);

function preventDeletePlugin({
    maximumIntegerDigits,
    ...numberParams
}: NumberParams & { maximumIntegerDigits: number }): MaskitoPlugin {
    const validNumberPreprocessor = createValidNumberPreprocessor({
        maximumIntegerDigits,
        ...numberParams,
    });

    return maskitoEventHandler(
        'beforeinput',
        (element, __, event) => {
            const from = element.selectionStart ?? 0;
            const to = element.selectionEnd ?? 0;

            if (
                (from !== to &&
                    event.inputType.startsWith('delete') &&
                    event.inputType !== 'deleteByDrag') ||
                event.inputType === 'deleteByCut' ||
                event.inputType === 'deleteContentBackward' ||
                event.inputType === 'deleteContentForward'
            ) {
                const isForward = event.inputType.includes('Forward');
                const { data } = validNumberPreprocessor(
                    {
                        elementState: {
                            value: element.value,
                            selection: getNotEmptySelection(element.value, [from, to], isForward),
                        },
                        data: 'ok',
                    },
                    isForward ? 'deleteForward' : 'deleteBackward',
                );

                if (data !== 'ok') {
                    event.stopPropagation();
                    event.preventDefault();
                    dispatchInputRejectEvent(element);
                }
            }
        },
        { capture: true },
    );
}

const preventDotSpaceInputPlugin = maskitoEventHandler('beforeinput', (_, __, event) => {
    if (event.inputType === 'insertText' && event.data === '. ') {
        event.preventDefault();
    }
});

function processDecimalPartPlugin(
    numberParams: NumberParams,
    view: 'default' | 'withZeroMinorPart',
) {
    return maskitoEventHandler('blur', (element) => {
        const nextValue = processDecimalPart(element.value, numberParams, view);

        maskitoUpdateElement(element, nextValue);
    });
}

function selectionPlugin(numberParams: NumberParams): MaskitoPlugin {
    let isSpaceKey = false;

    return mergePlugins([
        maskitoEventHandler('keydown', (_, __, event) => {
            isSpaceKey = event.key === ' ';
        }),
        selectionChangeHandler((element, _, event, selection) => {
            /**
             * workaround for double-space-to-dot&space feature
             * that feature breaks caret position defined in {@link selectionChangeHandler} handler
             */
            if (isSpaceKey) {
                const [from, to] = selection;

                isSpaceKey = false;
                element.setSelectionRange(from, to);
            } else {
                const input = element as HTMLInputElement;
                const { value } = input;
                const direction = input.selectionDirection ?? undefined;
                let from = input.selectionStart ?? 0;
                let to = input.selectionEnd ?? 0;
                const [prevFrom, prevTo] = selection;

                Object.assign(selection, [from, to]);

                if (value[from] === numberParams.thousandSeparator) {
                    from += event.type !== 'mouseup' && prevFrom > from ? -1 : 1;
                }

                if (value[to] === numberParams.thousandSeparator) {
                    to += event.type !== 'mouseup' && prevTo > to ? -1 : 1;
                }

                if (input.selectionStart !== from || input.selectionEnd !== to) {
                    input.setSelectionRange(from, to, direction);
                }
            }
        }),
        maskitoEventHandler('blur', () => {
            isSpaceKey = false;
        }),
    ]);
}

export function clipboardPlugin(numberParams: NumberParams): MaskitoPlugin {
    return maskitoEventHandler(
        // only copy. cut brakes undo/redo behaviour
        'copy',
        (element, _, event): void => {
            const document = element.ownerDocument;
            const selection = document.getSelection();

            if (selection) {
                const clipboardValue = toNumberFormat(`${selection}`, numberParams);

                event.clipboardData?.setData('text/plain', clipboardValue);
                event.preventDefault();
            }
        },
    );
}

function mergePlugins(plugins: MaskitoPlugin[]): MaskitoPlugin {
    return (element, options) => {
        const disposers = plugins.map((plugin) => plugin(element, options));

        return () => {
            disposers.forEach((disposer) => disposer?.());
        };
    };
}

export function dispatchInputRejectEvent(element: EventTarget | null) {
    element?.dispatchEvent(new CustomEvent('maskitoReject', { bubbles: true }));
}

export function isEquivalentInput(
    a: string,
    b: string,
    { decimalSeparator }: Pick<NumberParams, 'decimalSeparator'>,
): boolean {
    return (
        Boolean(a) &&
        b.startsWith(a) &&
        b.length > a.length &&
        new RegExp(`^${escapeRegExp(decimalSeparator)}?0*$`).test(b.slice(a.length - b.length))
    );
}

function maskGenerator(numberParams: NumberParams, posivite: boolean) {
    const { minusSign, maximumFractionDigits, thousandSeparator, decimalSeparator } = numberParams;

    return new RegExp(
        `^${posivite ? '' : `${escapeRegExp(minusSign)}?`}[0-9${escapeRegExp(thousandSeparator)}]*${maximumFractionDigits ? `(${escapeRegExp(decimalSeparator)}[0-9]{0,${maximumFractionDigits}})?` : ''}$`,
    );
}

export function maskitoOptionsGenerator(
    numberParams: NumberParams,
    posivite: boolean,
    view: 'default' | 'withZeroMinorPart',
    maximumIntegerDigits: number,
    onInputReject?: () => void,
): MaskitoOptions {
    const { minusSign, decimalSeparator } = numberParams;

    return {
        mask: maskGenerator(numberParams, posivite),
        plugins: [
            selectionPlugin(numberParams),
            preventDotSpaceInputPlugin,
            preventDeletePlugin({ maximumIntegerDigits, ...numberParams }),
            createLeadingZeroesValidationPlugin(numberParams),
            createNotEmptyIntegerPlugin(numberParams),
            dropMinusZeroPlugin(numberParams),
            processDecimalPartPlugin(numberParams, view),
            clipboardPlugin(numberParams),
            maskitoRejectEvent(onInputReject),
        ],
        preprocessors: [
            deleteThousandSeparatorPreprocessorGenerator(numberParams),
            createPseudoCharactersPreprocessor({
                pseudoCharacters: numberParams.decimalPseudoSeparators,
                validCharacter: decimalSeparator,
                ...numberParams,
            }),
            createPseudoCharactersPreprocessor({
                pseudoCharacters: numberParams.minusPseudoSigns,
                validCharacter: minusSign,
                ...numberParams,
            }),
            createCleanDataPreprocessor(numberParams),
            createNumberDataPreprocessor(numberParams),
            createValidNumberPreprocessor({ maximumIntegerDigits, ...numberParams }),
            createNotEmptyIntegerPartPreprocessor(numberParams),
        ],
        postprocessors: [createThousandSeparatorPostprocessor(numberParams)],
        overwriteMode: 'shift',
    };
}
