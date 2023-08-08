/* eslint-disable */
import React from 'react';

import { Calendar, CalendarProps, usePeriod } from '@alfalab/core-components/calendar';
import { CalendarResponsive } from '@alfalab/core-components-calendar/responsive';

const noop = () => {};

export const Component = () => {
    const period = usePeriod();

    const handleCalendarChange: CalendarProps['onChange'] = () => {};

    return (
        <React.Fragment>
            <CalendarResponsive onClose={noop} open={false} selectedFrom={period.selectedFrom} />
            <Calendar onChange={noop} />
        </React.Fragment>
    );
};
