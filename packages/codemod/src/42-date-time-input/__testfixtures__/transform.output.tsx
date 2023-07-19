/* eslint-disable */
import React from 'react';

import { DateTimeInput, DateTimeInputProps } from '@alfalab/core-components/date-time-input';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <DateTimeInput onChange={(() => {}) as DateTimeInputProps['onChange']}/>
        </React.Fragment>
    );
};
