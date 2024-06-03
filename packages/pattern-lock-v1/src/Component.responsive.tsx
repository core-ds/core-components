import React, { forwardRef } from 'react';
import type { TPatternLockInstance } from 'react-canvas-pattern-lock';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { PatternLockDesktopV1 } from './desktop';
import { PatternLockMobileV1 } from './mobile';
import { PatternLockProps } from './typings';

export const PatternLockV1 = forwardRef<TPatternLockInstance, PatternLockProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const query = `(min-width: ${breakpoint}px)`;

        const [isDesktop] = useMatchMedia(query);

        const Component = isDesktop ? PatternLockDesktopV1 : PatternLockMobileV1;

        return <Component ref={ref} {...restProps} />;
    },
);
