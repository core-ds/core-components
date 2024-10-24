import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ButtonDesktop } from './desktop';
import { ButtonMobile } from './mobile';
import { ButtonProps } from './typings';

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            breakpoint,
            ssrView,
            defaultMatchMediaValue = ssrView !== undefined ? ssrView === 'desktop' : undefined,
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? ButtonDesktop : ButtonMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Button.displayName = 'Button';
