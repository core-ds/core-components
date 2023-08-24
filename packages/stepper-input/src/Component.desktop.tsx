import React, { forwardRef } from 'react';

import { NumberInputDesktop } from '@alfalab/core-components-number-input/desktop';

import { BaseStepperInput, BaseStepperInputProps } from './components/base-stepper-input';

export type StepperInputDesktopProps = Omit<BaseStepperInputProps, 'Input' | 'view' | 'breakpoint'>;

export const StepperInputDesktop = forwardRef<HTMLInputElement, StepperInputDesktopProps>(
    ({ ...restProps }, ref) => (
        <BaseStepperInput {...restProps} view='desktop' Input={NumberInputDesktop} ref={ref} />
    ),
);
