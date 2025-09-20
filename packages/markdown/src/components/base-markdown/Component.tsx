import React, { type FC } from 'react';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';

import { strikethroughRemarkPlugin } from '../../remark-plugins';
import { type BaseMarkdownProps } from '../../typings';

import { useOverrides } from './use-overrides';

import styles from './index.module.css';

export const BaseMarkdown: FC<BaseMarkdownProps> = (props) => {
    const {
        children,
        className,
        font = 'system',
        overrides,
        transformLinkUri = true,
        Title,
    } = props;
    const defaultOverrides = useOverrides(Title, font);

    return (
        <ReactMarkdown
            remarkPlugins={[strikethroughRemarkPlugin]}
            components={{ ...defaultOverrides, ...overrides }}
            className={cn(styles.component, className)}
            {...(!transformLinkUri && { transformLinkUri: false })}
        >
            {children}
        </ReactMarkdown>
    );
};
