import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { isClient } from '@alfalab/core-components-shared';

import { DEFAULT_VISIBLE_OPTIONS, SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import { isGroup, lastIndexOf, usePrevious, useVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from '../virtual-options-list/index.module.css';

export const TreeOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 48,
            flatOptions = [],
            highlightedIndex: highlightedIndexFromProps = -1,
            optionGroupClassName,
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
            optionsListWidth,
            onScroll,
            nativeScrollbar: nativeScrollbarProp,
            setHighlightedIndex,
            selectedItems,
            setSelectedItems,
            search,
            multiple,
        },
        ref,
    ) => {
        const [expandedGroupKeys, setExpandedGroupKeys] = useState<string[]>(() => []);

        useEffect(() => {
            setExpandedGroupKeys(() =>
                search
                    ? options
                          .filter(isGroup)
                          .map(({ key }) => key)
                          .filter((key): key is string => !!key)
                    : [],
            );
        }, [options, search]);
        const allFlatOptions = useMemo(
            () =>
                options.reduce<Array<OptionShape | GroupShape>>((result, option) => {
                    const nestedOptions =
                        isGroup(option) && option.key && expandedGroupKeys.includes(option.key)
                            ? option.options
                            : [];

                    return result.concat(option, nestedOptions);
                }, []),
            [expandedGroupKeys, options],
        );
        const highlightedIndex = useMemo(() => {
            if (highlightedIndexFromProps === -1) return highlightedIndexFromProps;

            const option = flatOptions[highlightedIndexFromProps];

            return allFlatOptions.indexOf(option);
        }, [allFlatOptions, flatOptions, highlightedIndexFromProps]);
        const listRef = useRef<HTMLDivElement>(null);
        const parentRef = useRef<HTMLDivElement>(null);
        const scrollbarRef = useRef<HTMLDivElement>(null);
        const [visibleOptionsInvalidateKey, setVisibleOptionsInvalidateKey] = useState('');
        const prevHighlightedIndex = usePrevious(highlightedIndex) || -1;

        const query = '(max-width: 1023px)';
        let [nativeScrollbar] = useMatchMedia(query, () =>
            isClient() ? window.matchMedia(query).matches : true,
        );

        const rowVirtualizer = useVirtual({
            size: allFlatOptions.length,
            parentRef: (ref || parentRef) as React.RefObject<HTMLDivElement>,
            overscan: 15,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

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
            const notDisabled = (option: OptionShape | GroupShape) =>
                !isGroup(option) && !option.disabled;
            const firstNonDisabled = allFlatOptions.findIndex(notDisabled);
            const lastNonDisabled = lastIndexOf(allFlatOptions, notDisabled);

            if (
                !(lastNonDisabled === -1) &&
                prevHighlightedIndex <= firstNonDisabled &&
                highlightedIndex === allFlatOptions.length - 1
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
                    .map((item) => allFlatOptions[item.index].key)
                    .join('_'),
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [rowVirtualizer.virtualItems.length, allFlatOptions]);

        useVisibleOptions({
            visibleOptions,
            invalidate: visibleOptionsInvalidateKey,
            listRef,
            styleTargetRef: nativeScrollbar ? parentRef : scrollbarRef,
            open,
        });

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

        const renderList = () =>
            rowVirtualizer.virtualItems.map((virtualRow) => {
                const option = allFlatOptions[virtualRow.index];
                const renderGroup = (groupOption: GroupShape) => {
                    const groupSelectedItems = selectedItems?.filter((item) =>
                        groupOption.options.includes(item),
                    );
                    const handleSelectedItems = (items: OptionShape[]) => {
                        setSelectedItems(
                            (
                                selectedItems?.filter(
                                    (item) => !groupOption.options.includes(item),
                                ) ?? []
                            ).concat(items),
                        );
                    };

                    const isGroupExpanded = groupOption.key
                        ? expandedGroupKeys.includes(groupOption.key)
                        : false;

                    const handleGroupExpand = (expanded: boolean) => {
                        setExpandedGroupKeys((nextExpandedGroupKeys) => {
                            const { key } = groupOption;

                            if (!key) {
                                throw new Error(
                                    'TreeOptionsList needs a group with `key` specified',
                                );
                            }

                            return expanded
                                ? nextExpandedGroupKeys.concat(key)
                                : nextExpandedGroupKeys.filter((groupKey) => !(groupKey === key));
                        });
                    };

                    return (
                        <Optgroup
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            expanded={isGroupExpanded}
                            onExpand={handleGroupExpand}
                            label={groupOption.label}
                            size={size}
                            className={optionGroupClassName}
                            options={groupOption.options}
                            selectedItems={groupSelectedItems}
                            setSelectedItems={handleSelectedItems}
                            search={search}
                            multiple={multiple}
                        />
                    );
                };

                return (
                    <div
                        key={virtualRow.key}
                        ref={virtualRow.measureRef}
                        className={cn(styles.virtualRow, {
                            [styles.highlighted]: highlightedIndex === virtualRow.index,
                        })}
                        style={{
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                        onMouseEnter={isGroup(option) ? resetHighlightedIndex : undefined}
                    >
                        {isGroup(option) ? (
                            renderGroup(option)
                        ) : (
                            <Option {...getOptionProps(option, flatOptions.indexOf(option))} />
                        )}
                    </div>
                );
            });

        const contentNodeProps = {
            className: styles.inner,
            style: { height: `${rowVirtualizer.totalSize}px` },
            ref: listRef,
        };

        const renderWithCustomScrollbar = () => (
            <Scrollbar
                className={styles.scrollable}
                ref={scrollbarRef}
                horizontalAutoStretch={optionsListWidth === 'content'}
                scrollableNodeProps={{ onScroll, ref: parentRef }}
                contentNodeProps={contentNodeProps}
            >
                {renderList()}
            </Scrollbar>
        );

        const renderWithNativeScrollbar = () => {
            if (visibleOptions) {
                return (
                    <div
                        className={styles.scrollable}
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
                className={cn(
                    styles.virtualOptionsList,
                    styles[SIZE_TO_CLASSNAME_MAP[size]],
                    className,
                )}
                data-test-id={dataTestId}
            >
                {header && (
                    <div
                        className={styles.virtualOptionsListHeader}
                        onMouseEnter={resetHighlightedIndex}
                    >
                        {header}
                    </div>
                )}

                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.virtualOptionsListFooter, {
                            [styles.withBorder]:
                                visibleOptions && allFlatOptions.length > visibleOptions,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);
