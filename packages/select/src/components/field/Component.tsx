import React, { ElementType, Fragment, useCallback, useRef, useState } from 'react';
import cn from 'classnames';

import type { FormControlProps } from '@alfalab/core-components-form-control';
import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { useFocus } from '@alfalab/hooks';

import { FieldProps as BaseFieldProps } from '../../typings';
import { joinOptions } from '../../utils';
import { ClearButton } from '../clear-button';

import styles from './index.module.css';

type FieldProps = {
    /**
     * Компонент FormControl
     */
    FormControlComponent?: ElementType;
};

// eslint-disable-next-line complexity
export const Field = ({
    size = 56,
    open,
    multiple,
    error,
    hint,
    disabled,
    label,
    labelView = 'inner',
    placeholder,
    selectedMultiple = [],
    selected,
    rightAddons,
    valueRenderer = joinOptions,
    setSelectedItems,
    toggleMenu,
    Arrow,
    innerProps,
    dataTestId,
    fieldClassName,
    FormControlComponent,
    clear,
    onClear,
    showErrorIcon,
    success,
    valueSeparator,
    ...restProps
}: BaseFieldProps & FormControlProps & FieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const value = valueRenderer({ selected, selectedMultiple, valueSeparator });

    const filled = Boolean(value);
    const showLabel = !!label || labelView === 'outer';
    const showPlaceholder = !!placeholder && !filled && (open || !label || labelView === 'outer');

    const shouldShowClearButton = clear && filled;
    const shouldShowErrorIcon = error && showErrorIcon;
    const shouldShowSuccessIcon = success && !error;
    const statusBadgeSize = size === 40 ? 16 : 20;

    return (
        <div
            className={styles.component}
            ref={wrapperRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {FormControlComponent ? (
                <FormControlComponent
                    dataTestId={getDataTestId(dataTestId, 'form-control')}
                    fieldClassName={cn(styles.field, fieldClassName, {
                        [styles.disabled]: disabled,
                        [styles.focusVisible]: focusVisible,
                    })}
                    block={true}
                    size={size}
                    focused={focused || open}
                    disabled={disabled}
                    filled={filled || (!!placeholder && open)}
                    label={showLabel && label}
                    labelView={labelView}
                    error={error}
                    hint={hint}
                    rightAddons={
                        /**
                         * Right addon priority [4] <= [3] <= [2] <= [1]
                         * [4] - Clear
                         * [3] - Status (error, success)
                         * [2] - Common (info, e.g.)
                         * [1] - Indicators (eye, calendar, chevron, stepper e.g.)
                         */
                        (Arrow || rightAddons || shouldShowClearButton || error || success) && (
                            <Fragment>
                                {shouldShowClearButton && (
                                    <ClearButton
                                        onClick={onClear}
                                        disabled={disabled}
                                        dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                                        size={size}
                                    />
                                )}
                                {shouldShowErrorIcon && (
                                    <StatusBadge
                                        view='negative-alert'
                                        size={statusBadgeSize}
                                        dataTestId={getDataTestId(dataTestId, 'error-icon')}
                                    />
                                )}
                                {shouldShowSuccessIcon && (
                                    <StatusBadge
                                        view='positive-checkmark'
                                        size={statusBadgeSize}
                                        dataTestId={getDataTestId(dataTestId, 'success-icon')}
                                    />
                                )}
                                {rightAddons}
                                {/* TODO: стоит переделать, но это будет мажорка */}
                                {Arrow && React.cloneElement(Arrow, { className: styles.arrow })}
                            </Fragment>
                        )
                    }
                    data-test-id={dataTestId}
                    {...restProps}
                    {...innerProps}
                >
                    <div className={cn(styles.contentWrapper, styles[`size-${size}`])}>
                        {showPlaceholder && (
                            <span
                                className={cn(styles.placeholder, {
                                    [styles.focused]: focused || open,
                                })}
                            >
                                {placeholder}
                            </span>
                        )}
                        {filled && (
                            <div className={cn(styles.value, styles[`size-${size}`])}>{value}</div>
                        )}
                    </div>
                </FormControlComponent>
            ) : null}
        </div>
    );
};
