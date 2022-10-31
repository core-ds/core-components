import React, { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import {
    BaseDateRangeInput,
    BaseDateRangeInputProps,
} from './components/base-date-range-input/Component';

export type DateRangeInputMobileProps = Omit<BaseDateRangeInputProps, 'view'>;

export const DateRangeInputMobile: FC<DateRangeInputMobileProps> = (props) => (
    <BaseDateRangeInput view='mobile' {...props} />
);
