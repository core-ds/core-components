import React, {
    type FocusEvent,
    forwardRef,
    Fragment,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import cn from 'classnames';

import { Input, type InputProps } from '@alfalab/core-components-input';
import { Steppers } from '@alfalab/core-components-number-input/shared';
import { getMinMaxOrDefault } from '@alfalab/core-components-number-input/utils';
import { fnUtils, isNonNullable } from '@alfalab/core-components-shared';
import { withSuffix, type withSuffixProps } from '@alfalab/core-components-with-suffix';
import { type CurrencyCodes } from '@alfalab/data';
import { formatAmount, MMSP, THINSP } from '@alfalab/utils';

import {
    getAmountValueFromStr,
    getCurrencyCodeWithFormat,
    getFormattedValue,
    getVisiblePlaceholder,
    SEP,
} from './utils';

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
            onBlur,
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

        const getFormattedAmount = useCallback(
            (val: string | number | null) => {
                if (val === '' || val === null || val === '-') return '';

                return formatAmount({
                    value: parseInt(`${val}`, 10),
                    currency,
                    minority,
                    view,
                    negativeSymbol: 'hyphen-minus',
                }).formatted;
            },
            [currency, minority, view],
        );
        const [numberValue, setNumberValue] = useState(valueFromProps ?? defaultValue);
        const [inputValue, setInputValue] = useState(() => getFormattedAmount(numberValue));
        const [shouldSyncInputValue, setShouldSyncInputValue] = useState(false);

        if (controlled && !(numberValue === valueFromProps)) {
            setNumberValue(valueFromProps);
        }

        useLayoutEffect(() => {
            setInputValue(getFormattedAmount(numberValue));
        }, [getFormattedAmount, numberValue]);

        useEffect(() => {
            if (shouldSyncInputValue) {
                setInputValue(getFormattedAmount(numberValue));
                setShouldSyncInputValue(false);
            }
        }, [getFormattedAmount, shouldSyncInputValue, numberValue]);

        const numberValueOrZero = useMemo(
            () => parseInt(`${numberValue || '0'}`, 10),
            [numberValue],
        );

        const integerLength = Math.min(integerLengthFromProps, 15);

        const { min: minStepperValue, max: maxStepperValue } = getMinMaxOrDefault({
            minProp: stepper?.min,
            maxProp: stepper?.max,
        });
        const withStepper = !fnUtils.isNil(stepper?.step);

        const minorityLength = Math.trunc(Math.log10(minority));

        const [isFocused, setIsFocused] = useState(false);
        const [majorPart, minorPart] = inputValue.split(SEP);
        const currencyCode = getCurrencyCodeWithFormat(currency, codeFormat);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const input = event.target;
            let caret = input.selectionStart ?? 0;
            let enteredValue = input.value.replace('.', SEP).replace(/[^0-9,-]/g, '');

            if (integersOnly) {
                [enteredValue] = enteredValue.split(SEP);
            }

            // Эта проверка нужна для того, чтобы обрабатывать значение, переданное в input, длина которого превышает integerLength
            const integer = integersOnly ? enteredValue : enteredValue.split(SEP)[0];

            if (integer.length > integerLength) {
                enteredValue = enteredValue.slice(0, integerLength);
            }

            // Сокращение минимальной длины мажорной части числа до 0 позволяет ввести "," => "0,"
            const isCorrectEnteredValue = RegExp(
                `(^${positiveOnly ? '' : '-?'}[0-9]{0,${integerLength}}(,([0-9]+)?)?$|^\\s*$)`,
            ).test(enteredValue);

            if (isCorrectEnteredValue) {
                if (inputValue[caret] === MMSP) {
                    enteredValue = enteredValue.slice(0, caret - 1) + enteredValue.slice(caret);
                    caret -= 1;
                }

                const newFormattedValue = getFormattedValue(enteredValue, currency, minority);

                if (newFormattedValue === inputValue) {
                    window.requestAnimationFrame(() => {
                        input.selectionStart = caret;
                        input.selectionEnd = caret;
                    });
                } else {
                    /**
                     * Поддержка положения каретки
                     * Поскольку при форматировании введенного значения могут появляться символы типа пробела
                     * или запятая - каретка прыгает в конец и ее необходимо ставить в правильное место
                     */

                    // Узнаем длину оригинального инпута с условием обрезания лишних символов

                    const [head, tail] = input.value.split(SEP);
                    let notFormattedEnteredValueLength = head.length;

                    if (tail) {
                        notFormattedEnteredValueLength += 1; // запятая или точка
                        notFormattedEnteredValueLength += tail.slice(0, minorityLength).length; // символы в минорной части
                    }

                    const diff = newFormattedValue.length - notFormattedEnteredValueLength;

                    caret += diff;

                    window.requestAnimationFrame(() => {
                        input.selectionStart = caret;
                        input.selectionEnd = caret;
                    });
                }

                setInputValue(newFormattedValue);

                const [, minor = ''] = newFormattedValue.split(SEP);

                if (!integersOnly && minor.replace(/[^0-9]/g, '').length < minorityLength) {
                    return;
                }

                const nextValue = getAmountValueFromStr(newFormattedValue, minority);

                onChange?.(event, {
                    value: nextValue,
                    valueString: newFormattedValue,
                });

                setShouldSyncInputValue(true);

                if (!controlled) {
                    setNumberValue(nextValue);
                }
            } else {
                caret = -1;

                window.requestAnimationFrame(() => {
                    input.selectionStart = caret;
                    input.selectionEnd = caret;
                });
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            const isModifierKeys = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey;

            // Не двигаем каретку когда вводится невалидный символ
            if (!isModifierKeys && event.key.length === 1 && /[^0-9,.-]/.test(event.key)) {
                event.preventDefault();
            }

            onKeyDown?.(event);
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

        /**
         * Отбросить десятичный разделитель если находится в конце числа
         * 123, => 123
         */
        const dropDecimalSeparator = (event: FocusEvent<HTMLInputElement>) => {
            const { value } = event.target;

            const newValue = getAmountValueFromStr(
                value.endsWith(SEP) ? value.slice(0, -1) : value,
                minority,
            );

            const formatted = getFormattedAmount(newValue);

            onChange?.(null, {
                value: newValue,
                valueString: formatted,
            });

            setShouldSyncInputValue(true);

            if (!controlled) {
                setNumberValue(newValue);
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            const { value } = event.target;

            if (view === 'withZeroMinorPart') {
                const newValue = getAmountValueFromStr(value, minority);
                const formatted = getFormattedAmount(newValue);

                if (numberValue !== newValue) {
                    onChange?.(event, {
                        value: newValue,
                        valueString: formatted,
                    });

                    setShouldSyncInputValue(true);

                    if (!controlled) {
                        setNumberValue(newValue);
                    }
                }
            }

            if (view === 'default') {
                dropDecimalSeparator(event);
            }

            setIsFocused(false);

            onBlur?.(event);
        };

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
                })}
            >
                <SuffixInput
                    {...restProps}
                    rightAddons={renderRightAddons()}
                    suffix={
                        <Fragment>
                            {majorPart}

                            <span
                                className={cn({
                                    [colorStyles[colors].minorPartAndCurrency]: transparentMinor,
                                    [colorStyles[colors].disabled]: restProps.disabled,
                                    [colorStyles[colors].readOnly]: restProps.readOnly,
                                })}
                            >
                                {minorPart !== undefined && `${SEP}${minorPart}`}
                                {THINSP}
                                {suffix === currency ? currencyCode : suffix}
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
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    inputMode='decimal'
                    pattern={`[${positiveOnly ? '' : '\\-'}0-9\\s\\.,]*`}
                    dataTestId={dataTestId}
                    ref={ref}
                    breakpoint={breakpoint}
                    client={client}
                />
            </div>
        );
    },
);

AmountInput.displayName = 'AmountInput';
SuffixInput.displayName = 'SuffixInput';
