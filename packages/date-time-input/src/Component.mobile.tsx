import React, { forwardRef } from 'react';

import { CalendarMobile } from '@alfalab/core-components-calendar';
import { InputMobile } from '@alfalab/core-components-input/mobile';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

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
