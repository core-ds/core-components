import React from 'react';

import { type TitleProps, Title } from '../Component';

import styles from './mobile.module.css';

const DEFAULT_PADDING = { bottom: 12 };

export const TitleMobile = ({ children, ...props }: TitleProps) => (
    <Title stylesView={styles} defaultPadding={DEFAULT_PADDING} {...props}>
        {children}
    </Title>
);
