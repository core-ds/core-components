import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type ContentDesktopProps, ContentDesktop } from '../desktop/Component.desktop';
import { type ContentMobileProps, ContentMobile } from '../mobile/Component.mobile';

export interface ContentResponsiveProps extends ContentDesktopProps, ContentMobileProps {}

export const ContentResponsive: FC<ContentResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ContentDesktop {...restProps} />;
    }

    return <ContentMobile {...restProps} />;
};
