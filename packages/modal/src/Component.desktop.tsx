import React, { forwardRef } from 'react';

import { Closer } from './components/closer/Component';
import { Content } from './components/content/Component';
import { Footer } from './components/footer/Component';
import { Header } from './components/header/Component';
import { Modal } from './Component';
import type { ModalDesktopProps } from './typings';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view='desktop' />
));

export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header,
    Footer,
    Closer,
});
