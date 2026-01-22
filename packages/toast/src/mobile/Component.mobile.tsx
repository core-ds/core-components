import React, { forwardRef } from 'react';

import { ToastPlateMobile } from '@alfalab/core-components-toast-plate/mobile';

import { BaseToast, type BaseToastProps } from '../components/base-toast';

export type ToastMobileProps = Omit<BaseToastProps, 'breakpoint'>;

export const ToastMobile = forwardRef<HTMLDivElement, ToastMobileProps>(
    ({ ToastPlate = ToastPlateMobile, ...restProps }, ref) => (
        <BaseToast ToastPlate={ToastPlate} {...restProps} ref={ref} client='mobile' />
    ),
);
