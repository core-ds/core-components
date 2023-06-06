import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { AnchorButtonProps, NativeButtonProps } from './typings';

import styles from './mobile.module.css';

export type ButtonMobileProps = Partial<AnchorButtonProps | NativeButtonProps>;

export const ButtonMobile = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonMobileProps>(
    (restProps, ref) => <BaseButton {...restProps} ref={ref} styles={styles} />,
);
