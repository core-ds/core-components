import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';
import { useMedia } from '@alfalab/hooks';

import { DateTimeInputProps } from './components/date-time-input/Component';
import { DateTimeInputDesktop } from './desktop';
import { DateTimeInputMobile } from './mobile';

export type DateTimeInputResponsiveProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type DateTimeInputMedia = 'desktop' | 'mobile';

export const DateTimeInputResponsive = forwardRef<HTMLInputElement, DateTimeInputResponsiveProps>(
    ({ breakpoint = getComponentBreakpoint(), ...restProps }, ref) => {
        const [view] = useMedia<DateTimeInputMedia>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
            <DateTimeInputDesktop {...restProps} ref={ref} />
        ) : (
            <DateTimeInputMobile {...restProps} ref={ref} />
        );
    },
);
