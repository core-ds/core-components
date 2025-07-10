import React, { forwardRef } from 'react';

import { BaseCheckboxGroup, BaseCheckboxGroupProps } from '../components/base-checkbox-group';

import styles from './desktop.module.css';

export type CheckboxGroupDesktopProps = Omit<BaseCheckboxGroupProps, 'styles'>;

export const CheckboxGroupDesktop = forwardRef<HTMLDivElement, CheckboxGroupDesktopProps>(
    (props, ref) => <BaseCheckboxGroup {...props} styles={styles} ref={ref} />,
);
