import React, { forwardRef } from 'react';
import { CalendarDesktop } from '@balafla/core-components-calendar/desktop';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@balafla/core-components-input';
import { InputDesktop } from '@balafla/core-components-input/desktop';

import { DateTimeInput, DateTimeInputProps } from '../components/date-time-input/Component';

export type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'>;

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const DateTimeInputDesktop = forwardRef<HTMLInputElement, DateTimeInputDesktopProps>(
    (props, ref) => (
        <DateTimeInput
            Calendar={CalendarDesktop}
            InputComponent={InputDesktop}
            {...props}
            ref={ref}
        />
    ),
);
