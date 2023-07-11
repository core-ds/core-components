import React, { forwardRef } from 'react';

import { BaseToastPlate, BaseToastPlateProps } from './components/base-toast-plate';

import styles from './mobile.module.css';

export type ToastPlateMobileProps = Omit<BaseToastPlateProps, 'styles'>;

export const ToastPlateMobile = forwardRef<HTMLDivElement, ToastPlateMobileProps>(
    (restProps, ref) => <BaseToastPlate {...restProps} styles={styles} ref={ref} />,
);
