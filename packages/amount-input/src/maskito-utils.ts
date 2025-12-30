/* eslint-disable no-plusplus */
import {
    type MaskitoElement,
    maskitoInitialCalibrationPlugin,
    type MaskitoOptions,
    type MaskitoPlugin,
    type MaskitoPostprocessor,
    type MaskitoPreprocessor,
    maskitoTransform,
    maskitoUpdateElement,
} from '@maskito/core';
import { type MaskitoNumberParams, maskitoRejectEvent } from '@maskito/kit';
import escapeRegExp from 'lodash/escapeRegExp';
import noop from 'lodash/noop';

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

export const DEFAULT_DECIMAL_SEPARATORS = ['.', ',', 'б', 'ю'];
export const DEFAULT_MINUS_SIGNS = ['\u002d', '\u2013', '\u2014', '\u2212'];
export const MINUS_SIGN = '\u2212';

function createClipboardHandler(numberParams: NumberParams) {
    return (element: MaskitoElement, _: Required<MaskitoOptions>, event: ClipboardEvent): void => {
        const document = element.ownerDocument;
        const selection = document.getSelection();

        if (selection) {
            const clipboardValue = toNumberFormat(selection.toString(), numberParams);

            event.clipboardData?.setData('text/plain', clipboardValue);
            event.preventDefault();
        }
    };
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

export function stringifyNumber(value: number | string | null, numberParams: NumberParams): string {
    if (value === '' || value === null || value === numberParams.minusSign) {
        return '';
    }

    const stringValue = `${Number(value) / 10 ** numberParams.maximumFractionDigits}`
        .replace('.', numberParams.decimalSeparator)
        .replace('-', numberParams.minusSign);
    const options = maskitoOptionsGenerator(numberParams, false, 'default', 15);

    return maskitoTransform(stringValue, options);
}

export function toNumberFormat(
    numberValue: string,
    { minusSign, decimalSeparator }: Pick<NumberParams, 'minusSign' | 'decimalSeparator'>,
): string {
    return numberValue
        .replace(new RegExp(`[^0-9${minusSign}${decimalSeparator}]`, 'g'), '')
        .replace(minusSign, '-')
        .replace(decimalSeparator, '.');
}

export function parseNumber(
    value: string,
    numberParams: Pick<NumberParams, 'decimalSeparator' | 'minusSign' | 'maximumFractionDigits'>,
): null | number {
    const num = Number(toNumberFormat(value, numberParams));

    return Number.isNaN(num) ? null : Math.round(num * 10 ** numberParams.maximumFractionDigits);
}

export function appendDecimalPart(
    val: string,
    numberParams: NumberParams,
    view: 'default' | 'withZeroMinorPart',
): string {
    let value = new RegExp(`^${numberParams.minusSign}0${numberParams.decimalSeparator}?$`).test(
        val,
    )
        ? '0'
        : val;
    let decimalSeparatorIndex = value.indexOf(numberParams.decimalSeparator);

    if (decimalSeparatorIndex === -1) {
        if (view === 'default' || value === '') {
            return value;
        }

        if (numberParams.maximumFractionDigits) {
            value = `${value}${numberParams.decimalSeparator}`;
            decimalSeparatorIndex = value.length - 1;
        }
    }

    if (
        view === 'default' &&
        (decimalSeparatorIndex === value.length - 1 ||
            /^0+$/.test(value.slice(decimalSeparatorIndex + 1)))
    ) {
        value = value.slice(0, decimalSeparatorIndex);
    } else if (numberParams.maximumFractionDigits) {
        value = value.padEnd(decimalSeparatorIndex + 1 + numberParams.maximumFractionDigits, '0');
    }

    return value;
}

/**
 * copy-paste of createPseudoCharactersPreprocessor
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/processors/pseudo-character-preprocessor.ts#L11
 */
export function createPseudoCharactersPreprocessor({
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

export function createCleanDataPreprocessor({
    minusSign,
    decimalSeparator,
}: NumberParams): MaskitoPreprocessor {
    return ({ elementState, data }) => ({
        elementState,
        data: data.replace(new RegExp(`[^0-9${minusSign}${decimalSeparator}]`, 'g'), ''),
    });
}

export function createDataNumberPreprocessor(params: NumberParams): MaskitoPreprocessor {
    const { maximumFractionDigits } = params;
    const { minusSign, decimalSeparator } = params;

    return ({ elementState, data }) => {
        if (
            new RegExp(`^${minusSign}?[0-9]*(${escapeRegExp(decimalSeparator)}[0-9]*)?$`).test(data)
        ) {
            const { decimalPart, ...numberParts } = toNumberParts(data, params);

            return {
                elementState,
                data: fromNumberParts(
                    {
                        ...numberParts,
                        decimalPart: decimalPart.slice(0, maximumFractionDigits),
                    },
                    params,
                ),
            };
        }

        return {
            elementState,
            data: '',
        };
    };
}

export function createValidNumberPreprocessor({
    maximumIntegerDigits,
    ...params
}: NumberParams & { maximumIntegerDigits: number }): MaskitoPreprocessor {
    const { maximumFractionDigits, minusSign, decimalSeparator } = params;

    // eslint-disable-next-line no-param-reassign
    maximumIntegerDigits = Math.min(
        maximumIntegerDigits,
        `${Number.MAX_SAFE_INTEGER}`.length - maximumFractionDigits - 1,
    );

    const cleanDataPreprocessor = createCleanDataPreprocessor(params);

    return ({ elementState, data }, inputType) => {
        const { value } = elementState;
        let { selection } = elementState;
        const [from, to] = selection;

        const { data: nextValue = '' } = cleanDataPreprocessor(
            { elementState, data: value.slice(0, from) + data + value.slice(to) },
            inputType,
        );

        if (new RegExp(`^${minusSign}?[0-9]*(${decimalSeparator}[0-9]*)?$`).test(nextValue)) {
            const { integerPart, decimalPart } = toNumberParts(nextValue, params);

            if (
                integerPart.length <= maximumIntegerDigits &&
                decimalPart.length <= maximumFractionDigits
            ) {
                return { elementState, data };
            }
        }

        if (inputType === 'deleteForward') {
            selection = [to, to];
        } else if (inputType === 'deleteBackward') {
            selection = [from, from];
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
export function createThousandSeparatorPostprocessor(params: NumberParams): MaskitoPostprocessor {
    const { thousandSeparator } = params;
    const isAllSpaces = (...chars: string[]): boolean => chars.every((x) => /\s/.test(x));

    return ({ value, selection }) => {
        const [initialFrom, initialTo] = selection;
        let [from, to] = selection;
        const { minus, integerPart, decimalSeparator, decimalPart } = toNumberParts(value, params);
        const deletedChars =
            fromNumberParts({ minus, integerPart, decimalSeparator, decimalPart }, params).length -
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
                params,
            ),
            selection: [from, to],
        };
    };
}

interface NumberParts {
    minus: string;
    integerPart: string;
    decimalPart: string;
    decimalSeparator: string;
}

/**
 * copy-paste of toNumberParts
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/masks/number/utils/number-parts.ts#L14
 */
export function toNumberParts(value: string, params: NumberParams): NumberParts {
    const {
        decimalSeparator,
        minusSign,
        minusPseudoSigns,
        decimalPseudoSeparators,
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
    params: Pick<Required<MaskitoNumberParams>, 'decimalSeparator' | 'minusSign'>,
): string {
    const separator = decimalPart ? params.decimalSeparator : decimalSeparator;

    return `${minus}${integerPart}${separator}${decimalPart}`;
}

/**
 * copy-paste of maskitoSelectionChangeHandler
 * @see https://github.com/taiga-family/maskito/blob/70c50e7eea6209df6cda7ff311df9a4ba1b1c192/projects/kit/src/lib/plugins/selection-change.ts#L3
 */
export function selectionChangeHandler(
    handler: (
        element: MaskitoElement,
        options: Required<MaskitoOptions>,
        event: Event,
        selection: Record<'selectionStart' | 'selectionEnd', number>,
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
        const selection: Record<'selectionStart' | 'selectionEnd', number> = {
            selectionStart: Number(selectionStart),
            selectionEnd: Number(selectionEnd),
        };

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
export function createLeadingZeroesValidationPlugin({
    thousandSeparator,
}: NumberParams): MaskitoPlugin {
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
export function createNotEmptyIntegerPlugin(params: NumberParams): MaskitoPlugin {
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
export function createNotEmptyIntegerPartPreprocessor(params: NumberParams): MaskitoPreprocessor {
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

export function maskitoOptionsGenerator(
    numberParams: NumberParams,
    posivite: boolean,
    view: 'default' | 'withZeroMinorPart',
    maximumIntegerDigits: number,
    onInputReject: () => void = noop,
): MaskitoOptions {
    const { minusSign, maximumFractionDigits, thousandSeparator, decimalSeparator } = numberParams;
    const clipboardHandler = createClipboardHandler(numberParams);
    let isSpace = false;

    return {
        mask: new RegExp(
            `^${posivite ? '' : `${minusSign}?`}[0-9${thousandSeparator}]*${maximumFractionDigits ? `(${decimalSeparator}[0-9]{0,${maximumFractionDigits}})?` : ''}$`,
        ),
        plugins: [
            maskitoInitialCalibrationPlugin(),
            maskitoEventHandler('keydown', (_, __, event) => {
                isSpace = event.code === 'Space';
            }),
            maskitoEventHandler('beforeinput', (_, __, event) => {
                if (event.inputType === 'insertText' && event.data === '. ') {
                    event.preventDefault();
                }
            }),
            maskitoEventHandler('blur', () => {
                isSpace = false;
            }),
            selectionChangeHandler((element, _, event, selection) => {
                /**
                 * workaround for double-space-to-dot&space feature
                 * that feature breaks caret position defined in {@link selectionChangeHandler} handler
                 */
                if (isSpace) {
                    isSpace = false;

                    element.setSelectionRange(selection.selectionStart, selection.selectionEnd);

                    return;
                }

                const input = element as HTMLInputElement;
                const { value } = input;
                const selectionDirection = input.selectionDirection ?? undefined;
                let selectionStart = Number(input.selectionStart);
                let selectionEnd = Number(input.selectionEnd);
                const prevSelection = { ...selection };

                Object.assign(selection, { selectionStart, selectionEnd });

                if (value[selectionStart] === numberParams.thousandSeparator) {
                    selectionStart +=
                        event.type !== 'mouseup' && prevSelection.selectionStart > selectionStart
                            ? -1
                            : 1;
                }

                if (value[selectionEnd] === numberParams.thousandSeparator) {
                    selectionEnd +=
                        event.type !== 'mouseup' && prevSelection.selectionEnd > selectionEnd
                            ? -1
                            : 1;
                }

                if (
                    !(input.selectionStart === selectionStart) ||
                    !(input.selectionEnd === selectionEnd)
                ) {
                    input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
                }
            }),
            createLeadingZeroesValidationPlugin(numberParams),
            createNotEmptyIntegerPlugin(numberParams),
            maskitoEventHandler('blur', (element) => {
                const nextValue = appendDecimalPart(element.value, numberParams, view);

                maskitoUpdateElement(element, nextValue);
            }),
            maskitoEventHandler('copy', clipboardHandler),
            maskitoEventHandler('cut', (element, options, event) => {
                const document = element.ownerDocument;
                const selection = document.getSelection();

                if (selection) {
                    clipboardHandler(element, options, event);

                    const { value } = element;
                    const selectionStart = Number(element.selectionStart);
                    const selectionEnd = Number(element.selectionEnd);
                    const nextValue = maskitoTransform(
                        value.slice(0, selectionStart) + value.slice(selectionEnd),
                        options,
                    );

                    maskitoUpdateElement(element, nextValue);
                }
            }),
            maskitoRejectEvent,
            maskitoEventHandler('maskitoReject', onInputReject),
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
            createDataNumberPreprocessor(numberParams),
            createValidNumberPreprocessor({
                maximumIntegerDigits,
                ...numberParams,
            }),
            createNotEmptyIntegerPartPreprocessor(numberParams),
        ],
        postprocessors: [createThousandSeparatorPostprocessor(numberParams)],
        overwriteMode: 'shift',
    };
}
