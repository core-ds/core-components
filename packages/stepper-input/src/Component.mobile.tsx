import React, { forwardRef } from 'react';

import { NumberInputMobile } from '@alfalab/core-components-number-input/mobile';

import { BaseStepperInput, BaseStepperInputProps } from './components/base-stepper-input';

export type StepperInputMobileProps = Omit<BaseStepperInputProps, 'Input' | 'view' | 'breakpoint'>;

export const StepperInputMobile = forwardRef<HTMLInputElement, StepperInputMobileProps>(
    ({ ...restProps }, ref) => (
        <BaseStepperInput {...restProps} view='mobile' Input={NumberInputMobile} ref={ref} />
    ),
);
