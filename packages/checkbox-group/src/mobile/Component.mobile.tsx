import React, { type FC } from 'react';

import { BaseCheckboxGroup, type BaseCheckboxGroupProps } from '../components/base-checkbox-group';

import styles from './mobile.module.css';

export type CheckboxGroupMobileProps = Omit<BaseCheckboxGroupProps, 'styles'>;

/**
 * @splitComponent mobile
 */
export const CheckboxGroupMobile: FC<CheckboxGroupMobileProps> = (props) => (
    <BaseCheckboxGroup {...props} styles={styles} />
);
