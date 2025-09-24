import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';
import { type TPatternLockInstance } from '@alfalab/react-canvas-pattern-lock';

import { PatternLockDesktop } from './desktop';
import { PatternLockMobile } from './mobile';
import { type PatternLockProps } from './typings';

export const PatternLock = forwardRef<TPatternLockInstance, PatternLockProps>(
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

        const Component = isDesktop ? PatternLockDesktop : PatternLockMobile;

        return <Component ref={ref} {...restProps} />;
    },
);

PatternLock.displayName = 'PatternLock';
