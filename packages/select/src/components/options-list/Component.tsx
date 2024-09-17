import React, { forwardRef, useCallback, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { isClient } from '@alfalab/core-components-shared';

import { DEFAULT_VISIBLE_OPTIONS, SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { GroupShape, OptionShape, OptionsListProps } from '../../typings';
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
        },
        ref,
    ) => {
        const [scrollTop, setScrollTop] = useState(true);
        const [scrollBottom, setScrollBottom] = useState(false);

        const query = '(max-width: 1023px)';
        let [nativeScrollbar] = useMatchMedia(query, () =>
            isClient() ? window.matchMedia(query).matches : true,
        );

        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const handleScroll = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                const scrolledToHeader = event.currentTarget.scrollTop <= 0;
                const scrolledToFooter =
                    event.currentTarget.scrollHeight - event.currentTarget.offsetHeight <=
                    event.currentTarget.scrollTop;

                setScrollTop(scrolledToHeader);
                setScrollBottom(scrolledToFooter);

                onScroll?.(event);
            },
            [onScroll],
        );

        const renderOption = (option: OptionShape, index: number) => (
            <Option key={option.key} {...getOptionProps(option, index)} />
        );

        const listRef = useRef<HTMLDivElement>(null);
        const scrollbarRef = useRef<HTMLDivElement>(null);
        const counter = createCounter();
        const renderGroup = (group: GroupShape) => {
            const groupSelectedItems = selectedItems?.filter((item) =>
                group.options.includes(item),
            );
            const handleSelectedItems = (items: OptionShape[]) => {
                setSelectedItems(
                    (selectedItems?.filter((item) => !group.options.includes(item)) ?? []).concat(
                        items,
                    ),
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

        const measured = useVisibleOptions({
            ...(!nativeScrollbar && { styleTargetRef: scrollbarRef }),
            visibleOptions,
            listRef,
            open,
            options,
            actualOptionsCount: limitDynamicOptionGroupSize,
            size: limitDynamicOptionGroupSize
                ? (() => {
                      switch (typeof size) {
                          case 'string':
                              throw new Error(
                                  'OptionsList with `limitDynamicOptionGroupSize` enabled needs a `size` with number type',
                              );
                          default:
                              return size;
                      }
                  })()
                : undefined,
        });

        if (options.length === 0 && !emptyPlaceholder && !header && !footer) {
            return null;
        }

        const renderListItems = () => (
            <React.Fragment>
                {options.map((option) =>
                    isGroup(option) ? renderGroup(option) : renderOption(option, counter()),
                )}

                {emptyPlaceholder && options.length === 0 && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}
            </React.Fragment>
        );

        const renderWithCustomScrollbar = () => {
            const scrollableNodeProps = {
                onScroll: handleScroll,
                'data-test-id': dataTestId,
                ref: ref as React.RefObject<HTMLDivElement>,
            };

            return (
                <Scrollbar
                    className={cn(styles.scrollable, scrollbarClassName)}
                    ref={scrollbarRef}
                    horizontalAutoStretch={optionsListWidth === 'content'}
                    scrollableNodeProps={scrollableNodeProps}
                    contentNodeProps={{ ref: listRef }}
                    maskProps={{ className: measured ? undefined : styles.mask }}
                >
                    {renderListItems()}
                </Scrollbar>
            );
        };

        const renderWithNativeScrollbar = () => (
            <div
                className={cn(styles.scrollable, scrollbarClassName)}
                ref={mergeRefs([listRef, ref])}
                onScroll={handleScroll}
            >
                {renderListItems()}
            </div>
        );

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

        return (
            <div
                {...(nativeScrollbar && { 'data-test-id': dataTestId })}
                className={cn(styles.optionsList, styles[SIZE_TO_CLASSNAME_MAP[size]], className)}
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

                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.optionsListFooter, {
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
