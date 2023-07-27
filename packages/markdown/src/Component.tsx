import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useOverrides } from './hooks/use-overrides';
import { MarkdownProps } from './typings';

export const Markdown = ({ children, className, platform, font, overrides }: MarkdownProps) => {
    const defaultOverrides = useOverrides(font, platform);

    return (
        <ReactMarkdown components={{ ...defaultOverrides, ...overrides }} className={className}>
            {children}
        </ReactMarkdown>
    );
};
