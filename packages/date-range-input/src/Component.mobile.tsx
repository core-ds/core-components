import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar';
import { InputMobile } from '@alfalab/core-components-input/mobile';

import {
    ConditionalProps,
    DateRangeInput,
    DateRangeInputProps,
} from './components/date-range-input';

export type DateRangeInputMobileProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose' | 'InputComponent'
> &
    ConditionalProps;

export const DateRangeInputMobile = forwardRef<HTMLInputElement, DateRangeInputMobileProps>(
    (props, ref) => (
        <DateRangeInput
            InputComponent={InputMobile}
            Calendar={CalendarMobile}
            view='mobile'
            {...props}
            ref={ref}
        />
    ),
);
