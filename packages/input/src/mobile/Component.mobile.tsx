import React, { forwardRef } from 'react';

import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { BaseInputMobile, BaseInputProps } from '../components/base-input';

export type InputMobileProps = Omit<BaseInputProps, 'FormControlComponent'>;

export const InputMobile = forwardRef<HTMLInputElement, InputMobileProps>((restProps, ref) => (
    <BaseInputMobile {...restProps} FormControlComponent={FormControlMobile} ref={ref} />
));
