import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { HeaderMobile, type HeaderMobileProps } from '../../../mobile/components/header';
import { HeaderDesktop, type HeaderDesktopProps } from '../desktop/Component.desktop';

export interface HeaderResponsiveProps extends HeaderDesktopProps, HeaderMobileProps {}

export const HeaderResponsive = forwardRef<HTMLDivElement, HeaderResponsiveProps>((props, ref) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop ref={ref} {...props} />;
    }

    return <HeaderMobile {...props} />;
});

HeaderResponsive.displayName = 'HeaderResponsive';
