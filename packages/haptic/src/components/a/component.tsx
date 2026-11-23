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

export interface HapticAProps
    extends ComponentProps<'a'>,
        PolymorphicComponentProps<
            ElementType<ComposedPolymorphicProps<ComponentProps<'a'>>, 'a'>,
            ComposedPolymorphicProps<{ haptics?: HapticProps }>
        > {}

export const HapticA = forwardRef<ComponentRef<'a'>, HapticAProps>(
    (
        {
            className,
            onClick,
            children,
            as: Component = 'button',
            customProps: {
                //  haptics,
                customProps,
            } = {},
            ...restProps
        },
        ref,
    ) => {
        const nodeRef = useRef<HTMLAnchorElement>(null);
        /*
         * const { disabled } = haptics ?? {};
         * const ariaDisabled = restProps['aria-disabled'];
         * const mergedDisabled =
         *     disabled || (typeof ariaDisabled === 'string' ? ariaDisabled === 'true' : ariaDisabled);
         */
        const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
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
                ref={mergeRefs([ref, nodeRef])}
                className={cn(className, styles.component)}
                onClick={handleClick}
            >
                {children}
                <HapticFallback nodeRef={nodeRef} />
            </Component>
        );
    },
);

HapticA.displayName = 'HapticA';
