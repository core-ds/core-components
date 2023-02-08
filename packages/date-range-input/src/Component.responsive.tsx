import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { DateRangeInputDesktop } from './Component.desktop';
import { DateRangeInputMobile } from './Component.mobile';
import { DateRangeInputProps, ConditionalProps } from './components/date-range-input/Component';

export type DateRangeInputResponsiveProps = Omit<
    DateRangeInputProps,
    'view' | 'picker' | 'onClose'
> &
    ConditionalProps & {
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
