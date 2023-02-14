import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import { DateRangeInput, DateRangeInputProps } from './components/date-range-input/Component';

export type DateRangeInputMobileProps = Omit<DateRangeInputProps, 'view'>;

export const DateRangeInputMobile = forwardRef<HTMLInputElement, DateRangeInputMobileProps>(
    (props, ref) => <DateRangeInput Calendar={CalendarMobile} view='mobile' {...props} ref={ref} />,
);
