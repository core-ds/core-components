import React, { HTMLAttributes, useEffect, useRef } from 'react';
import cn from 'classnames';
import SimpleBarJS from 'simplebar/dist/simplebar-core.esm';
import { ClassNamesOptions } from 'simplebar';
import mergeRefs from 'react-merge-refs';

import styles from './index.module.css';
import defaultColors from './default.module.css';
import invertedColors from './inverted.module.css';

const colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};

export type ScrollbarProps = {
    /**
     * Оборачиваемый элемент. Может быть рендер-функцией.
     */
    children?: ((args: RenderPropArgs) => JSX.Element) | JSX.Element;
    /**
     * Дополнительный класс на корневой элемент.
     */
    className?: string;
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
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
     * Включает стандартное поведение скролла при клике по дорожке.
     */
    clickOnTrack?: boolean;
    /**
     * HTML-aттрибуты на прокручиваемый узел.
     */
    scrollableNodeProps?: React.HTMLAttributes<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;

export type RenderPropArgs = {
    /**
     * Реф на прокручиваемый узел.
     */
    scrollableNodeRef: React.RefObject<any>;
    /**
     * Реф на узел с контентом.
     */
    contentNodeRef: React.RefObject<any>;
    /**
     * Дефолтный класс на прокручиваемый узел.
     */
    scrollableNodeClassName?: string;
    /**
     * Дефолтный класс на узел с контентом.
     */
    contentNodeClassName?: string;
};

const classNames: ClassNamesOptions = {
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
            scrollableNodeProps,
            autoHide = true,
            forceVisible = false,
            timeout = 1000,
            clickOnTrack = true,
            ...htmlAttributes
        },
        ref,
    ) => {
        const elRef = useRef<HTMLDivElement>(null);
        const scrollableNodeRef = useRef(null);
        const contentNodeRef = useRef(null);

        const colorStyles = colorStylesMap[colors];

        useEffect(() => {
            let instance: SimpleBarJS | null;

            if (elRef.current) {
                instance = new SimpleBarJS(elRef.current, {
                    autoHide,
                    forceVisible,
                    timeout,
                    clickOnTrack,
                    classNames,
                    scrollbarMinSize: 40,
                    scrollbarMaxSize: SimpleBarJS.defaultOptions.scrollbarMaxSize,
                    direction: SimpleBarJS.defaultOptions.direction,
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
                            {typeof children === 'function' ? (
                                children({
                                    scrollableNodeRef,
                                    scrollableNodeClassName: classNames.contentWrapper,
                                    contentNodeRef,
                                    contentNodeClassName: classNames.contentEl,
                                })
                            ) : (
                                <div
                                    {...scrollableNodeProps}
                                    ref={scrollableNodeRef}
                                    className={cn(
                                        classNames.contentWrapper,
                                        scrollableNodeProps?.className,
                                    )}
                                >
                                    <div ref={contentNodeRef} className={classNames.contentEl}>
                                        {children}
                                    </div>
                                </div>
                            )}
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
