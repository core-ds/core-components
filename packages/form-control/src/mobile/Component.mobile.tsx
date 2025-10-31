import React, { forwardRef } from 'react';

import { BaseFormControl, type BaseFormControlProps } from '../components/base-form-control';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';
import styles from './mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type FormControlMobileProps = Omit<BaseFormControlProps, 'styles' | 'colorStyles'>;

export const FormControlMobile = forwardRef<HTMLDivElement, FormControlMobileProps>(
    (restProps, ref) => (
        <BaseFormControl {...restProps} ref={ref} styles={styles} colorStyles={colorStyles} />
    ),
);
