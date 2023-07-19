import React, { forwardRef } from 'react';

import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { BaseInput, BaseInputProps } from './components/base-input';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type InputMobileProps = Omit<BaseInputProps, 'FormControlComponent' | 'colorStyles'>;

export const InputMobile = forwardRef<HTMLInputElement, InputMobileProps>((restProps, ref) => (
    <BaseInput
        {...restProps}
        FormControlComponent={FormControlMobile}
        ref={ref}
        colorStyles={colorStyles}
    />
));
