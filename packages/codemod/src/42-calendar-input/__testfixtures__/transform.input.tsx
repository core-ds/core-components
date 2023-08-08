/* eslint-disable */
import React from 'react';

import { CalendarInputResponsive, CalendarInputResponsiveProps } from '@alfalab/core-components/calendar-input/responsive';

const noop = () => {};

export const Component = () => {
    const handleCalendarInputChange: CalendarInputResponsiveProps['onChange'] = () => {};

    return (
        <React.Fragment>
            <CalendarInputResponsive onChange={handleCalendarInputChange} />
        </React.Fragment>
    );
};
