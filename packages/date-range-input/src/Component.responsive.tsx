import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { useIsDesktop } from '@alfalab/core-components-mq';

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

        /**
         * Версия, которая будет использоваться при серверном рендеринге
         */
        client?: 'desktop' | 'mobile';
    };

export type DateRangeInputMedia = 'desktop' | 'mobile';

/**
 * @deprecated
 * use UniversalDateInput instead
 */
export const DateRangeInputResponsive = forwardRef<HTMLInputElement, DateRangeInputResponsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint, client === 'desktop');

        return isDesktop ? (
            <DateRangeInputDesktop {...restProps} ref={ref} />
        ) : (
            <DateRangeInputMobile {...restProps} ref={ref} />
        );
    },
);
