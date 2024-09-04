import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { Title, TitleProps } from '../title';
import { TitleMobile } from '../title-mobile';

export type TitleResponsiveProps = TitleProps & {
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

    const Component = isDesktop ? Title : TitleMobile;

    return <Component {...restProps} ref={ref} />;
});
