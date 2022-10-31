import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import {
    BaseCalendarInput,
    BaseCalendarInputProps,
} from './components/base-calendar-input/Component';

export type CalendarInputMobileProps = Omit<BaseCalendarInputProps, 'view'>;

export const CalendarInputMobile: FC<CalendarInputMobileProps> = (props) => (
    <BaseCalendarInput view='mobile' {...props} />
);
