import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import { CalendarMobile } from '@alfalab/core-components-calendar';
import { CalendarInputProps, CalendarInput } from './components/calendar-input/Component';

export type CalendarInputMobileProps = Omit<CalendarInputProps, 'view'>;

export const CalendarInputMobile: FC<CalendarInputMobileProps> = (props) => (
    <CalendarInput Calendar={CalendarMobile} view='mobile' {...props} />
);
