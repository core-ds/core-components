import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { ConfirmationDesktop } from './desktop';
import { ConfirmationMobile } from './mobile';
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

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = ({
    breakpoint = 1024,
    ...restProps
}) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, true);

    return isDesktop ? (
        <ConfirmationDesktop {...restProps} />
    ) : (
        <ConfirmationMobile breakpoint={breakpoint} {...restProps} />
    );
};
