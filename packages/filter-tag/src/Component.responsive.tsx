import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type PrivateProps } from './types/base-filter-tag-private-props';
import { type BaseFilterTagProps } from './types/base-filter-tag-props';
import { FilterTagDesktop } from './desktop';
import { FilterTagMobile } from './mobile';

export type FilterTagProps = Omit<BaseFilterTagProps, keyof PrivateProps> & {
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

export const FilterTag = forwardRef<HTMLDivElement, FilterTagProps>(
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

        const Component = isDesktop ? FilterTagDesktop : FilterTagMobile;

        return (
            <Component ref={ref} {...restProps}>
                {children}
            </Component>
        );
    },
);

FilterTag.displayName = 'FilterTag';
