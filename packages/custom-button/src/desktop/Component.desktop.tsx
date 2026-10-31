import React, { forwardRef } from 'react';

import { BaseCustomButton } from '../components/base-custom-button';
import { type CommonCustomButtonProps } from '../types/props';

import styles from './index.module.css';

export const CustomButtonDesktop = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    CommonCustomButtonProps
>(({ children, ...restProps }, ref) => (
    <BaseCustomButton ref={ref} {...restProps} styles={styles}>
        {children}
    </BaseCustomButton>
));

CustomButtonDesktop.displayName = 'CustomButtonDesktop';
