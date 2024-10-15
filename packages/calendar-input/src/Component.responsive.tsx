import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';
import { useMedia } from '@alfalab/hooks';

import { CalendarInputProps } from './components/calendar-input/Component';
import { CalendarInputDesktop } from './desktop';
import { CalendarInputMobile } from './mobile';

export type CalendarInputResponsiveProps = Omit<CalendarInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type CalendarInputMedia = 'desktop' | 'mobile';

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const CalendarInputResponsive = forwardRef<HTMLInputElement, CalendarInputResponsiveProps>(
    ({ breakpoint = getComponentBreakpoint(), ...restProps }, ref) => {
        const [view] = useMedia<CalendarInputMedia>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
            <CalendarInputDesktop {...restProps} ref={ref} />
        ) : (
            <CalendarInputMobile {...restProps} ref={ref} />
        );
    },
);
