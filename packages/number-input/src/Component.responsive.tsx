import React, { forwardRef } from 'react';

import { Input } from '@alfalab/core-components-input';

import { NumberInput, NumberInputProps } from './components/number-input';

export type NumberInputResponsiveProps = Omit<NumberInputProps, 'Input'>;

export const NumberInputResponsive = forwardRef<HTMLInputElement, NumberInputResponsiveProps>(
    (props, ref) => <NumberInput {...props} Input={Input} ref={ref} />,
);
