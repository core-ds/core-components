import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import cn from 'classnames';

import { PrivateList, PrivateListRefType } from '@alfalab/core-components-list';
import { useMatchMedia } from '@alfalab/core-components-mq';
import { isClient, isNullable } from '@alfalab/core-components-shared';

import { DEFAULT_VISIBLE_OPTIONS, SIZE_TO_CLASSNAME_MAP, SIZE_TO_NUMBER_MAP } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
import { isGroup, lastIndexOf, usePrevious } from '../../utils';
import { Optgroup as DefaultOptgroup } from '../optgroup';

import styles from './index.module.css';

export const NextVirtualOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
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
            optionsListWidth,
            onScroll,
            nativeScrollbar: nativeScrollbarProp,
            setHighlightedIndex,
            selectedItems,
            setSelectedItems,
            search,
            multiple,
            fieldWidth,
        },
        ref,
    ) => {
        const listRef = useRef<PrivateListRefType>(null);
        const prevHighlightedIndex = usePrevious(highlightedIndex) ?? -1;

        const query = '(max-width: 1023px)';
        let [nativeScrollbar] = useMatchMedia(query, () =>
            isClient() ? window.matchMedia(query).matches : true,
        );

        const virtualItems = listRef.current?.getVirtualItems();

        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        useImperativeHandle(ref, () => listRef.current!.scrollElement!, []);

        // Скролл к пункту, которого нет на экране
        useEffect(() => {
            if (
                !open ||
                highlightedIndex === -1 ||
                virtualItems?.some((item) => item.index === highlightedIndex)
            ) {
                return;
            }

            listRef.current?.scrollToIndex(highlightedIndex, { align: 'end' });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [highlightedIndex]);

        // Циклическая навигация
        useEffect(() => {
            const list = listRef.current;

            if (isNullable(list)) {
                return;
            }

            const notDisabled = (option: OptionShape) => !option.disabled;
            const firstNonDisabled = flatOptions.findIndex(notDisabled);
            const lastNonDisabled = lastIndexOf(flatOptions, notDisabled);

            if (
                prevHighlightedIndex <= firstNonDisabled &&
                highlightedIndex === flatOptions.length - 1
            ) {
                list.scrollToIndex(lastNonDisabled);
            }

            if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
                list.scrollToIndex(0);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prevHighlightedIndex, highlightedIndex]);

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

        const renderItem = (option: OptionShape, index: number) => {
            const renderGroup = () => {
                const group = options[groupStartIndexes[index]] as GroupShape;

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
                    className={cn(styles.virtualRow, {
                        [styles.highlighted]: highlightedIndex === index,
                    })}
                >
                    {renderGroup()}
                    {!isGroup(option) && <Option {...getOptionProps(option, index)} />}
                </div>
            );
        };

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

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

                <PrivateList
                    ref={listRef}
                    height={{ visibleItems: visibleOptions }}
                    width={optionsListWidth}
                    minWidth={fieldWidth}
                    estimateItemSize={SIZE_TO_NUMBER_MAP[size]}
                    data={flatOptions}
                    onScroll={onScroll}
                    nativeScrollbar={nativeScrollbar}
                    renderItem={renderItem}
                    overscan={15}
                />

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.virtualOptionsListFooter, {
                            [styles.withBorder]:
                                visibleOptions && flatOptions.length > visibleOptions,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);
