import React, { forwardRef } from 'react';

import { BasePlate, BasePlateProps } from './components/base-plate';

import styles from './desktop.module.css';

export type PlateDesktopProps = Omit<BasePlateProps, 'styles'>;

export const PlateDesktop = forwardRef<HTMLDivElement, PlateDesktopProps>((restProps, ref) => (
    <BasePlate {...restProps} styles={styles} ref={ref} />
));
