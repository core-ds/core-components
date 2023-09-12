import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { SecondaryTabListProps } from '../../typings';

import { SecondaryTabListDesktop } from './Component.desktop';
import { SecondaryTabListMobile } from './Component.mobile';

export const SecondaryTabListResponsive = ({
    defaultMatchMediaValue,
    fullWidthScroll,
    breakpoint = 1024,
    ...restProps
}: SecondaryTabListProps) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <SecondaryTabListDesktop {...restProps} />
    ) : (
        <SecondaryTabListMobile fullWidthScroll={fullWidthScroll} {...restProps} />
    );
};
