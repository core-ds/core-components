import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import {
    BaseDateTimeInput,
    BaseDateTimeInputProps,
} from './components/base-date-time-input/Component';

export type DateTimeInputMobileProps = Omit<BaseDateTimeInputProps, 'view'>;

export const DateTimeInputMobile: FC<DateTimeInputMobileProps> = (props) => (
    <BaseDateTimeInput view='mobile' {...props} />
);
