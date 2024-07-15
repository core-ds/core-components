import React, { forwardRef } from 'react';

import { PassCode } from '../Component';
import { PassCodeProps } from '../typings';

import styles from './desktop.module.css';

export const PassCodeDesktop = forwardRef<HTMLDivElement, PassCodeProps>((restProps, ref) => (
    <PassCode {...restProps} ref={ref} styles={styles} />
));
