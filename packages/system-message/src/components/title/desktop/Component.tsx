import React from 'react';

import { type TitleProps, TitleBase } from '../Component';

import styles from './styles.module.css';

const DEFAULT_PADDING = { bottom: 16 };

export const TitleDesktop = ({ children, padding, ...props }: TitleProps) => (
    <TitleBase styles={styles} padding={padding ?? DEFAULT_PADDING} {...props}>
        {children}
    </TitleBase>
);
