import React, { forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { PrivateScrollbar } from '@alfalab/core-components-scrollbar';
import {
    assert,
    internalMergeRefs,
    isClient,
    isNullable,
    isObject,
} from '@alfalab/core-components-shared';

import { DEFAULT_VISIBLE_OPTIONS, SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { VirtualOptionsProps } from '../../private-typings';
import { OptionShape, OptionsListProps } from '../../typings';
import { lastIndexOf, usePrevious } from '../../utils';

import styles from './index.module.css';

type ScrollPostion = Record<'top' | 'bottom', boolean>;

const getScrollPosition = ({
    scrollTop,
    scrollHeight,
    offsetHeight,
}: HTMLElement): ScrollPostion => ({
    top: scrollTop <= 0,
    bottom: scrollHeight - offsetHeight <= scrollTop,
});

export const NextOptionsList = forwardRef<HTMLDivElement, OptionsListProps>(
    (
        {
            size = 48,
            flatOptions = [],
            highlightedIndex = -1,
            className,
            open,
            options = [],
            dataTestId,
            emptyPlaceholder,
            visibleOptions = DEFAULT_VISIBLE_OPTIONS,
            header,
            footer,
            showFooter = true,
            optionsListWidth,
            onScroll,
            nativeScrollbar: nativeScrollbarFromProps,
            setHighlightedIndex,
            scrollbarClassName,
            virtualOptionsProps,
        },
        _ref,
    ) => {
        assert(
            isObject(virtualOptionsProps),
            "[NextOptionsList]: 'virtualOptionsProps' prop must be defined.",
        );
        const {
            contentHeight,
            contentRef,
            footerRef,
            scrollElementRef: scrollElementRefFromProps,
            virtualizer,
            style,
            render,
        } = virtualOptionsProps as VirtualOptionsProps;
        const matchContentWidth = optionsListWidth === 'content';
        const scrollElementRef = useRef<HTMLDivElement>(null);
        const [scrollPosition, setScrollPosition] = useState<ScrollPostion | null>(null);
        const prevHighlightedIndex = usePrevious(highlightedIndex) ?? -1;
        const noOptions = options.length === 0;
        const query = '(max-width: 1023px)';
        let [nativeScrollbar] = useMatchMedia(query, () =>
            isClient() ? window.matchMedia(query).matches : true,
        );

        nativeScrollbar = nativeScrollbarFromProps ?? nativeScrollbar;

        useEffect(() => {
            const scrollElement = noOptions ? null : scrollElementRef.current;

            setScrollPosition(isNullable(scrollElement) ? null : getScrollPosition(scrollElement));
        }, [noOptions]);

        // Сколл к выбранному пункту при открытии меню
        useEffect(() => {
            if (!open || highlightedIndex === -1) {
                return;
            }

            virtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [open]);

        // Циклическая навигация
        useEffect(() => {
            const notDisabled = (option: OptionShape) => !option.disabled;
            const firstNonDisabled = flatOptions.findIndex(notDisabled);
            const lastNonDisabled = lastIndexOf(flatOptions, notDisabled);

            if (
                prevHighlightedIndex <= firstNonDisabled &&
                highlightedIndex === flatOptions.length - 1
            ) {
                virtualizer.scrollToIndex(lastNonDisabled);
            }

            if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
                virtualizer.scrollToIndex(0);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [prevHighlightedIndex, highlightedIndex]);

        const resetHighlightedIndex = () => setHighlightedIndex?.(-1);

        if (noOptions && !emptyPlaceholder) {
            return null;
        }

        const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
            const nextScrollPosition = getScrollPosition(event.currentTarget);

            setScrollPosition(nextScrollPosition);
            onScroll?.(event as React.MouseEvent<HTMLDivElement>);
        };

        return (
            <div
                className={cn(styles.optionsList, styles[SIZE_TO_CLASSNAME_MAP[size]], className)}
                data-test-id={dataTestId}
            >
                {header && (
                    <div
                        className={cn(styles.optionsListHeader, {
                            [styles.headerHighlighted]: !scrollPosition?.top,
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
                        })}
                        style={style}
                        scrollableNodeProps={{
                            ref: internalMergeRefs([scrollElementRef, scrollElementRefFromProps]),
                            onScroll: handleScroll,
                        }}
                        contentNodeProps={{
                            ref: contentRef,
                            className: cn(styles.content, {
                                [styles.matchContent]: matchContentWidth,
                            }),
                            style: { height: contentHeight },
                        }}
                    >
                        {render(styles.list)}
                    </PrivateScrollbar>
                )}

                {emptyPlaceholder && noOptions && (
                    <div className={styles.emptyPlaceholder}>{emptyPlaceholder}</div>
                )}

                {showFooter && footer && (
                    <div
                        ref={footerRef}
                        onMouseEnter={resetHighlightedIndex}
                        className={cn(styles.optionsListFooter, {
                            [styles.withBorder]:
                                visibleOptions &&
                                flatOptions.length > visibleOptions &&
                                !scrollPosition?.bottom,
                        })}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
    },
);
