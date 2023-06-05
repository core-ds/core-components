import React, { forwardRef } from 'react';

import { CalendarDesktop } from '@alfalab/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { InputDesktop } from '@alfalab/core-components-input/desktop';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'>;

export const DateTimeInputDesktop = forwardRef<HTMLInputElement, DateTimeInputDesktopProps>(
    (props, ref) => (
        <DateTimeInput
            InputComponent={InputDesktop}
            Calendar={CalendarDesktop}
            {...props}
            ref={ref}
        />
    ),
);
