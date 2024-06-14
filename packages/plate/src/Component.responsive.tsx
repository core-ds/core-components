import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BasePlateProps } from './components/base-plate';
import { PlateDesktop } from './desktop';
import { PlateMobile } from './mobile';

export type PlateProps = Omit<BasePlateProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const Plate = forwardRef<HTMLDivElement, PlateProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? PlateDesktop : PlateMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Plate.displayName = 'Plate';
