import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { BaseFilterTagProps } from './components/base-filter-tag';
import { FilterTagDesktop } from './desktop';
import { FilterTagMobile } from './mobile';

export type FilterTagProps = Omit<BaseFilterTagProps, 'styles'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export const FilterTag = forwardRef<HTMLDivElement, FilterTagProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? FilterTagDesktop : FilterTagMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

FilterTag.displayName = 'FilterTag';
