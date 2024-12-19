import React, { ElementType, useCallback, useRef, useState } from 'react';
import cn from 'classnames';

import type { FormControlProps } from '@alfalab/core-components-form-control';
import { getDataTestId } from '@alfalab/core-components-shared';
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
    ...restProps
}: BaseFieldProps & FormControlProps & FieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const value = valueRenderer({ selected, selectedMultiple });

    const filled = Boolean(value);
    const showLabel = !!label || labelView === 'outer';
    const showPlaceholder = !!placeholder && !filled && (open || !label || labelView === 'outer');

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
                        (Arrow || rightAddons) && (
                            <React.Fragment>
                                {rightAddons}
                                {clear && filled ? (
                                    <ClearButton
                                        onClick={onClear}
                                        disabled={disabled}
                                        dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                                        size={size}
                                    />
                                ) : null}
                                {/* TODO: стоит переделать, но это будет мажорка */}
                                {Arrow
                                    ? React.cloneElement(Arrow, { className: styles.arrow })
                                    : null}
                            </React.Fragment>
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
