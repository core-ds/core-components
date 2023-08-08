/* eslint-disable */
import React from 'react';

import { DateRangeInput, DateRangeInputProps } from '@alfalab/core-components/date-range-input';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <DateRangeInput onChange={(() => {}) as DateRangeInputProps['onChange']}/>
        </React.Fragment>
    );
};
