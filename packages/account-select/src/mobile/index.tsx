import React from 'react';

import { AccountSelectContextProvider } from '../context';
import { type AccountSelectProps } from '../types';

import { AccountSelectMobile as Component } from './Component.mobile';

const AccountSelectMobile = (props: AccountSelectProps) => (
    <AccountSelectContextProvider>
        <Component {...props} />
    </AccountSelectContextProvider>
);

export { AccountSelectMobile };
