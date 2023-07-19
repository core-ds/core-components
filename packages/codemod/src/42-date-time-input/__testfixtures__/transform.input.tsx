/* eslint-disable */
import React from 'react';

import { DateTimeInputResponsive, DateTimeInputResponsiveProps } from '@alfalab/core-components/date-time-input/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <DateTimeInputResponsive onChange={(() => {}) as DateTimeInputResponsiveProps['onChange']}/>
        </React.Fragment>
    );
};
