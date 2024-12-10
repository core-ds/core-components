import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint, isClient } from '@alfalab/core-components-shared';

import { Controls } from './components/controls';
import { Header } from './components/header/Component';
import { createResponsive } from './utils/createResponsive';
import { UniversalModalDesktop } from './desktop';
import { UniversalModalMobile } from './mobile';
import { UniversalModalResponsiveProps } from './typings';

const UniversalModal = forwardRef<HTMLDivElement, UniversalModalResponsiveProps>(
    (
        {
            children,
            breakpoint = getComponentBreakpoint(),
            defaultMatchMediaValue,
            dataTestId,
            ...restProps
        },
        ref,
    ) => {
        const query = `(min-width: ${breakpoint}px)`;
        const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

        const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

        const Component = isDesktop ? UniversalModalDesktop : UniversalModalMobile;

        return (
            <Component ref={ref} dataTestId={dataTestId} {...restProps}>
                {children}
            </Component>
        );
    },
);

export const UniversalModalResponsive = Object.assign(UniversalModal, {
    Header,
    Controls,
    Content: createResponsive(UniversalModalDesktop.Content, UniversalModalMobile.Content),
    Footer: createResponsive(UniversalModalDesktop.Footer, UniversalModalMobile.Footer),
});

UniversalModalResponsive.displayName = 'UniversalModalResponsive';
