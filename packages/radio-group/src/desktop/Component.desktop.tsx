import React, { forwardRef } from 'react';

import { BaseRadioGroup, type BaseRadioGroupProps } from '../components/base-radio-group';

import styles from './desktop.module.css';

export type RadioGroupDesktopProps = Omit<BaseRadioGroupProps, 'styles'>;

export const RadioGroupDesktop = forwardRef<HTMLDivElement, RadioGroupDesktopProps>(
    (props, ref) => <BaseRadioGroup {...props} ref={ref} styles={styles} />,
);
