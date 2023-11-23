import React, { forwardRef } from 'react';

import { BaseFormControl, BaseFormControlProps } from '../components/base-form-control';

import defaultColors from './default.desktop.module.css';
import styles from './desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type FormControlDesktopProps = Omit<BaseFormControlProps, 'styles' | 'colorStyles'>;

export const FormControlDesktop = forwardRef<HTMLDivElement, FormControlDesktopProps>(
    (restProps, ref) => (
        <BaseFormControl {...restProps} ref={ref} styles={styles} colorStyles={colorStyles} />
    ),
);
