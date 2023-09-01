import React, { FC, FocusEvent, forwardRef, useState } from 'react';
import cn from 'classnames';

import type { NumberInputProps } from '@alfalab/core-components-number-input';

import { getValidValue, isEmptyValue, isNumber, prepareString, valueToInt } from '../../utils';
import { Steppers } from '../steppers';

import styles from './index.module.css';

export type BaseStepperInputProps = Omit<
    NumberInputProps,
    | 'value'
    | 'onChange'
    | 'allowSigns'
    | 'separator'
    | 'fractionLength'
    | 'rightAddons'
    | 'success'
    | 'defaultValue'
> & {
    /**
     *  Значение поля
     */
    value?: string | number;

    /**
     * Значение по умолчанию
     * @default 0
     */
    defaultValue?: number;

    /**
     *  Минимальное допустимое значение
     *  @default 0
     */
    min?: number;

    /**
     *  Максимальное допустимое значение
     *  @default Number.MAX_SAFE_INTEGER
     */
    max?: number;

    /**
     *  Шаг инкремента/декремента. Используйте только целочисленные значения
     *  @default 1
     */
    step?: number;

    /**
     * Компонент ввода значения
     */
    Input: FC<NumberInputProps & { ref?: React.Ref<HTMLInputElement> }>;

    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: 'desktop' | 'mobile';

    /**
     * Обработчик события изменения значения
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement> | null,
        payload: {
            /**
             * Числовое значение инпута
             */
            value: number | null;
            /**
             * Строковое значение инпута
             * Используйте для изменения значения инпута
             */
            valueString: string;
        },
    ) => void;
};

const MAX_SAFE_INTEGER = 2 ** 53 - 1;
const MIN_SAFE_INTEGER = -MAX_SAFE_INTEGER;

export const BaseStepperInput = forwardRef<HTMLInputElement, BaseStepperInputProps>(
    (
        {
            value: valueProp,
            min: minProp,
            max: maxProp,
            defaultValue: defaultValueProp = 0,
            disableUserInput,
            step: stepProp = 1,
            Input,
            onChange,
            size = 'm',
            onFocus,
            onBlur,
            disabled,
            view,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const min = Math.max(MIN_SAFE_INTEGER, minProp ?? 0);
        const max = Math.min(MAX_SAFE_INTEGER, maxProp ?? MAX_SAFE_INTEGER);
        const defaultValue = getValidValue(defaultValueProp, min, max);
        const step = Math.round(stepProp);

        const [value, setValue] = useState<string>(defaultValue.toString());
        const [focused, setFocused] = useState(false);

        const uncontrolled = valueProp === undefined;
        const inputValue = valueProp ?? value;

        const handleChange: BaseStepperInputProps['onChange'] = (e, payload) => {
            const nextNumber = payload.value;
            const nextString = prepareString(payload.valueString);

            if (uncontrolled) {
                setValue(nextString);
            }

            onChange?.(e, { value: nextNumber, valueString: nextString });
        };

        const handleInputChange: NumberInputProps['onChange'] = (e, payload) => {
            const isFocusEvent = 'relatedTarget' in e;

            // Вызывается в onBlur у NumberInput
            if (isFocusEvent) {
                const isEmpty = isEmptyValue(payload.valueString);
                const validValue = getValidValue(inputValue, min, max);

                if (validValue.toString() !== inputValue.toString()) {
                    return handleChange(e, {
                        value: isEmpty ? defaultValue : validValue,
                        valueString: isEmpty ? defaultValue.toString() : validValue.toString(),
                    });
                }
            }

            // Запрещаем ввод цифр больше max.
            if (isNumber(payload.value) && payload.value > max) {
                if (max < 0 && payload.value < 0) return handleChange(e, payload);

                return handleChange(e, { value: max, valueString: max.toString() });
            }

            // Запрещаем ввод цифр меньше min.
            if (isNumber(payload.value) && payload.value < min) {
                if (min > 0 && payload.value > 0) return handleChange(e, payload);

                return handleChange(e, { value: min, valueString: min.toString() });
            }

            return handleChange(e, payload);
        };

        const handleIncrement = () => {
            const nextValue = isEmptyValue(inputValue)
                ? min
                : getValidValue(valueToInt(inputValue) + step, min, max);

            handleChange(null, { value: nextValue, valueString: nextValue.toString() });
        };

        const handleDecrement = () => {
            const nextValue = isEmptyValue(inputValue)
                ? max
                : getValidValue(valueToInt(inputValue) - step, min, max);

            handleChange(null, { value: nextValue, valueString: nextValue.toString() });
        };

        const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
            onFocus?.(e);

            if (view === 'desktop') {
                setFocused(true);
            }
        };

        const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
            onBlur?.(e);

            if (view === 'desktop') {
                setFocused(false);
            }
        };

        return (
            <Input
                {...restProps}
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                size={size}
                disableUserInput={disableUserInput}
                value={inputValue}
                onChange={handleInputChange}
                fractionLength={0}
                disabled={disabled}
                allowSigns={min < 0}
                dataTestId={dataTestId}
                rightAddons={
                    <Steppers
                        dataTestId={dataTestId}
                        disabled={disabled}
                        value={valueToInt(inputValue)}
                        min={min}
                        max={max}
                        className={cn(styles.steppers, styles[size], {
                            [styles.steppersFocused]: focused && view === 'desktop',
                        })}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                }
            />
        );
    },
);
