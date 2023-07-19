import React, { ElementType, useCallback, useRef, useState } from 'react';
import cn from 'classnames';

import { FormControlProps } from '@alfalab/core-components-form-control';
import { useFocus } from '@alfalab/hooks';

import { FieldProps as BaseFieldProps } from '../../typings';
import { joinOptions } from '../../utils';

import styles from './index.module.css';

type FieldProps = {
    /**
     * Компонент FormControl
     */
    FormControlComponent?: ElementType;
};

export const Field = ({
    size = 'm',
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
    ...restProps
}: BaseFieldProps & FormControlProps & FieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const value = valueRenderer({ selected, selectedMultiple });

    const filled = Boolean(value);
    const showLabel = !!label && (filled || !placeholder || labelView === 'outer');

    return (
        <div
            className={styles.component}
            ref={wrapperRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {FormControlComponent ? (
                <FormControlComponent
                    fieldClassName={cn(styles.field, fieldClassName, {
                        [styles.disabled]: disabled,
                        [styles.focusVisible]: focusVisible,
                    })}
                    block={true}
                    size={size}
                    focused={open || focused}
                    disabled={disabled}
                    filled={filled}
                    label={showLabel && label}
                    labelView={labelView}
                    error={error}
                    hint={hint}
                    rightAddons={
                        (Arrow || rightAddons) && (
                            <React.Fragment>
                                {rightAddons}
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
                    <div className={styles.contentWrapper}>
                        {placeholder && !filled && (
                            <span className={styles.placeholder}>{placeholder}</span>
                        )}
                        {filled && <div className={styles.value}>{value}</div>}
                    </div>
                </FormControlComponent>
            ) : null}
        </div>
    );
};
