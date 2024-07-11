import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { ButtonDesktop } from './desktop';
import { ButtonMobile } from './mobile';
import { ButtonProps } from './typings';

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
    (
        { children, breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? ButtonDesktop : ButtonMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Button.displayName = 'Button';
