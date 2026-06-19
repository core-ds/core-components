import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';

import { PrivateScrollbar } from '@alfalab/core-components-scrollbar';

import { DEFAULT_VISIBLE_OPTIONS } from '../../consts';
import { useNativeScrollbar } from '../../hooks/use-native-scrollbar';
import { type GroupShape, type OptionShape, type OptionsListProps } from '../../typings';
import { isGroup, usePrevious, useVirtualVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from '../options-list/index.module.css';

export const VirtualOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 48,
            flatOptions = [],
            highlightedIndex = -1,
            optionGroupClassName,
            className,
            getOptionProps,
            groupOptionProps = {},
            Option,
            open,
            options = [],
            Optgroup = DefaultOptgroup,
            dataTestId,
            emptyPlaceholder,
            visibleOptions = DEFAULT_VISIBLE_OPTIONS,
            header,
            footer,
            showFooter = true,
            onScroll,
            nativeScrollbar: nativeScrollbarProp,
            setHighlightedIndex,
            selectedItems,
            setSelectedItems,
            search,
            multiple,
            scrollbarClassName,
            client,
            scrollableNodeClassName,
            contentNodeClassName,
            listNodeClassName,
            footerClassName,
        },
        ref,
    ) => {
        const listRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const noOptions = options.length === 0;
        const [scrollTop, setScrollTop] = useState(true);
        const [scrollBottom, setScrollBottom] = useState(false);
        const [visibleOptionsInvalidateKey, setVisibleOptionsInvalidateKey] = useState('');
        const prevHighlightedIndex = usePrevious(highlightedIndex) || -1;

        const rowVirtualizer = useVirtual({
            size: flatOptions.length,
            parentRef: (ref as React.RefObject<HTMLDivElement>) || scrollableNodeRef,
            overscan: 15,
        });

        const nativeScrollbar = useNativeScrollbar({
            nativeScrollbar: nativeScrollbarProp,
            client,
        });

        // Сколл к выбранному пункту при открытии меню
        useEffect(() => {
            if (open) {
                rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        // Скролл к пункту, которого нет на экране
        useEffect(() => {
            if (highlightedIndex === -1) return;

            if (!rowVirtualizer.virtualItems.some((option) => option.index === highlightedIndex)) {
                rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [highlightedIndex]);

        // Циклическая навигация
        useEffect(() => {
            const notDisabled = (option: OptionShape) => !option.disabled;
            const firstNonDisabled = flatOptions.findIndex(notDisabled);
            const lastNonDisabled = flatOptions.findLastIndex(notDisabled);

            if (
                prevHighlightedIndex <= firstNonDisabled &&
                highlightedIndex === flatOptions.length - 1
            ) {
                rowVirtualizer.scrollToIndex(lastNonDisabled);
            }

            if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
                rowVirtualizer.scrollToIndex(0);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prevHighlightedIndex, highlightedIndex]);

        useEffect(() => {
            setVisibleOptionsInvalidateKey(
                /**
                 * react-virtual может несколько раз отрендерить список с одним элементом,
                 * поэтому нужно еще раз пересчитать высоту, когда список ВИДИМЫХ пунктов будет отрендерен полностью
                 * Также, высоту нужно пересчитывать при изменении пунктов меню
                 */
                rowVirtualizer.virtualItems
                    .slice(0, Math.min(rowVirtualizer.virtualItems.length, visibleOptions + 1))
                    .map((item) => flatOptions[item.index].key)
                    .join('_'),
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [rowVirtualizer.virtualItems.length, flatOptions]);

        const maxHeight = useVirtualVisibleOptions({
            visibleOptions,
            invalidate: visibleOptionsInvalidateKey,
            listRef,
            open,
        });

        // Т.к. рендерится плоский список, необходимо знать индекс, когда начинается новая группа
        const groupStartIndexes = useMemo(() => {
            let currentIndex = 0;

            return options.reduce((acc: { [key: number]: number }, option, index) => {
                if (isGroup(option)) {
                    acc[currentIndex] = index;
                    currentIndex += option.options.length;
                } else {
                    currentIndex += 1;
                }

                return acc;
            }, {});
        }, [options]);

        const handleScroll: React.MouseEventHandler<HTMLDivElement> = (event) => {
            const scrolledToHeader = event.currentTarget.scrollTop <= 0;
            const scrolledToFooter =
                event.currentTarget.scrollHeight - event.currentTarget.offsetHeight <=
                event.currentTarget.scrollTop;

            setScrollTop(scrolledToHeader);
            setScrollBottom(scrolledToFooter);

            onScroll?.(event);
        };

        const renderList = () =>
            rowVirtualizer.virtualItems.map((virtualRow) => {
                const option = flatOptions[virtualRow.index];
                const renderGroup = () => {
                    const group = options[groupStartIndexes[virtualRow.index]] as GroupShape;

                    if (!group) return null;

                    const groupSelectedItems = selectedItems?.filter(({ key: selectedItemKey }) =>
                        group.options.some((opt) => opt.key === selectedItemKey),
                    );
                    const handleSelectedItems = (items: OptionShape[]) => {
                        setSelectedItems(
                            (
                                selectedItems?.filter(
                                    ({ key: selectedItemKey }) =>
                                        !group.options.some((opt) => opt.key === selectedItemKey),
                                ) ?? []
                            ).concat(items),
                        );
                    };

                    return (
                        <Optgroup
                            label={group.label}
                            size={size}
                            className={optionGroupClassName}
                            options={group.options}
                            selectedItems={groupSelectedItems}
                            setSelectedItems={handleSelectedItems}
                            search={search}
                            multiple={multiple}
                            {...groupOptionProps}
                        />
                    );
                };

                return (
                    <div
                        key={virtualRow.index}
                        ref={virtualRow.measureRef}
                        data-index={virtualRow.index}
                    >
                        {renderGroup()}
                        {!isGroup(option) && (
                            <Option {...getOptionProps(option, virtualRow.index)} />
                        )}
                    </div>
                );
            });

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        const [firstVirualRow] = rowVirtualizer.virtualItems;

        return (
            <div
                {...(nativeScrollbar && { 'data-test-id': dataTestId })}
                className={cn(styles.optionsList, styles[`size-${size}`], className)}
            >
                {header && (
                    <div
                        className={cn(styles.optionsListHeader, {
                            [styles.headerHighlighted]: !scrollTop,
                        })}
                        onMouseEnter={resetHighlightedIndex}
                    >
                        {header}
                    </div>
                )}

                {!noOptions && (
                    <PrivateScrollbar
                        native={nativeScrollbar}
                        className={scrollbarClassName}
                        style={{ maxHeight }}
                        scrollableNodeProps={{
                            ref: scrollableNodeRef,
                            onScroll: handleScroll,
                            className: scrollableNodeClassName,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            'data-test-id': nativeScrollbar ? undefined : dataTestId,
                        }}
                        contentNodeProps={{
                            className: contentNodeClassName,
                            style: { height: rowVirtualizer.totalSize },
                        }}
                    >
                        <div
                            className={listNodeClassName}
                            ref={listRef}
                            style={{ transform: `translateY(${firstVirualRow?.start ?? 0}px)` }}
                        >
                            {renderList()}
                        </div>
                    </PrivateScrollbar>
                )}

                {emptyPlaceholder && noOptions && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.optionsListFooter, footerClassName, {
                            [styles.withBorder]:
                                visibleOptions &&
                                flatOptions.length > visibleOptions &&
                                !scrollBottom,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);
