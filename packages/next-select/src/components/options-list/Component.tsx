import React, {
    ComponentRef,
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    PropsWithoutRef,
    RefAttributes,
    UIEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { isNullable } from '@alfalab/core-components-shared';

import { OptionListProps } from '../../types';
import { List } from '../list';

import styles from './index.module.css';

type OptionsListRef = ComponentRef<typeof List>;

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

function OptionsListRenderFunc<OptionType>(
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
        },
        ref,
    ]: Parameters<ForwardRefRenderFunction<OptionsListRef, OptionListProps<OptionType>>>
): ReturnType<ForwardRefRenderFunction<OptionsListRef, OptionListProps<OptionType>>> {
    const [scrollPosition, setScrollPosition] = useState<ScrollPostion | null>(null);
    const listRef = useRef<ComponentRef<typeof List<OptionType>> | null>(null);
    const noOptions = options.length === 0;
    const noHeader = header === null;
    const noEmptyPlaceholder = emptyPlaceholder === null;
    const noFooter = footer === null;

    const noRender = noOptions && noHeader && noEmptyPlaceholder && noFooter;

    useEffect(() => {
        if (noRender) {
            setScrollPosition(null);

            return;
        }

        const listScrollableElement = listRef.current?.getScrollableElement();

        const initialScrollPosition = isNullable(listScrollableElement)
            ? null
            : getScrollPosition(listScrollableElement);

        setScrollPosition(initialScrollPosition);
    }, [noRender]);

    if (noRender) {
        return null;
    }

    const renderOptions = () => {
        const handleScroll = (event: UIEvent<HTMLElement>) => {
            const lastScrollPosition = getScrollPosition(event.currentTarget);

            setScrollPosition(lastScrollPosition);
            onScroll?.(event);
        };

        return (
            <List
                ref={mergeRefs([ref, listRef])}
                data={options}
                renderItem={renderOption}
                width={width}
                height={{ visibleItems: visibleOptions }}
                estimateItemSize={size}
                onScroll={handleScroll}
                nativeScrollbar={nativeScrollbar}
                overscan={5}
            />
        );
    };

    return (
        <div className={cn(styles.component, styles[`size${size}`])}>
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
                    className={cn(styles.emptyPlaceholder, { [styles.hidden]: noEmptyPlaceholder })}
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

export const OptionsList = forwardRef(OptionsListRenderFunc) as ForwardRefExoticComponent<
    PropsWithoutRef<OptionListProps<never>> & RefAttributes<OptionsListRef>
> &
    (<OptionType>(
        ...params: Parameters<
            ForwardRefExoticComponent<
                PropsWithoutRef<OptionListProps<OptionType>> & RefAttributes<OptionsListRef>
            >
        >
    ) => ReturnType<
        ForwardRefExoticComponent<
            PropsWithoutRef<OptionListProps<OptionType>> & RefAttributes<OptionsListRef>
        >
    >);
