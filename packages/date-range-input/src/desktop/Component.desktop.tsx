import React, { forwardRef } from 'react';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';

import {
    type ConditionalProps,
    DateRangeInput,
    type DateRangeInputProps,
} from '../components/date-range-input';

export type DateRangeInputDesktopProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose' | 'InputComponent'
> &
    ConditionalProps;

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const DateRangeInputDesktop = forwardRef<HTMLInputElement, DateRangeInputDesktopProps>(
    (props, ref) => (
        <DateRangeInput
            InputComponent={InputDesktop}
            Calendar={CalendarDesktop}
            {...props}
            ref={ref}
        />
    ),
);
