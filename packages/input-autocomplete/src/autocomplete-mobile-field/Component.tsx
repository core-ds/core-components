import React, { ElementType, useRef, useState } from 'react';
import cn from 'classnames';

import {
    FormControlMobile,
    FormControlMobileProps,
} from '@alfalab/core-components-form-control/mobile';
import type { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
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
    FormControlComponent,
    ...restProps
}: AutocompleteMobileFieldProps & FieldProps) => {
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const filled = Boolean(value);
    const showPlaceholder = placeholder && !filled && labelView === 'outer';

    const { tabIndex, ...restInnerProps } = innerProps;

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
                rightAddons={Arrow}
                dataTestId={getDataTestId(dataTestId, 'form-control')}
                // downshift устанавливает фокус на таргет поле после выбора опции, не даем ему это сделать пока открыт список, иначе поле поиска будет терять фокус
                tabIndex={open ? undefined : tabIndex}
                {...restProps}
                {...restInnerProps}
            >
                <div className={styles.contentWrapper}>
                    {showPlaceholder && <span className={styles.placeholder}>{placeholder}</span>}
                    {filled && <div className={styles.value}>{value}</div>}
                </div>
            </FormControlMobile>
        </div>
    );
};
