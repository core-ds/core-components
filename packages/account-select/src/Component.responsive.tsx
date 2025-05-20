import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { AccountSelectDesktop } from './desktop';
import { AccountSelectMobile } from './mobile';
import type { AccountSelectProps } from './types';

export const AccountSelectResponsive = forwardRef<HTMLDivElement, AccountSelectProps>(
    (
        {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        },
        ref,
    ) => {
        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

        if (isDesktop) {
            return <AccountSelectDesktop {...restProps} ref={ref} />;
        }

        const mobileProps = {
            ...restProps,
            ...restProps.originalProps,
        };

        return <AccountSelectMobile {...mobileProps} ref={ref} />;
    },
);

AccountSelectResponsive.displayName = 'AccountSelectResponsive';
