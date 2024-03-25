import React, {
    ChangeEvent,
    FC,
    ForwardRefExoticComponent,
    KeyboardEventHandler,
    MouseEventHandler,
    ReactNode,
    RefAttributes,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import type { FormControlProps } from '@alfalab/core-components-form-control';
import type { FieldProps } from '@alfalab/core-components-select/shared';
import { useFocus, useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import type { TagComponent } from '../../types';
import { calculateTotalElementsPerRow } from '../../utils/calculate-collapse-size';
import { Tag as DefaultTag } from '../tag';

import styles from './index.module.css';

type TagListOwnProps = {
    value?: string;
    handleDeleteTag?: (key: string) => void;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    inputRef?: RefObject<HTMLInputElement>;
    autocomplete?: boolean;
    isOpen?: boolean;
    collapseTagList?: boolean;
    moveInputToNewLine?: boolean;
    transformCollapsedTagText?: (collapsedCount: number) => string;
    transformTagText?: (tagText?: ReactNode) => ReactNode;
    Tag?: TagComponent;
    handleUpdatePopover?: () => void;
    FormControlComponent: ForwardRefExoticComponent<
        FormControlProps & RefAttributes<HTMLDivElement>
    >;
};

const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-48',
    m: 'size-56',
    l: 'size-64',
    xl: 'size-72',
    48: 'size-48',
    56: 'size-56',
    64: 'size-64',
    72: 'size-72',
};

export const TagList: FC<Partial<FieldProps> & FormControlProps & TagListOwnProps> = ({
    size = 72,
    open,
    disabled,
    placeholder,
    selectedMultiple = [],
    Arrow,
    innerProps,
    className,
    fieldClassName,
    value = '',
    autocomplete,
    label,
    valueRenderer,
    onInput,
    handleDeleteTag,
    collapseTagList,
    moveInputToNewLine,
    transformCollapsedTagText,
    transformTagText,
    isOpen,
    handleUpdatePopover,
    Tag = DefaultTag,
    setSelectedItems,
    toggleMenu,
    labelView,
    inputRef: inputRefProp = null,
    FormControlComponent,
    ...restProps
}) => {
    const [focused, setFocused] = useState(false);
    const [isShowMoreEnabled, setShowMoreEnabled] = useState<boolean | undefined>(false);
    const [visibleElements, setVisibleElements] = useState(1);
    const [inputOnNewLine, setInputOnNewLine] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    const [focusVisible] = useFocus(wrapperRef, 'keyboard');
    const [inputFocusVisible] = useFocus(inputRef, 'keyboard');

    useLayoutEffect_SAFE_FOR_SSR(() => {
        setShowMoreEnabled(isOpen);
    }, [isOpen]);

    useEffect(() => {
        setVisibleElements(selectedMultiple.length);
    }, [selectedMultiple.length]);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (collapseTagList && contentWrapperRef.current) {
            const totalVisibleElements = calculateTotalElementsPerRow(
                contentWrapperRef.current,
                autocomplete && inputRef.current ? inputRef.current : null,
            );

            setVisibleElements(totalVisibleElements);
        }
        handleUpdatePopover?.();
    }, [collapseTagList, visibleElements, autocomplete]);

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const inputTextIsOverflow = useCallback(
        () => inputRef.current && inputRef.current.scrollWidth > inputRef.current.clientWidth,
        [],
    );

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const { onClick, ...restInnerProps } = (innerProps || {}) as FieldProps['innerProps'];

    const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        (event) => {
            if (onClick && contentWrapperRef.current) {
                const eventTarget = event.target as HTMLDivElement;

                const clickedInsideContent =
                    eventTarget !== contentWrapperRef.current &&
                    contentWrapperRef.current.contains(eventTarget);

                if (!clickedInsideContent) {
                    onClick(event);
                }
            }

            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [onClick],
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            const lastSelectedTag = selectedMultiple[selectedMultiple.length - 1];

            if (event.key === 'Backspace' && !value && handleDeleteTag && lastSelectedTag) {
                handleDeleteTag(lastSelectedTag.key);
            }
        },
        [handleDeleteTag, selectedMultiple, value],
    );

    const toggleShowMoreLessButton = useCallback(
        (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (event) {
                event.stopPropagation();
                setShowMoreEnabled((v) => !v);
                if (handleUpdatePopover) {
                    handleUpdatePopover();
                }
            }
        },
        [handleUpdatePopover],
    );

    useEffect(() => {
        /**
         * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
         */
        if (moveInputToNewLine) {
            if (inputTextIsOverflow() && !inputOnNewLine) {
                setInputOnNewLine(true);
            } else if (value.length === 0) {
                setInputOnNewLine(false);
            }
        }
    }, [value, inputOnNewLine, inputTextIsOverflow, moveInputToNewLine]);

    const collapseTagTitle = useMemo(() => {
        if (isShowMoreEnabled) {
            return 'Свернуть';
        }
        if (transformCollapsedTagText) {
            return transformCollapsedTagText(selectedMultiple.length - visibleElements);
        }

        return `Ещё ${selectedMultiple.length - visibleElements}`;
    }, [transformCollapsedTagText, isShowMoreEnabled, selectedMultiple.length, visibleElements]);

    const filled = Boolean(selectedMultiple.length > 0) || Boolean(value);
    const hasInnerLabel = Boolean(label) && labelView !== 'outer';

    return (
        <div
            ref={wrapperRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(className, styles.component, styles[SIZE_TO_CLASSNAME_MAP[size]])}
        >
            <FormControlComponent
                {...restProps}
                ref={innerProps?.ref}
                fieldClassName={cn(fieldClassName, styles.field, {
                    [styles.focusVisible]: focusVisible,
                    [styles.disabled]: disabled,
                })}
                block={true}
                size={size}
                focused={open || focused}
                disabled={disabled}
                filled={filled || !!placeholder}
                onMouseDown={handleMouseDown}
                rightAddons={Arrow}
                onClick={handleClick}
                addonsClassName={cn(styles.addons, styles[`addons-${SIZE_TO_CLASSNAME_MAP[size]}`])}
                label={label}
                labelClassName={styles.label}
                labelView={labelView}
            >
                <div
                    className={cn(styles.contentWrapper, {
                        [styles.hasInnerLabel]: hasInnerLabel,
                        [styles.hasTags]: selectedMultiple.length > 0,
                    })}
                    ref={contentWrapperRef}
                >
                    {selectedMultiple.map((option, index) =>
                        (collapseTagList && isShowMoreEnabled) || index + 1 <= visibleElements ? (
                            <Tag
                                checked={true}
                                disabled={disabled}
                                option={{
                                    ...option,
                                    content: transformTagText
                                        ? transformTagText(option.content)
                                        : option.content,
                                }}
                                key={option.key}
                                handleDeleteTag={disabled ? undefined : handleDeleteTag}
                            />
                        ) : null,
                    )}
                    {collapseTagList && visibleElements < selectedMultiple.length && (
                        <Tag
                            disabled={disabled}
                            data-collapse='collapse-last-tag-element'
                            onClick={toggleShowMoreLessButton}
                            view='filled'
                            option={{
                                key: 'collapse',
                                content: collapseTagTitle,
                            }}
                        />
                    )}

                    {autocomplete && (
                        <input
                            {...restInnerProps}
                            autoComplete='off'
                            ref={mergeRefs([inputRef, inputRefProp])}
                            value={value}
                            onChange={onInput}
                            className={cn(styles.input, {
                                [styles.focusVisible]: inputFocusVisible,
                                [styles.hidden]: !isOpen && selectedMultiple.length > 0,
                            })}
                            disabled={disabled}
                            onKeyDown={handleKeyDown}
                            placeholder={filled ? '' : placeholder}
                        />
                    )}

                    {placeholder && !filled && !autocomplete && (
                        <span className={styles.placeholder}>{placeholder}</span>
                    )}
                </div>
            </FormControlComponent>
        </div>
    );
};
