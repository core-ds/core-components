/* eslint-disable */
import React from 'react';

import { CalendarDesktop, CalendarDesktopProps } from '@balafla/core-components/calendar/desktop';
import { usePeriod } from '@balafla/core-components/calendar/shared';
import { Calendar } from '@balafla/core-components-calendar';

const noop = () => {};

export const Component = () => {
    const period = usePeriod();

    const handleCalendarChange: CalendarDesktopProps['onChange'] = () => {};

    return (
        <React.Fragment>
            <Calendar onClose={noop} open={false} selectedFrom={period.selectedFrom} />
            <CalendarDesktop onChange={noop} />
        </React.Fragment>
    );
};
