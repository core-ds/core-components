import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { useIsDesktop } from '@alfalab/core-components-mq';

import { type DateTimeInputProps } from './components/date-time-input/Component';
import { DateTimeInputDesktop } from './desktop';
import { DateTimeInputMobile } from './mobile';

export type DateTimeInputResponsiveProps = Omit<DateTimeInputProps, 'view' | 'InputComponent'> & {
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

export type DateTimeInputMedia = 'desktop' | 'mobile';

export const DateTimeInputResponsive = forwardRef<HTMLInputElement, DateTimeInputResponsiveProps>(
    ({ breakpoint, client, ...restProps }, ref) => {
        const isDesktop = useIsDesktop(breakpoint, client === 'desktop');

        return isDesktop ? (
            <DateTimeInputDesktop {...restProps} ref={ref} />
        ) : (
            <DateTimeInputMobile {...restProps} ref={ref} />
        );
    },
);
