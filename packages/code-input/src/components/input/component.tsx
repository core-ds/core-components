import React, {
    type ChangeEvent,
    type ChangeEventHandler,
    forwardRef,
    type InputHTMLAttributes,
    type KeyboardEvent,
    type KeyboardEventHandler,
    type MouseEventHandler,
} from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'onKeyDown' | 'enterKeyHint'
> & {
    index: number;
    value: string;
    error: boolean;
    compact?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>, payload: { index: number }) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>, payload: { index: number }) => void;
    stylesInput?: { [key: string]: string };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            index,
            error,
            disabled,
            value = '',
            compact = false,
            onChange,
            onKeyDown,
            onFocus,
            stylesInput = {},
        },
        ref,
    ) => {
        const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
            onChange(event, { index });
        };

        const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
            onKeyDown(event, { index });
        };

        const handleClick: MouseEventHandler = (event) => {
            event.persist();
            const target = event.target as HTMLInputElement;

            /**
             * В сафари выделение корректно работает только с асинхронным вызовом
             */
            requestAnimationFrame(() => {
                target?.select();
            });
        };

        return (
            <input
                ref={ref}
                className={cn(styles.input, stylesInput.component, {
                    [styles.hasError]: error,
                    [stylesInput.hasError]: error,

                    [styles.disabled]: disabled,
                    [stylesInput.disabled]: disabled,

                    [styles.compact]: compact,
                    [stylesInput.compact]: Boolean(stylesInput.compact) && compact,
                })}
                disabled={disabled}
                value={value}
                autoComplete={index === 0 ? 'one-time-code' : ''}
                inputMode='numeric'
                pattern='[0-9]*'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onClick={handleClick}
            />
        );
    },
);
