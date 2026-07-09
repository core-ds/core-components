import React, { forwardRef } from 'react';

import { ToastPlateDesktop } from '@alfalab/core-components-toast-plate/desktop';

import { BaseToast, type BaseToastProps } from '../components/base-toast';

export type ToastDesktopProps = Omit<BaseToastProps, 'bottomButtonPosition' | 'breakpoint'>;

export const ToastDesktop = forwardRef<HTMLDivElement, ToastDesktopProps>(
    ({ ToastPlate = ToastPlateDesktop, ...restProps }, ref) => (
        <BaseToast ToastPlate={ToastPlate} {...restProps} ref={ref} client='desktop' />
    ),
);
