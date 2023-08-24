import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { NumberInput } from '@alfalab/core-components-number-input';

import { BaseStepperInput, BaseStepperInputProps } from './components/base-stepper-input';

export type StepperInputResponsiveProps = Omit<BaseStepperInputProps, 'Input' | 'view'>;

export const StepperInputResponsive = forwardRef<HTMLInputElement, StepperInputResponsiveProps>(
    ({ breakpoint = 1024, defaultMatchMediaValue, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return (
            <BaseStepperInput
                {...restProps}
                Input={NumberInput}
                view={isDesktop ? 'desktop' : 'mobile'}
                breakpoint={breakpoint}
                ref={ref}
            />
        );
    },
);
