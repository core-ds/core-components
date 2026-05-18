import React from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type SecondaryTabListProps } from '../../typings';

import { SecondaryTabListDesktop } from './Component.desktop';
import { SecondaryTabListMobile } from './Component.mobile';

export const SecondaryTabListResponsive = ({
    fullWidthScroll,
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}: SecondaryTabListProps) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return isDesktop ? (
        <SecondaryTabListDesktop {...restProps} />
    ) : (
        <SecondaryTabListMobile fullWidthScroll={fullWidthScroll} {...restProps} />
    );
};
