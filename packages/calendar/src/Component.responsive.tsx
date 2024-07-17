import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

import { CalendarMobile, CalendarMobileProps } from './components/calendar-mobile';
import { CalendarDesktop, CalendarDesktopProps } from './desktop';

export type ResponsiveCalendarProps = CalendarDesktopProps &
    CalendarMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Значение по-умолчанию для хука useMatchMedia
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };

export const CalendarResponsive = forwardRef<HTMLDivElement, ResponsiveCalendarProps>(
    ({ breakpoint = getComponentBreakpoint(), defaultMatchMediaValue, ...restProps }, ref) => {
        const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

        return isDesktop ? (
            <CalendarDesktop {...restProps} ref={ref} />
        ) : (
            <CalendarMobile {...restProps} ref={ref} />
        );
    },
);

CalendarResponsive.displayName = 'CalendarResponsive';
