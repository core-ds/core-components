import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { FooterDesktopProps, FooterMobileProps } from '.';
import { FooterDesktop, FooterMobile } from '.';

export type FooterResponsiveProps = FooterDesktopProps | FooterMobileProps;

export const FooterResponsive: FC<FooterResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <FooterDesktop {...restProps} />;
    }

    return <FooterMobile {...restProps} />;
};
