import React from 'react';

import { type TitleProps, Title } from '../Component';

import styles from './desktop.module.css';

const DEFAULT_PADDING = { bottom: 16 };

export const TitleDesktop = ({ children, ...props }: TitleProps) => (
    <Title stylesView={styles} defaultPadding={DEFAULT_PADDING} {...props}>
        {children}
    </Title>
);
