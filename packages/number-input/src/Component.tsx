import React, { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { MaskedInput } from '@alfalab/core-components-masked-input';
import { InputProps } from '@alfalab/core-components-input';
import { TextMaskConfig } from 'text-mask-core';

export type NumberInputProps = InputProps & {
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
        const [value, setValue] = useState(defaultValue || '');

        const handleChange = (
            event: ChangeEvent<HTMLInputElement>,
            payload: {
                value: string;
            },
        ) => {
            const sign = event.target.value.slice(-1) === separator;

            if (sign) {
                const input = event.target;
                input.selectionStart = event.target.value.length;
            }

            if (onChange) {
                onChange(event, payload);
            }

            if (uncontrolled) {
                setValue(payload.value);
            }
        };

        const handleBeforeDisplay: TextMaskConfig['pipe'] = (
            conformedValue,
            { rawValue, previousConformedValue },
        ) => {
            const hasSign = conformedValue.includes(separator);
            const signDot = rawValue.substring(rawValue.length - 1) === '.';

            if (separator === ',' && signDot && !hasSign) {
                return rawValue.replace('.', ',');
            }

            const signComma = rawValue.substring(rawValue.length - 1) === ',';

            if (separator === '.' && signComma && !hasSign) {
                return rawValue.replace(',', '.');
            }

            const isTwoSign = rawValue.length - conformedValue.length >= 1;

            if (isTwoSign && previousConformedValue) {
                return previousConformedValue;
            }

            return conformedValue;
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            const valueBlur = event.target.value.replace(new RegExp(`\\${separator}$`), '');

            if (onChange) {
                onChange(event, { value: valueBlur });
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

        const visibleValue = uncontrolled ? value : propValue;

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
