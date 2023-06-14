import React, { forwardRef } from 'react';

import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { BaseInput, BaseInputProps } from './components/base-input';

export type InputMobileProps = Omit<BaseInputProps, 'FromControlComponent'>;

export const InputMobile = forwardRef<HTMLInputElement, InputMobileProps>((restProps, ref) => (
    <BaseInput {...restProps} FormControlComponent={FormControlMobile} ref={ref} />
));
