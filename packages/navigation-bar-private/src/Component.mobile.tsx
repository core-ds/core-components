import React, {forwardRef} from 'react';
import { BackArrowAddonMobile } from './components/back-arrow-addon';
import { CloserMobile } from './components/closer';
import { NavigationBarPrivateComponent } from './Component';
import type { NavigationBarPrivateProps } from './types';
import {NavigationBarPrivateDesktop} from "./Component.desktop";

export const NavigationBarPrivateMobile: forwardRef<HTMLDivElement, NavigationBarPrivateProps> = ((props: NavigationBarPrivateProps) => (
    <NavigationBarPrivateComponent
        view='mobile'
        {...props}
        BackArrowAddon={BackArrowAddonMobile}
        Closer={CloserMobile}
    />
))

NavigationBarPrivateMobile.displayName = 'NavigationBarPrivateMobile';
