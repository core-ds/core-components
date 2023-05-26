import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { isClient } from '../../utils';

import { ButtonDesktop } from './Component.desktop';
import { ButtonMobile } from './Component.mobile';
import { ButtonResponsiveProps } from './typings';

export const ButtonResponsive = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    ButtonResponsiveProps
>(({ children, breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
    const query = `(min-width: ${breakpoint}px)`;

    const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

    const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

    const Component = isDesktop ? ButtonDesktop : ButtonMobile;

    return (
        <Component ref={ref} {...restProps}>
            {children}
        </Component>
    );
});
