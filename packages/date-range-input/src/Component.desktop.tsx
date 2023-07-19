import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';

import {
    ConditionalProps,
    DateRangeInput,
    DateRangeInputProps,
} from './components/date-range-input';

export type DateRangeInputDesktopProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose' | 'InputComponent'
> &
    ConditionalProps;

export const DateRangeInputDesktop = forwardRef<HTMLInputElement, DateRangeInputDesktopProps>(
    (props, ref) => <DateRangeInput InputComponent={InputDesktop} {...props} ref={ref} />,
);
