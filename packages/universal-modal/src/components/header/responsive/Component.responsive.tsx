import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { HeaderPropsDesktop, HeaderPropsMobile } from '..';
import { HeaderDesktop, HeaderMobile } from '..';

export type HeaderResponsiveProps = HeaderPropsDesktop | HeaderPropsMobile;

export const HeaderResponsive: FC<HeaderResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <HeaderDesktop {...restProps} />;
    }

    return <HeaderMobile {...restProps} />;
};
