import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ContentDesktop, ContentDesktopProps } from '../desktop/Component.desktop';
import { ContentMobile, ContentMobileProps } from '../mobile/Component.mobile';

export type ContentResponsiveProps = ContentDesktopProps | ContentMobileProps;

export const ContentResponsive: FC<ContentResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ContentDesktop {...restProps} />;
    }

    return <ContentMobile {...restProps} />;
};
