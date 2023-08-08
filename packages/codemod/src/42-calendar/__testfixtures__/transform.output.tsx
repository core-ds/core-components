/* eslint-disable */
import React from 'react';

import { CalendarDesktop, CalendarDesktopProps } from '@alfalab/core-components/calendar/desktop';
import { usePeriod } from '@alfalab/core-components/calendar/shared';
import { Calendar } from '@alfalab/core-components-calendar';

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
