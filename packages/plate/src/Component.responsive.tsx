import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { BasePlateProps } from './components/base-plate';
import { PlateDesktop } from './desktop';
import { PlateMobile } from './mobile';

export type PlateProps = Omit<BasePlateProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const Plate = forwardRef<HTMLDivElement, PlateProps>(
    (
        { children, breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

        const Component = isDesktop ? PlateDesktop : PlateMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Plate.displayName = 'Plate';
