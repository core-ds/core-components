import React, { ChangeEvent, FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import { Input, InputProps } from '@alfalab/core-components-input';

import { createSeparatorsRegExp, SIGNS, SEPARATORS } from './utils';

export type NumberInputProps = Omit<InputProps, 'value' | 'onChange' | 'type'> & {
    /**
     * Значение поля ввода
     */
    value?: string | number | null;

    /**
     * Учитывать знаки '+' и '-'
     */
    allowSigns?: boolean;

    /**
     * Разделитель ',' или '.'
     */
    separator?: '.' | ',';

    /**
     * Количество символов после разделителя
     */
    fractionLength?: number;

    /**
     * Обработчик события изменения значения
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: {
            /**
             * Числовое значение инпута
             */
            value: number | null;
            /**
             * Строковое значение инпута
             */
            valueString: string;
        },
    ) => void;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            value: propValue,
            onChange,
            onBlur,
            allowSigns = true,
            separator = ',',
            fractionLength,
            defaultValue,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = propValue === undefined;
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState<string>(defaultValue || '');

        const getNumberValueFromStr = (valueString: string) => {
            if (valueString.includes(',')) {
                return parseFloat(valueString.replace(',', '.'));
            }

            return parseFloat(valueString);
        };

        const getNumberRegExp = (): RegExp => {
            let reStr = '[0-9]+';

            if (fractionLength !== 0) {
                reStr = `${reStr}[${SEPARATORS.map((s) => `\\${s}`).join('')}]?[0-9]{0,${
                    fractionLength || Number.MAX_SAFE_INTEGER
                }}`;
            }

            return new RegExp(`^${reStr}$`);
        };

        const restoreCaret = (target: HTMLInputElement) => {
            const input = target;
            const positionCursor = input.selectionStart || 0;
            const isEndPosition = input.value.length === positionCursor;

            const enteredSign = SIGNS.some((s) => s === input.value[positionCursor - 1]);
            const enteredSeparator = SEPARATORS.filter((s) => s !== separator).some(
                (s) => s === input.value[positionCursor - 1],
            );

            const shouldRestore = enteredSeparator || enteredSign;

            if (!isEndPosition && shouldRestore) {
                setTimeout(() => {
                    input.selectionStart = positionCursor;
                    input.selectionEnd = positionCursor;
                });
            }
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const input = event.target;

            const numberRe = getNumberRegExp();
            const testedValue =
                allowSigns && SIGNS.some((s) => s === input.value[0])
                    ? input.value.slice(1)
                    : input.value;

            if (testedValue === '' || numberRe.test(testedValue)) {
                const newValue = input.value.replace(createSeparatorsRegExp(), separator);

                if (onChange) {
                    onChange(event, {
                        value: getNumberValueFromStr(newValue),
                        valueString: newValue,
                    });
                }

                if (uncontrolled) {
                    setValue(newValue);
                }

                restoreCaret(input);
            }
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            const disallowedSymbols = /[/|?!@#$%^&*()_=A-Za-zА-Яа-яЁё ]/;
            const oneKeyPress =
                !event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey;

            // Запрещаем вводить неразрешенные символы за исключением комбинций клавиш
            if (oneKeyPress && event.key.length === 1 && disallowedSymbols.test(event.key)) {
                event.preventDefault();
            }

            // Запрещаем вводить второй сепаратор
            if (
                SEPARATORS.some((s) => s === event.key) &&
                (event.target.value.match(createSeparatorsRegExp()) || []).length
            ) {
                event.preventDefault();
            }
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            const valueBlur = event.target.value.replace(new RegExp(`\\${separator}$`), '');

            if (onChange) {
                onChange(event, {
                    value: getNumberValueFromStr(valueBlur),
                    valueString: valueBlur,
                });
            }

            if (uncontrolled) {
                setValue(valueBlur);
            }

            if (onBlur) onBlur(event);
        };

        const visibleValue = uncontrolled ? value : propValue?.toString();

        return (
            <Input
                ref={mergeRefs([ref, inputRef])}
                value={visibleValue}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                inputMode='decimal'
                {...restProps}
            />
        );
    },
);
