import React, { forwardRef } from 'react';

import { AccountSelectContextProvider } from '../context';
import { type AccountSelectProps } from '../types';

import { AccountSelectDesktop as Component } from './Component.desktop';

const AccountSelectDesktop = forwardRef<HTMLInputElement, AccountSelectProps>((props, ref) => (
    <AccountSelectContextProvider>
        <Component ref={ref} {...props} />
    </AccountSelectContextProvider>
));

export { AccountSelectDesktop };
