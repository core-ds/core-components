import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import { CalendarInput, CalendarInputProps } from './components/calendar-input/Component';

export type CalendarInputDesktopProps = Omit<CalendarInputProps, 'view'>;

export const CalendarInputDesktop: FC<CalendarInputDesktopProps> = (props) => (
    <CalendarInput {...props} />
);
