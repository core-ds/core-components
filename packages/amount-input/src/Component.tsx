import React, {
    type ChangeEventHandler,
    type FocusEventHandler,
    forwardRef,
    Fragment,
    type MouseEventHandler,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { Input } from '@alfalab/core-components-input';
import { getAddonsByPriority } from '@alfalab/core-components-input/helpers/get-addons-by-priority';
import { Steppers } from '@alfalab/core-components-number-input/shared';
import { getMinMaxOrDefault } from '@alfalab/core-components-number-input/utils';
import { isNonNullable } from '@alfalab/core-components-shared';
import { withSuffix } from '@alfalab/core-components-with-suffix';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { MMSP, THINSP } from '@alfalab/utils';

import {
    COMPONENT_DECIMAL_SEPARATOR,
    COMPONENT_MINUS_SIGN,
    DEFAULT_DECIMAL_SEPARATORS,
    DEFAULT_MINUS_SIGNS,
    dispatchInputRejectEvent,
    fromDecimalView,
    fromNumberParts,
    isCorrectValue,
    isEquivalentInput,
    isInputValueCorrect,
    maskitoOptionsGenerator,
    type NumberParams,
    parseNumber,
    processDecimalPart,
    stringifyNumber,
    toDecimalView,
    toFractionDigits,
    toIntegerDigits,
    toNumberParts,
    toValueAsString,
} from './maskito-utils';
import { type AmountInputProps } from './types';
import { useMaskito } from './use-maskito';
import { getCurrencyCodeWithFormat, getVisiblePlaceholder } from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

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
                suffix === currency
                    ? getCurrencyCodeWithFormat(currency, codeFormat)
                    : toValueAsString(suffix)
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
        const { disabled, readOnly } = restProps;
        const minorityRef = useRef(minority);
        const [fieldClassName, setFieldClassName] = useState<string>();
        const inputRef = useRef<HTMLInputElement>(null);
        const uncontrolled = valueFromProps === undefined;
        const numberParams = useMemo<NumberParams>(() => {
            const minusSign = COMPONENT_MINUS_SIGN;
            const decimalSeparator = COMPONENT_DECIMAL_SEPARATOR;
            const thousandSeparator = MMSP;
            const decimalPseudoSeparators = DEFAULT_DECIMAL_SEPARATORS.filter(
                (char) =>
                    char !== decimalSeparator && char !== thousandSeparator && char !== minusSign,
            );
            const minusPseudoSigns = DEFAULT_MINUS_SIGNS.filter(
                (char) =>
                    char !== decimalSeparator && char !== thousandSeparator && char !== minusSign,
            );

            return {
                minusSign,
                decimalSeparator,
                thousandSeparator,
                maximumFractionDigits: integersOnly ? 0 : toFractionDigits(minority),
                decimalPseudoSeparators,
                minusPseudoSigns,
            };
        }, [integersOnly, minority]);
        const maskitoOptions = useMemo(() => {
            const handleInputReject = () => {
                setFieldClassName((prevFieldClassName) =>
                    prevFieldClassName === styles.inputReject0
                        ? styles.inputReject1
                        : styles.inputReject0,
                );
            };

            return maskitoOptionsGenerator(
                numberParams,
                positiveOnly,
                view,
                toIntegerDigits(integerLength, toFractionDigits(minority)),
                handleInputReject,
            );
        }, [integerLength, minority, numberParams, positiveOnly, view]);
        const maskitoRef = useMaskito({ options: maskitoOptions });
        const [numberValue, setNumberValue] = useState(valueFromProps ?? defaultValue);
        const [inputValue, setInputValue] = useState(() =>
            isCorrectValue(numberValue, { integerLength, integersOnly, minority })
                ? stringifyNumber(toDecimalView(numberValue, minority), numberParams)
                : '',
        );

        // getDerivedStateFromProps
        if (!uncontrolled) {
            const valueFromPropsOrNull = valueFromProps ?? null;

            if (numberValue !== valueFromPropsOrNull) {
                setNumberValue(valueFromPropsOrNull);
            }
        }

        // this effect watches `inputValue` change
        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (
                isInputValueCorrect(inputValue, numberParams) &&
                isCorrectValue(numberValue, { integerLength, integersOnly, minority })
            ) {
                const numberValueFromInput = fromDecimalView(
                    parseNumber(inputValue, numberParams),
                    minority,
                );

                // compare strings
                if (toValueAsString(numberValueFromInput) !== toValueAsString(numberValue)) {
                    const nextInputValue = stringifyNumber(
                        toDecimalView(numberValue, minority),
                        numberParams,
                    );

                    setInputValue(nextInputValue);

                    // reject if the same minority only
                    if (minorityRef.current === minority) {
                        dispatchInputRejectEvent(inputRef.current);
                    }
                }
            }

            minorityRef.current = minority;
        }, [inputValue, integerLength, integersOnly, minority, numberParams, numberValue]);

        // this effect watches `numberValue` change
        useLayoutEffect_SAFE_FOR_SSR(() => {
            const focused = inputRef.current?.matches(':focus');

            setInputValue((prevInputValue) => {
                if (isCorrectValue(numberValue, { integerLength, integersOnly, minority })) {
                    const nextInputValue = stringifyNumber(
                        toDecimalView(numberValue, minority),
                        numberParams,
                    );

                    if (focused) {
                        if (
                            isEquivalentInput(nextInputValue, prevInputValue, numberParams) ||
                            isEquivalentInput(prevInputValue, nextInputValue, numberParams)
                        ) {
                            return prevInputValue;
                        }

                        return nextInputValue;
                    }

                    return processDecimalPart(nextInputValue, numberParams, view);
                }

                return '';
            });
        }, [integerLength, integersOnly, minority, numberParams, numberValue, view]);

        const numberValueOrZero = useMemo(() => Number(`${numberValue ?? ''}`), [numberValue]);
        const { min: minStepperValue, max: maxStepperValue } = getMinMaxOrDefault({
            minProp: stepper?.min,
            maxProp: stepper?.max,
        });
        const withStepper = isNonNullable(stepper?.step);
        const [isFocused, setIsFocused] = useState(false);
        const { minus, integerPart, decimalSeparator, decimalPart } = toNumberParts(
            inputValue,
            numberParams,
        );
        const currencyCode = getCurrencyCodeWithFormat(currency, codeFormat);

        const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
            const { value } = event.target;

            setInputValue(value);

            if (isInputValueCorrect(value, numberParams)) {
                const numOrNull = fromDecimalView(parseNumber(value, numberParams), minority);

                onChange?.(event, {
                    value: numOrNull,
                    valueString: value,
                });

                if (uncontrolled) {
                    setNumberValue(numOrNull);
                }
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

        const rightAddonsMap = getAddonsByPriority([
            {
                priority: 2,
                predicate: Boolean(rightAddons),
                render: () => rightAddons,
            },
            {
                priority: 1,
                predicate: withStepper && !disabled && !readOnly,
                render: () => (
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
                ),
            },
        ]);

        return (
            <div
                className={cn(styles.container, {
                    [styles.filled]: Boolean(inputValue),
                    [styles.focused]: isFocused,
                })}
            >
                <SuffixInput
                    {...restProps}
                    rightAddons={rightAddonsMap}
                    suffix={
                        <Fragment>
                            <span className={styles.suffixMajor}>
                                {fromNumberParts({ minus, integerPart })}
                            </span>
                            <span
                                className={cn({
                                    [colorStyles[colors].minorPartAndCurrency]: transparentMinor,
                                    [colorStyles[colors].disabled]: restProps.disabled,
                                    [colorStyles[colors].readOnly]: restProps.readOnly,
                                })}
                            >
                                <span className={styles.suffixMinor}>
                                    {fromNumberParts({ decimalSeparator, decimalPart })}
                                </span>
                                <span>
                                    {`${THINSP}${suffix === currency ? currencyCode : toValueAsString(suffix)}`}
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
                    inputMode={numberParams.maximumFractionDigits ? 'decimal' : 'numeric'}
                    dataTestId={dataTestId}
                    ref={mergeRefs([ref, inputRef, maskitoRef])}
                    breakpoint={breakpoint}
                    client={client}
                    fieldClassName={cn(fieldClassName, restProps.fieldClassName)}
                    bold={bold}
                />
            </div>
        );
    },
);

AmountInput.displayName = 'AmountInput';
SuffixInput.displayName = 'SuffixInput';
