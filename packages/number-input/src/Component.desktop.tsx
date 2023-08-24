import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';

import { NumberInput, NumberInputProps } from './components/number-input';

export type NumberInputDesktopProps = Omit<NumberInputProps, 'Input' | 'breakpoint'>;

export const NumberInputDesktop = forwardRef<HTMLInputElement, NumberInputDesktopProps>(
    (props, ref) => <NumberInput {...props} Input={InputDesktop} ref={ref} />,
);
