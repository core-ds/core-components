import React, { FC } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { getComponentBreakpoint } from '@alfalab/core-components-shared';

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

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = ({
    breakpoint = getComponentBreakpoint(),
    defaultMatchMediaValue = true,
    ...restProps
}) => {
    const [isDesktop] = useMatchMedia(`(min-width: ${breakpoint}px)`, defaultMatchMediaValue);

    return isDesktop ? (
        <ConfirmationDesktop {...restProps} />
    ) : (
        <ConfirmationMobile breakpoint={breakpoint} {...restProps} />
    );
};
