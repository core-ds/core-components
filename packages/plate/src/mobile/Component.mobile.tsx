import React, { forwardRef } from 'react';

import { BasePlate, BasePlateProps } from '../components/base-plate';

import styles from './mobile.module.css';

export type PlateMobileProps = Omit<BasePlateProps, 'styles' | 'limitContentWidth'>;

export const PlateMobile = forwardRef<HTMLDivElement, PlateMobileProps>((restProps, ref) => (
    <BasePlate {...restProps} styles={styles} ref={ref} />
));
