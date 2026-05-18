import React, { type FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { TooltipDesktop } from './desktop';
import { TooltipMobile } from './mobile';
import { type TooltipResponsiveProps } from './types';

export const TooltipResponsive: FC<TooltipResponsiveProps> = ({
    children,
    actionButtonTitle,
    bottomSheetProps,
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return isDesktop ? (
        <TooltipDesktop {...restProps}>{children}</TooltipDesktop>
    ) : (
        <TooltipMobile {...restProps} {...bottomSheetProps} actionButtonTitle={actionButtonTitle}>
            {children}
        </TooltipMobile>
    );
};
