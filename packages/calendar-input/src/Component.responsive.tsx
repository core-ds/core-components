import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import { useIsDesktop } from '@alfalab/core-components-mq';

import { type CalendarInputProps } from './components/calendar-input/Component';
import { CalendarInputDesktop } from './desktop';
import { CalendarInputMobile } from './mobile';

export type CalendarInputResponsiveProps = Omit<CalendarInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';
};

export type CalendarInputMedia = 'desktop' | 'mobile';

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const CalendarInputResponsive = forwardRef<HTMLInputElement, CalendarInputResponsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint, client === 'desktop');

        return isDesktop ? (
            <CalendarInputDesktop {...restProps} ref={ref} />
        ) : (
            <CalendarInputMobile {...restProps} ref={ref} />
        );
    },
);
