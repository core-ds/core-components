import React from 'react';

import { TitleDesktop } from '@alfalab/core-components-typography';

import { BaseMarkdown } from './components/base-markdown';
import { type MarkdownDesktopProps } from './typings';

export const MarkdownDesktopComponent: React.FC<MarkdownDesktopProps> = ({
    children,
    ...restProps
}) => (
    <BaseMarkdown {...restProps} Title={TitleDesktop}>
        {children}
    </BaseMarkdown>
);
