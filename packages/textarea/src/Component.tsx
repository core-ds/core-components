import React, { forwardRef, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';

import { FormControl } from '@alfalab/core-components-form-control';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { useFocus, useMedia } from '@alfalab/hooks';
import { TextareaProps } from './typings';
import { PseudoTextArea } from './components';

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
            size = 's',
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
            getCounterText = getDefaultCounterText,
            maxLength,
            nativeScrollbar: nativeScrollbarProp,
            ...restProps
        },
        ref,
    ) => {
        const uncontrolled = value === undefined;
        let [nativeScrollbar] = useMedia<boolean>([[true, '(max-width: 1023px)']], false);

        nativeScrollbar = resize !== 'none' || Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const pseudoTextareaRef = useRef<HTMLDivElement>(null);

        const [focused, setFocused] = useState(false);
        const [stateValue, setStateValue] = useState(defaultValue || '');
        const [scrollableHeight, setScrollableHeight] = useState<number>();
        const [scrollPosition, setScrollPosition] = useState(0);

        const [focusVisible] = useFocus(textareaRef, 'keyboard');

        const filled = Boolean(uncontrolled ? stateValue : value);
        const hasInnerLabel = label && labelView === 'inner';
        const hasOverflow = Boolean(maxLength && stateValue.slice(maxLength));

        useEffect(() => {
            const pseudoNode = pseudoTextareaRef.current;
            if (pseudoNode) {
                pseudoNode.scrollTop = scrollPosition;
            }
        }, [scrollPosition, stateValue]);

        // Хак, так как react-textarea-autosize перестал поддерживать maxHeight
        useEffect(() => {
            if (autosize) {
                if (
                    nativeScrollbar &&
                    maxHeight &&
                    textareaRef.current &&
                    textareaRef.current.style
                ) {
                    textareaRef.current.style.maxHeight = `${maxHeight}px`;
                }
            } else if (!nativeScrollbar && textareaRef.current) {
                const textareaHeight = textareaRef.current.scrollHeight;

                setScrollableHeight(textareaHeight);
            }
        }, [autosize, maxHeight, nativeScrollbar]);

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
                target: { value },
            } = event;

            if (onChange) {
                onChange(event, { value });
            }

            if (uncontrolled) {
                setStateValue(value);
            }
        };

        const handleTeaxtareaScroll = (event: React.UIEvent) => {
            if (maxLength) {
                const value = (event.target as HTMLElement).scrollTop;
                setScrollPosition(value);
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
            styles[size],
            {
                [styles.hasInnerLabel]: nativeScrollbar && hasInnerLabel,
                [colorStyles[colors].hasInnerLabel]: hasInnerLabel,
                [styles.filled]: nativeScrollbar && filled,
                [styles.resizeVertical]: resize === 'vertical',
            },
            textareaClassName,
        );

        const textareaProps = {
            ...restProps,
            className: textareaClassNameCalc,
            autoComplete,
            disabled,
            onBlur: handleTextareaBlur,
            onFocus: handleTextareaFocus,
            onChange: handleTextareaChange,
            value: uncontrolled ? stateValue : value,
            rows,
            ref: mergeRefs([ref, textareaRef]),
            'data-test-id': dataTestId,
            onScroll: handleTeaxtareaScroll,
        };

        const renderWithNativeScrollbar = () =>
            autosize ? (
                <TextareaAutosize
                    {...textareaProps}
                    maxRows={maxRows}
                    minRows={minRows}
                    onHeightChange={onHeightChange}
                />
            ) : (
                <textarea {...textareaProps} style={{ maxHeight }} />
            );

        const renderWithCustomScrollbar = () => {
            const minRowsValue = autosize ? minRows : rows;

            return (
                <Scrollbar
                    style={{ maxHeight, height: scrollableHeight, padding: 0 }}
                    className={cn(styles.scrollable, styles[size], {
                        [styles.scrollableWithLabel]: label,
                        [styles.filled]: filled,
                    })}
                    horizontalAutoStretch={!block}
                    widthPropName='width'
                    contentNodeProps={{ className: styles.scrollableWrapper }}
                >
                    {hasOverflow && (
                        <PseudoTextArea
                            stateValue={stateValue}
                            size={size}
                            maxLength={maxLength}
                            pseudoTextareaClassName={cn(
                                textareaClassNameCalc,
                                styles.customScrollbar,
                            )}
                            ref={pseudoTextareaRef}
                        />
                    )}

                    <TextareaAutosize {...textareaProps} minRows={minRowsValue} />

                    {/* Используется только для вычисления размера контейнера */}
                    <TextareaAutosize
                        className={cn(textareaProps.className, styles.textareaHidden)}
                        rows={textareaProps.rows}
                        maxRows={maxRows}
                        minRows={minRowsValue}
                        value={textareaProps.value}
                        onHeightChange={(height) => {
                            if (autosize) {
                                setScrollableHeight(height);

                                if (onHeightChange) {
                                    onHeightChange(height);
                                }
                            }
                        }}
                    />
                </Scrollbar>
            );
        };

        return (
            <FormControl
                className={cn(className)}
                fieldClassName={cn(fieldClassName, {
                    [styles.focusVisible]: focusVisible,
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
                bottomAddons={bottomAddons}
                overflowHint={maxLength && getCounterText(getValueLength(), maxLength)}
                overflow={hasOverflow}
            >
                {nativeScrollbar ? (
                    <>
                        {hasOverflow && (
                            <PseudoTextArea
                                stateValue={stateValue}
                                size={size}
                                maxLength={maxLength}
                                pseudoTextareaClassName={cn(
                                    textareaClassNameCalc,
                                    styles.nativeScrollbar,
                                )}
                                ref={pseudoTextareaRef}
                            />
                        )}
                        {renderWithNativeScrollbar()}
                    </>
                ) : (
                    renderWithCustomScrollbar()
                )}
            </FormControl>
        );
    },
);
