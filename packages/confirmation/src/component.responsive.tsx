import React, { FC } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

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
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
};

export const ConfirmationResponsive: FC<ResponsiveConfirmationProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return isDesktop ? (
        <ConfirmationDesktop {...restProps} />
    ) : (
        <ConfirmationMobile breakpoint={breakpoint} {...restProps} />
    );
};
