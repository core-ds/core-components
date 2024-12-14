import React, { forwardRef } from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import type { TitleProps } from './component';
import { Title } from './desktop';
import { TitleMobile } from './mobile';

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
