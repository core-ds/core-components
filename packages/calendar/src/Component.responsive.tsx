import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

import { CalendarDesktop, CalendarDesktopProps } from './Component.desktop';
import { CalendarMobile, CalendarMobileProps } from './components/calendar-mobile';

export type ResponsiveCalendarProps = CalendarDesktopProps &
    CalendarMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export type CalendarMedia = 'desktop' | 'mobile';

export const CalendarResponsive: FC<ResponsiveCalendarProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<CalendarMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <CalendarDesktop {...restProps} />
    ) : (
        <CalendarMobile {...restProps} />
    );
};
