import React, { FC } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { FooterDesktop, FooterDesktopProps } from '../desktop/Component.desktop';
import { FooterMobile, FooterMobileProps } from '../mobile/Component.mobile';

export type FooterResponsiveProps = FooterDesktopProps | FooterMobileProps;

export const FooterResponsive: FC<FooterResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <FooterDesktop {...restProps} />;
    }

    return <FooterMobile {...restProps} />;
};
