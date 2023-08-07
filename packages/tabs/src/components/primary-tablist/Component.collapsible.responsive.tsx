import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { TabListProps } from '../../typings';

import { CollapsiblePrimaryTabListDesktop } from './Component.collapsible.desktop';
import { CollapsiblePrimaryTabListMobile } from './Component.collapsible.mobile';

export const CollapsiblePrimaryTabListResponsive = ({
    size,
    fullWidthScroll,
    breakpoint = 768,
    defaultMatchMediaValue,
    ...restProps
}: TabListProps) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <CollapsiblePrimaryTabListDesktop
            size={size}
            defaultMatchMediaValue={defaultMatchMediaValue}
            breakpoint={breakpoint}
            {...restProps}
        />
    ) : (
        <CollapsiblePrimaryTabListMobile
            fullWidthScroll={fullWidthScroll}
            defaultMatchMediaValue={defaultMatchMediaValue}
            breakpoint={breakpoint}
            {...restProps}
        />
    );
};
