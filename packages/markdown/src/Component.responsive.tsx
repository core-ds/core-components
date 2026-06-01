import React from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { BaseMarkdown } from './components/base-markdown';
import { type MarkdownResponsiveProps } from './typings';

export const MarkdownResponsiveComponent: React.FC<MarkdownResponsiveProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    children,
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return (
        <BaseMarkdown {...restProps} platform={isDesktop ? 'desktop' : 'mobile'}>
            {children}
        </BaseMarkdown>
    );
};
