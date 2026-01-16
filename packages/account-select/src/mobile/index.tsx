import React, { forwardRef } from 'react';

import { AccountSelectContextProvider } from '../context';
import { type AccountSelectProps } from '../types';

import { AccountSelectMobile as Component } from './Component.mobile';

const AccountSelectMobile = forwardRef<HTMLInputElement, AccountSelectProps>((props, ref) => (
    <AccountSelectContextProvider>
        <Component ref={ref} {...props} />
    </AccountSelectContextProvider>
));

export { AccountSelectMobile };
