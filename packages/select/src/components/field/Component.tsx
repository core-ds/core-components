import React, { type ElementType, Fragment, useCallback, useRef, useState } from 'react';
import cn from 'classnames';

import { type FormControlProps } from '@alfalab/core-components-form-control';
import { LockIcon } from '@alfalab/core-components-input/shared';
import { getDataTestId } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import { type FieldProps as BaseFieldProps } from '../../typings';
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
    valueSeparator,
    ...restProps
}: BaseFieldProps & FormControlProps & FieldProps) => {
    const { colors = 'default' } = restProps;
    const [focused, setFocused] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const value = valueRenderer({ selected, selectedMultiple, valueSeparator });

    const filled = Boolean(value);
    const showLabel = !!label || labelView === 'outer';
    const showPlaceholder = !!placeholder && !filled && (open || !label || labelView === 'outer');

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
            clearAddon: clear && filled && !disabled,
            rightAddon: Boolean(rightAddons),
            arrowAddon: Boolean(Arrow) && !disabled,
            lockAddon: Boolean(disabled),
        };

        if (Object.values(renderConfig).every((addon) => !addon)) {
            return undefined;
        }

        const { clearAddon, rightAddon, arrowAddon, lockAddon } = renderConfig;

        return (
            <Fragment>
                {clearAddon && (
                    <ClearButton
                        onClick={onClear}
                        disabled={disabled}
                        dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                        size={size}
                    />
                )}
                {rightAddon && rightAddons}
                {arrowAddon && Arrow && React.cloneElement(Arrow, { className: styles.arrow })}
                {lockAddon && <LockIcon colors={colors} size={size} />}
            </Fragment>
        );
    };

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
                    rightAddons={renderRightAddons()}
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
