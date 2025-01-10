import React, { ButtonHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
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
        onResize?: () => void;
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
            onResize,
            ...restProps
        },
        ref,
    ) => {
        const buttonRef = useRef<HTMLButtonElement | null>(null);

        const titleClassName = {
            [styles.content]: true,
            [styles.focused]: focused,
        };

        useEffect(() => {
            const resizeObserver = new ResizeObserver(() => {
                if (onResize) {
                    onResize();
                }
            });

            const button = buttonRef.current;

            if (button) {
                resizeObserver.observe(button);
            }

            return () => {
                if (button) {
                    resizeObserver.unobserve(button);
                }
            };
        }, [onResize]);

        return hidden ? null : (
            <button
                {...restProps}
                ref={mergeRefs([ref, buttonRef])}
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
