import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { ButtonDesktop } from './desktop';
import { ButtonMobile } from './mobile';
import { ButtonProps } from './typings';

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? ButtonDesktop : ButtonMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);
