import React from 'react';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';

import { useOverrides } from './hooks/use-overrides';
import { MarkdownProps } from './typings';

import styles from './index.module.css';

export const Markdown = ({
    children,
    className,
    platform,
    font,
    overrides,
    paddings,
}: MarkdownProps) => {
    const defaultOverrides = useOverrides(platform, font, paddings);

    return (
        <ReactMarkdown
            components={{ ...defaultOverrides, ...overrides }}
            className={cn(styles.component, className)}
        >
            {children}
        </ReactMarkdown>
    );
};
