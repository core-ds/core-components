import React, { ElementType, Fragment, useRef, useState } from 'react';
import cn from 'classnames';

import {
    FormControlMobile,
    FormControlMobileProps,
} from '@alfalab/core-components-form-control/mobile';
import { ClearButton } from '@alfalab/core-components-input/shared';
import type { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { useFocus } from '@alfalab/hooks';

import { InputAutocompleteCommonProps } from '../types';

import styles from './index.module.css';

type FieldProps = {
    /**
     * Компонент FormControl
     */
    FormControlComponent?: ElementType;
};

export type AutocompleteMobileFieldProps = FieldProps &
    FormControlMobileProps &
    Pick<InputAutocompleteCommonProps, 'showErrorIcon'> &
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
    showErrorIcon,
    readOnly,
    clear,
    success,
    onClear,
    onInput,
    colors = 'default',
    ...restProps
}: AutocompleteMobileFieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const filled = Boolean(value);
    const showPlaceholder = placeholder && !filled && labelView === 'outer';
    const clearButtonVisible = clear && filled && !disabled && !readOnly;
    const shouldShowErrorIcon = error && showErrorIcon;
    const shouldShowSuccessIcon = success && !error;
    const statusBadgeSize = size === 40 ? 16 : 20;

    const { tabIndex, ...restInnerProps } = innerProps;

    const formRightAddons = (Arrow || rightAddons || clearButtonVisible || error || success) && (
        <Fragment>
            {clearButtonVisible && (
                <ClearButton onClick={onClear} disabled={disabled} colors={colors} />
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
            {Arrow}
            {rightAddons}
        </Fragment>
    );

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
                rightAddons={formRightAddons}
            >
                <div className={styles.contentWrapper}>
                    {showPlaceholder && <span className={styles.placeholder}>{placeholder}</span>}
                    {filled && <div className={styles.value}>{value}</div>}
                </div>
            </FormControlMobile>
        </div>
    );
};
