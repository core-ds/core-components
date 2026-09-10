import React, { type ComponentProps, type ComponentRef, forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { SimpleBar } from '@alfalab/core-components-scrollbar-private/simplebar';
import { type ScrollbarPrivateProps } from '@alfalab/core-components-scrollbar-private/types';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
} as const;

export const ScrollbarPrivate = forwardRef<ComponentRef<typeof SimpleBar>, ScrollbarPrivateProps>(
    (
        {
            classNames = {},
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
        }: Partial<Record<'scrollableNodeProps' | 'contentNodeProps', ComponentProps<'div'>>>) => (
            <div
                {...scrollableNodeProps}
                {...scrollableNodePropsFromProps}
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
                    {...contentNodeProps}
                    {...contentNodePropsFromProps}
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

        if (native) {
            return render({
                scrollableNodeProps: {
                    style,
                    className: cn(styles.nativeScrollbar, className),
                },
            });
        }

        const resolvedColorStyles = colorStyles[colors];

        return (
            <SimpleBar
                {...restProps}
                ref={ref}
                style={style}
                tabIndex={tabIndex}
                styles={styles}
                className={cn(styles.component, resolvedColorStyles.component, className)}
                classNames={{
                    ...classNames,
                    scrollbar: cn(classNames.scrollbar, resolvedColorStyles.scrollbar),
                }}
            >
                {render}
            </SimpleBar>
        );
    },
);
