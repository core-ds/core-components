import React, { forwardRef } from 'react';

import { BaseFormControl, BaseFormControlProps } from './components/base-form-control';

import styles from './mobile.module.css';

export type FormControlMobileProps = Omit<BaseFormControlProps, 'styles'>;

export const FormControlMobile = forwardRef<HTMLDivElement, FormControlMobileProps>(
    (restProps, ref) => <BaseFormControl {...restProps} ref={ref} styles={styles} />,
);
