import React, { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { MaskedInput } from '@alfalab/core-components-masked-input';
import { InputProps } from '@alfalab/core-components-input';

export type NumberInputProps = InputProps & {
    /**
     * Учитывать знаки '+' и '-'
     */
    allowSigns?: boolean;

    /**
     * Знак ',' или '.'
     */
    separator?: '.' | ',';

    /**
     * Количество единицы после знака
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
            if (onChange) {
                onChange(event, payload);
            }

            if (uncontrolled) {
                setValue(payload.value);
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            const valueBlur = event.target.value
                .replace(new RegExp(`\\${separator}0+$`), '')
                .replace(new RegExp(`\\${separator}$`), '');

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
                {...restProps}
            />
        );
    },
);
