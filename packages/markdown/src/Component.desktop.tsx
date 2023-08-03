import React from 'react';

import { Markdown } from './Component';
import { MarkdownMobileProps } from './typings';

export const MarkdownDesktopComponent: React.FC<MarkdownMobileProps> = ({
    children,
    ...restProps
}) => (
    <Markdown {...restProps} platform='desktop'>
        {children}
    </Markdown>
);
