import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { isClient } from '@alfalab/core-components-shared';

import { Markdown } from './Component';
import { MarkdownResponsiveProps } from './typings';

export const MarkdownResponsiveComponent: React.FC<MarkdownResponsiveProps> = ({
    breakpoint = 1024,
    defaultMatchMediaValue,
    children,
    ...restProps
}) => {
    const query = `(min-width: ${breakpoint}px)`;
    const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

    const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

    return (
        <Markdown {...restProps} platform={isDesktop ? 'desktop' : 'mobile'}>
            {children}
        </Markdown>
    );
};
