import React, { forwardRef, Fragment } from 'react';
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
                ref={ref}
                style={style}
                className={cn(styles.component, colorStyles[colors].component, className)}
                tabIndex={tabIndex}
            >
                {render}
            </SimpleBar>
        );
    },
);
