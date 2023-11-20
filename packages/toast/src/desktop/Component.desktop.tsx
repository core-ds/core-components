import React, { forwardRef } from 'react';

import { ToastPlateDesktop } from '@alfalab/core-components-toast-plate/desktop';

import { BaseToast, BaseToastProps } from '../components/base-toast';

export type ToastDesktopProps = Omit<BaseToastProps, 'bottomButtonPosition' | 'breakpoint'>;

const DefaultToastPlateDesktop: BaseToastProps['ToastPlate'] = forwardRef((props, ref) => (
    <ToastPlateDesktop ref={ref} {...props} />
));

export const ToastDesktop = forwardRef<HTMLDivElement, ToastDesktopProps>(
    ({ ToastPlate = DefaultToastPlateDesktop, ...restProps }, ref) => (
        <BaseToast ToastPlate={ToastPlate} {...restProps} ref={ref} />
    ),
);
