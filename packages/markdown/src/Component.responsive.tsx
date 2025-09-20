import React from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { MarkdownDesktop } from './desktop';
import { MarkdownMobile } from './mobile';
import { type MarkdownResponsiveProps } from './typings';

export const MarkdownResponsiveComponent: React.FC<MarkdownResponsiveProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    children,
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue)

    if (isDesktop) {
        return <MarkdownDesktop {...restProps}>{children}</MarkdownDesktop>;
    }

    return <MarkdownMobile {...restProps}>{children}</MarkdownMobile>;
};
