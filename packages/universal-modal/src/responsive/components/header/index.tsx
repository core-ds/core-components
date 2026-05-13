import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { HeaderDesktop, type HeaderDesktopProps } from '../../../desktop';
import { HeaderMobile, type HeaderMobileProps } from '../../../mobile';

export interface HeaderResponsiveProps extends HeaderDesktopProps, HeaderMobileProps {}

/**
 * @hasSplitImport
 */
export const HeaderResponsive = forwardRef<HTMLDivElement, HeaderResponsiveProps>((props, ref) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop ref={ref} {...props} />;
    }

    return <HeaderMobile {...props} />;
});

HeaderResponsive.displayName = 'HeaderResponsive';
