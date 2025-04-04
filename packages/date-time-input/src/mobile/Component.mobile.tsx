import React, { forwardRef } from 'react';
import { CalendarMobile } from '@balafla/core-components-calendar/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@balafla/core-components-input';
import { InputMobile } from '@balafla/core-components-input/mobile';

import { DateTimeInput, DateTimeInputProps } from '../components/date-time-input/Component';

export type DateTimeInputMobileProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'>;

export const DateTimeInputMobile = forwardRef<HTMLInputElement, DateTimeInputMobileProps>(
    (props, ref) => (
        <DateTimeInput
            InputComponent={InputMobile}
            Calendar={CalendarMobile}
            view='mobile'
            {...props}
            ref={ref}
        />
    ),
);
