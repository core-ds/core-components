import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseToastPlateProps } from './components/base-toast-plate';
import { ToastPlateDesktop } from './desktop';
import { ToastPlateMobile } from './mobile';

export type ToastPlateProps = Omit<BaseToastPlateProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const ToastPlate = forwardRef<HTMLDivElement, ToastPlateProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? ToastPlateDesktop : ToastPlateMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

ToastPlate.displayName = 'ToastPlate';
