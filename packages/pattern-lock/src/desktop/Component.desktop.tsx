import React, { forwardRef } from 'react';

import { type TPatternLockInstance } from '@alfalab/react-canvas-pattern-lock';

import { BasePatternLock } from '../components/base-pattern-lock';
import { type CommonPatternLockProps } from '../typings';

export const PatternLockDesktop = forwardRef<TPatternLockInstance, CommonPatternLockProps>(
    (restProps, ref) => <BasePatternLock {...restProps} hover={true} ref={ref} />,
);

PatternLockDesktop.displayName = 'PatternLockDesktop';
