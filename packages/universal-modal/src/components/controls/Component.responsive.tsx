import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { ControlsDesktopProps, ControlsMobileProps } from '.';
import { ControlsDesktop, ControlsMobile } from '.';

export type ControlsResponsiveProps = ControlsDesktopProps | ControlsMobileProps;

export const ControlsResponsive: FC<ControlsResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ControlsDesktop {...restProps} />;
    }

    return <ControlsMobile {...restProps} />;
};
