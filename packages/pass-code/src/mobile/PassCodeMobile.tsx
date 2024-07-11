import React, { forwardRef } from 'react';

import { PassCode } from '../Component';
import { PassCodeProps } from '../typings';

import styles from './mobile.module.css';

export const PassCodeMobile = forwardRef<HTMLDivElement, PassCodeProps>((restProps, ref) => (
    <PassCode {...restProps} ref={ref} styles={styles} />
));
