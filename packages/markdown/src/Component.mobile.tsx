import React from 'react';

import { Markdown } from './Component';
import { MarkdownDesktopProps } from './typings';

export const MarkdownMobileComponent: React.FC<MarkdownDesktopProps> = ({
    children,
    ...restProps
}) => (
    <Markdown {...restProps} platform='mobile'>
        {children}
    </Markdown>
);
