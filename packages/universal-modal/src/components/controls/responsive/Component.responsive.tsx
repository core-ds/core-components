import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ControlsDesktop, ControlsDesktopProps } from '../desktop/Component.desktop';
import { ControlsMobile, ControlsMobileProps } from '../mobile/Component.mobile';

export type ControlsResponsiveProps = ControlsDesktopProps | ControlsMobileProps;

export const ControlsResponsive: FC<ControlsResponsiveProps> = ({ ...restProps }) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return <ControlsDesktop {...restProps} />;
    }

    return <ControlsMobile {...restProps} />;
};
