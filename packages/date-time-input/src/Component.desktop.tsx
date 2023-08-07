import React, { forwardRef } from 'react';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view'>;

export const DateTimeInputDesktop = forwardRef<HTMLInputElement, DateTimeInputDesktopProps>(
    (props, ref) => <DateTimeInput Calendar={CalendarDesktop} {...props} ref={ref} />,
);
