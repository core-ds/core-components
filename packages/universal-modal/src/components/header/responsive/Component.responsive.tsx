import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { HeaderDesktopProps, HeaderMobileProps } from '..';
import { HeaderDesktop, HeaderMobile } from '..';

export type HeaderResponsiveProps = HeaderDesktopProps | HeaderMobileProps;

export const HeaderResponsive: FC<HeaderResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop {...restProps} />;
    }

    return <HeaderMobile {...restProps} />;
};
