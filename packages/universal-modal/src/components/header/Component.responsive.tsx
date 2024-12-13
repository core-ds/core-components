import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { HeaderPropsMobile } from '.';
import { HeaderDesktop, HeaderMobile, HeaderPropsDesktop } from '.';

export type HeaderResponsiveProps = HeaderPropsDesktop | HeaderPropsMobile;

export const HeaderResponsive: FC<HeaderResponsiveProps> = ({ children, ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop {...restProps}>{children}</HeaderDesktop>;
    }

    return <HeaderMobile {...restProps}>{children}</HeaderMobile>;
};
