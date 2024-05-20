import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { Content } from './components/content/Component';
import { Controls } from './components/controls';
import { Footer } from './components/footer/Component';
import { Header } from './components/header/Component';
import { Modal } from './Component';
import type { ModalResponsiveProps } from './typings';

const ModalResponsiveComponent = forwardRef<HTMLDivElement, ModalResponsiveProps>(
    (
        {
            children,
            breakpoint = getComponentBreakpoint(),
            defaultMatchMediaValue = true,
            ...restProps
        },
        ref,
    ) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return (
            <Modal ref={ref} {...restProps} view={isDesktop ? 'desktop' : 'mobile'}>
                {children}
            </Modal>
        );
    },
);

export const ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header,
    Content,
    Footer,
    Controls,
});
