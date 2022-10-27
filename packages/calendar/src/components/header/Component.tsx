import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import { SelectorView } from '../../typings';

import styles from './index.module.css';

export type HeaderProps = {
    /**
     * Вид шапки — месяц и год или только месяц
     */
    view?: SelectorView;

    /**
     * Отображать тень? (нужна при прокрутке)
     */
    withShadow?: boolean;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ view = 'full', withShadow, children }) => (
    <div
        className={cn(styles.header, {
            [styles.monthOnly]: view === 'month-only',
            [styles.withShadow]: withShadow,
        })}
        aria-live='polite'
    >
        {children}
    </div>
);
