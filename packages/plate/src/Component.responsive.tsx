import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

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
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const Plate = forwardRef<HTMLDivElement, PlateProps>(
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

        const Component = isDesktop ? PlateDesktop : PlateMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

Plate.displayName = 'Plate';
