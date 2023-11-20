import React, { forwardRef } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';

import { BaseInput, BaseInputProps } from '../components/base-input';

import defaultColors from '../default.desktop.module.css';
import invertedColors from '../inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type InputDesktopProps = Omit<BaseInputProps, 'FormControlComponent' | 'colorStyles'>;

export const InputDesktop = forwardRef<HTMLInputElement, InputDesktopProps>((restProps, ref) => (
    <BaseInput
        {...restProps}
        FormControlComponent={FormControlDesktop}
        ref={ref}
        colorStyles={colorStyles}
    />
));
