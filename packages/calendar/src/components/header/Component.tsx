import React, { type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { type SelectorView } from '../../typings';

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

    /**
     * Дополнительный класс
     */
    className?: string;
};

export const Header: FC<HeaderProps> = ({ view = 'full', withShadow, children, className }) => (
    <div
        className={cn(styles.header, className, {
            [styles.monthOnly]: view === 'month-only',
            [styles.withShadow]: withShadow,
        })}
        aria-live='polite'
    >
        {children}
    </div>
);
