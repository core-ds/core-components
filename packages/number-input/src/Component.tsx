import React, { ChangeEvent, FocusEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { MaskedInput } from '@alfalab/core-components-masked-input';
import { InputProps } from '@alfalab/core-components-input';

export type NumberInputProps = InputProps & {
    /**
     * Учитывать знаки '+' и '-'
     */
    showSigns?: boolean;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    ({ value: propValue = '', onChange, onBlur, showSigns = true, ...restProps }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState(propValue);

        const handleChange = (
            event: ChangeEvent<HTMLInputElement>,
            payload: {
                value: string;
            },
        ) => {
            setValue(payload.value);

            if (onChange) {
                onChange(event, payload);
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            setValue(value.replace(/[,]0+$/, '').replace(/,$/, ''));

            if (onBlur) onBlur(event);
        };

        const handleMask = (valueInput: string) => {
            const mask = showSigns ? [/[+-\d]/] : [/\d/];

            if (valueInput.length <= 1) return mask;

            mask.push(...Array(valueInput.length - 1).fill(/\d/));

            const dotIndex = valueInput.indexOf(',');
            const startWithDigit = /[\d,]/.test(valueInput[0]);

            if (dotIndex > (startWithDigit ? 0 : 1)) {
                mask[dotIndex] = /[\d,]/;
            }

            return mask;
        };

        return (
            <MaskedInput
                ref={mergeRefs([ref, inputRef])}
                mask={handleMask}
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                inputMode='tel'
                pattern='[+-]?[0-9]+[,][0-9]*'
                {...restProps}
            />
        );
    },
);
