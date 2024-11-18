import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

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

/** @deprecated Используйте атомарные импорты */
export const ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header,
    Content,
    Footer,
    Controls,
});

export { ModalResponsiveComponent, Header, Content, Footer, Controls };

ModalResponsiveComponent.displayName = 'ModalResponsiveComponent';
