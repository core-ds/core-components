import React, {
    type ChangeEventHandler,
    forwardRef,
    type InputHTMLAttributes,
    type KeyboardEventHandler,
} from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export interface InputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange' | 'onKeyDown' | 'enterKeyHint'
    > {
    index: number;
    value: string;
    error: boolean;
    compact?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    stylesInput?: { [key: string]: string };
}

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
            onMouseDown,
            stylesInput = {},
            'aria-label': ariaLabel,
        },
        ref,
    ) => (
        <input
            ref={ref}
            data-code-input-index={index}
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
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onMouseDown={onMouseDown}
            aria-label={ariaLabel}
        />
    ),
);
