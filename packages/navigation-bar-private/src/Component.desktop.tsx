import React, {forwardRef} from 'react';
import { BackArrowAddonDesktop } from './components/back-arrow-addon';
import { CloserDesktop } from './components/closer';
import { NavigationBarPrivateComponent } from './Component';
import type { NavigationBarPrivateProps } from './types';

export const NavigationBarPrivateDesktop: forwardRef<HTMLDivElement, NavigationBarPrivateProps> = ((props: NavigationBarPrivateProps) => (
    <NavigationBarPrivateComponent
        view='desktop'
        {...props}
        BackArrowAddon={BackArrowAddonDesktop}
        Closer={CloserDesktop}
    />
));

NavigationBarPrivateDesktop.displayName = 'NavigationBarPrivateDesktop';
