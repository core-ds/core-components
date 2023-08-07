import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabListDesktop } from './Component.desktop';
import { SecondaryTabListMobile } from './Component.mobile';

export const SecondaryTabListResponsive = ({
    size,
    defaultMatchMediaValue,
    fullWidthScroll,
    breakpoint = 768,
    ...restProps
}: SecondaryTabListProps) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <SecondaryTabListDesktop size={size} {...restProps} />
    ) : (
        <SecondaryTabListMobile fullWidthScroll={fullWidthScroll} {...restProps} />
    );
};
