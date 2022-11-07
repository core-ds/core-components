import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputProps } from '@alfalab/core-components-input';
import { DateTimeInputDesktop } from './Component.desktop';
import { DateTimeInputMobile } from './Component.mobile';
import { DateTimeInputProps } from './components/date-time-input/Component';

export type DateTimeInputResponsiveProps = Omit<DateTimeInputProps, 'view'> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type DateTimeInputMedia = 'desktop' | 'mobile';

export const DateTimeInputResponsive: FC<DateTimeInputResponsiveProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<DateTimeInputMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <DateTimeInputDesktop {...restProps} />
    ) : (
        <DateTimeInputMobile {...restProps} />
    );
};
