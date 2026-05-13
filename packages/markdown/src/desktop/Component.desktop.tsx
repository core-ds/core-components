import React from 'react';

import { BaseMarkdown } from '../components/base-markdown';
import { type MarkdownDesktopProps } from '../typings';

const MarkdownDesktopComponent: React.FC<MarkdownDesktopProps> = ({ children, ...restProps }) => (
    <BaseMarkdown {...restProps} platform='desktop'>
        {children}
    </BaseMarkdown>
);

export const MarkdownDesktop = MarkdownDesktopComponent;
