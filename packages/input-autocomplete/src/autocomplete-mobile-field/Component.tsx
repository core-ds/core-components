import React, { type ElementType, useRef, useState } from 'react';
import cn from 'classnames';

import {
    FormControlMobile,
    type FormControlMobileProps,
} from '@alfalab/core-components-form-control/mobile';
import { ClearButton, getAddonsByPriority, LockIcon } from '@alfalab/core-components-input/shared';
import { type FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { useFocus } from '@alfalab/hooks';

import styles from './index.module.css';

type FieldProps = {
    /**
     * Компонент FormControl
     */
    FormControlComponent?: ElementType;
};

export type AutocompleteMobileFieldProps = FormControlMobileProps &
    Omit<BaseFieldProps, 'selected' | 'multiple' | 'success'> & {
        /**
         * Значение поля ввода
         */
        value?: string;
    };

// eslint-disable-next-line complexity
export const AutocompleteMobileField = ({
    size = 56,
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
    FormControlComponent,
    rightAddons,
    error,
    readOnly,
    clear,
    success,
    onClear,
    onInput,
    colors = 'default',
    ...restProps
}: AutocompleteMobileFieldProps & FieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const filled = Boolean(value);
    const showPlaceholder = placeholder && !filled && labelView === 'outer';

    const statusBadgeSize = size === 40 ? 16 : 20;

    const { tabIndex, ...restInnerProps } = innerProps;

    /**
     * Right addons priority [4] <= [3] <= [2] <= [1] or [0]
     * [4] - Clear
     * [3] - Status (error, success)
     * [2] - Common (info, e.g.)
     * [1] - Indicators (eye, calendar, chevron, stepper e.g.)
     * [0] - Lock
     */
    const rightAddonsMap = getAddonsByPriority([
        {
            priority: 4,
            predicate: clear && filled && !disabled && !readOnly,
            render: () => <ClearButton onClick={onClear} disabled={disabled} colors={colors} />,
        },
        {
            priority: 3,
            predicate: Boolean(error),
            render: () => (
                <div className={styles.errorIcon} data-addon='error-icon'>
                    <StatusBadge
                        view='negative-alert'
                        size={statusBadgeSize}
                        dataTestId={getDataTestId(dataTestId, 'error-icon')}
                    />
                </div>
            ),
        },
        {
            priority: 3,
            predicate: Boolean(success && !error),
            render: () => (
                <div className={styles.successIcon}>
                    <StatusBadge
                        view='positive-checkmark'
                        size={statusBadgeSize}
                        dataTestId={getDataTestId(dataTestId, 'success-icon')}
                    />
                </div>
            ),
        },
        {
            priority: 2,
            predicate: Boolean(rightAddons),
            render: () => rightAddons,
        },
        {
            priority: 1,
            predicate: Boolean(Arrow) && !disabled && !readOnly,
            render: () => Arrow,
        },
        {
            priority: 0,
            predicate: Boolean(disabled || readOnly),
            render: () => <LockIcon colors={colors} size={size} />,
        },
    ]);

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
                labelView={labelView}
                dataTestId={getDataTestId(dataTestId, 'form-control')}
                // downshift устанавливает фокус на таргет поле после выбора опции, не даем ему это сделать пока открыт список, иначе поле поиска будет терять фокус
                tabIndex={open ? undefined : tabIndex}
                {...restProps}
                {...restInnerProps}
                readOnly={readOnly}
                colors={colors}
                error={error}
                rightAddons={rightAddonsMap}
            >
                <div className={styles.contentWrapper}>
                    {showPlaceholder && <span className={styles.placeholder}>{placeholder}</span>}
                    {filled && <div className={styles.value}>{value}</div>}
                </div>
            </FormControlMobile>
        </div>
    );
};
