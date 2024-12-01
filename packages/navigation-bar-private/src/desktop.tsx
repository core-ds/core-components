import React, { forwardRef } from 'react';

import { BackArrowAddonDesktop } from './components/back-arrow-addon';
import { CloserDesktop } from './components/closer';
import { NavigationBarPrivateBase } from './Component';
import { type NavigationBarBasePrivateProps } from './types';

import styles from './index.module.css';

export const NavigationBarPrivateDesktop = forwardRef<
    HTMLDivElement,
    NavigationBarBasePrivateProps
>((props: NavigationBarBasePrivateProps, ref) => (
    <NavigationBarPrivateBase
        {...props}
        BackArrowAddon={BackArrowAddonDesktop}
        Closer={CloserDesktop}
        view='desktop'
        styles={styles}
        ref={ref}
    />
));
