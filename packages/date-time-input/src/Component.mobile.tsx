import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputMobileProps = Omit<DateTimeInputProps, 'view'>;

export const DateTimeInputMobile = forwardRef<HTMLInputElement, DateTimeInputMobileProps>(
    (props, ref) => <DateTimeInput Calendar={CalendarMobile} view='mobile' {...props} ref={ref} />,
);
