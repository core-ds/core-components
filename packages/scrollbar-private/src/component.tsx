import React, { forwardRef, Fragment, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import SimpleBar, { type Props as SimpleBarProps } from 'simplebar-react';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

type ScrollbarPrivateRef = React.ComponentRef<typeof SimpleBar>;

interface NodeProps {
    ref?: React.Ref<HTMLElement | undefined>;
    className?: string;
    style?: React.CSSProperties;
}

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export interface ScrollbarPrivateProps
    extends Omit<SimpleBarProps, 'children' | 'scrollableNodeProps'> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    /**
     * @default false
     */
    native?: boolean;
    /**
     * @default default
     */
    colors?: 'default' | 'inverted';
    scrollableNodeProps?: React.ComponentProps<'div'>;
    contentNodeProps?: React.ComponentProps<'div'>;
}

export const ScrollbarPrivate = forwardRef<ScrollbarPrivateRef, ScrollbarPrivateProps>(
    (
        {
            children,
            native = false,
            style,
            colors = 'default',
            tabIndex = -1,
            className,
            scrollableNodeProps: scrollableNodePropsFromProps,
            contentNodeProps: contentNodePropsFromProps,
            ...restProps
        },
        ref,
    ) => {
        const instanceRef = useRef<ScrollbarPrivateRef>(null);
        const contentNodeRef = useRef<HTMLElement>(null);

        useEffect(() => {
            const contentNode = contentNodeRef.current;
            const instance = instanceRef.current;
            const win = contentNode?.ownerDocument.defaultView;

            if (!contentNode || !instance || !win?.ResizeObserver) {
                return undefined;
            }

            let frameId = 0;

            const scheduleRecalculate = () => {
                win.cancelAnimationFrame(frameId);
                frameId = win.requestAnimationFrame(() => instance.recalculate());
            };

            /*
             * Высота узла с контентом ограничена высотой корня SimpleBar, а та задаётся
             * плейсхолдером по итогам предыдущего замера. Поэтому при росте содержимого
             * бокс самого узла не меняется, и встроенный в SimpleBar ResizeObserver не
             * срабатывает. Разрываем цикл, наблюдая за потомками узла.
             */
            const resizeObserver = new win.ResizeObserver(scheduleRecalculate);

            const observeChildren = () => {
                resizeObserver.disconnect();
                Array.from(contentNode.children).forEach((child) => {
                    resizeObserver.observe(child);
                });
            };

            observeChildren();

            const mutationObserver = new win.MutationObserver(() => {
                observeChildren();
                scheduleRecalculate();
            });

            mutationObserver.observe(contentNode, { childList: true });

            return () => {
                win.cancelAnimationFrame(frameId);
                resizeObserver.disconnect();
                mutationObserver.disconnect();
            };
        }, []);

        const render = ({
            scrollableNodeProps,
            contentNodeProps,
        }: {
            scrollableNodeProps?: NodeProps;
            contentNodeProps?: NodeProps;
        }) => (
            <div
                {...scrollableNodePropsFromProps}
                style={{ ...scrollableNodeProps?.style, ...scrollableNodePropsFromProps?.style }}
                ref={mergeRefs([
                    scrollableNodeProps?.ref ?? null,
                    scrollableNodePropsFromProps?.ref ?? null,
                ])}
                className={cn(
                    scrollableNodeProps?.className,
                    scrollableNodePropsFromProps?.className,
                )}
            >
                <div
                    {...contentNodePropsFromProps}
                    style={{ ...contentNodeProps?.style, ...contentNodePropsFromProps?.style }}
                    ref={mergeRefs([
                        contentNodeProps?.ref ?? null,
                        contentNodePropsFromProps?.ref ?? null,
                        contentNodeRef,
                    ])}
                    className={cn(
                        contentNodeProps?.className,
                        contentNodePropsFromProps?.className,
                    )}
                >
                    {children}
                </div>
            </div>
        );

        return native ? (
            <Fragment>
                {render({
                    scrollableNodeProps: {
                        style,
                        className: cn(styles.nativeScrollbar, className),
                    },
                })}
            </Fragment>
        ) : (
            <SimpleBar
                {...restProps}
                ref={mergeRefs([ref, instanceRef])}
                style={style}
                className={cn(styles.component, colorStyles[colors].component, className)}
                tabIndex={tabIndex}
            >
                {render}
            </SimpleBar>
        );
    },
);
