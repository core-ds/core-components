import React, { forwardRef } from 'react';

import { Modal } from '../Component';
import { Content } from '../components/content/Component';
import { Controls, ControlsProps } from '../components/controls';
import { Footer } from '../components/footer/Component';
import { Header } from '../components/header/Component';
import type { ModalDesktopProps } from '../typings';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view='desktop' />
));

export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header,
    Footer,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
