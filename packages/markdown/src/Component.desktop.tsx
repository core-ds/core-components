import React from 'react';

import { BaseMarkdown } from './components/base-markdown';
import { MarkdownDesktopProps } from './typings';

export const MarkdownDesktopComponent: React.FC<MarkdownDesktopProps> = ({
    children,
    ...restProps
}) => (
    <BaseMarkdown {...restProps} platform='desktop'>
        {children}
    </BaseMarkdown>
);
