import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';

import { DateTimeInput, DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputDesktopProps = Omit<DateTimeInputProps, 'view'>;

export const DateTimeInputDesktop = forwardRef<HTMLInputElement, DateTimeInputDesktopProps>(
    (props, ref) => <DateTimeInput {...props} ref={ref} />,
);
