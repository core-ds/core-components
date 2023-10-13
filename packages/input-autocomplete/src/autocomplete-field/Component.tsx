import React, { useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { InputDesktop as DefaultInput } from '@alfalab/core-components-input/desktop';
import type { FieldProps } from '@alfalab/core-components-select/shared';

import { InputAutocompleteCommonProps } from '../types';

import styles from './index.module.css';

export type AutocompleteFieldProps = FieldProps &
    Pick<InputAutocompleteCommonProps, 'Input' | 'inputProps' | 'value' | 'onInput' | 'readOnly'>;

export const AutocompleteField = ({
    label,
    labelView = 'inner',
    placeholder,
    size,
    Arrow,
    Input = DefaultInput,
    value,
    error,
    success,
    hint,
    disabled,
    readOnly,
    onInput,
    inputProps = {},
    innerProps,
}: AutocompleteFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { onClick, onFocus } = innerProps;

    const inputDisabled = disabled || readOnly;

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (onClick) onClick(event);

            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [onClick],
    );

    return (
        <Input
            {...inputProps}
            {...innerProps}
            wrapperRef={mergeRefs([
                innerProps.ref as React.Ref<HTMLElement>,
                inputProps.wrapperRef as React.Ref<HTMLElement>,
            ])}
            ref={mergeRefs([inputRef, inputProps.ref as React.Ref<HTMLElement>])}
            disabled={disabled}
            readOnly={readOnly}
            block={true}
            label={label}
            labelView={labelView}
            placeholder={placeholder}
            size={size}
            error={error}
            success={success}
            hint={hint}
            onChange={onInput}
            onClick={inputDisabled ? undefined : handleClick}
            onFocus={inputDisabled ? undefined : onFocus}
            autoComplete='off'
            value={value}
            rightAddons={
                (Arrow || inputProps.rightAddons) && (
                    <React.Fragment>
                        {inputProps.rightAddons}
                        {Arrow && (
                            <span
                                className={cn(styles.arrow, {
                                    [styles.error]: error,
                                })}
                            >
                                {Arrow}
                            </span>
                        )}
                    </React.Fragment>
                )
            }
        />
    );
};
