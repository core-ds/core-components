import React, { HTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import SimpleBar from 'simplebar/dist/simplebar-core.esm';
import throttle from 'lodash.throttle';

import styles from './index.module.css';
import defaultColors from './default.module.css';
import invertedColors from './inverted.module.css';

const colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};

export type ScrollbarProps = {
    /**
     * Оборачиваемый элемент.
     */
    children?: React.ReactNode;
    /**
     * Дополнительный класс на корневой элемент.
     */
    className?: string;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Растягивать контент по горизонтали по ширине содержимого.
     */
    horizontalAutoStretch?: boolean;

    /**
     * Включает автоскрытие ползунка..
     */
    autoHide?: boolean;
    /**
     * Принудительное отображение полосы прокрутки.
     */
    forceVisible?: boolean | 'x' | 'y';
    /**
     * Задержка до скрытия полосы прокрутки (при включенной опции autoHide).
     */
    timeout?: number;
    /**
     * Управление поведением клика по треку.
     * Если true, то будет выполняться прокрутка к месту клика.
     */
    clickOnTrack?: boolean;
    /**
     * HTML-aтрибуты на прокручиваемый узел.
     */
    scrollableNodeProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    /**
     * HTML-aтрибуты на узел с контентом.
     */
    contentNodeProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
} & HTMLAttributes<HTMLDivElement>;

const classNames = {
    wrapper: styles.wrapper,
    heightAutoObserverEl: styles.heightAutoObserver,
    heightAutoObserverWrapperEl: styles.heightAutoObserverWrapper,
    mask: styles.mask,
    offset: styles.offset,
    contentWrapper: styles.contentWrapper,
    contentEl: styles.content,
    placeholder: styles.placeholder,
    vertical: styles.vertical,
    horizontal: styles.horizontal,
    hover: styles.hover,
    track: 'track',
    scrollbar: 'scrollbar',
    dragging: 'dragging',
    visible: 'visible',
};

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
    (
        {
            colors = 'default',
            className,
            children,
            scrollableNodeProps = { ref: null },
            contentNodeProps = { ref: null },
            autoHide = true,
            forceVisible = false,
            timeout = 1000,
            clickOnTrack = true,
            horizontalAutoStretch = false,
            ...htmlAttributes
        },
        ref,
    ) => {
        const elRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const contentNodeRef = useRef<HTMLDivElement>(null);
        const fakeContentNodeRef = useRef<HTMLDivElement>(null);

        const colorStyles = colorStylesMap[colors];

        useLayoutEffect(() => {
            let mutationObserver: MutationObserver | null = null;
            const contentNode = contentNodeRef.current;
            const rootNode = elRef.current;
            const scrollableNode = scrollableNodeRef.current;
            const fakeContentNode = fakeContentNodeRef.current;

            const setMinWidth = throttle(() => {
                if (contentNode && fakeContentNode && rootNode && scrollableNode) {
                    const clonedContent = contentNode.cloneNode(true);

                    fakeContentNode.appendChild(clonedContent);

                    const newMinWidth = `${Math.ceil(
                        fakeContentNode.getBoundingClientRect().width,
                    )}px`;
                    const prevMinWidth = rootNode.style.minWidth;

                    if (newMinWidth !== prevMinWidth) {
                        rootNode.style.minWidth = newMinWidth;
                    }

                    fakeContentNode.removeChild(clonedContent);
                }
            }, 200);

            if (horizontalAutoStretch && contentNode) {
                setMinWidth();

                mutationObserver = new MutationObserver(setMinWidth);

                mutationObserver.observe(contentNode, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                });
            }

            return () => {
                setMinWidth.cancel();

                if (mutationObserver) {
                    mutationObserver.disconnect();
                }
            };
        }, [horizontalAutoStretch]);

        useEffect(() => {
            let instance: SimpleBar | null;

            if (elRef.current) {
                instance = new SimpleBar(elRef.current, {
                    autoHide,
                    forceVisible,
                    timeout,
                    clickOnTrack,
                    classNames,
                    direction: 'ltr',
                    scrollbarMinSize: 40,
                    scrollableNode: scrollableNodeRef.current,
                    contentNode: contentNodeRef.current,
                });
            }

            return () => {
                if (instance) {
                    instance.unMount();
                    instance = null;
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <div
                {...htmlAttributes}
                ref={mergeRefs([elRef, ref])}
                data-simplebar={true}
                className={cn(styles.component, colorStyles.component, className)}
            >
                <div className={classNames.wrapper}>
                    <div className={classNames.heightAutoObserverWrapperEl}>
                        <div className={classNames.heightAutoObserverEl} />
                    </div>
                    <div className={classNames.mask}>
                        <div className={classNames.offset}>
                            <div
                                {...scrollableNodeProps}
                                ref={mergeRefs([
                                    scrollableNodeRef,
                                    ...(scrollableNodeProps.ref ? [scrollableNodeProps.ref] : []),
                                ])}
                                className={cn(
                                    classNames.contentWrapper,
                                    scrollableNodeProps?.className,
                                )}
                            >
                                <div
                                    {...contentNodeProps}
                                    ref={mergeRefs([
                                        contentNodeRef,
                                        ...(contentNodeProps.ref ? [contentNodeProps.ref] : []),
                                    ])}
                                    className={classNames.contentEl}
                                >
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames.placeholder} />
                </div>
                <div className={cn(classNames.track, classNames.horizontal)}>
                    <div className={classNames.scrollbar} />
                </div>
                <div className={cn(classNames.track, classNames.vertical)}>
                    <div className={classNames.scrollbar} />
                </div>
                {horizontalAutoStretch && (
                    <div
                        className={cn(styles.fakeContent)}
                        ref={fakeContentNodeRef}
                        aria-hidden={true}
                    />
                )}
            </div>
        );
    },
);

Scrollbar.displayName = 'Scrollbar';
