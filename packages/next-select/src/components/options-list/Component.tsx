import React, { forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { PrivateList, PrivateListRefType } from '@alfalab/core-components-list';
import { internalMergeRefs, isNullable } from '@alfalab/core-components-shared';

import { OptionListProps } from '../../types';

import styles from './index.module.css';

type OptionsListRef = HTMLElement;

interface ScrollPostion {
    top: boolean;
    bottom: boolean;
}

function getScrollPosition({ scrollTop, scrollHeight, offsetHeight }: HTMLElement): ScrollPostion {
    const top = scrollTop <= 0;
    const bottom = scrollHeight - offsetHeight <= scrollTop;

    return {
        top,
        bottom,
    };
}

function OptionsListRenderFunction<OptionType>(
    ...[
        {
            size,
            width,
            visibleOptions,
            header = null,
            emptyPlaceholder = null,
            footer = null,
            nativeScrollbar,
            options = [],
            renderOption,
            onScroll,
            minWidth,
            innerProps,
            listRef: listRefFromProps,
        },
        ref,
    ]: Parameters<React.ForwardRefRenderFunction<OptionsListRef, OptionListProps<OptionType>>>
): ReturnType<React.ForwardRefRenderFunction<OptionsListRef, OptionListProps<OptionType>>> {
    const [scrollPosition, setScrollPosition] = useState<ScrollPostion | null>(null);
    const listRef = useRef<PrivateListRefType>(null);
    const noOptions = options.length === 0;
    const noHeader = header === null;
    const noEmptyPlaceholder = emptyPlaceholder === null;
    const noFooter = footer === null;
    const noRender = noOptions && noHeader && noEmptyPlaceholder && noFooter;

    useEffect(() => {
        const listScrollableElement = noOptions ? null : listRef.current?.scrollElement;

        const nextScrollPosition = isNullable(listScrollableElement)
            ? null
            : getScrollPosition(listScrollableElement);

        setScrollPosition(nextScrollPosition);
    }, [noOptions]);

    if (noRender) {
        return null;
    }

    const renderOptions = () => {
        const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
            const lastScrollPosition = getScrollPosition(event.currentTarget);

            setScrollPosition(lastScrollPosition);
            onScroll?.(event);
        };

        return (
            <PrivateList
                ref={internalMergeRefs([listRef, listRefFromProps])}
                minWidth={minWidth}
                data={options}
                renderItem={renderOption}
                width={width}
                height={{ visibleItems: visibleOptions }}
                estimateItemSize={size}
                onScroll={handleScroll}
                nativeScrollbar={nativeScrollbar}
            />
        );
    };

    return (
        <div
            {...innerProps}
            ref={internalMergeRefs([ref, innerProps?.ref])}
            className={cn(styles.component, styles[`size${size}`], innerProps?.className)}
        >
            <div
                aria-hidden={noHeader}
                className={cn(styles.header, {
                    [styles.hidden]: noHeader,
                    [styles.transparent]: scrollPosition?.top,
                })}
            >
                {header}
            </div>
            {noOptions ? (
                <div
                    aria-hidden={noEmptyPlaceholder}
                    className={cn(styles.emptyPlaceholder, {
                        [styles.hidden]: noEmptyPlaceholder,
                    })}
                >
                    {emptyPlaceholder}
                </div>
            ) : (
                renderOptions()
            )}
            <div
                aria-hidden={noFooter}
                className={cn(styles.footer, {
                    [styles.hidden]: noFooter,
                    [styles.transparent]: scrollPosition?.bottom,
                })}
            >
                {footer}
            </div>
        </div>
    );
}

export const OptionsList = forwardRef(OptionsListRenderFunction) as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<OptionListProps<never>> & React.RefAttributes<OptionsListRef>
> &
    (<OptionType>(
        ...params: Parameters<
            React.ForwardRefExoticComponent<
                React.PropsWithoutRef<OptionListProps<OptionType>> &
                    React.RefAttributes<OptionsListRef>
            >
        >
    ) => ReturnType<
        React.ForwardRefExoticComponent<
            React.PropsWithoutRef<OptionListProps<OptionType>> & React.RefAttributes<OptionsListRef>
        >
    >);
