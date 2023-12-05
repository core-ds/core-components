import React, {
    ChangeEvent,
    FC,
    FocusEvent,
    forwardRef,
    Ref,
    useEffect,
    useMemo,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import type { InputProps } from '@alfalab/core-components-input';
import { fnUtils, os } from '@alfalab/core-components-shared';

import {
    createMaskOptions,
    MAX_DIGITS,
    MAX_SAFE_INTEGER,
    MIN_SAFE_INTEGER,
    MINUS_SIGN,
    parseNumber,
    stringifyNumberWithoutExp,
} from '../../utils';
import { Steppers } from '../steppers';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export interface NumberInputProps
    extends Omit<InputProps, 'value' | 'onChange' | 'type' | 'defaultValue' | 'dataTestId'> {
    /**
     * Значение поля ввода
     */
    value?: string | number | null;

    /**
     *  Значение по-умолчанию
     */
    defaultValue?: string | number | null;

    /**
     * Разделитель ',' или '.'
     */
    separator?: '.' | ',';

    /**
     * Количество символов после разделителя
     * Если указан проп step, то всегда 0
     */
    fractionLength?: number;

    /**
     *  Шаг инкремента/декремента. Используйте только целочисленные значения
     */
    step?: number;

    /**
     * Минимальное значение
     * @default Number.MIN_SAFE_INTEGER
     */
    min?: number;

    /**
     * Максимальное значение
     * @default Number.MAX_SAFE_INTEGER
     */
    max?: number;

    /**
     * Отображение компонента в мобильном или десктопном виде
     */
    view?: 'desktop' | 'mobile';

    /**
     *  Компонент инпута
     */
    Input: FC<InputProps & { ref?: Ref<HTMLInputElement> }>;

    /**
     * Обработчик события изменения значения
     */
    onChange?: (e: ChangeEvent<HTMLInputElement> | null, payload: { value: number | null }) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для кнопки инкремента используется модификатор -increment-button, декремента -decrement-button
     */
    dataTestId?: string;
}

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            value: propValue,
            onChange,
            separator = ',',
            fractionLength = MAX_DIGITS,
            defaultValue,
            Input,
            min: minProp,
            max: maxProp,
            rightAddons,
            dataTestId,
            disabled,
            onBlur,
            onFocus,
            view,
            step: stepProp,
            size = 48,
            disableUserInput,
            clear: clearProp,
            colors = 'default',
            ...restProps
        },
        ref,
    ) => {
        const min = Math.max(MIN_SAFE_INTEGER, minProp ?? MIN_SAFE_INTEGER);
        const max = Math.min(MAX_SAFE_INTEGER, maxProp ?? MAX_SAFE_INTEGER);
        const withStepper = stepProp !== undefined;

        const maskOptions: MaskitoOptions = useMemo(
            () =>
                createMaskOptions({
                    separator,
                    fractionLength: withStepper ? 0 : fractionLength,
                    min,
                    max,
                }),
            [separator, fractionLength, min, max, withStepper],
        );

        const [focused, setFocused] = useState(false);
        const [value, setValue] = useState(() => {
            if (defaultValue == null) {
                return withStepper ? fnUtils.clamp(0, min, max).toString() : '';
            }

            return fnUtils
                .clamp(
                    parseNumber(maskitoTransform(defaultValue.toString(), maskOptions)),
                    min,
                    max,
                )
                .toString();
        });

        const maskRef = useMaskito({ options: maskOptions });

        useEffect(() => {
            if (propValue !== undefined) {
                setValue((prev) => {
                    const parsedNumber = parseNumber(propValue);

                    if (parsedNumber !== parseNumber(prev)) {
                        return maskitoTransform(
                            stringifyNumberWithoutExp(parsedNumber),
                            maskOptions,
                        );
                    }

                    return prev;
                });
            }
        }, [maskOptions, propValue, separator]);

        const getMaxLength = (valueString: string) => {
            const hasSeparator = valueString?.includes(separator);
            const hasSigns = valueString?.startsWith(MINUS_SIGN);

            return MAX_DIGITS + (hasSeparator ? 1 : 0) + (hasSigns ? 1 : 0);
        };

        const getStep = () => Math.round(stepProp ?? 1);

        const changeValue = (
            event: ChangeEvent<HTMLInputElement> | null,
            newValue: number | null,
        ) => {
            const isNaNValue = Number.isNaN(newValue);
            const valueString = event?.target.value ?? newValue?.toString() ?? '';

            setValue(valueString);

            if (valueString === '' || !isNaNValue) {
                onChange?.(event, {
                    value: isNaNValue ? null : newValue,
                });
            }
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const valueString = event.target.value;

            changeValue(event, parseNumber(valueString));
        };

        const handleIncrement = () => {
            const parsed = parseNumber(value);
            const nextValue = maskitoTransform(
                (Number.isNaN(parsed) ? min : parsed + getStep()).toString(),
                maskOptions,
            );

            changeValue(null, parseNumber(nextValue));
        };

        const handleDecrement = () => {
            const parsed = parseNumber(value);
            const nextValue = maskitoTransform(
                (Number.isNaN(parsed) ? max : parsed - getStep()).toString(),
                maskOptions,
            );

            changeValue(null, parseNumber(nextValue));
        };

        const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
            onFocus?.(e);

            if (!disableUserInput) {
                setFocused(true);
            }
        };

        const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
            onBlur?.(e);
            setFocused(false);
        };

        return (
            <Input
                maxLength={getMaxLength(value)}
                {...restProps}
                // В iOS в цифровой клавиатуре невозможно ввести минус.
                inputMode={min < 0 && os.isIOS() ? 'text' : 'decimal'}
                ref={mergeRefs([ref, maskRef])}
                value={value}
                onInput={handleChange}
                dataTestId={dataTestId}
                colors={colors}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                size={size}
                disableUserInput={disableUserInput}
                clear={clearProp && /\d/.test(value)}
                rightAddons={
                    withStepper ? (
                        <React.Fragment>
                            {rightAddons}
                            <Steppers
                                colors={colors}
                                dataTestId={dataTestId}
                                disabled={disabled}
                                value={parseNumber(value)}
                                min={min}
                                max={max}
                                className={cn(
                                    colorStyles[colors].steppers,
                                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                                    {
                                        [colorStyles[colors].steppersFocused]: focused,
                                        [colorStyles[colors].steppersDisabled]: disabled,
                                    },
                                )}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                            />
                        </React.Fragment>
                    ) : (
                        rightAddons
                    )
                }
            />
        );
    },
);
