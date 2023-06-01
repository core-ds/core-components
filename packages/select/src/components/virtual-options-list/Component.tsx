import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DEFAULT_VISIBLE_OPTIONS } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import {
    getScrollbarSize,
    isGroup,
    lastIndexOf,
    usePrevious,
    useVisibleOptions,
} from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from './index.module.css';

export const VirtualOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 's',
            flatOptions = [],
            highlightedIndex = -1,
            className,
            getOptionProps,
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
        },
        ref,
    ) => {
        const listRef = useRef<HTMLDivElement>(null);
        const parentRef = useRef<HTMLDivElement>(null);
        const [visibleOptionsInvalidateKey, setVisibleOptionsInvalidateKey] = useState(0);
        const [scrollbarSize, setScrollbarSize] = useState<number>(0);

        const prevHighlightedIndex = usePrevious(highlightedIndex) || -1;

        const rowVirtualizer = useVirtual({
            size: flatOptions.length,
            parentRef: (ref || parentRef) as React.RefObject<HTMLDivElement>,
            overscan: 15,
        });

        const nativeScrollbar = Boolean(nativeScrollbarProp ?? !scrollbarSize);

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (nativeScrollbarProp === undefined) {
                setScrollbarSize(getScrollbarSize());
            }
        }, [nativeScrollbarProp]);

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
            const lastNonDisabled = lastIndexOf(flatOptions, notDisabled);

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
                 * Также, высоту нужно пересчитывать при изменении ОБЩЕГО кол-ва пунктов меню
                 */
                rowVirtualizer.virtualItems.length > 1 ? flatOptions.length : 1,
            );
        }, [rowVirtualizer.virtualItems.length, flatOptions.length]);

        useVisibleOptions({
            visibleOptions,
            invalidate: visibleOptionsInvalidateKey,
            listRef,
            styleTargetRef: parentRef,
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

        const renderList = () =>
            rowVirtualizer.virtualItems.map((virtualRow) => {
                const option = flatOptions[virtualRow.index];
                const group = options[groupStartIndexes[virtualRow.index]] as GroupShape;

                return (
                    <div
                        key={virtualRow.index}
                        ref={virtualRow.measureRef}
                        className={cn(styles.virtualRow, {
                            [styles.highlighted]: highlightedIndex === virtualRow.index,
                        })}
                        style={{
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        {group && <Optgroup label={group.label} />}
                        {!isGroup(option) && (
                            <Option {...getOptionProps(option, virtualRow.index)} />
                        )}
                    </div>
                );
            });

        const contentNodeProps = {
            className: styles.inner,
            style: { height: `${rowVirtualizer.totalSize}px` },
            ref: listRef,
        };

        const renderOptions = () => {
            if (visibleOptions) {
                return (
                    <div
                        className={cn(styles.scrollable, {
                            [styles.customScrollbar]:
                                !nativeScrollbar && flatOptions.length > visibleOptions + 1,
                        })}
                        ref={mergeRefs([parentRef, ref])}
                        onScroll={onScroll}
                    >
                        <div {...contentNodeProps}>{renderList()}</div>
                    </div>
                );
            }

            return <div {...contentNodeProps}>{renderList()}</div>;
        };

        if (options.length === 0 && !emptyPlaceholder) {
            return null;
        }

        return (
            <div
                className={cn(styles.virtualOptionsList, styles[size], className)}
                data-test-id={dataTestId}
            >
                {header && <div className={styles.virtualOptionsListHeader}>{header}</div>}

                {renderOptions()}

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && footer && (
                    <div
                        className={cn(styles.virtualOptionsListFooter, {
                            [styles.withBorder]: flatOptions.length > visibleOptions,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);
