import React, { forwardRef } from 'react';

import { BaseCheckboxGroup, BaseCheckboxGroupProps } from '../components/base-checkbox-group';

import styles from './mobile.module.css';

export type CheckboxGroupMobileProps = Omit<BaseCheckboxGroupProps, 'styles'>;

export const CheckboxGroupMobile = forwardRef<HTMLDivElement, CheckboxGroupMobileProps>(
    (props, ref) => <BaseCheckboxGroup {...props} styles={styles} ref={ref} />,
);
