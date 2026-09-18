import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import SimpleBarCore from 'simplebar-core';

import { type SimpleBarProps } from '@alfalab/core-components-scrollbar-private/types';
import { noop } from '@alfalab/core-components-shared';

const { defaultOptions } = SimpleBarCore;
const defaultClassNames = defaultOptions.classNames;

export const SimpleBar = forwardRef<SimpleBarCore | null, SimpleBarProps>(
    (
        {
            children,
            styles,
            classNames = {},
            clickOnTrack = defaultOptions.clickOnTrack,
            forceVisible = defaultOptions.forceVisible,
            scrollbarMinSize = defaultOptions.scrollbarMinSize,
            scrollbarMaxSize = defaultOptions.scrollbarMaxSize,
            ariaLabel = defaultOptions.ariaLabel,
            tabIndex = defaultOptions.tabIndex,
            autoHide = defaultOptions.autoHide,
            ...restProps
        },
        ref,
    ) => {
        const rootNodeRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const contentNodeRef = useRef<HTMLDivElement>(null);
        const [instance, setInstance] = useState<SimpleBarCore | null>(null);
        const trackClassName = cn(styles.track, classNames.track);
        const scrollbarClassName = cn(styles.scrollbar, classNames.scrollbar);

        useImperativeHandle<SimpleBarCore | null, SimpleBarCore | null>(ref, () => instance, [
            instance,
        ]);

        useEffect(() => {
            const rootNode = rootNodeRef.current;
            const scrollableNode = scrollableNodeRef.current;
            const contentNode = contentNodeRef.current;

            if (rootNode && scrollableNode && contentNode) {
                const nextInstance = new SimpleBarCore(rootNode, {
                    scrollableNode,
                    contentNode,
                    classNames: {
                        contentEl: styles.content,
                        contentWrapper: styles.contentWrapper,
                        dragging: defaultClassNames.dragging, // global
                        heightAutoObserverEl: styles.heightAutoObserver,
                        heightAutoObserverWrapperEl: styles.heightAutoObserverWrapper,
                        horizontal: styles.horizontal,
                        hover: styles.hover,
                        mask: styles.mask,
                        mouseEntered: defaultClassNames.mouseEntered, // global
                        offset: styles.offset,
                        placeholder: styles.placeholder,
                        scrollable: defaultClassNames.scrollable, // global
                        scrollbar: styles.scrollbar,
                        scrolling: defaultClassNames.scrolling, // global
                        track: styles.track,
                        vertical: styles.vertical,
                        visible: defaultClassNames.visible, // global
                        wrapper: styles.wrapper,
                    },
                    tabIndex,
                    ariaLabel,
                    autoHide,
                    clickOnTrack,
                    forceVisible,
                    scrollbarMinSize,
                    scrollbarMaxSize,
                });

                setInstance(nextInstance);

                return () => {
                    nextInstance.unMount();
                    setInstance(null);
                };
            }

            setInstance(null);

            return noop;
        }, [
            ariaLabel,
            autoHide,
            clickOnTrack,
            forceVisible,
            scrollbarMaxSize,
            scrollbarMinSize,
            styles,
            tabIndex,
        ]);

        return (
            <div data-simplebar='init' ref={rootNodeRef} {...restProps}>
                <div className={cn(styles.wrapper, classNames.wrapper)}>
                    <div
                        className={cn(
                            styles.heightAutoObserverWrapper,
                            classNames.heightAutoObserverWrapper,
                        )}
                    >
                        <div
                            className={cn(styles.heightAutoObserver, classNames.heightAutoObserver)}
                        />
                    </div>
                    <div className={cn(styles.mask, classNames.mask)}>
                        <div className={cn(styles.offset, classNames.offset)}>
                            {children?.({
                                scrollableNodeProps: {
                                    tabIndex,
                                    role: 'region',
                                    'aria-label': ariaLabel,
                                    ref: scrollableNodeRef,
                                    className: cn(styles.contentWrapper, classNames.contentWrapper),
                                },
                                contentNodeProps: {
                                    ref: contentNodeRef,
                                    className: cn(styles.content, classNames.content),
                                },
                            })}
                        </div>
                    </div>
                    <div className={cn(styles.placeholder, classNames.placeholder)} />
                </div>
                <div
                    className={cn(trackClassName, styles.horizontal, classNames.horizontal)}
                    data-scrollbar-track='x'
                >
                    <div className={scrollbarClassName} />
                </div>
                <div
                    className={cn(trackClassName, styles.vertical, classNames.vertical)}
                    data-scrollbar-track='y'
                >
                    <div className={scrollbarClassName} />
                </div>
            </div>
        );
    },
);
