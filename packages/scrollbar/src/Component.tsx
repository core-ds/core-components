import React, { HTMLAttributes, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import SimpleBar from 'simplebar/src/simplebar';

import defaultColors from './default.module.css';
import styles from './index.module.css';
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
     * Название css свойства, которое устанавливается на контейнер при horizontalAutoStretch.
     */
    widthPropName?: 'minWidth' | 'width' | 'maxWidth';

    /**
     * Включает автоскрытие ползунка.
     */
    autoHide?: boolean;

    /**
     * Время в мс, определяющее задержку до исчезновения полосы прокрутки (при включенной опции autoHide).
     */
    autoHideTimeout?: number;

    /**
     * Принудительное отображение полосы прокрутки.
     */
    forceVisible?: boolean | 'x' | 'y';

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
            autoHideTimeout = 1000,
            clickOnTrack = true,
            horizontalAutoStretch = false,
            widthPropName = 'minWidth',
            ...htmlAttributes
        },
        ref,
    ) => {
        const elRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const contentNodeRef = useRef<HTMLDivElement>(null);
        const maskNodeRef = useRef<HTMLDivElement>(null);

        const colorStyles = colorStylesMap[colors];

        useEffect(() => {
            let instance: SimpleBar | null;

            if (elRef.current) {
                instance = new SimpleBar(elRef.current, {
                    autoHide,
                    forceVisible,
                    clickOnTrack,
                    classNames,
                    timeout: autoHideTimeout,
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

        useEffect(() => {
            let mutationObserver: MutationObserver | null = null;
            const contentNode = contentNodeRef.current;
            const rootNode = elRef.current;
            const scrollableNode = scrollableNodeRef.current;
            const maskNode = maskNodeRef.current;

            const setMinWidth = throttle(() => {
                if (contentNode && rootNode && scrollableNode && maskNode) {
                    /*
                     * Устанавливаем min-width, чтобы максимально растянуть абсолютно позиционированный элемент.
                     * Затем контенту устанавливаем display: inline-block, чтобы его ширина была равна ширине содержимого.
                     */
                    maskNode.style.minWidth = '4000px';
                    contentNode.style.display = 'inline-block';

                    const contentRect = contentNode.getBoundingClientRect();
                    const newWidth = `${Math.ceil(contentRect.width)}px`;
                    const prevWidth = rootNode.style[widthPropName];

                    if (newWidth !== prevWidth) {
                        rootNode.style[widthPropName] = newWidth;
                    }

                    contentNode.style.display = '';
                    maskNode.style.minWidth = '';
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
        }, [widthPropName, horizontalAutoStretch]);

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
                    <div className={classNames.mask} ref={maskNodeRef}>
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
                                    className={cn(
                                        classNames.contentEl,
                                        contentNodeProps?.className,
                                    )}
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
            </div>
        );
    },
);

Scrollbar.displayName = 'Scrollbar';
