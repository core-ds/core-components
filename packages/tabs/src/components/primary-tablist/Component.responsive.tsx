import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { TabListProps } from '../../typings';

import { PrimaryTabListDesktop } from './Component.desktop';
import { PrimaryTabListMobile } from './Component.mobile';

export const PrimaryTabListResponsive = ({
    size,
    breakpoint = getComponentBreakpoint(),
    fullWidthScroll,
    defaultMatchMediaValue,
    ...restProps
}: TabListProps) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

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
