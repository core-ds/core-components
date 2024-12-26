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

const ControlsMobile = Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>;

export const ModalMobile = Object.assign(ModalMobileComponent, {
    Content,
    Header,
    Footer,
    Controls: ControlsMobile,
});

export {
    ModalMobileComponent as ModalComponentMobile,
    Content as ContentMobile,
    Header as HeaderMobile,
    Footer as FooterMobile,
    ControlsMobile,
};
