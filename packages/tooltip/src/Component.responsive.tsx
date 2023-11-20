import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { TooltipDesktop } from './desktop';
import { TooltipMobile } from './mobile';
import { TooltipResponsiveProps } from './types';

export const TooltipResponsive: FC<TooltipResponsiveProps> = ({
    defaultMatchMediaValue,
    children,
    actionButtonTitle,
    bottomSheetProps,
    breakpoint = 1024,
    ...restProps
}) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <TooltipDesktop {...restProps}>{children}</TooltipDesktop>
    ) : (
        <TooltipMobile {...restProps} {...bottomSheetProps} actionButtonTitle={actionButtonTitle}>
            {children}
        </TooltipMobile>
    );
};
