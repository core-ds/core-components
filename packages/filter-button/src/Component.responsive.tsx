import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { FilterButtonDesktop } from './desktop';
import { FilterButtonMobile } from './mobile';
import { type BaseFilterButtonProps } from './types';

export type FilterButtonProps = Omit<BaseFilterButtonProps, 'size'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';
};

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
    ({ children, breakpoint, client, ...restProps }, ref) => {
        const defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop';
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? FilterButtonDesktop : FilterButtonMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

FilterButton.displayName = 'FilterButton';
