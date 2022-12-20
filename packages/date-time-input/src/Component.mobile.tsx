import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { CalendarMobile } from '@alfalab/core-components-calendar';
import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputMobileProps = Omit<DateTimeInputProps, 'view'>;

export const DateTimeInputMobile: FC<DateTimeInputMobileProps> = (props) => (
    <DateTimeInput Calendar={CalendarMobile} view='mobile' {...props} />
);
