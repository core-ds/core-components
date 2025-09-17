import React, { forwardRef } from 'react';
import cn from 'classnames';

import { PassCode } from '../Component';
import { type PassCodeProps } from '../typings';

import styles from './desktop.module.css';

export const PassCodeDesktop = forwardRef<HTMLDivElement, PassCodeProps>(
    ({ className, ...restProps }, ref) => (
        <PassCode {...restProps} ref={ref} className={cn(styles.component, className)} />
    ),
);
