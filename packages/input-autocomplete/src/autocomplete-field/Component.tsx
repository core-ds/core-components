import React, { Fragment, useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { type InputProps } from '@alfalab/core-components-input';
import { InputDesktop as DefaultInput } from '@alfalab/core-components-input/desktop';
import { type FieldProps } from '@alfalab/core-components-select/shared';

import { OnInputReason } from '../enums';
import { type InputAutocompleteCommonProps } from '../types';

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
    dataTestId,
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

    const handleInput: InputProps['onChange'] = (_, payload) =>
        onInput?.(payload.value, OnInputReason.Change);

    /**
     * Right addons priority [4] <= [3] <= [2] <= [1] or [0]
     * [4] - Clear
     * [3] - Status (error, success)
     * [2] - Common (info, e.g.)
     * [1] - Indicators (eye, calendar, chevron, stepper e.g.)
     * [0] - Lock
     */
    const renderRightAddons = () => {
        const renderConfig: Record<string, boolean> = {
            rightAddon: Boolean(inputProps.rightAddons),
            arrowAddon: Boolean(Arrow) && !inputDisabled,
        };

        if (Object.values(renderConfig).every((addon) => !addon)) {
            return undefined;
        }

        const { rightAddon, arrowAddon } = renderConfig;

        return (
            <Fragment>
                {rightAddon && inputProps.rightAddons}
                {arrowAddon && (
                    <span
                        className={cn(styles.arrow, {
                            [styles.error]: error,
                        })}
                    >
                        {Arrow}
                    </span>
                )}
            </Fragment>
        );
    };

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
            rightAddons={renderRightAddons()}
        />
    );
};
