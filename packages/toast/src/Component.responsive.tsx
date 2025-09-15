import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type BaseToastProps } from './components/base-toast';
import { ToastDesktop } from './desktop';
import { ToastMobile } from './mobile';

export type ToastProps = BaseToastProps;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
    (
        {
            children,
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? ToastDesktop : ToastMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Toast.displayName = 'Toast';
