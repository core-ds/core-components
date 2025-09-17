import React, { type FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ContentDesktop, type ContentDesktopProps } from '../desktop/Component.desktop';
import { ContentMobile, type ContentMobileProps } from '../mobile/Component.mobile';

export interface ContentResponsiveProps extends ContentDesktopProps, ContentMobileProps {}

export const ContentResponsive: FC<ContentResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ContentDesktop {...restProps} />;
    }

    return <ContentMobile {...restProps} />;
};
