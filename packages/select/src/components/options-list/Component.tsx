import React, { forwardRef, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { PrivateScrollbar } from '@alfalab/core-components-scrollbar';
import { getElementWindow, noop, useRefAsState } from '@alfalab/core-components-shared';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

import { DEFAULT_VISIBLE_OPTIONS } from '../../consts';
import { useNativeScrollbar } from '../../hooks/use-native-scrollbar';
import { type GroupShape, type OptionShape, type OptionsListProps } from '../../typings';
import { isGroup, useVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from './index.module.css';

const createCounter = () => {
    let count = 0;

    // eslint-disable-next-line no-plusplus
    return () => count++;
};

function useClientWidth<T extends HTMLElement>() {
    const [ref, node] = useRefAsState<T>(null);
    const [width, setWidth] = useState<number>();

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (node) {
            const listener = () => {
                setWidth(node.clientWidth);
            };

            listener();

            const ro = new (window.ResizeObserver || ResizeObserverPolyfill)(listener);

            listener();

            ro.observe(node);

            return () => {
                ro.disconnect();
            };
        }

        setWidth(undefined);

        return noop;
    }, [node]);

    return [ref, width] as const;
}

function useGap<T extends HTMLElement>() {
    const [ref, node] = useRefAsState<T>(null);
    const [diff, setDiff] = useState(0);

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (node) {
            const win = getElementWindow(node);

            const listener = () => {
                const { paddingLeft, paddingRight, marginLeft, marginRight } =
                    win.getComputedStyle(node);

                setDiff(
                    Object.values({
                        paddingLeft,
                        paddingRight,
                        marginLeft,
                        marginRight,
                    }).reduce((a, b) => a + parseFloat(b), 0),
                );
            };

            const ro = new (window.ResizeObserver || ResizeObserverPolyfill)(listener);

            listener();

            ro.observe(node);

            return () => {
                ro.disconnect();
            };
        }

        setDiff(0);

        return noop;
    }, [node]);

    return [ref, diff] as const;
}

export const OptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 48,
            className,
            optionGroupClassName,
            footerClassName,
            scrollbarClassName,
            Option,
            getOptionProps,
            groupOptionProps = {},
            options = [],
            Optgroup = DefaultOptgroup,
            dataTestId,
            emptyPlaceholder,
            visibleOptions = DEFAULT_VISIBLE_OPTIONS,
            onScroll,
            open,
            header,
            footer,
            showFooter = true,
            optionsListWidth,
            nativeScrollbar: nativeScrollbarProp,
            flatOptions = [],
            setHighlightedIndex,
            selectedItems,
            search,
            setSelectedItems,
            multiple,
            limitDynamicOptionGroupSize = false,
            client,
            scrollableNodeClassName,
            fieldWidth,
            listNodeClassName,
        },
        ref,
    ) => {
        const contentRef = useRef<HTMLDivElement>(null);
        const actualOptionsCount = limitDynamicOptionGroupSize && options.length > 0;
        const [listRef, listWidth] = useClientWidth<HTMLDivElement>();
        const [scrollableNodeRef, diff] = useGap<HTMLDivElement>();

        const computeMinWidth = () => {
            const fn = optionsListWidth === 'content' ? 'min' : 'max';

            switch (typeof fieldWidth) {
                case 'number':
                    return `${fn}(${fieldWidth - diff}px, 100%)`;
                default:
                    return fieldWidth;
            }
        };
        const [, maxHeight] = useVisibleOptions({
            visibleOptions,
            listRef,
            open,
            options,
            actualOptionsCount,
            size: actualOptionsCount ? size : undefined,
        });
        const noOptions = options.length === 0;
        const matchContentWidth = optionsListWidth === 'content';
        const [scrollTop, setScrollTop] = useState(true);
        const [scrollBottom, setScrollBottom] = useState(false);

        const nativeScrollbar = useNativeScrollbar({
            nativeScrollbar: nativeScrollbarProp,
            client,
        });

        const handleScroll: React.MouseEventHandler<HTMLDivElement> = (event) => {
            const scrolledToHeader = event.currentTarget.scrollTop <= 0;
            const scrolledToFooter =
                event.currentTarget.scrollHeight - event.currentTarget.offsetHeight <=
                event.currentTarget.scrollTop;

            setScrollTop(scrolledToHeader);
            setScrollBottom(scrolledToFooter);

            onScroll?.(event);
        };

        const renderOption = (option: OptionShape, index: number) => (
            <Option key={option.key} {...getOptionProps(option, index)} />
        );

        const counter = createCounter();
        const renderGroup = (group: GroupShape) => {
            const groupSelectedItems = selectedItems?.filter(({ key: selectedItemKey }) =>
                group.options.some((option) => option.key === selectedItemKey),
            );
            const handleSelectedItems = (items: OptionShape[]) => {
                setSelectedItems(
                    (
                        selectedItems?.filter(
                            ({ key: selectedItemKey }) =>
                                !group.options.some((option) => option.key === selectedItemKey),
                        ) ?? []
                    ).concat(items),
                );
            };

            return (
                <Optgroup
                    className={optionGroupClassName}
                    label={group.label}
                    key={group.label}
                    size={size}
                    options={group.options}
                    selectedItems={groupSelectedItems}
                    setSelectedItems={handleSelectedItems}
                    search={search}
                    multiple={multiple}
                    {...groupOptionProps}
                >
                    {group.options.map((option) => renderOption(option, counter()))}
                </Optgroup>
            );
        };

        if (options.length === 0 && !emptyPlaceholder && !header && !footer) {
            return null;
        }

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

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
                        tabIndex={-1}
                        native={nativeScrollbar}
                        className={cn(scrollbarClassName, {
                            [styles.nativeScrollbar]: nativeScrollbar && matchContentWidth,
                            [styles.scrollbar]: !nativeScrollbar,
                        })}
                        style={{
                            maxHeight,
                            width:
                                optionsListWidth === 'content' && typeof listWidth === 'number'
                                    ? listWidth + diff
                                    : undefined,
                        }}
                        scrollableNodeProps={{
                            ref: mergeRefs([scrollableNodeRef, ref]),
                            onScroll: handleScroll,
                            className: cn(styles.scrollable, scrollableNodeClassName),
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            'data-test-id': nativeScrollbar ? undefined : dataTestId,
                        }}
                        contentNodeProps={{
                            ref: contentRef,
                            className: cn(styles.content, {
                                [styles.matchContent]: matchContentWidth,
                            }),
                        }}
                    >
                        <div
                            className={cn(styles.list, listNodeClassName)}
                            ref={listRef}
                            style={{ minWidth: computeMinWidth() }}
                        >
                            {options.map((option) =>
                                isGroup(option)
                                    ? renderGroup(option)
                                    : renderOption(option, counter()),
                            )}
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
