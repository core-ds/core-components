import React, {forwardRef} from 'react';

import { NavigationBarPrivateDesktop } from './Component.desktop';
import { NavigationBarPrivateMobile } from './Component.mobile';
import type {NavigationBarPrivateProps, NavigationBarPrivateResponsiveProps} from './types';

/** @deprecated Используйте NavigationBarPrivateDesktop / NavigationBarPrivateMobile */
export const NavigationBarPrivateResponsive: forwardRef<HTMLDivElement, NavigationBarPrivateResponsiveProps> = (({
    view,
    ...props
}: NavigationBarPrivateResponsiveProps) =>
    view === 'desktop' ? (
        <NavigationBarPrivateDesktop {...props} />
    ) : (
        <NavigationBarPrivateMobile {...props} />
    )
);

NavigationBarPrivateResponsive.displayName = 'NavigationBarPrivateResponsive';
