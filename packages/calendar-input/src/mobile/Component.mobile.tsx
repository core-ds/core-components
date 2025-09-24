import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';

import { CalendarInput, type CalendarInputProps } from '../components/calendar-input/Component';

export type CalendarInputMobileProps = Omit<CalendarInputProps, 'view'>;

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const CalendarInputMobile = forwardRef<HTMLInputElement, CalendarInputMobileProps>(
    (props, ref) => <CalendarInput Calendar={CalendarMobile} view='mobile' {...props} ref={ref} />,
);
