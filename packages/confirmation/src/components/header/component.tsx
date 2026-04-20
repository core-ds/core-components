import React, { type FC, type ReactNode } from 'react';

import { TitleDesktop, TitleMobile } from '@alfalab/core-components-typography';

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

    /**
     * HTML тег для заголовка
     * @default 'h3'
     */
    titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Header: FC<HeaderProps> = ({ mobile, children, titleTag = 'h3' }) => {
    const Tag = mobile ? TitleMobile : TitleDesktop;

    return (
        <Tag
            font='system'
            view='small'
            className={styles.header}
            tag={titleTag}
            color='primary'
            defaultMargins={false}
        >
            {children}
        </Tag>
    );
};
