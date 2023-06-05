import React, { forwardRef } from 'react';

import { useMedia } from '@alfalab/hooks';

import { CalendarMobile, CalendarMobileProps } from './components/calendar-mobile';
import { CalendarDesktop, CalendarDesktopProps } from './Component.desktop';

export type ResponsiveCalendarProps = CalendarDesktopProps &
    CalendarMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

type CalendarMedia = 'desktop' | 'mobile';

export const CalendarResponsive = forwardRef<HTMLDivElement, ResponsiveCalendarProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMedia<CalendarMedia>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
            <CalendarDesktop {...restProps} ref={ref} />
        ) : (
            <CalendarMobile {...restProps} ref={ref} />
        );
    },
);
