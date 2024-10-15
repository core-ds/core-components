import React, {
    ComponentRef,
    FC,
    forwardRef,
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

type OptionsListRef = ComponentRef<typeof List<never>>;

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

    useEffect(() => {
        const listScrollableElement = listRef.current?.getScrollableElement();

        setScrollPosition(() =>
            isNullable(listScrollableElement) ? null : getScrollPosition(listScrollableElement),
        );
    }, []);

    if (noOptions && noHeader && noEmptyPlaceholder && noFooter) {
        return null;
    }

    const renderOptions = () => {
        const handleScroll = (event: UIEvent<HTMLElement>) => {
            const lastestScrollPosition = getScrollPosition(event.currentTarget);

            setScrollPosition(lastestScrollPosition);
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

export const OptionsList = forwardRef(OptionsListRenderFunc) as <OptionType>(
    ...params: Parameters<
        FC<PropsWithoutRef<OptionListProps<OptionType>> & RefAttributes<OptionsListRef>>
    >
) => ReturnType<FC<PropsWithoutRef<OptionListProps<OptionType>> & RefAttributes<OptionsListRef>>>;
