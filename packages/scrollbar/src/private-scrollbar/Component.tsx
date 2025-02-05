import React, { forwardRef, Fragment } from 'react';
import cn from 'classnames';
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react';

import { internalMergeRefs } from '@alfalab/core-components-shared';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

type PrivateScrollbarRef = React.ComponentRef<typeof SimpleBar>;

interface NodeProps {
    ref?: React.Ref<HTMLElement | undefined>;
    className?: string;
    style?: React.CSSProperties;
}

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export interface PrivateScrollbarProps extends Pick<SimpleBarProps, 'tabIndex'> {
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
    className?: string | undefined;
    scrollableNodeProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    contentNodeProps?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
}

export const PrivateScrollbar = forwardRef<PrivateScrollbarRef, PrivateScrollbarProps>(
    (
        {
            children,
            native = false,
            style,
            colors = 'default',
            tabIndex,
            className,
            scrollableNodeProps: scrollableNodePropsFromProps,
            contentNodeProps: contentNodePropsFromProps,
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
                ref={internalMergeRefs([
                    scrollableNodeProps?.ref,
                    scrollableNodePropsFromProps?.ref,
                ])}
                className={cn(
                    scrollableNodeProps?.className,
                    scrollableNodePropsFromProps?.className,
                )}
            >
                <div
                    {...contentNodePropsFromProps}
                    style={{ ...contentNodeProps?.style, ...contentNodePropsFromProps?.style }}
                    ref={internalMergeRefs([contentNodeProps?.ref, contentNodePropsFromProps?.ref])}
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
