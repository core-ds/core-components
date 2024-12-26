import React from 'react';

import { type TitleProps, TitleBase } from '../Component';

import styles from './styles.module.css';

export const TitleMobile = ({ children, padding, ...props }: TitleProps) => (
    <TitleBase styles={styles} padding={padding ?? { bottom: 12 }} {...props}>
        {children}
    </TitleBase>
);
