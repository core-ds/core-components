import React, { forwardRef } from 'react';
import { CalendarMobile } from '@balafla/core-components-calendar/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@balafla/core-components-input';
import { InputMobile } from '@balafla/core-components-input/mobile';

import {
    ConditionalProps,
    DateRangeInput,
    DateRangeInputProps,
} from '../components/date-range-input';

export type DateRangeInputMobileProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose' | 'InputComponent'
> &
    ConditionalProps;

/**
 * @deprecated
 * use UniversalDateInput instead
 */
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
