import React, { ChangeEvent, FocusEvent, forwardRef, useRef, useState } from 'react';

import { Input } from '@alfalab/core-components-input';

import { InnerMonthInputProps } from '../../types';
import { isCompleteMonth } from '../../utils';

const defaultMonth = '01.1900';

export const MonthInput = forwardRef<HTMLInputElement, InnerMonthInputProps>((props, ref) => {
    const {
        onInputChange,
        onChange,
        onClear,
        onBlur,
        autoCorrection,
        clear,
        defaultValue,
        value = '',
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState(value ?? defaultValue);
    const prevValueProp = useRef(value);
    const lastValidMonth = useRef(defaultMonth);

    // getDerivedStateFromProps
    if ('value' in props && !(value === prevValueProp.current)) {
        prevValueProp.current = value;
        if (!(inputValue === value)) {
            setInputValue(value);
            lastValidMonth.current = isCompleteMonth(value) ? value : defaultMonth;
        }
    }

    const changeInputValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
        onInputChange?.(event, { value: val });
        setInputValue(val);

        const isComplete = isCompleteMonth(val);

        if (val === '' || isComplete) {
            onChange?.(val);
            lastValidMonth.current = isComplete ? val : defaultMonth;
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        changeInputValue(event.target.value, event);
    };

    const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        changeInputValue('', null);
        onClear?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);

        if (autoCorrection && inputValue && !isCompleteMonth(inputValue)) {
            changeInputValue(lastValidMonth.current, null);
        }
    };

    return (
        <Input
            {...restProps}
            ref={ref}
            clear={clear && isCompleteMonth(inputValue)}
            onClear={handleClear}
            onBlur={handleBlur}
            onInput={handleInputChange}
            value={inputValue}
            inputMode='decimal'
        />
    );
});
