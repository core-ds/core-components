import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseToastPlate, type BaseToastPlateProps } from '../components/base-toast-plate';

import styles from './desktop.module.css';

export type ToastPlateDesktopProps = Omit<BaseToastPlateProps, 'styles' | 'bottomButtonPosition'>;

export const ToastPlateDesktop = forwardRef<HTMLDivElement, ToastPlateDesktopProps>(
    ({ boldTitle = true, titleClassName, ...restProps }, ref) => (
        <BaseToastPlate
            {...restProps}
            styles={styles}
            ref={ref}
            titleClassName={cn(titleClassName, { [styles.boldTitle]: boldTitle })}
        />
    ),
);
