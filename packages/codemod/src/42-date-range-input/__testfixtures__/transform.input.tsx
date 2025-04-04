/* eslint-disable */
import React from 'react';

import { DateRangeInputResponsive, DateRangeInputResponsiveProps } from '@balafla/core-components/date-range-input/responsive';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <DateRangeInputResponsive onChange={(() => {}) as DateRangeInputResponsiveProps['onChange']}/>
        </React.Fragment>
    );
};
