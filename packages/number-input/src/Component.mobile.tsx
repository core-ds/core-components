import React, { forwardRef } from 'react';

import { InputMobile } from '@alfalab/core-components-input/mobile';

import { NumberInput, NumberInputProps } from './components/number-input';

export type NumberInputMobileProps = Omit<NumberInputProps, 'Input' | 'breakpoint'>;

export const NumberInputMobile = forwardRef<HTMLInputElement, NumberInputMobileProps>(
    (props, ref) => <NumberInput {...props} Input={InputMobile} ref={ref} />,
);
