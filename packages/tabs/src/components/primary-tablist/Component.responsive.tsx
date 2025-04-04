import React from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { TabListProps } from '../../typings';

import { PrimaryTabListDesktop } from './Component.desktop';
import { PrimaryTabListMobile } from './Component.mobile';

export const PrimaryTabListResponsive = ({
    size,
    breakpoint,
    client,
    fullWidthScroll,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}: TabListProps) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return isDesktop ? (
        <PrimaryTabListDesktop
            breakpoint={breakpoint}
            size={size}
            defaultMatchMediaValue={defaultMatchMediaValue}
            {...restProps}
        />
    ) : (
        <PrimaryTabListMobile
            breakpoint={breakpoint}
            defaultMatchMediaValue={defaultMatchMediaValue}
            fullWidthScroll={fullWidthScroll}
            {...restProps}
        />
    );
};
