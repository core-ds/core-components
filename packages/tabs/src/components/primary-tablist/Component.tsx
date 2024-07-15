import React, { useEffect, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { KeyboardFocusable } from '@alfalab/core-components-keyboard-focusable';
import { fnUtils } from '@alfalab/core-components-shared';

import { useTabs } from '../../hooks/use-tabs';
import { PlatformProps, Styles, TabListProps } from '../../typings';
import { ScrollableContainer } from '../scrollable-container';
import { Title } from '../title';

export const PrimaryTabList = ({
    size,
    styles = {},
    className,
    containerClassName,
    titles = [],
    selectedId = titles.length ? titles[0].id : undefined,
    scrollable = true,
    fullWidthScroll,
    onChange,
    dataTestId,
    platform,
    textStyle,
    inlineStyle,
    showSkeleton,
    skeletonProps,
}: TabListProps & Styles & PlatformProps) => {
    const lineRef = useRef<HTMLDivElement>(null);

    const { selectedTab, focusedTab, getTabListItemProps } = useTabs({
        titles,
        selectedId,
        onChange,
    });

    useEffect(() => {
        if (selectedTab) {
            const updateLineWidth = () => {
                if (lineRef.current) {
                    lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
                    lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
                }
            };

            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
            const observer = new ResizeObserver(updateLineWidth);

            observer.observe(selectedTab);

            return () => observer.disconnect();
        }

        return fnUtils.noop;
    }, [selectedTab]);

    const renderContent = () => (
        <div
            role='tablist'
            data-test-id={dataTestId}
            className={cn(styles.component, className, !textStyle && size && styles[size], {
                [styles.fullWidthScroll]: fullWidthScroll,
            })}
        >
            {titles.map(({ dataTestId: _, toggleRef: __, ...restTitleProps }, index) => (
                <KeyboardFocusable key={restTitleProps.id}>
                    {(ref, focused) => (
                        <Title
                            {...getTabListItemProps(index, ref)}
                            {...restTitleProps}
                            focused={focused}
                            styles={styles}
                            showSkeleton={showSkeleton}
                            skeletonProps={skeletonProps}
                        />
                    )}
                </KeyboardFocusable>
            ))}

            <div className={styles.line} ref={lineRef} />
        </div>
    );

    const wrapperClassName = cn(textStyle && styles[textStyle], styles[platform]);

    return scrollable ? (
        <ScrollableContainer
            containerWrapperClassName={wrapperClassName}
            activeChild={focusedTab || selectedTab}
            containerClassName={containerClassName}
            scrollControlsClassName={cn(textStyle && styles.scrollControls)}
            fullWidthScroll={fullWidthScroll}
            view='primary'
            size={textStyle ? undefined : size}
            platform={platform}
            inlineStyle={inlineStyle}
            showSkeleton={showSkeleton}
        >
            {renderContent()}
        </ScrollableContainer>
    ) : (
        <div
            className={cn(styles.container, wrapperClassName, containerClassName)}
            style={inlineStyle}
        >
            {renderContent()}
        </div>
    );
};
