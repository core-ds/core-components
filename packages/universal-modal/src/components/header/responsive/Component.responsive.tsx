import React, { FC } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { HeaderDesktop, HeaderDesktopProps } from '../desktop/Component.desktop';
import { HeaderMobile, HeaderMobileProps } from '../mobile/Component.mobile';

export type HeaderResponsiveProps = HeaderDesktopProps | HeaderMobileProps;

export const HeaderResponsive: FC<HeaderResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop {...restProps} />;
    }

    return <HeaderMobile {...restProps} />;
};
