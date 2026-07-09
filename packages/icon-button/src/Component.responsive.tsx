import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { type IconButtonProps } from './types/icon-button-props';
import { IconButtonDesktop } from './desktop';
import { IconButtonMobile } from './mobile';

type ResponsiveProps = {
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

export type IconButtonResponsiveProps = IconButtonProps & ResponsiveProps;

export const IconButtonResponsive = forwardRef<HTMLButtonElement, IconButtonResponsiveProps>(
    (props, ref) => {
        const {
            breakpoint,
            client,
            defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
            ...restProps
        } = props;

        const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);
        const Component = isDesktop ? IconButtonDesktop : IconButtonMobile;

        return <Component {...restProps} ref={ref} />;
    },
);

IconButtonResponsive.displayName = 'IconButtonResponsive';
