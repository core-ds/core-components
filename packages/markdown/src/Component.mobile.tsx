import React from 'react';

import { BaseMarkdown } from './components/base-markdown';
import { type MarkdownMobileProps } from './typings';

export const MarkdownMobileComponent: React.FC<MarkdownMobileProps> = ({
    children,
    ...restProps
}) => (
    <BaseMarkdown {...restProps} platform='mobile'>
        {children}
    </BaseMarkdown>
);
