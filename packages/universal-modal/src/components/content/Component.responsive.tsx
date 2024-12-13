import React, { FC } from 'react';
import { useIsDesktop } from '@alfalab/core-components-mq';

import type { ContentDesktopProps, ContentMobileProps } from '.';
import { ContentDesktop, ContentMobile } from '.';

export type ContentResponsiveProps = ContentDesktopProps | ContentMobileProps;

export const ContentResponsive: FC<ContentResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ContentDesktop {...restProps} />;
    }

    return <ContentMobile {...restProps} />;
};
