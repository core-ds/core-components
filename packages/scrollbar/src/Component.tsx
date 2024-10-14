import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import SimpleBar from 'simplebar/src/simplebar';

import { getElementWindow } from '@alfalab/core-components-shared';

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

    /**
     * HTML-aтрибуты маски.
     */
    maskProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

    /**
     * Дополнительный класс контейнера вертикальной полосы прокрутки
     */
    verticalBarClassName?: string;

    /**
     * Обработчик изменения скролла
     */
    onContentScroll?: (e: Event) => void;
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

function elementHasAbsPosChild(element: Element) {
    const elementWindow = getElementWindow(element);

    for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        const childStyle = elementWindow.getComputedStyle(child);

        if (childStyle.position === 'absolute') {
            return true;
        }
    }

    return false;
}

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
            maskProps,
            verticalBarClassName,
            onContentScroll,
            ...htmlAttributes
        },
        ref,
    ) => {
        const elRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef<HTMLDivElement>(null);
        const contentNodeRef = useRef<HTMLDivElement>(null);
        const maskNodeRef = useRef<HTMLDivElement>(null);
        const [width, setWidth] = useState<number>();

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

                if (onContentScroll) {
                    instance.getScrollElement().addEventListener('scroll', onContentScroll);
                }
            }

            return () => {
                if (instance) {
                    if (onContentScroll) {
                        instance.getScrollElement().removeEventListener('scroll', onContentScroll);
                    }
                    instance.unMount();
                    instance = null;
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            let mutationObserver: MutationObserver | null = null;
            const contentNode = contentNodeRef.current;
            const maskNode = maskNodeRef.current;

            const setMinWidth = throttle(() => {
                if (!contentNode || !contentNode.children.length) return;

                if (elementHasAbsPosChild(contentNode)) {
                    /*
                     * Измеряем scrollWidth у contentNode, т.к. элементы внутри него позицинированы абсолютно
                     */
                    setWidth(Math.ceil(contentNode.scrollWidth));
                } else {
                    if (!maskNode) return;

                    const prevMinWidth = maskNode.style.minWidth;
                    const prevDisplay = contentNode.style.display;

                    /*
                     * Устанавливаем min-width, чтобы максимально растянуть абсолютно позиционированный элемент.
                     * Затем контенту устанавливаем display: inline-block, чтобы его ширина была равна ширине содержимого.
                     */
                    maskNode.style.minWidth = '4000px';
                    contentNode.style.display = 'inline-block';

                    const contentRect = contentNode.getBoundingClientRect();

                    setWidth(Math.ceil(contentRect.width));

                    maskNode.style.minWidth = prevMinWidth;
                    contentNode.style.display = prevDisplay;
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
            } else {
                setWidth(undefined);
            }

            return () => {
                setMinWidth.cancel();
                mutationObserver?.disconnect();
            };
        }, [horizontalAutoStretch]);

        return (
            <div
                {...htmlAttributes}
                style={{ ...htmlAttributes.style, [widthPropName]: width }}
                ref={mergeRefs([elRef, ref])}
                data-simplebar={true}
                className={cn(styles.component, colorStyles.component, className)}
            >
                <div className={classNames.wrapper}>
                    <div className={classNames.heightAutoObserverWrapperEl}>
                        <div className={classNames.heightAutoObserverEl} />
                    </div>
                    <div
                        {...maskProps}
                        className={cn(classNames.mask, maskProps?.className)}
                        ref={mergeRefs([maskNodeRef, ...(maskProps?.ref ? [maskProps.ref] : [])])}
                    >
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
                <div className={cn(classNames.track, classNames.vertical, verticalBarClassName)}>
                    <div className={classNames.scrollbar} />
                </div>
            </div>
        );
    },
);

Scrollbar.displayName = 'Scrollbar';
