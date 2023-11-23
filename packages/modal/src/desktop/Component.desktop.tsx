import React, { forwardRef } from 'react';

import { Modal } from '../Component';
import { Content } from '../components/content/Component';
import { Footer } from '../components/footer/Component';
import { Header, HeaderProps } from '../components/header/Component';
import type { ModalDesktopProps } from '../typings';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view='desktop' />
));

export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header: Header as React.FC<Omit<HeaderProps, 'titleSize' | 'subtitle'>>,
    Footer,
});
