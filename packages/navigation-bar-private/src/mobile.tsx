import React, { forwardRef } from 'react';

import { BackArrowAddonMobile } from './components/back-arrow-addon';
import { CloserMobile } from './components/closer';
import { NavigationBarPrivateBase } from './Component';
import { type NavigationBarBasePrivateProps } from './types';

import styles from './index.module.css';

export const NavigationBarPrivateMobile = forwardRef<HTMLDivElement, NavigationBarBasePrivateProps>(
    (props: NavigationBarBasePrivateProps, ref) => (
        <NavigationBarPrivateBase
            {...props}
            BackArrowAddon={BackArrowAddonMobile}
            Closer={CloserMobile}
            view='mobile'
            styles={styles}
            ref={ref}
        />
    ),
);
