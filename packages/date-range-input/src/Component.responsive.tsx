import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { useMedia } from '@alfalab/hooks';

import { ConditionalProps, DateRangeInputProps } from './components/date-range-input';
import { DateRangeInputDesktop } from './desktop';
import { DateRangeInputMobile } from './mobile';

export type DateRangeInputResponsiveProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose' | 'InputComponent'
> &
    ConditionalProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;
    };

export type DateRangeInputMedia = 'desktop' | 'mobile';

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const DateRangeInputResponsive = forwardRef<HTMLInputElement, DateRangeInputResponsiveProps>(
    ({ breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMedia<DateRangeInputMedia>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop',
        );

        return view === 'desktop' ? (
            <DateRangeInputDesktop {...restProps} ref={ref} />
        ) : (
            <DateRangeInputMobile {...restProps} ref={ref} />
        );
    },
);
