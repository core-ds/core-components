import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { Controls } from './components/controls';
import { HeaderResponsive } from './components/header';
import { createResponsive } from './utils/createResponsive';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { UniversalModalResponsiveProps } from './typings';
import { ContentResponsive } from './components/content';

export const UniversalModal = forwardRef<HTMLDivElement, UniversalModalResponsiveProps>(
    ({ children, breakpoint, defaultMatchMediaValue, dataTestId, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        const Component = isDesktop ? UniversalModalDesktop : UniversalModalMobile;

        return (
            <Component ref={ref} dataTestId={dataTestId} {...restProps}>
                {children}
            </Component>
        );
    },
);

export const UniversalModalResponsive = Object.assign(UniversalModal, {
    Header: HeaderResponsive,
    Content: ContentResponsive,
    Footer: createResponsive(UniversalModalDesktop.Footer, UniversalModalMobile.Footer),
    Controls,
});

UniversalModalResponsive.displayName = 'UniversalModalResponsive';
