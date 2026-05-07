import React, { forwardRef } from 'react';

import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';

import { BaseInput, type BaseInputProps } from '../components/base-input';

export type InputMobileProps = Omit<BaseInputProps, 'FormControlComponent'>;

/**
 * @splitComponent mobile
 */
export const InputMobile = forwardRef<HTMLInputElement, InputMobileProps>((restProps, ref) => (
    <BaseInput {...restProps} FormControlComponent={FormControlMobile} ref={ref} />
));
