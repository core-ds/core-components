import React, { forwardRef } from 'react';
import { type TPatternLockInstance } from 'react-canvas-pattern-lock';

import { BasePatternLock } from '../components/base-pattern-lock';
import { type CommonPatternLockProps } from '../typings';

import styles from './mobile.module.css';

export const PatternLockMobileV1 = forwardRef<TPatternLockInstance, CommonPatternLockProps>(
    (restProps, ref) => <BasePatternLock {...restProps} ref={ref} styles={styles} />,
);
