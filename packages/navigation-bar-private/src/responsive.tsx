import React, { forwardRef } from 'react';

import {} from './Component';
import { NavigationBarPrivateDesktop } from './desktop';
import { NavigationBarPrivateMobile } from './mobile';
import type { NavigationBarBasePrivateProps } from './types';

/** NavigationBar Responsive Props */
export type NavigationBarBaseResponsiveProps = NavigationBarBasePrivateProps & {
    /**
     * Вид шапки - мобильный или десктоп
     */
    view: 'desktop' | 'mobile';
};

export const NavigationBarPrivateResponsive = forwardRef<
    HTMLDivElement,
    NavigationBarBaseResponsiveProps
>(({ view, ...props }, ref) =>
    view === 'desktop' ? (
        <NavigationBarPrivateDesktop {...props} ref={ref} />
    ) : (
        <NavigationBarPrivateMobile {...props} ref={ref} />
    ),
);
