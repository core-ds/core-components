import React, {
    type ChangeEvent,
    type FocusEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Input } from '@alfalab/core-components-input';

import { HOURS_MINUTES_SEPARATOR } from '../../consts';
import { type InnerTimeInputProps } from '../../types';
import { isCompleteTime } from '../../utils';

const defaultTime = `00${HOURS_MINUTES_SEPARATOR}00`;

export const TimeInput = forwardRef<HTMLInputElement, InnerTimeInputProps>(
    (
        {
            autoCorrection,
            value: valueProp,
            defaultValue,
            clear,
            onClear,
            onChange,
            onInputChange,
            onBlur,
            ...restProps
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState(defaultValue);

        const lastValidTime = useRef(defaultTime);

        useEffect(() => {
            if (autoCorrection && !inputValue) {
                lastValidTime.current = defaultTime;
            }
        }, [autoCorrection, inputValue]);

        useEffect(() => {
            if (valueProp !== undefined) {
                setInputValue(valueProp);
            }
        }, [valueProp]);

        const callOnChange = (val: string) => {
            onChange?.(val);
            lastValidTime.current = val;
        };

        const changeInputValue = (val: string, event: ChangeEvent<HTMLInputElement> | null) => {
            onInputChange?.(event, { value: val });

            setInputValue(val);
            if (val === '' || isCompleteTime(val, true)) callOnChange(val);
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

            if (autoCorrection && inputValue && !isCompleteTime(inputValue, true)) {
                changeInputValue(lastValidTime.current, null);
            }
        };

        return (
            <Input
                {...restProps}
                clear={clear && isCompleteTime(inputValue, true)}
                onClear={valueProp === undefined ? handleClear : onClear}
                onBlur={handleBlur}
                onInput={handleInputChange}
                ref={ref}
                value={inputValue}
                inputMode='decimal'
            />
        );
    },
);
