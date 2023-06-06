import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { AnchorButtonProps, NativeButtonProps } from './typings';

import styles from './desktop.module.css';

export type ButtonDesktopProps = Partial<AnchorButtonProps | NativeButtonProps>;

export const ButtonDesktop = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonDesktopProps>(
    (restProps, ref) => <BaseButton {...restProps} ref={ref} styles={styles} />,
);
