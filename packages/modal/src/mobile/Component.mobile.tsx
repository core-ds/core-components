import React, { forwardRef } from 'react';

import { Modal } from '../Component';
import { Content } from '../components/content/Component';
import { Controls, ControlsProps } from '../components/controls';
import { Footer } from '../components/footer/Component';
import { Header } from '../components/header/Component';
import type { ModalMobileProps } from '../typings';

const ModalMobileComponent = forwardRef<HTMLDivElement, ModalMobileProps>((props, ref) => (
    <Modal {...props} ref={ref} view='mobile' />
));

export const ModalMobile = Object.assign(ModalMobileComponent, {
    Content,
    Header,
    Footer,
    Controls: Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>,
});
