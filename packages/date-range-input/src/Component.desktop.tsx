import React, { forwardRef } from 'react';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import {
    ConditionalProps,
    DateRangeInput,
    DateRangeInputProps,
} from './components/date-range-input';

export type DateRangeInputDesktopProps = Omit<DateRangeInputProps, 'view' | 'picker' | 'onClose'> &
    ConditionalProps;

export const DateRangeInputDesktop = forwardRef<HTMLInputElement, DateRangeInputDesktopProps>(
    (props, ref) => <DateRangeInput Calendar={CalendarDesktop} {...props} ref={ref} />,
);
