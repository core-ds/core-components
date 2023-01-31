import React, { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { MaskedInput } from '@alfalab/core-components-masked-input';
import { InputProps } from '@alfalab/core-components-input';
import { TextMaskConfig } from 'text-mask-core';

export type NumberInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & {
    /**
     * Значение поля ввода
     */
    value?: string | number | null;

    /**
     * Учитывать знаки '+' и '-'
     */
    allowSigns?: boolean;

    /**
     * Разделитель ',' или '.'
     */
    separator?: '.' | ',';

    /**
     * Количество символов после разделителя
     */
    fractionLength?: number;

    /**
     * Обработчик события изменения значения
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: {
            /**
             * Числовое значение инпута
             */
            value: number | null;
            /**
             * Строковое значение инпута
             */
            valueString: string;
        },
    ) => void;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            value: propValue,
            onChange,
            onBlur,
            allowSigns = true,
            separator = ',',
            fractionLength,
            defaultValue,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = propValue === undefined;
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState<string>(defaultValue || '');

        const getNumberValueFromStr = (valueString: string) => {
            if (valueString.includes(',')) {
                return parseFloat(valueString.replace(',', '.'));
            }
            return parseFloat(valueString);
        };

        const handleChange = (
            event: ChangeEvent<HTMLInputElement>,
            payload: {
                value: string;
            },
        ) => {
            const input = event.target;
            const positionСursor = input.selectionStart || 0;

            if (input.value[positionСursor] === separator) {
                const index = (input.selectionStart as number) + 1;
                input.selectionStart = index;
            }

            if (onChange) {
                onChange(event, {
                    value: getNumberValueFromStr(input.value),
                    valueString: input.value,
                });
            }

            if (uncontrolled) {
                setValue(payload.value);
            }
        };

        const formatSeparatorValue = (separator: '.' | ',', rawValue: string) => {
            const singsRegexp = /\W+/;
            const sings = singsRegexp.exec(rawValue);

            if (sings && sings[0] !== ',' && sings[0] !== '.') {
                return rawValue.replace(sings[0], '');
            }

            const separatorRegexp = /\.|,/;
            if (rawValue.length === 1 && separatorRegexp.test(rawValue)) return '';

            if (separator === ',') {
                return rawValue.replace('.', ',');
            }

            if (separator === '.') {
                return rawValue.replace(',', '.');
            }

            return rawValue;
        };

        const handleBeforeDisplay: TextMaskConfig['pipe'] = (
            conformedValue,
            { rawValue, previousConformedValue },
        ) => {
            const isTwoSign = rawValue.length - conformedValue.length >= 1;
            const isOneSign = rawValue.length - conformedValue.length === 1;
            const signRegexp = /\.|,/;

            if (fractionLength === 0 && signRegexp.test(rawValue)) {
                return previousConformedValue;
            }

            const zeroRegexp = /^[+|-]?00+$/;

            if (zeroRegexp.test(rawValue)) {
                const index = rawValue.search(/[+|-]/) !== -1 ? 2 : 1;
                return rawValue.slice(0, index);
            }

            if (isTwoSign && previousConformedValue) {
                if (rawValue.length !== conformedValue.length && fractionLength) {
                    const valueLength = conformedValue.length - fractionLength;
                    const sign = separator === ',' ? '.' : ',';

                    if (
                        rawValue.indexOf(sign) !== valueLength &&
                        rawValue.indexOf(sign) !== conformedValue.length
                    ) {
                        return previousConformedValue;
                    }
                }

                const hasSign = conformedValue.includes(separator);

                if (!hasSign && isOneSign) {
                    return formatSeparatorValue(separator, rawValue);
                }
                return previousConformedValue;
            }

            if (isOneSign && !uncontrolled) {
                return formatSeparatorValue(separator, rawValue);
            }
            return conformedValue;
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            const valueBlur = event.target.value.replace(new RegExp(`\\${separator}$`), '');

            if (onChange) {
                onChange(event, {
                    value: getNumberValueFromStr(valueBlur),
                    valueString: valueBlur,
                });
            }

            if (uncontrolled) {
                setValue(valueBlur);
            }

            if (onBlur) onBlur(event);
        };

        const handleMask = (valueInput: string) => {
            let mask = allowSigns ? [/[+-\d]/] : [/\d/];

            if (valueInput.length <= 1) return mask;

            mask.push(...Array(valueInput.length - 1).fill(/\d/));

            const dotIndex = valueInput.indexOf(separator);
            const signRegexp = new RegExp(`[\\d${separator}]`);
            const startWithDigit = signRegexp.test(valueInput[0]);

            if (dotIndex > (startWithDigit ? 0 : 1)) {
                mask[dotIndex] = signRegexp;
            }

            if (fractionLength && dotIndex !== -1) {
                const endMaskLength = dotIndex + fractionLength + 1;
                mask = mask.slice(0, endMaskLength);
            }
            return mask;
        };

        const visibleValue = uncontrolled ? value : propValue?.toString();

        return (
            <MaskedInput
                ref={mergeRefs([ref, inputRef])}
                mask={handleMask}
                value={visibleValue}
                onBlur={handleBlur}
                onChange={handleChange}
                inputMode='decimal'
                onBeforeDisplay={handleBeforeDisplay}
                {...restProps}
            />
        );
    },
);
