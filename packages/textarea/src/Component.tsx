import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';

import { FormControl } from '@alfalab/core-components-form-control';
import { useIsDesktop } from '@alfalab/core-components-mq';
import { getDataTestId } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import { PseudoTextArea } from './components';
import { SIZE_TO_CLASSNAME_MAP } from './consts';
import { TextareaProps } from './typings';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const getDefaultCounterText = (textLength: number, maxLength = 0): string =>
    `${textLength}/${maxLength} символов`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            autoComplete = 'on',
            autosize = true,
            size = 48,
            colors = 'default',
            block = false,
            bottomAddons,
            fieldClassName,
            className,
            dataTestId,
            disabled,
            error,
            hint,
            textareaClassName,
            label,
            labelView = 'inner',
            leftAddons,
            onFocus,
            onBlur,
            onChange,
            onHeightChange,
            rightAddons,
            maxRows,
            minRows,
            maxHeight,
            resize = 'none',
            value,
            defaultValue,
            rows = autosize ? 1 : 3,
            showCounter = false,
            getCounterText = getDefaultCounterText,
            maxLength,
            allowOverflow = true,
            nativeScrollbar: nativeScrollbarProp,
            wrapperRef,
            breakpoint,
            client,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = value === undefined;

        const isDesktop = useIsDesktop(breakpoint, client === 'desktop');
        let nativeScrollbar = !isDesktop;

        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const [textareaNode, setTextareaNode] = useState<HTMLTextAreaElement | null>(null);
        const pseudoTextareaRef = useRef<HTMLDivElement>(null);

        const [focused, setFocused] = useState(false);
        const [stateValue, setStateValue] = useState(defaultValue || '');
        const [scrollPosition, setScrollPosition] = useState(0);

        const [focusVisible] = useFocus(
            useMemo(() => ({ current: textareaNode }), [textareaNode]),
            'keyboard',
        );

        const filled = Boolean(uncontrolled ? stateValue : value);
        const hasInnerLabel = label && labelView === 'inner';

        const hasOverflow = Boolean(
            maxLength && allowOverflow && (value?.slice(maxLength) || stateValue.slice(maxLength)),
        );

        useEffect(() => {
            const pseudoNode = pseudoTextareaRef.current;

            if (pseudoNode) {
                pseudoNode.scrollTop = scrollPosition;
            }
        }, [scrollPosition, stateValue, hasOverflow]);

        // Хак, так как react-textarea-autosize перестал поддерживать maxHeight
        useEffect(() => {
            if (autosize && maxHeight && textareaNode && textareaNode.style) {
                textareaNode.style.maxHeight = `${maxHeight}px`;
            }
        }, [autosize, maxHeight, textareaNode]);

        const handleTextareaFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(true);

            if (onFocus) {
                onFocus(event);
            }
        };

        const handleTextareaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(false);

            if (onBlur) {
                onBlur(event);
            }
        };

        const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const {
                target: { value: newValue },
            } = event;

            if (onChange) {
                onChange(event, { value: newValue });
            }

            if (uncontrolled) {
                setStateValue(newValue);
            }
        };

        const handleTeaxtareaScroll = (event: React.UIEvent) => {
            if (maxLength) {
                const val = (event.target as HTMLElement).scrollTop;

                setScrollPosition(val);
            }
        };

        const getValueLength = (): number => {
            if (uncontrolled) {
                return stateValue.length;
            }

            return (value as string).length;
        };

        const textareaClassNameCalc = cn(
            styles.textarea,
            colorStyles[colors].textarea,
            styles[SIZE_TO_CLASSNAME_MAP[size]],
            {
                [styles.overflowHidden]: autosize && !maxRows,
                [styles.customScrollbar]: !nativeScrollbar,
                [styles.hasInnerLabel]: hasInnerLabel,
                [colorStyles[colors].hasInnerLabel]: hasInnerLabel,
                [styles.filled]: filled,
                [styles.overflow]: hasOverflow,
            },
            textareaClassName,
        );

        const textareaProps = {
            ...restProps,
            className: textareaClassNameCalc,
            autoComplete,
            disabled,
            maxLength: allowOverflow ? undefined : maxLength,
            onBlur: handleTextareaBlur,
            onFocus: handleTextareaFocus,
            onChange: handleTextareaChange,
            value: uncontrolled ? stateValue : value,
            rows,
            ref: mergeRefs([ref, setTextareaNode]),
            'data-test-id': dataTestId,
            onScroll: handleTeaxtareaScroll,
        };

        const getBottomAddons = () => {
            const counterIsVisible = Boolean(maxLength && showCounter);

            return (
                <React.Fragment>
                    {counterIsVisible && (
                        <span
                            className={cn(styles.sub, {
                                [colorStyles[colors].error]: hasOverflow,
                                [colorStyles[colors].hint]: !hasOverflow,
                            })}
                        >
                            {getCounterText(getValueLength(), maxLength)}
                        </span>
                    )}
                    {bottomAddons}
                </React.Fragment>
            );
        };

        return (
            <FormControl
                ref={wrapperRef}
                className={cn(className)}
                fieldClassName={cn(fieldClassName, {
                    [styles.focusVisible]: focusVisible,
                    [styles['resizable-40']]: resize === 'vertical' && size === 40,
                })}
                inputWrapperClassName={cn(styles.wrapper, styles[SIZE_TO_CLASSNAME_MAP[size]], {
                    [styles.hasInnerLabel]: hasInnerLabel,
                    [styles.resizeVertical]: resize === 'vertical',
                })}
                size={size}
                colors={colors}
                block={block}
                disabled={disabled}
                filled={filled || focused}
                focused={focused}
                error={error}
                label={label}
                labelView={labelView}
                hint={hint}
                leftAddons={leftAddons}
                rightAddons={rightAddons}
                bottomAddons={getBottomAddons()}
                breakpoint={breakpoint}
                dataTestId={getDataTestId(dataTestId, 'form-control')}
            >
                <React.Fragment>
                    {hasOverflow && (
                        <PseudoTextArea
                            value={value ?? stateValue}
                            size={size}
                            maxLength={maxLength as number}
                            pseudoTextareaClassName={textareaClassNameCalc}
                            ref={pseudoTextareaRef}
                        />
                    )}
                    {autosize ? (
                        <TextareaAutosize
                            {...textareaProps}
                            maxRows={maxRows}
                            minRows={minRows}
                            onHeightChange={onHeightChange}
                        />
                    ) : (
                        <textarea {...textareaProps} style={{ maxHeight }} />
                    )}
                </React.Fragment>
            </FormControl>
        );
    },
);

Textarea.displayName = 'Textarea';
