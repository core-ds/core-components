import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { ButtonDesktop } from './Component.desktop';
import { ButtonMobile } from './Component.mobile';
import { ButtonResponsiveProps } from './typings';

export const ButtonResponsive = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    ButtonResponsiveProps
>(({ children, breakpoint = 1024, ...restProps }, ref) => {
    const query = `(min-width: ${breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query);

    const Component = isDesktop ? ButtonDesktop : ButtonMobile;

    return (
        <Component ref={ref} {...restProps}>
            {children}
        </Component>
    );
});
