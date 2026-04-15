import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { FooterMobile, type FooterMobileProps } from '../../../mobile';
import { FooterDesktop, type FooterDesktopProps } from '../desktop/Component.desktop';

export interface FooterResponsiveProps extends FooterDesktopProps, FooterMobileProps {}

export const FooterResponsive = forwardRef<HTMLDivElement, FooterResponsiveProps>((props, ref) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <FooterDesktop ref={ref} {...props} />;
    }

    return <FooterMobile {...props} />;
});

FooterResponsive.displayName = 'FooterResponsive';
