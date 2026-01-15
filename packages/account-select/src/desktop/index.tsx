import React from 'react';

import { AccountSelectContextProvider } from '../context';
import { type AccountSelectProps } from '../types';

import { AccountSelectDesktop as Component } from './Component.desktop';

const AccountSelectDesktop = (props: AccountSelectProps) => (
    <AccountSelectContextProvider>
        <Component {...props} />
    </AccountSelectContextProvider>
);

export { AccountSelectDesktop };
