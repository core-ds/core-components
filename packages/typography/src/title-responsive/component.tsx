import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { TitleProps } from '../title-base/component';
import { TitleDesktop } from '../title-desktop';
import { TitleMobile } from '../title-mobile';

export type TitleResponsiveProps = TitleProps & {
    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);

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

export const TitleResponsive = forwardRef<
    HTMLHeadingElement | HTMLDivElement,
    TitleResponsiveProps
>(({ breakpoint, client, ...restProps }, ref) => {
    const isDesktop = useIsDesktop(breakpoint, client === 'desktop');

    const Component = isDesktop ? TitleDesktop : TitleMobile;

    return <Component {...restProps} ref={ref} />;
});
