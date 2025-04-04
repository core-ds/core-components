import React, { forwardRef } from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { Title, TitleProps } from '../title';
import { TitleMobile } from '../title-mobile';

export type TitleResponsiveProps = TitleProps & {
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

    const Component = isDesktop ? Title : TitleMobile;

    return <Component {...restProps} ref={ref} />;
});
