import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';

import { CalendarInput, CalendarInputProps } from './components/calendar-input/Component';

export type CalendarInputMobileProps = Omit<CalendarInputProps, 'view'>;

export const CalendarInputMobile = forwardRef<HTMLInputElement, CalendarInputMobileProps>(
    (props, ref) => <CalendarInput Calendar={CalendarMobile} view='mobile' {...props} ref={ref} />,
);
