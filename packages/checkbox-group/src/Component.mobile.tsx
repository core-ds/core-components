import React, { FC } from 'react';

import { BaseCheckboxGroup, BaseCheckboxGroupProps } from './components/base-checkbox-group';

import styles from './mobile.module.css';

export type CheckboxGroupMobileProps = Omit<BaseCheckboxGroupProps, 'styles'>;

export const CheckboxGroupMobile: FC<CheckboxGroupMobileProps> = (props) => (
    <BaseCheckboxGroup {...props} styles={styles} />
);
