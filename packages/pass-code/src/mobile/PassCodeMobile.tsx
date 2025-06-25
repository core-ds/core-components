import React, { forwardRef } from 'react';
import cn from 'classnames';

import { PassCode } from '../Component';
import { PassCodeProps } from '../typings';

import styles from './mobile.module.css';

export const PassCodeMobile = forwardRef<HTMLDivElement, PassCodeProps>(
    ({ className, ...restProps }, ref) => (
        <PassCode {...restProps} ref={ref} className={cn(styles.component, className)} />
    ),
);
