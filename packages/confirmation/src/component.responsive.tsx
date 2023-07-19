import React, { FC } from 'react';

import { useMedia } from '@alfalab/hooks';

import { ConfirmationDesktop } from './component.desktop';
import { ConfirmationMobile } from './component.mobile';
import { ConfirmationProps } from './types';

export type ResponsiveConfirmationProps = Omit<
    ConfirmationProps,
    'confirmationScreens' | 'breakpoint'
> & {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

export type ConfirmationMedia = 'desktop' | 'mobile';

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [view] = useMedia<ConfirmationMedia>(
        [
            ['mobile', `(max-width: ${breakpoint - 1}px)`],
            ['desktop', `(min-width: ${breakpoint}px)`],
        ],
        'desktop',
    );

    return view === 'desktop' ? (
        <ConfirmationDesktop {...restProps} />
    ) : (
        <ConfirmationMobile breakpoint={breakpoint} {...restProps} />
    );
};
