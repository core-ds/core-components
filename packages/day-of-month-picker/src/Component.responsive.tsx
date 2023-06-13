import React, { forwardRef } from 'react';

import { useMedia } from '@alfalab/hooks';

import { DayOfMonthPickerMobile } from './components/day-of-month-picker-mobile';
import { DayOfMonthPickerDesktop, DayOfMontPickerDesktopProps } from './Component.desktop';

export type ResponsiveDayOfMonthPickerProps = DayOfMontPickerDesktopProps & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type DayOfMontPickerMedia = 'desktop' | 'mobile';

export const DayOfMonthPickerResponsive = forwardRef<
    HTMLDivElement,
    ResponsiveDayOfMonthPickerProps
>(({ breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia<DayOfMontPickerMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <DayOfMonthPickerDesktop {...restProps} ref={ref} />
    ) : (
        <DayOfMonthPickerMobile {...restProps} ref={ref} />
    );
});
