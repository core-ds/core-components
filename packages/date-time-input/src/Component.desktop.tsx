import React, { forwardRef } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'>;

export const DateTimeInputDesktop = forwardRef<HTMLInputElement, DateTimeInputDesktopProps>(
    (props, ref) => <DateTimeInput InputComponent={InputDesktop} {...props} ref={ref} />,
);
