import React, {
    forwardRef,
    Fragment,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { Input, type InputProps } from '@alfalab/core-components-input';
import { Steppers } from '@alfalab/core-components-number-input/shared';
import { getMinMaxOrDefault } from '@alfalab/core-components-number-input/utils';
import { fnUtils, isNonNullable } from '@alfalab/core-components-shared';
import { withSuffix, type withSuffixProps } from '@alfalab/core-components-with-suffix';
import { type CurrencyCodes } from '@alfalab/data';
import { MMSP, THINSP } from '@alfalab/utils';

import {
    maskitoOptionsGenerator,
    type NumberParams,
    parseNumber,
    stringifyNumber,
} from './maskito-utils';
import { getCurrencyCodeWithFormat, getVisiblePlaceholder, SEP } from './utils';

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
     * Добавляет компонент "Stepper" в правый аддонx
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
            value: valueFromProps = null,
            integerLength: integerLengthFromProps = 9,
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
            onKeyDown,
            breakpoint,
            client,
            transparentMinor = true,
            inputClassName,
            label,
            labelView,
            stepper,
            rightAddons,
            ...restProps
        },
        ref,
    ) => {
        const controlled = isNonNullable(valueFromProps);
        const numberParams = useMemo<NumberParams>(() => {
            const minorityLength = Math.trunc(Math.log10(minority));
            const integerLength = Math.min(integerLengthFromProps, 15);
            const maximumFractionDigits = integersOnly ? 0 : minorityLength;
            const max = Number(
                `${'9'.repeat(integerLength)}${integersOnly ? '' : '.'}${'9'.repeat(maximumFractionDigits)}`,
            );

            return {
                decimalSeparator: SEP,
                thousandSeparator: MMSP,
                maximumFractionDigits,
                minusSign: '-',
                min: positiveOnly ? 0 : max * -1,
                max,
            };
        }, [integerLengthFromProps, integersOnly, minority, positiveOnly]);
        const inputRef = useMaskito({ options: maskitoOptionsGenerator(numberParams, view) });
        const getFormattedAmount = useCallback(
            (val: number | string | null) => stringifyNumber(val, numberParams, view),
            [numberParams, view],
        );
        const getFormattedAmountRef = useRef(getFormattedAmount);
        const [numberValue, setNumberValue] = useState(valueFromProps ?? defaultValue);
        const [inputValue, setInputValue] = useState(() => getFormattedAmount(numberValue));

        if (controlled && !(numberValue === valueFromProps)) {
            setNumberValue(valueFromProps);
            setInputValue(getFormattedAmount(valueFromProps));
        }

        useLayoutEffect(() => {
            if (!(getFormattedAmountRef.current === getFormattedAmount)) {
                setInputValue(getFormattedAmount(numberValue));
                getFormattedAmountRef.current = getFormattedAmount;
            }
        }, [getFormattedAmount, numberValue, valueFromProps]);

        const numberValueOrZero = useMemo(() => Number(`${numberValue || '0'}`), [numberValue]);

        const { min: minStepperValue, max: maxStepperValue } = getMinMaxOrDefault({
            minProp: stepper?.min,
            maxProp: stepper?.max,
        });
        const withStepper = !fnUtils.isNil(stepper?.step);

        const [isFocused, setIsFocused] = useState(false);
        const [majorPart, minorPart] = inputValue.split(numberParams.decimalSeparator);
        const currencyCode = getCurrencyCodeWithFormat(currency, codeFormat);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            setInputValue(value);

            const [, minor = ''] = value.split(numberParams.decimalSeparator);

            if (
                value === numberParams.minusSign ||
                value.endsWith(numberParams.decimalSeparator) ||
                (minor.length > 0 && minor.length < numberParams.maximumFractionDigits)
            ) {
                return;
            }

            const numOrNull = parseNumber(value, numberParams);

            onChange?.(event, {
                value: numOrNull,
                valueString: value,
            });

            if (!controlled) {
                setNumberValue(numOrNull);
            }
        };

        const handleFocus: withSuffixProps['onFocus'] = (e) => {
            setIsFocused(true);

            onFocus?.(e);
        };

        const handleClear = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                onClear?.(event);

                if (!controlled) {
                    setNumberValue(null);
                }
            },
            [controlled, onClear],
        );

        const handleDecrement = () => {
            if (stepper?.step) {
                const newValue = numberValueOrZero - stepper.step;
                const newFormattedValue = getFormattedAmount(newValue);

                onChange?.(null, {
                    value: newValue,
                    valueString: newFormattedValue,
                });

                if (!controlled) {
                    setNumberValue(newValue);
                }
            }
        };

        const handleIncrement = () => {
            if (stepper?.step) {
                const newValue = numberValueOrZero + stepper.step;
                const newFormattedValue = getFormattedAmount(newValue);

                onChange?.(null, {
                    value: newValue,
                    valueString: newFormattedValue,
                });

                if (!controlled) {
                    setNumberValue(newValue);
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
                    onChange={handleChange}
                    onClear={handleClear}
                    onFocus={handleFocus}
                    inputMode={numberParams.maximumFractionDigits === 0 ? 'numeric' : 'decimal'}
                    dataTestId={dataTestId}
                    ref={mergeRefs([ref, inputRef])}
                    breakpoint={breakpoint}
                    client={client}
                />
            </div>
        );
    },
);

AmountInput.displayName = 'AmountInput';
SuffixInput.displayName = 'SuffixInput';
