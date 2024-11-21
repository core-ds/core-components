import React, { forwardRef } from 'react';

import { InputMobile } from '@alfalab/core-components-input/mobile';

import { NumberInput, NumberInputProps } from '../components/number-input';

export type NumberInputMobileProps = Omit<NumberInputProps, 'Input' | 'breakpoint' | 'view'>;

export const NumberInputMobile = forwardRef<
    HTMLInputElement,
    Omit<NumberInputMobileProps, 'size'> & { size: Exclude<NumberInputMobileProps['size'], 40> }
>((props, ref) => <NumberInput {...props} Input={InputMobile} ref={ref} view='mobile' />);
