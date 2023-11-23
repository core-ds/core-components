import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { CalendarMobile, CalendarMobileProps } from './components/calendar-mobile';
import { CalendarDesktop, CalendarDesktopProps } from './desktop';

export type ResponsiveCalendarProps = CalendarDesktopProps &
    CalendarMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export const CalendarResponsive = forwardRef<HTMLDivElement, ResponsiveCalendarProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`);

        return isDesktop ? (
            <CalendarDesktop {...restProps} ref={ref} />
        ) : (
            <CalendarMobile {...restProps} ref={ref} />
        );
    },
);
