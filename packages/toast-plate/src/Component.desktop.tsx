import React, { forwardRef } from 'react';

import { BaseToastPlate, BaseToastPlateProps } from './components/base-toast-plate';

import styles from './desktop.module.css';

export type ToastPlateDesktopProps = Omit<BaseToastPlateProps, 'styles' | 'bottomButtonPosition'>;

export const ToastPlateDesktop = forwardRef<HTMLDivElement, ToastPlateDesktopProps>(
    (restProps, ref) => <BaseToastPlate {...restProps} styles={styles} ref={ref} />,
);
