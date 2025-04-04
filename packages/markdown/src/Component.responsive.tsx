import React from 'react';
import { useIsDesktop } from '@balafla/core-components-mq';

import { Markdown } from './Component';
import { MarkdownResponsiveProps } from './typings';

export const MarkdownResponsiveComponent: React.FC<MarkdownResponsiveProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    children,
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return (
        <Markdown {...restProps} platform={isDesktop ? 'desktop' : 'mobile'}>
            {children}
        </Markdown>
    );
};
