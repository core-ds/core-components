import React, { forwardRef } from 'react';

import { ToastPlateMobile } from '@alfalab/core-components-toast-plate/mobile';

import { BaseToast, type BaseToastProps } from '../components/base-toast';

export type ToastMobileProps = Omit<BaseToastProps, 'breakpoint'>;

const DefaultToastPlateMobile: BaseToastProps['ToastPlate'] = forwardRef((props, ref) => (
    <ToastPlateMobile ref={ref} {...props} />
));

export const ToastMobile = forwardRef<HTMLDivElement, ToastMobileProps>(
    ({ ToastPlate = DefaultToastPlateMobile, ...restProps }, ref) => (
        <BaseToast ToastPlate={ToastPlate} {...restProps} ref={ref} />
    ),
);
