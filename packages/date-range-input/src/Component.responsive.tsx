import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { DateRangeInputDesktop } from './Component.desktop';
import { DateRangeInputMobile } from './Component.mobile';
import { BaseDateRangeInputProps } from './components/base-date-range-input/Component';

export type DateRangeInputResponsiveProps = Omit<BaseDateRangeInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type DateRangeInputMedia = 'desktop' | 'mobile';

export const DateRangeInputResponsive: FC<DateRangeInputResponsiveProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<DateRangeInputMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <DateRangeInputDesktop {...restProps} />
    ) : (
        <DateRangeInputMobile {...restProps} />
    );
};
