import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { ContentResponsive } from './components/content';
import { FooterResponsive } from './components/footer';
import { HeaderResponsive } from './components/header';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { UniversalModalResponsiveProps } from './typings';

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
    Footer: FooterResponsive,
});

UniversalModalResponsive.displayName = 'UniversalModalResponsive';
