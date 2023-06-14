import React, { forwardRef } from 'react';

import { BaseFormControl, BaseFormControlProps } from './components/base-form-control';

import styles from './desktop.module.css';

export type FormControlDesktopProps = Omit<BaseFormControlProps, 'styles'>;

export const FormControlDesktop = forwardRef<HTMLDivElement, FormControlDesktopProps>(
    (restProps, ref) => <BaseFormControl {...restProps} ref={ref} styles={styles} />,
);
