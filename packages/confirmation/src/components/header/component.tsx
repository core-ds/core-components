import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

export type HeaderProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Отображать в мобильной версии экран компонента
     */
    mobile?: boolean;
};

export const Header: FC<HeaderProps> = ({ mobile, children }) => (
    <Typography.Title
        className={cn(styles.header, styles.typography, { [styles.typographyMobile]: mobile })}
        tag='h3'
        color='primary'
    >
        {children}
    </Typography.Title>
);
