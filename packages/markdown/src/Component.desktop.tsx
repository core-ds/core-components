import React from 'react';

import { Markdown } from './Component';
import { MarkdownDesktopProps } from './typings';

export const MarkdownDesktopComponent: React.FC<MarkdownDesktopProps> = ({
    children,
    ...restProps
}) => (
    <Markdown {...restProps} platform='desktop'>
        {children}
    </Markdown>
);
