import React, { forwardRef, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { ScrollbarPrivate } from '@alfalab/core-components-scrollbar-private';

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
            contentNodeClassName,
            listNodeClassName,
        },
        ref,
    ) => {
        const actualOptionsCount = limitDynamicOptionGroupSize && options.length > 0;
        const listRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const [, maxHeight] = useVisibleOptions({
            visibleOptions,
            listRef,
            open,
            options,
            actualOptionsCount,
            size: actualOptionsCount ? size : undefined,
        });
        const noOptions = options.length === 0;
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
                    <ScrollbarPrivate
                        native={nativeScrollbar}
                        className={scrollbarClassName}
                        style={{ maxHeight }}
                        scrollableNodeProps={{
                            ref: mergeRefs([scrollableNodeRef, ref]),
                            onScroll: handleScroll,
                            className: scrollableNodeClassName,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            'data-test-id': nativeScrollbar ? undefined : dataTestId,
                        }}
                        contentNodeProps={{ className: contentNodeClassName }}
                    >
                        <div className={listNodeClassName} ref={listRef}>
                            {options.map((option) =>
                                isGroup(option)
                                    ? renderGroup(option)
                                    : renderOption(option, counter()),
                            )}
                        </div>
                    </ScrollbarPrivate>
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
