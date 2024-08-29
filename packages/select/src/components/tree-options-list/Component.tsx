import React, { forwardRef, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { fnUtils, isClient } from '@alfalab/core-components-shared';
import ChevronDownMIcon from '@alfalab/icons-glyph/ChevronDownMIcon';

import { DEFAULT_VISIBLE_OPTIONS, SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import { isGroup, lastIndexOf, usePrevious, useVisibleOptions } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import virtualOptionsListStyles from '../virtual-options-list/index.module.css';
import styles from './index.module.css';

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
                          .filter((key) => !fnUtils.isNil(key))
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

        const renderList = () => {
            const renderGroup = (groupOption: GroupShape) => {
                const groupSelectedItems = selectedItems?.filter((item) =>
                    groupOption.options.includes(item),
                );
                const handleSelectedItems = (items: OptionShape[]) => {
                    setSelectedItems(
                        (
                            selectedItems?.filter((item) => !groupOption.options.includes(item)) ??
                            []
                        ).concat(items),
                    );
                };

                const isGroupExpanded =
                    !fnUtils.isNil(groupOption.key) && expandedGroupKeys.includes(groupOption.key);

                const handleGroupExpand = () => {
                    setExpandedGroupKeys((prevExpandedGroupKeys) => {
                        const { key } = groupOption;

                        if (fnUtils.isNil(key)) {
                            throw new Error('TreeOptionsList needs a group with `key` specified');
                        }

                        return prevExpandedGroupKeys.includes(key)
                            ? prevExpandedGroupKeys.filter((groupKey) => !(groupKey === key))
                            : prevExpandedGroupKeys.concat(key);
                    });
                };

                return (
                    <Optgroup
                        expandControl={
                            <ChevronDownMIcon
                                className={cn(styles.expandIcon, {
                                    [styles.expanded]: isGroupExpanded,
                                })}
                                onClick={handleGroupExpand}
                            />
                        }
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

            const renderOption = (
                option: OptionShape | GroupShape,
                highlighted: boolean,
                attrs?: React.HTMLAttributes<HTMLDivElement> &
                    React.ClassAttributes<HTMLDivElement>,
            ) => (
                <div
                    key={attrs?.key}
                    ref={attrs?.ref}
                    className={cn(virtualOptionsListStyles.virtualRow, {
                        [virtualOptionsListStyles.highlighted]: highlighted,
                    })}
                    style={attrs?.style}
                    onMouseEnter={isGroup(option) ? resetHighlightedIndex : undefined}
                >
                    {isGroup(option) ? (
                        renderGroup(option)
                    ) : (
                        <Option {...getOptionProps(option, flatOptions.indexOf(option))} />
                    )}
                </div>
            );
            const result: ReactNode[] = [];

            let i = 0;

            while (i < rowVirtualizer.virtualItems.length) {
                // eslint-disable-next-line no-plusplus
                const virtualRow = rowVirtualizer.virtualItems[i++];
                const option = allFlatOptions[virtualRow.index];

                result.push(
                    renderOption(option, virtualRow.index === highlightedIndex, {
                        key: option.key,
                        ref: virtualRow.measureRef,
                        style: {
                            transform: `translateY(${virtualRow.start}px)`,
                            transition: 'transform 400ms cubic-bezier(0, 0.1, 0.5, 1)',
                        },
                    }),
                );

                if (isGroup(option)) {
                    const isExpanded =
                        !fnUtils.isNil(option.key) && expandedGroupKeys.includes(option.key);

                    // eslint-disable-next-line no-continue
                    if (!isExpanded) continue;

                    const height = isExpanded
                        ? rowVirtualizer.virtualItems[
                              Math.min(
                                  i + option.options.length - 1,
                                  rowVirtualizer.virtualItems.length - 1,
                              )
                          ].end - virtualRow.end
                        : 0;

                    const children =
                        isExpanded &&
                        option.options
                            .slice(0, rowVirtualizer.virtualItems.length - virtualRow.index - 1)
                            .map(
                                // eslint-disable-next-line @typescript-eslint/no-loop-func
                                () => {
                                    // eslint-disable-next-line no-plusplus
                                    const row = rowVirtualizer.virtualItems[i++];
                                    const childOption = allFlatOptions[row.index];
                                    const start = row.start - virtualRow.end;

                                    return renderOption(
                                        childOption,
                                        row.index === highlightedIndex,
                                        {
                                            key: childOption.key,
                                            ref: row.measureRef,
                                            style: {
                                                transform: `translateY(${start}px)`,
                                                transition:
                                                    'transform 400ms cubic-bezier(0, 0.1, 0.5, 1)',
                                            },
                                        },
                                    );
                                },
                            );

                    result.push(
                        <div
                            key={`${virtualRow.key}_options`}
                            style={{
                                width: '100%',
                                position: 'absolute',
                                transform: `translateY(${virtualRow.end}px)`,
                                height,
                                visibility: isExpanded ? undefined : 'hidden',
                                transition: 'transform 400ms cubic-bezier(0, 0.1, 0.5, 1)',
                            }}
                        >
                            {children}
                        </div>,
                    );
                }
            }

            return result;
        };

        const contentNodeProps = {
            className: virtualOptionsListStyles.inner,
            style: { height: `${rowVirtualizer.totalSize}px` },
            ref: listRef,
        };

        const renderWithCustomScrollbar = () => (
            <Scrollbar
                className={virtualOptionsListStyles.scrollable}
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
                        className={virtualOptionsListStyles.scrollable}
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
                    virtualOptionsListStyles.virtualOptionsList,
                    virtualOptionsListStyles[SIZE_TO_CLASSNAME_MAP[size]],
                    className,
                )}
                data-test-id={dataTestId}
            >
                {header && (
                    <div
                        className={virtualOptionsListStyles.virtualOptionsListHeader}
                        onMouseEnter={resetHighlightedIndex}
                    >
                        {header}
                    </div>
                )}

                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}

                {emptyPlaceholder && options.length === 0 && (
                    <div className={virtualOptionsListStyles.emptyPlaceholder}>
                        {emptyPlaceholder}
                    </div>
                )}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(virtualOptionsListStyles.virtualOptionsListFooter, {
                            [virtualOptionsListStyles.withBorder]:
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
