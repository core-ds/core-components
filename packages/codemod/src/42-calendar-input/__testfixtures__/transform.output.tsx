/* eslint-disable */
import React from 'react';

import { CalendarInput, CalendarInputProps } from '@alfalab/core-components/calendar-input';

const noop = () => {};

export const Component = () => {
    const handleCalendarInputChange: CalendarInputProps['onChange'] = () => {};

    return (
        <React.Fragment>
            <CalendarInput onChange={handleCalendarInputChange} />
        </React.Fragment>
    );
};
