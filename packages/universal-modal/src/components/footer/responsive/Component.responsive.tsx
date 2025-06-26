import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { FooterDesktop, FooterDesktopProps } from '../desktop/Component.desktop';
import { FooterMobile, FooterMobileProps } from '../mobile/Component.mobile';

export type FooterResponsiveProps = FooterDesktopProps | FooterMobileProps;

export const FooterResponsive = forwardRef<HTMLDivElement, FooterResponsiveProps>((props, ref) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <FooterDesktop ref={ref} {...props} />;
    }

    return <FooterMobile {...props} />;
});

FooterResponsive.displayName = 'FooterResponsive';
