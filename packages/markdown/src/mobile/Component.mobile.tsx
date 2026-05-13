import React from 'react';

import { BaseMarkdown } from '../components/base-markdown';
import { type MarkdownMobileProps } from '../typings';

const MarkdownMobileComponent: React.FC<MarkdownMobileProps> = ({ children, ...restProps }) => (
    <BaseMarkdown {...restProps} platform='mobile'>
        {children}
    </BaseMarkdown>
);

export const MarkdownMobile = MarkdownMobileComponent;
