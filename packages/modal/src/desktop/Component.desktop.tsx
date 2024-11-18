import React, { forwardRef } from 'react';

import { Modal } from '../Component';
import { Content } from '../components/content/Component';
import { Controls, ControlsProps } from '../components/controls';
import { Footer } from '../components/footer/Component';
import { Header, HeaderProps } from '../components/header/Component';
import type { ModalDesktopProps } from '../typings';

const ModalDesktopComponent = forwardRef<HTMLDivElement, ModalDesktopProps>((props, ref) => (
    <Modal {...props} ref={ref} view='desktop' />
));

const HeaderCustomType = Header as React.FC<Omit<HeaderProps, 'titleSize' | 'subtitle'>>;
const ControlsCustomType = Controls as React.FC<Omit<ControlsProps, 'mobileLayout'>>;

/** @deprecated Используйте атомарные импорты */
export const ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content,
    Header: HeaderCustomType,
    Footer,
    Controls: ControlsCustomType,
});

export {
    ModalDesktopComponent,
    Content,
    HeaderCustomType as Header,
    Footer,
    ControlsCustomType as Controls,
};
