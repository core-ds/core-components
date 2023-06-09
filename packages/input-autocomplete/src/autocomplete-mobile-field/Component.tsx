import React, { useRef, useState } from 'react';
import cn from 'classnames';

import {
    FormControlMobile,
    FormControlMobileProps,
} from '@alfalab/core-components-form-control/mobile';
import { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import type { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

export type AutocompleteMobileFieldProps = FormControlMobileProps &
    Omit<BaseFieldProps, 'selected' | 'multiple' | 'success'> &
    Pick<InputAutocompleteProps, 'value'>;

export const AutocompleteMobileField = ({
    size = 'm',
    open,
    error,
    hint,
    disabled,
    label,
    labelView = 'inner',
    placeholder,
    value,
    innerProps,
    dataTestId,
    fieldClassName,
    Arrow,
    valueRenderer,
    toggleMenu,
    setSelectedItems,
    selectedMultiple,
    ...restProps
}: AutocompleteMobileFieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const filled = Boolean(value);
    const showLabel = !!label && (filled || !placeholder || labelView === 'outer');

    return (
        <div
            className={styles.component}
            ref={wrapperRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            <FormControlMobile
                fieldClassName={cn(styles.field, fieldClassName, {
                    [styles.disabled]: disabled,
                    [styles.focusVisible]: focusVisible,
                })}
                block={true}
                size={size}
                focused={focused}
                disabled={disabled}
                filled={filled}
                label={showLabel && label}
                labelView={labelView}
                error={error}
                hint={hint}
                rightAddons={Arrow}
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
            </FormControlMobile>
        </div>
    );
};
