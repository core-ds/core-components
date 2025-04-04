import React, { forwardRef } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

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
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

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

ModalResponsiveComponent.displayName = 'ModalResponsiveComponent';

export {
    ModalResponsiveComponent as ModalComponentResponsive,
    Header as HeaderResponsive,
    Content as ContentResponsive,
    Footer as FooterResponsive,
    Controls as ControlsResponsive,
};
