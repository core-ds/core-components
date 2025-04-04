import React, { FC, ReactNode } from 'react';
import { TitleDesktop } from '@balafla/core-components-typography';
import cn from 'classnames';

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
    <TitleDesktop
        className={cn(styles.header, styles.typography, { [styles.typographyMobile]: mobile })}
        tag='h3'
        color='primary'
    >
        {children}
    </TitleDesktop>
);
