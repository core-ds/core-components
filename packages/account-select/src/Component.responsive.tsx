import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { AccountSelectDesktop } from './desktop';
import { AccountSelectMobile } from './mobile';
import { type AccountSelectResponsiveProps } from './types';

export const AccountSelectResponsive = forwardRef<HTMLDivElement, AccountSelectResponsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(
            breakpoint,
            client === undefined ? undefined : client === 'desktop',
        );

        if (isDesktop) {
            return <AccountSelectDesktop ref={ref} {...restProps} />;
        }

        return <AccountSelectMobile ref={ref} {...restProps} />;
    },
);

AccountSelectResponsive.displayName = 'AccountSelectResponsive';
