import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DateInputProps } from '@alfalab/core-components-date-input';
import { CalendarInputDesktop } from './Component.desktop';
import { CalendarInputMobile } from './Component.mobile';
import { BaseCalendarInputProps } from './components/base-calendar-input/Component';

export type CalendarInputResponsiveProps = Omit<BaseCalendarInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type CalendarInputMedia = 'desktop' | 'mobile';

export const CalendarInputResponsive: FC<CalendarInputResponsiveProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<CalendarInputMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <CalendarInputDesktop {...restProps} />
    ) : (
        <CalendarInputMobile {...restProps} />
    );
};
