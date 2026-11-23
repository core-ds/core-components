import React, {
    type ComponentProps,
    type ComponentRef,
    type ElementType,
    forwardRef,
    type MouseEventHandler,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { HapticFallback } from '@alfalab/core-components-haptic/components/haptic-fallback';
import { type HapticProps } from '@alfalab/core-components-haptic/types';
import {
    type ComposedPolymorphicProps,
    passCustomProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic';

import styles from './index.module.css';

export interface HapticButtonProps
    extends ComponentProps<'button'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'button'>>, 'button'>,
            ComposedPolymorphicProps<{ haptics?: HapticProps }>
        > {}

export const HapticButton = forwardRef<ComponentRef<'button'>, HapticButtonProps>(
    (
        {
            className,
            onClick,
            children,
            as: Component = 'button',
            customProps: {
                // haptics,
                customProps,
            } = {},
            ...restProps
        },
        ref,
    ) => {
        const nodeRef = useRef<HTMLButtonElement>(null);
        /*
         * const { disabled } = haptics ?? {};
         * const mergedDisabled = disabled || restProps.disabled;
         */
        const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
            onClick?.(event);

            /*
             * if (mergedDisabled || event.defaultPrevented) {
             * }
             */
        };

        return (
            <Component
                {...restProps}
                {...passCustomProps(customProps)}
                className={cn(className, styles.component)}
                ref={mergeRefs([ref, nodeRef])}
                onClick={handleClick}
            >
                {children}
                <HapticFallback nodeRef={nodeRef} />
            </Component>
        );
    },
);

HapticButton.displayName = 'HapticButton';
