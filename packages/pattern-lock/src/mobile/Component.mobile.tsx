import React, { forwardRef } from 'react';
import type { TPatternLockInstance } from 'react-canvas-pattern-lock';

import { BasePatternLock } from '../components/base-pattern-lock';
import { CommonPatternLockProps } from '../typings';

import styles from './mobile.module.css';

export const PatternLockMobile = forwardRef<TPatternLockInstance, CommonPatternLockProps>(
    (restProps, ref) => <BasePatternLock {...restProps} ref={ref} styles={styles} />,
);

PatternLockMobile.displayName = 'PatternLockMobile';
