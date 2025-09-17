import React, { forwardRef } from 'react';

import { Modal } from '../Component';
import { Content } from '../components/content/Component';
import { Controls, type ControlsProps } from '../components/controls';
import { Footer } from '../components/footer/Component';
import { Header, type HeaderProps } from '../components/header/Component';
import { type ModalDesktopProps } from '../typings';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view='desktop' />
));

const HeaderDesktop = Header as React.FC<Omit<HeaderProps, 'titleSize' | 'subtitle'>>;
const ControlsDesktop = Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>;

export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header: HeaderDesktop,
    Footer,
    Controls: ControlsDesktop,
});

export {
    ModalDesktopComponent as ModalComponentDesktop,
    Content as ContentDesktop,
    HeaderDesktop,
    Footer as FooterDesktop,
    ControlsDesktop,
};
