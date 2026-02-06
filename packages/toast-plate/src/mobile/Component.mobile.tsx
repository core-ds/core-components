import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseToastPlate, type BaseToastPlateProps } from '../components/base-toast-plate';

import styles from './mobile.module.css';

export type ToastPlateMobileProps = Omit<BaseToastPlateProps, 'styles'>;

export const ToastPlateMobile = forwardRef<HTMLDivElement, ToastPlateMobileProps>(
    ({ titleClassName, boldTitle = true, ...restProps }, ref) => (
        <BaseToastPlate
            {...restProps}
            styles={styles}
            ref={ref}
            titleClassName={cn(titleClassName, { [styles.boldTitle]: boldTitle })}
        />
    ),
);
