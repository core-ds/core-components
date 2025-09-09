import React, { forwardRef } from 'react';
import { type TPatternLockInstance } from 'react-canvas-pattern-lock';

import { BasePatternLock } from '../components/base-pattern-lock';
import { type CommonPatternLockProps } from '../typings';

import styles from './desktop.module.css';

export const PatternLockDesktopV1 = forwardRef<TPatternLockInstance, CommonPatternLockProps>(
    (restProps, ref) => <BasePatternLock {...restProps} hover={true} ref={ref} styles={styles} />,
);
