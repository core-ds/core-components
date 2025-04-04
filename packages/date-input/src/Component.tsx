import React, { ChangeEvent, FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { Input, InputProps } from '@balafla/core-components-input';

import {
    format,
    formatDate,
    isCompleteDateInput,
    isInputDateSupported,
    isValid,
    NATIVE_DATE_FORMAT,
    parseDateString,
} from './utils';

import styles from './index.module.css';

export type DateInputProps = Omit<InputProps, 'onChange'> & {
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: 'input' | 'native';

    /**
     * Обработчик изменения значения
     */
    onChange?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: { date: Date; value: string },
    ) => void;

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (
        event: ChangeEvent<HTMLInputElement>,
        payload: { date: Date; value: string },
    ) => void;
};

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    (
        {
            mobileMode = 'input',
            defaultValue = '',
            rightAddons,
            error,
            value: propValue,
            onBlur,
            onChange,
            onComplete,
            ...restProps
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const [shouldRenderNative, setShouldRenderNative] = useState(false);

        const [value, setValue] = useState(propValue || defaultValue);

        const moveCaretTo = (pos: number) => {
            requestAnimationFrame(() => {
                inputRef.current?.setSelectionRange(pos, pos);
            });
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { value: newValue } = event.target;
            const caretPos = event.target.selectionStart || 0;

            // Позволяем вводить только цифры и точки
            if (/[^\d.]/.test(newValue)) {
                moveCaretTo(caretPos - 1);

                return;
            }

            // Не даем вводить больше, чем 2 точки
            if (getDotsCount(newValue) > 2) {
                moveCaretTo(caretPos - 1);

                return;
            }

            // Форматируем введенное значение (добавляем точки)
            const formattedValue = format(newValue);
            const date = parseDateString(formattedValue);

            // Управляем кареткой, если она находится не в конце инпута
            if (caretPos !== newValue.length) {
                if (formattedValue === value) {
                    moveCaretTo(caretPos);
                } else if (newValue.length - formattedValue.length === 1) {
                    moveCaretTo(caretPos);
                } else if (
                    formattedValue.length - newValue.length === 1 &&
                    getDotsCount(formattedValue) > getDotsCount(newValue)
                ) {
                    moveCaretTo(caretPos);
                }
            }

            setValue(formattedValue);

            if (onChange) onChange(event, { date, value: formattedValue });

            if (isCompleteDateInput(formattedValue)) {
                const valid = formattedValue.length > 0 && isValid(formattedValue);

                if (!valid) return;

                if (onComplete) onComplete(event, { date, value: formattedValue });
            }
        };

        const handleNativeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            const newDate = parseDateString(event.target.value, NATIVE_DATE_FORMAT);
            const newValue = event.target.value === '' ? '' : formatDate(newDate);

            setValue(newValue);

            if (onComplete) onComplete(event, { date: newDate, value: newValue });
            if (onChange) onChange(event, { date: newDate, value: newValue });
        };

        const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
            if (onBlur) onBlur(event);
        };

        useEffect(() => {
            if (mobileMode === 'native' && isInputDateSupported()) {
                setShouldRenderNative(true);
            }
        }, [mobileMode]);

        useEffect(() => {
            if (typeof propValue !== 'undefined') {
                setValue(propValue);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [propValue]);

        return (
            <Input
                {...restProps}
                ref={mergeRefs([ref, inputRef])}
                value={value}
                inputMode='decimal'
                pattern='[0-9\.]*'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='ДД.ММ.ГГГГ'
                error={error}
                rightAddons={
                    <React.Fragment>
                        {rightAddons}

                        {shouldRenderNative && (
                            <input
                                type='date'
                                ref={ref}
                                defaultValue={defaultValue}
                                onChange={handleNativeInputChange}
                                className={styles.nativeInput}
                            />
                        )}
                    </React.Fragment>
                }
            />
        );
    },
);

function getDotsCount(value: string) {
    return (value.match(/\./g) || []).length;
}
