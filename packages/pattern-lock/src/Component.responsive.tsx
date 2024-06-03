import React, { forwardRef } from 'react';
import type { TPatternLockInstance } from 'react-canvas-pattern-lock';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { PatternLockDesktop } from './desktop';
import { PatternLockMobile } from './mobile';
import { PatternLockProps } from './typings';

export const PatternLock = forwardRef<TPatternLockInstance, PatternLockProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? PatternLockDesktop : PatternLockMobile;

        return <Component ref={ref} {...restProps} />;
    },
);
