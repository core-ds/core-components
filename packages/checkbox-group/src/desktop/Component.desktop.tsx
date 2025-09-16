import React, { type FC } from 'react';

import { BaseCheckboxGroup, type BaseCheckboxGroupProps } from '../components/base-checkbox-group';

import styles from './desktop.module.css';

export type CheckboxGroupDesktopProps = Omit<BaseCheckboxGroupProps, 'styles'>;

export const CheckboxGroupDesktop: FC<CheckboxGroupDesktopProps> = (props) => (
    <BaseCheckboxGroup {...props} styles={styles} />
);
