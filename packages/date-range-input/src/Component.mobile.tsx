import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { CalendarMobile } from '@alfalab/core-components-calendar';
import { DateRangeInput, DateRangeInputProps } from './components/date-range-input/Component';

export type DateRangeInputMobileProps = Omit<DateRangeInputProps, 'view'>;

export const DateRangeInputMobile: FC<DateRangeInputMobileProps> = (props) => (
    <DateRangeInput Calendar={CalendarMobile} view='mobile' {...props} />
);
