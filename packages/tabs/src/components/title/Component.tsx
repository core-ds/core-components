import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import { Skeleton, SkeletonProps } from '@alfalab/core-components-skeleton';

import { Styles, TabListTitle } from '../../typings';

type Props = TabListTitle &
    Styles &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'title'> & {
        focused?: boolean;
        isOption?: boolean;
        showSkeleton?: boolean;
        skeletonProps?: Omit<SkeletonProps, 'visible'>;
    };

export const Title = forwardRef<HTMLButtonElement, Props>(
    (
        {
            id,
            toggleClassName,
            title,
            styles = {},
            rightAddons = null,
            hidden = false,
            selected = false,
            disabled = false,
            collapsed = false,
            focused = false,
            isOption = false,
            showSkeleton = false,
            skeletonProps,
            ...restProps
        },
        ref,
    ) => {
        const titleClassName = {
            [styles.content]: true,
            [styles.focused]: focused,
        };

        return hidden ? null : (
            <button
                {...restProps}
                ref={ref}
                disabled={disabled || showSkeleton}
                type='button'
                id={String(id)}
                className={cn(
                    styles.title,
                    {
                        [styles.selected]: selected,
                        [styles.disabled]: disabled,
                        [styles.collapsed]: collapsed && !isOption,
                        [styles.option]: isOption,
                    },
                    toggleClassName,
                )}
            >
                {showSkeleton ? (
                    <Skeleton
                        {...skeletonProps}
                        className={cn(titleClassName, skeletonProps?.className)}
                        visible={true}
                    >
                        {title}
                    </Skeleton>
                ) : (
                    <span className={cn(titleClassName)}>{title}</span>
                )}

                {rightAddons && (
                    <span
                        className={cn(styles.rightAddons, {
                            [styles.rightAddonsMarginZero]: !title,
                        })}
                    >
                        {rightAddons}
                    </span>
                )}
            </button>
        );
    },
);
