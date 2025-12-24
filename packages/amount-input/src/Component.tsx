import React, {
    type ChangeEventHandler,
    type FocusEventHandler,
    forwardRef,
    Fragment,
    type MouseEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Input, type InputProps } from '@alfalab/core-components-input';
import { Steppers } from '@alfalab/core-components-number-input/shared';
import { getMinMaxOrDefault } from '@alfalab/core-components-number-input/utils';
import { isNonNullable } from '@alfalab/core-components-shared';
import { withSuffix } from '@alfalab/core-components-with-suffix';
import { type CurrencyCodes } from '@alfalab/data';
import { MMSP, THINSP } from '@alfalab/utils';

import {
    DEFAULT_DECIMAL_SEPARATORS,
    DEFAULT_MINUS_SIGNS,
    handleDecimalPart,
    maskitoOptionsGenerator,
    type NumberParams,
    parseNumber,
    stringifyNumber,
} from './maskito-utils';
import { useMaskito } from './use-maskito';
import { getCurrencyCodeWithFormat, getVisiblePlaceholder } from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type AmountInputProps = Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'type'> & {
    /**
     * Денежное значение в минорных единицах
     */
    value?: string | number | null;

    /**
     * Значение по-умолчанию в минорных единицах
     */
    defaultValue?: string | number | null;

    /**
     * Формат отображения кода валюты
     */
    codeFormat?: 'letter' | 'symbolic';

    /**
     * default - не отображаем копейки, если их значение 0
     * withZeroMinorPart - отображаем копейки, даже если их значение равно 0
     * @default default
     */
    view?: 'default' | 'withZeroMinorPart';

    /**
     * Валюта
     */
    currency?: CurrencyCodes;

    /**
     * Дополнительный закрепленный текст справа от основного значения. (по умолчанию — символ валюты)
     */
    suffix?: string;

    /**
     * Максимальное число знаков до запятой
     * max 15
     */
    integerLength?: number;

    /**
     * Минорные единицы
     */
    minority?: number;

    /**
     * Позволяет вводить только целые значения
     */
    integersOnly?: boolean;

    /**
     * @default - true. Нельзя вводить отрицательные значения.
     * Возможность вводить только положительные значения
     */
    positiveOnly?: boolean;

    /**
     * Жир
     */
    bold?: boolean;

    /**
     * Обработчик события изменения значения
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement> | null,
        payload: {
            /**
             * Денежное значение в минорных единицах
             * Значение null - значит не установлено
             */
            value: number | null;
            /**
             * Значение инпута
             */
            valueString: string;
        },
    ) => void;

    /**
     * Делает минорную часть полупрозрачной
     */
    transparentMinor?: boolean;

    /**
     * Добавляет компонент "Stepper" в правый аддон
     */
    stepper?: {
        /**
         * Шаг инкремента / декремента
         */
        step: number;
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
    };
};

/**
 * Инпут, позволяющий закрепить значок валюты
 */
const SuffixInput = withSuffix(Input);

/**
 * Компонент для ввода денежных значений
 */
