import React, { type FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ContentMobile, type ContentMobileProps } from '../../../mobile';
import { ContentDesktop, type ContentDesktopProps } from '../desktop/Component.desktop';

export interface ContentResponsiveProps extends ContentDesktopProps, ContentMobileProps {}

export const ContentResponsive: FC<ContentResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ContentDesktop {...restProps} />;
    }

    return <ContentMobile {...restProps} />;
};
