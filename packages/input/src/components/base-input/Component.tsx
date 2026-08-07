import React, {
    type AnimationEvent,
    forwardRef,
    Fragment,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
    useCallback,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { StatusBadge } from '@alfalab/core-components-status-badge';
import { useFocus, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { hasStepperInRightAddon } from '../../helpers/has-stepper-in-right-addon';
import { ClearButton } from '../clear-button';
import { LockIcon } from '../lock-icon';

import { type BaseInputProps } from './types/base-input-props';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorCommonStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const inputTypesForSelectionRange = ['password', 'search', 'tel', 'text', 'url'];

export const BaseInput = forwardRef<
    HTMLInputElement,
    BaseInputProps & {
        platformStyles?: Record<string, string>;
    }
>(
    // eslint-disable-next-line complexity
    (
        {
            size = 48,
            type = 'text',
            block = false,
            colors = 'default',
            bottomAddons,
            dataTestId,
            clear = false,
            disabled,
            error,
            success,
            hint,
            className,
            fieldClassName,
            inputClassName,
            labelClassName,
            addonsClassName,
            rightAddonsProps,
            leftAddonsProps,
            focusedClassName,
            filledClassName,
            label,
            labelView = 'inner',
            leftAddons,
            onFocus,
            onBlur,
            onChange,
            onClear,
            onClick,
            onMouseDown,
            onMouseUp,
            onAnimationStart,
            rightAddons,
            value,
            defaultValue,
            wrapperRef,
            readOnly: readOnlyProp,
            FormControlComponent,
            disableUserInput,
            platformStyles = {},
            bold,
            fontWeight = bold ? 'bold' : 'normal',
            ...restProps
        },
        ref,
    ) => {
        const { onKeyDown, onMouseEnter, onMouseLeave } = restProps;
        const uncontrolled = value === undefined;
        const readOnly = readOnlyProp || disableUserInput;

        const inputRef = useRef<HTMLInputElement>(null);

        const [focusVisible] = useFocus(inputRef, 'keyboard');

        const [focused, setFocused] = useState(restProps.autoFocus);
        const [hovered, setHovered] = useState<boolean>(false);
        const [stateValue, setStateValue] = useState(defaultValue || '');

        const filled = Boolean(uncontrolled ? stateValue : value);
        const [autofilled, setAutofilled] = useState(false);

        const resolveClearVisible = () => {
            if (Boolean(clear) && filled && !disabled && !readOnlyProp) {
                if ([true, 'always'].includes(clear)) {
                    return true;
                }

                if (clear === 'auto' && (focused || hovered)) {
                    return true;
                }

                return false;
            }

            return false;
        };

        const clearButtonVisible = resolveClearVisible();

        const handleMouseEnter: MouseEventHandler<HTMLInputElement> = useCallback(
            (e) => {
                setHovered(true);

                if (onMouseEnter) {
                    onMouseEnter(e);
                }
            },
            [onMouseEnter],
        );

        const handleMouseLeave: MouseEventHandler<HTMLInputElement> = useCallback(
            (e) => {
                setHovered(false);

                if (onMouseLeave) {
                    onMouseLeave(e);
                }
            },
            [onMouseLeave],
        );

        const shouldRenderErrorIcon = error && !clearButtonVisible;
        const shouldRenderSuccessIcon = success && !error && !clearButtonVisible;

        const hasInnerLabel = label && labelView === 'inner';

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const input = inputRef.current;

            if (
                !restProps.autoFocus ||
                !input ||
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
                !inputTypesForSelectionRange.includes(input.type)
            ) {
                return;
            }

            // https://github.com/facebook/react/issues/14125
            input.setSelectionRange(input.value.length, input.value.length);
        }, []);

        const handleInputFocus = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                if (onFocus) {
                    onFocus(event);
                }

                if (readOnlyProp) {
                    return;
                }

                if (disableUserInput && hasStepperInRightAddon(rightAddons)) {
                    return;
                }

                setFocused(true);
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [onFocus, readOnlyProp, disableUserInput],
        );

        const handleInputBlur = useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                setFocused(false);

                if (onBlur) {
                    onBlur(event);
                }
            },
            [onBlur],
        );

        const handleInputChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                let inputValue = event.target.value;
                const target = event.target as HTMLInputElement;
                const isInputTypeNumber = target.getAttribute('type') === 'number';
                const pattern = /[eE]/g;

                if (isInputTypeNumber && pattern.test(inputValue)) {
                    inputValue = inputValue.replace(pattern, '');
                }

                if (onChange) {
                    onChange(event, { value: inputValue });
                }

                if (uncontrolled) {
                    setStateValue(inputValue);
                }
            },
            [onChange, uncontrolled],
        );

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                /**
                 * По умолчанию в input[type=number] можно вводить числа типа 2e5 (200 000)
                 * Это ломает некоторое поведение, поэтому запрещаем ввод символов [eE]
                 * @see DS-6808
                 */
                const { key, target } = event;
                const eventTarget = target as HTMLInputElement;
                const isInputTypeNumber = eventTarget.getAttribute('type') === 'number';

                if (isInputTypeNumber && (key === 'e' || key === 'E')) {
                    event.preventDefault();

                    return;
                }

                if (onKeyDown) {
                    onKeyDown(event);
                }
            },
            [onKeyDown],
        );

        const handleClear = useCallback(
            (event: MouseEvent<HTMLButtonElement>) => {
                if (!clearButtonVisible) return;

                if (uncontrolled) {
                    setStateValue('');
                }

                if (onClear) {
                    onClear(event);
                }

                if (inputRef.current && !focused) {
                    inputRef.current.focus();
                }
            },
            [clearButtonVisible, focused, onClear, uncontrolled],
        );

        const handleAnimationStart = useCallback(
            (event: AnimationEvent<HTMLInputElement>) => {
                if (onAnimationStart) {
                    onAnimationStart(event);
                }

                setAutofilled(event.animationName.includes('start'));
            },
            [onAnimationStart],
        );

        /**
         * Right addons priority [4] or [3] <= [2] <= [1] or [0]
         * [4] - Status (error, success)
         * [3] - Clear
         * [2] - Common (info, e.g.)
         * [1] - Indicators (eye, calendar, chevron, stepper e.g.)
         * [0] - Lock
         */
        const renderRightAddons = () => {
            const statusBadgeSize = size === 40 ? 16 : 20;

            return (
                <Fragment>
                    {clearButtonVisible && (
                        <ClearButton
                            onClick={handleClear}
                            disabled={disabled}
                            colors={colors}
                            dataTestId={getDataTestId(dataTestId, 'clear-icon')}
                            size={size}
                        />
                    )}
                    {shouldRenderErrorIcon && (
                        <div
                            className={cn(styles.errorIcon, {
                                [styles.size_40]: size === 40,
                            })}
                            data-addon='error-icon'
                        >
                            <StatusBadge
                                view='negative-alert'
                                size={statusBadgeSize}
                                dataTestId={getDataTestId(dataTestId, 'error-icon')}
                            />
                        </div>
                    )}
                    {shouldRenderSuccessIcon && (
                        <div
                            className={cn(styles.successIcon, {
                                [styles.size_40]: size === 40,
                            })}
                        >
                            <StatusBadge
                                view='positive-checkmark'
                                size={statusBadgeSize}
                                dataTestId={getDataTestId(dataTestId, 'success-icon')}
                            />
                        </div>
                    )}
                    {rightAddons}
                    {(disabled || readOnlyProp) && <LockIcon colors={colors} size={size} />}
                </Fragment>
            );
        };

        return FormControlComponent ? (
            <FormControlComponent
                ref={wrapperRef}
                className={cn(
                    className,
                    focused && focusedClassName,
                    filled && filledClassName,
                    [platformStyles.formControlDesktop],
                    [platformStyles[`size-${size}`]],
                )}
                fieldClassName={cn(fieldClassName, [platformStyles.field], {
                    [styles.focusVisible]: focusVisible,
                })}
                labelClassName={labelClassName}
                addonsClassName={addonsClassName}
                size={size}
                colors={colors}
                block={block}
                disabled={disabled}
                readOnly={readOnlyProp}
                filled={filled || autofilled || focused}
                focused={focused}
                error={error}
                label={label}
                labelView={labelView}
                hint={hint}
                leftAddons={leftAddons}
                rightAddons={renderRightAddons()}
                bottomAddons={bottomAddons}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                dataTestId={getDataTestId(dataTestId, 'form-control')}
                rightAddonsProps={rightAddonsProps}
                leftAddonsProps={leftAddonsProps}
            >
                <input
                    {...restProps}
                    className={cn(
                        styles.input,
                        styles[`size-${size}`],
                        colorCommonStyles[colors].input,
                        {
                            [styles.disableUserInput]: disableUserInput,
                            [colorCommonStyles[colors].disableUserInput]: disableUserInput,
                            [colorCommonStyles[colors].error]: error,
                            [styles[`size-${size}`]]: hasInnerLabel,
                            [styles.hasInnerLabel]: hasInnerLabel,
                            [colorCommonStyles[colors].hasInnerLabel]: hasInnerLabel,
                            [styles.bold]: fontWeight === 'bold',
                            [styles.medium]: fontWeight === 'medium',
                        },
                        inputClassName,
                    )}
                    disabled={disabled}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onAnimationStart={handleAnimationStart}
                    ref={mergeRefs([ref, inputRef])}
                    type={type}
                    value={uncontrolled ? stateValue : value}
                    readOnly={readOnly}
                    data-test-id={dataTestId}
                    aria-label={typeof label === 'string' ? label : undefined}
                />
            </FormControlComponent>
        ) : null;
    },
);
