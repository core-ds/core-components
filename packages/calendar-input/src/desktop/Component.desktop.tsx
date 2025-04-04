import React, { forwardRef } from 'react';
import { CalendarDesktop } from '@balafla/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@balafla/core-components-date-input';

import { CalendarInput, CalendarInputProps } from '../components/calendar-input/Component';

export type CalendarInputDesktopProps = Omit<CalendarInputProps, 'view'>;

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const CalendarInputDesktop = forwardRef<HTMLInputElement, CalendarInputDesktopProps>(
    (props, ref) => <CalendarInput Calendar={CalendarDesktop} {...props} ref={ref} />,
);
