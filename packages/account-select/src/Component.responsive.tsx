import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { AccountSelectDesktop } from './desktop';
import { AccountSelectMobile } from './mobile';
import type { AccountSelectResonsiveProps } from './types';

export const AccountSelectResponsive = forwardRef<HTMLInputElement, AccountSelectResonsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint);

        if (isDesktop || client === 'desktop') {
            return <AccountSelectDesktop ref={ref} {...restProps} />;
        }

        return <AccountSelectMobile ref={ref} {...restProps} />;
    },
);

AccountSelectResponsive.displayName = 'AccountSelectResponsive';
