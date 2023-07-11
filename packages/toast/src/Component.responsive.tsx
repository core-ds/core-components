import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseToastProps } from './components/base-toast';
import { ToastDesktop } from './Component.desktop';
import { ToastMobile } from './Component.mobile';

export type ToastProps = BaseToastProps;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? ToastDesktop : ToastMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);
