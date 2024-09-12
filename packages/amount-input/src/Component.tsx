import React, { FocusEvent, forwardRef, Fragment, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { Input, InputProps } from '@alfalab/core-components-input';
import { withSuffix } from '@alfalab/core-components-with-suffix';
import { CurrencyCodes } from '@alfalab/data';
import { formatAmount, THINSP } from '@alfalab/utils';

import {
    getAmountValueFromStr,
    getCurrencyCodeWithFormat,
    getFormattedValue,
    getVisiblePlaceholder,
} from './utils';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type AmountInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & {
    /**
     * Денежное значение в минорных единицах
     * Значение null - значит не установлено
     */
    value?: string | number | null;

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
        e: React.ChangeEvent<HTMLInputElement>,
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
            value = null,
            integerLength: integerLengthProp = 9,
            minority = 100,
            currency = 'RUR',
            suffix = currency,
            codeFormat = 'symbolic',
            placeholder = `0\u2009${
                suffix === currency ? getCurrencyCodeWithFormat(currency, codeFormat) || '' : suffix
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
            breakpoint = 1024,
            onKeyDown,
            transparentMinor = true,
            inputClassName,
            label,
            labelView,
            ...restProps
        },
        ref,
    ) => {
        const integerLength = Math.min(integerLengthProp, 15);

        const getFormattedAmount = useCallback(
            (val: string | number | null) => {
                if (val === '' || val === null || val === '-') return '';

                return formatAmount({
                    value: +val,
                    currency,
                    minority,
                    view,
                    negativeSymbol: 'hyphen-minus',
                }).formatted;
            },
            [currency, minority, view],
        );

        const [inputValue, setInputValue] = useState<string>(() => getFormattedAmount(value));

        const [majorPart, minorPart] = inputValue.split(',');
        const currencyCode = getCurrencyCodeWithFormat(currency, codeFormat);

        useEffect(() => {
            const currentAmountValue = getAmountValueFromStr(inputValue, minority);

            if (currentAmountValue !== value) {
                setInputValue(getFormattedAmount(value));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, getFormattedAmount]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target;
            let enteredValue = input.value
                .replace(/\s/g, '')
                .replace('.', ',')
                .replace(/[^0-9,-]/g, '');

            if (integersOnly) {
                [enteredValue] = enteredValue.split(',');
            }

            // Эта проверка нужна для того, чтобы обрабатывать значение, переданное в input, длина которого превышает integerLength
            const integer = integersOnly ? enteredValue : enteredValue.split(',')[0];

            if (integer.length > integerLength) {
                enteredValue = enteredValue.slice(0, integerLength);
            }

            // Сокращение минимальной длины мажорной части числа до 0 позволяет ввести "," => "0,"
            const isCorrectEnteredValue = RegExp(
                `(^${positiveOnly ? '' : '-?'}[0-9]{0,${integerLength}}(,([0-9]+)?)?$|^\\s*$)`,
            ).test(enteredValue);

            if (isCorrectEnteredValue) {
                const newFormattedValue = getFormattedValue(enteredValue, currency, minority);

                if (newFormattedValue === inputValue) {
                    const caret = input.selectionStart;

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

                    const [head, tail] = input.value.split(/\.|,/);
                    let notFormattedEnteredValueLength = head.length;

                    if (tail) {
                        notFormattedEnteredValueLength += 1; // запятая или точка
                        notFormattedEnteredValueLength += tail.slice(
                            0,
                            minority.toString().length - 1,
                        ).length; // символы в минорной части
                    }

                    const diff = newFormattedValue.length - notFormattedEnteredValueLength;
                    const caret = (input.selectionStart as number) + diff;

                    window.requestAnimationFrame(() => {
                        input.selectionStart = caret;
                        input.selectionEnd = caret;
                    });
                }

                setInputValue(newFormattedValue);
                onChange?.(e, {
                    value: getAmountValueFromStr(newFormattedValue, minority),
                    valueString: newFormattedValue,
                });
            } else {
                // Не двигаем каретку когда вставляется невалидный символ
                const caret = (input.selectionStart as number) - 1;

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

        const handleClear = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setInputValue('');

                if (onClear) {
                    onClear(event);
                }
            },
            [onClear],
        );

        /**
         * Отбросить десятичный разделитель если находится в конце числа
         * 123, => 123
         */
        const dropDecimalSeparator = (event: FocusEvent<HTMLInputElement>) => {
            if (inputValue.endsWith(',')) {
                const pattern = /[,\s]/g; // пробелы и запятые
                const newValue = Number(inputValue.replace(pattern, '')) * minority;
                const formatted = getFormattedAmount(newValue);

                setInputValue(formatted);
                onChange?.(event, {
                    value: newValue,
                    valueString: formatted,
                });
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            if (view === 'withZeroMinorPart') {
                const newValue = getAmountValueFromStr(inputValue, minority);

                if (newValue !== null) {
                    const formatted = getFormattedAmount(newValue);

                    if (formatted !== inputValue) {
                        setInputValue(formatted);
                        onChange?.(event, {
                            value: newValue,
                            valueString: formatted,
                        });
                    }
                }
            }

            if (view === 'default') {
                dropDecimalSeparator(event);
            }

            onBlur?.(event);
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
                                {minorPart !== undefined && `,${minorPart}`}
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
                    inputMode='decimal'
                    pattern={`[${positiveOnly ? '' : '\\-'}0-9\\s\\.,]*`}
                    dataTestId={dataTestId}
                    ref={ref}
                    breakpoint={breakpoint}
                />
            </div>
        );
    },
);

AmountInput.displayName = 'AmountInput';
SuffixInput.displayName = 'SuffixInput';
