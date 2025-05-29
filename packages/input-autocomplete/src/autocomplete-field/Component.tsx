/* eslint-disable complexity */
import React, { MouseEvent, useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { InputProps } from '@alfalab/core-components-input';
import { InputDesktop as DefaultInput } from '@alfalab/core-components-input/desktop';
import { ClearButton } from '@alfalab/core-components-input/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { Textarea, TextareaProps } from '@alfalab/core-components-textarea';

import { OnInputReason } from '../enums';
import { AutocompleteFieldProps } from '../types';

import styles from './index.module.css';

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
    dataTestId,
    multiline = false,
}: AutocompleteFieldProps) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const { onClick, onFocus } = innerProps;
    const inputDisabled = disabled || readOnly;

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement | HTMLTextAreaElement>) => {
            if (onClick) {
                onClick(event);
            }

            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [onClick],
    );

    const handleInput: InputProps['onChange'] & TextareaProps['onChange'] = (_, payload) =>
        onInput?.(payload.value, OnInputReason.Change);

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => inputProps.onClear?.(event);

    if (multiline) {
        const { onClear, clear, ...textareaProps } = inputProps;

        const clearButtonVisible = clear && !!value && !disabled && !readOnly;
        const addonsVisible = clearButtonVisible || inputProps.rightAddons || error || success;

        return (
            <Textarea
                dataTestId={dataTestId}
                {...textareaProps}
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
                hint={hint}
                onChange={handleInput}
                onClick={inputDisabled ? undefined : handleClick}
                onFocus={inputDisabled ? undefined : onFocus}
                autoComplete='off'
                value={value}
                maxRows={inputProps.maxRows || 3}
                rightAddons={
                    addonsVisible && (
                        <React.Fragment>
                            {clearButtonVisible && (
                                <ClearButton
                                    onClick={handleClear}
                                    colors={inputProps.colors || 'default'}
                                    dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                                    size={size}
                                />
                            )}
                            {(Arrow || inputProps.rightAddons) && (
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
                            )}
                            {success && !error && (
                                <div className={cn(styles.successIcon, styles[`size-${size}`])}>
                                    <StatusBadge
                                        view='positive-checkmark'
                                        size={size === 40 ? 16 : 20}
                                        dataTestId={getDataTestId(dataTestId, 'success-icon')}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    )
                }
            />
        );
    }

    return (
        <Input
            dataTestId={dataTestId}
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
            onChange={handleInput}
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
