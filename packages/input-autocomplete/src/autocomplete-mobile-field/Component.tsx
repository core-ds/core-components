import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { FormControl, FormControlProps } from '@alfalab/core-components-form-control';
import type { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

export type AutocompleteMobileFieldProps = FormControlProps &
    Omit<BaseFieldProps, 'selected' | 'multiple' | 'success'> & {
        value?: string;
    };

export const AutocompleteMobileField = ({
    size = 'm',
    open,
    disabled,
    value,
    innerProps,
    dataTestId,
    fieldClassName,
    labelView = 'inner',
    placeholder,
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
    const showPlaceholder = placeholder && !filled && labelView === 'outer';

    return (
        <div
            className={styles.component}
            ref={wrapperRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        >
            <FormControl
                fieldClassName={cn(styles.field, fieldClassName, {
                    [styles.disabled]: disabled,
                    [styles.focusVisible]: focusVisible,
                })}
                block={true}
                size={size}
                focused={focused}
                disabled={disabled}
                filled={filled}
                labelView={labelView}
                rightAddons={Arrow}
                data-test-id={dataTestId}
                {...restProps}
                {...innerProps}
            >
                <div className={styles.contentWrapper}>
                    {showPlaceholder && <span className={styles.placeholder}>{placeholder}</span>}
                    {filled && <div className={styles.value}>{value}</div>}
                </div>
            </FormControl>
        </div>
    );
};
