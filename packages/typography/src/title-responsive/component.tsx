import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

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
};

export const TitleResponsive = forwardRef<
    HTMLHeadingElement | HTMLDivElement,
    TitleResponsiveProps
>(({ defaultMatchMediaValue, breakpoint = 1024, ...restProps }, ref) => {
    const query = `(min-width: ${breakpoint}px)`;

    const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue);

    const Component = isDesktop ? TitleDesktop : TitleMobile;

    return <Component {...restProps} ref={ref} />;
});
