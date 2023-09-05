import React, { ChangeEvent, FocusEvent, KeyboardEvent, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';

import type { InputProps } from '@alfalab/core-components-input';

import { createSeparatorsRegExp, getAllowedValue, SEPARATORS, SIGNS } from '../../utils';

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
     *  Компонент инпута
     */
    Input: React.FC<InputProps & { ref?: React.Ref<HTMLInputElement> }>;

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
             * Используйте для изменения значения инпута
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
            Input,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = propValue === undefined;
        const inputRef = useRef<HTMLInputElement>(null);
        const [value, setValue] = useState<string>(defaultValue || '');

        const getNumberValueFromStr = (valueString: string) => {
            if (valueString === '') return null;

            if (valueString.includes(',')) {
                return parseFloat(valueString.replace(',', '.'));
            }

            return parseFloat(valueString);
        };

        const restoreCaret = (target: HTMLInputElement) => {
            setTimeout(() => {
                const input = target;
                const positionCursor = input.selectionStart || 0;
                const isEndPosition = input.value.length === positionCursor;

                const enteredSign = SIGNS.some((s) => s === input.value[positionCursor - 1]);
                const enteredSeparator = SEPARATORS.filter((s) => s !== separator).some(
                    (s) => s === input.value[positionCursor - 1],
                );

                const shouldRestore = enteredSeparator || enteredSign;

                if (!isEndPosition && shouldRestore) {
                    input.selectionStart = positionCursor;
                    input.selectionEnd = positionCursor;
                }
            });
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const input = event.target;
            const newValue = input.value.replace(createSeparatorsRegExp(), separator);

            const allowedValue = getAllowedValue({
                value: newValue,
                fractionLength,
                allowSigns,
                separator,
            });

            if (onChange) {
                onChange(event, {
                    value: getNumberValueFromStr(allowedValue),
                    valueString: allowedValue,
                });
            }

            if (uncontrolled) {
                setValue(allowedValue);
            }

            restoreCaret(input);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            const disallowedSymbols = /[/|?!@#$%^&*()_=A-Za-zА-Яа-яЁё ]/;
            const oneKeyPress = !event.altKey && !event.metaKey && !event.ctrlKey;
            const target = event.target as HTMLInputElement;

            // Запрещаем вводить неразрешенные символы за исключением комбинаций клавиш
            if (oneKeyPress && event.key.length === 1 && disallowedSymbols.test(event.key)) {
                return event.preventDefault();
            }

            const val = target.value;

            const hasSeparator = (val.match(createSeparatorsRegExp()) || []).length > 0;

            // Запрещаем вводить второй сепаратор
            if (hasSeparator && SEPARATORS.some((s) => s === event.key)) {
                return event.preventDefault();
            }

            // Запрещаем вводить лишний знак
            if (
                (!allowSigns || SIGNS.some((s) => s === val[0])) &&
                SIGNS.some((s) => s === event.key)
            ) {
                return event.preventDefault();
            }

            const selectionStart = target.selectionStart || 0;

            // Запрещаем вводить цифры в дробную часть, если кол-во цифр больше fractionLength
            if (
                hasSeparator &&
                fractionLength &&
                event.key.length === 1 &&
                selectionStart > val.indexOf(separator) &&
                val.split(separator)[1].length >= fractionLength
            ) {
                return event.preventDefault();
            }

            return undefined;
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
