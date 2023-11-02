import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { Scrollbar } from '@alfalab/core-components-scrollbar';
import { isClient } from '@alfalab/core-components-shared';

import { DEFAULT_VISIBLE_OPTIONS } from '../../consts';
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
            size = 's',
            className,
            optionGroupClassName,
            scrollbarClassName,
            Option,
            getOptionProps,
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
        },
        ref,
    ) => {
        const query = '(max-width: 1023px)';
        let [nativeScrollbar] = useMatchMedia(query, () =>
            isClient() ? window.matchMedia(query).matches : true,
        );

        nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);

        const renderOption = (option: OptionShape, index: number) => (
            <Option key={option.key} {...getOptionProps(option, index)} />
        );

        const listRef = useRef<HTMLDivElement>(null);
        const scrollbarRef = useRef<HTMLDivElement>(null);
        const counter = createCounter();
        const renderGroup = (group: GroupShape) => (
            <Optgroup
                className={optionGroupClassName}
                label={group.label}
                key={group.label}
                size={size}
            >
                {group.options.map((option) => renderOption(option, counter()))}
            </Optgroup>
        );

        useVisibleOptions({
            ...(!nativeScrollbar && { styleTargetRef: scrollbarRef }),
            visibleOptions,
            listRef,
            open,
            invalidate: options,
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
                onScroll,
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
                >
                    {renderListItems()}
                </Scrollbar>
            );
        };

        const renderWithNativeScrollbar = () => (
            <div
                className={cn(styles.scrollable, scrollbarClassName)}
                ref={mergeRefs([listRef, ref])}
                onScroll={onScroll}
            >
                {renderListItems()}
            </div>
        );

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

        return (
            <div
                {...(nativeScrollbar && { 'data-test-id': dataTestId })}
                className={cn(styles.optionsList, styles[size], className)}
            >
                {header && (
                    <div className={styles.optionsListHeader} onMouseEnter={resetHighlightedIndex}>
                        {header}
                    </div>
                )}

                {nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar()}

                {showFooter && footer && (
                    <div
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.optionsListFooter, {
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
