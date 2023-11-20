import React, { forwardRef } from 'react';

import { BaseRadioGroup, BaseRadioGroupProps } from '../components/base-radio-group';

import styles from './mobile.module.css';

export type RadioGroupMobileProps = Omit<BaseRadioGroupProps, 'styles'>;

export const RadioGroupMobile = forwardRef<HTMLDivElement, RadioGroupMobileProps>((props, ref) => (
    <BaseRadioGroup {...props} ref={ref} styles={styles} />
));
