import React, { forwardRef } from 'react';

import { useMedia } from '@alfalab/hooks';

import { Closer } from './components/closer/Component';
import { Content } from './components/content/Component';
import { Footer } from './components/footer/Component';
import { Header } from './components/header/Component';
import { Modal } from './Component';
import type { ModalResponsiveProps, View } from './typings';

const ModalResponsiveComponent = forwardRef<HTMLDivElement, ModalResponsiveProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMedia<View>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return (
            <Modal ref={ref} {...restProps} view={view}>
                {children}
            </Modal>
        );
    },
);

export const ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header,
    Content,
    Footer,
    Closer,
});