export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
    (
        {
            view = 'default',
            defaultValue = null,
            value: valueFromProps,
            integerLength = 9,
            minority = 100,
            currency = 'RUR',
            suffix = currency,
            codeFormat = 'symbolic',
            placeholder = `0${THINSP}${
                suffix === currency ? getCurrencyCodeWithFormat(currency, codeFormat) : suffix
            }`,
            integersOnly = false,
            positiveOnly = true,
            bold = true,
            colors = 'default',
            className,
            focusedClassName,
            dataTestId,
            clear = false,
            onChange,
            onClear,
            onFocus,
            onBlur,
            onKeyDown,
            breakpoint,
            client,
            transparentMinor = true,
            inputClassName,
            label,
            labelView,
            stepper,
            rightAddons,
            // don't needed, used maskito
            pattern,
            ...restProps
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const uncontrolled = valueFromProps === undefined;
        const numberParams = useMemo<NumberParams>(() => {
            const decimalLength = Math.trunc(Math.log10(minority));
            const maximumFractionDigits = integersOnly ? 0 : decimalLength;
            const minusSign = '\u2212';
            const decimalSeparator = ',';
            const thousandSeparator = MMSP;
            const decimalPseudoSeparators = DEFAULT_DECIMAL_SEPARATORS.filter(
                (x) => x !== decimalSeparator,
            );
            const minusPseudoSigns = DEFAULT_MINUS_SIGNS.filter((x) => x !== minusSign);

            return {
                minusSign,
                decimalSeparator,
                thousandSeparator,
                maximumFractionDigits,
                decimalPseudoSeparators,
                minusPseudoSigns,
            };
        }, [integersOnly, minority]);
        const maskitoOptions = useMemo(
            () => maskitoOptionsGenerator(numberParams, positiveOnly, view, integerLength),
            [integerLength, numberParams, positiveOnly, view],
        );
        const maskitoRef = useMaskito({ options: maskitoOptions });
        const [numberValue, setNumberValue] = useState(valueFromProps ?? defaultValue);
        const [inputValue, setInputValue] = useState(() =>
            stringifyNumber(numberValue, numberParams),
        );

        if (!uncontrolled) {
            const valueFromPropsOrNull = valueFromProps ?? null;

            if (!(numberValue === valueFromPropsOrNull)) {
                setNumberValue(valueFromPropsOrNull);
            }
        }

        useEffect(() => {
            let valueString = stringifyNumber(numberValue, numberParams);

            if (!inputRef.current?.matches(':focus')) {
                valueString = handleDecimalPart(valueString, numberParams, view);
            }

            setInputValue((prevInputValue) => {
                if (
                    valueString.length > 0 &&
                    prevInputValue.startsWith(valueString) &&
                    prevInputValue.length > valueString.length
                ) {
                    const diff = prevInputValue.slice(valueString.length - prevInputValue.length);

                    if (new RegExp(`^(${numberParams.decimalSeparator})?0+$`).test(diff)) {
                        return prevInputValue;
                    }
                }

                return valueString;
            });
        }, [numberParams, numberValue, view]);

        const numberValueOrZero = useMemo(() => Number(`${numberValue || '0'}`), [numberValue]);

        const { min: minStepperValue, max: maxStepperValue } = getMinMaxOrDefault({
            minProp: stepper?.min,
            maxProp: stepper?.max,
        });
        const withStepper = isNonNullable(stepper?.step);
        const [isFocused, setIsFocused] = useState(false);
        const [majorPart, minorPart] = inputValue.split(numberParams.decimalSeparator);
        const currencyCode = getCurrencyCodeWithFormat(currency, codeFormat);

        const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
            const { value } = event.target;

            setInputValue(value);

            if (
                value.startsWith(numberParams.decimalSeparator) ||
                new RegExp(
                    `^${numberParams.minusSign}?0?(${numberParams.decimalSeparator}0*)?$`,
                ).test(value) ||
                new RegExp(`^${numberParams.minusSign}?0[^${numberParams.decimalSeparator}]`).test(
                    value,
                )
            ) {
                return;
            }

            const numOrNull = parseNumber(value, numberParams);

            onChange?.(event, {
                value: numOrNull,
                valueString: value,
            });

            if (uncontrolled) {
                setNumberValue(numOrNull);
            }
        };

        const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
            setIsFocused(true);
            onFocus?.(event);
        };

        const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
            setIsFocused(false);
            onBlur?.(event);
        };

        const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
            onClear?.(event);

            if (uncontrolled) {
                setNumberValue(null);
            }
        };

        const handleDecrement = () => {
            if (stepper?.step) {
                const value = numberValueOrZero - stepper.step;
                const valueString = stringifyNumber(value, numberParams);

                onChange?.(null, {
                    value,
                    valueString,
                });

                if (uncontrolled) {
                    setNumberValue(value);
                }
            }
        };

        const handleIncrement = () => {
            if (stepper?.step) {
                const value = numberValueOrZero + stepper.step;
                const valueString = stringifyNumber(value, numberParams);

                onChange?.(null, {
                    value,
                    valueString,
                });

                if (uncontrolled) {
                    setNumberValue(value);
                }
            }
        };

        const renderRightAddons = () => {
            if (withStepper) {
                return (
                    <Fragment>
                        {rightAddons}
                        <Steppers
                            colors={colors}
                            dataTestId={dataTestId}
                            disabled={restProps.disabled}
                            focused={isFocused && !restProps.disableUserInput}
                            value={numberValueOrZero}
                            min={minStepperValue}
                            max={maxStepperValue}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            size={restProps.size}
                        />
                    </Fragment>
                );
            }

            return rightAddons;
        };

        return (
            <div
                className={cn(styles.container, {
                    [styles.bold]: bold,
                    [styles.filled]: Boolean(inputValue),
                    [styles.focused]: isFocused,
                })}
            >
                <SuffixInput
                    {...restProps}
                    rightAddons={renderRightAddons()}
                    suffix={
                        <Fragment>
                            <span className={styles.suffixMajor}>{majorPart}</span>

                            <span
                                className={cn({
                                    [colorStyles[colors].minorPartAndCurrency]: transparentMinor,
                                    [colorStyles[colors].disabled]: restProps.disabled,
                                    [colorStyles[colors].readOnly]: restProps.readOnly,
                                })}
                            >
                                {minorPart !== undefined && (
                                    <span
                                        className={styles.suffixMinor}
                                    >{`${numberParams.decimalSeparator}${minorPart}`}</span>
                                )}
                                {THINSP}
                                <span className={styles.suffixCurrency}>
                                    {suffix === currency ? currencyCode : suffix}
                                </span>
                            </span>
                        </Fragment>
                    }
                    suffixContainerClassName={styles.suffixContainer}
                    clear={clear}
                    labelView={labelView}
                    label={label}
                    placeholder={getVisiblePlaceholder(placeholder, label, labelView)}
                    value={inputValue}
                    colors={colors}
                    className={cn(styles.component, className)}
                    focusedClassName={focusedClassName}
                    inputClassName={cn(styles.input, inputClassName)}
                    onInput={handleChange}
                    onClear={handleClear}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    inputMode={numberParams.maximumFractionDigits === 0 ? 'numeric' : 'decimal'}
                    dataTestId={dataTestId}
                    ref={mergeRefs([ref, inputRef, maskitoRef])}
                    breakpoint={breakpoint}
                    client={client}
                />
            </div>
        );
    },
);

AmountInput.displayName = 'AmountInput';
SuffixInput.displayName = 'SuffixInput';
