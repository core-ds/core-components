/* eslint-disable */
import React from 'react';

import { CalendarInputResponsive, CalendarInputResponsiveProps } from '@balafla/core-components/calendar-input/responsive';

const noop = () => {};

export const Component = () => {
    const handleCalendarInputChange: CalendarInputResponsiveProps['onChange'] = () => {};

    return (
        <React.Fragment>
            <CalendarInputResponsive onChange={handleCalendarInputChange} />
        </React.Fragment>
    );
};
