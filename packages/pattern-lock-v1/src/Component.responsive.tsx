import React, { forwardRef } from 'react';
import type { TPatternLockInstance } from 'react-canvas-pattern-lock';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { PatternLockDesktopV1 } from './desktop';
import { PatternLockMobileV1 } from './mobile';
import { PatternLockProps } from './typings';

/**
 * @deprecated
 * Использует PatternLock
 */
export const PatternLockV1 = forwardRef<TPatternLockInstance, PatternLockProps>(
    ({ breakpoint, ...restProps }, ref) => {
        const isDesktop = useIsDesktop();

        const Component = isDesktop ? PatternLockDesktopV1 : PatternLockMobileV1;

        return <Component ref={ref} {...restProps} />;
    },
);
