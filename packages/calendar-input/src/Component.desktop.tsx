import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';

import { CalendarInput, CalendarInputProps } from './components/calendar-input/Component';

export type CalendarInputDesktopProps = Omit<CalendarInputProps, 'view'>;

export const CalendarInputDesktop = forwardRef<HTMLInputElement, CalendarInputDesktopProps>(
    (props, ref) => <CalendarInput {...props} ref={ref} />,
);
