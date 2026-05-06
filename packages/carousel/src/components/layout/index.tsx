import React, { type ReactNode } from 'react';
import cn from 'classnames';

import { type LayoutProps, type PaginationProps } from '../../types';
import { type NavigationProps } from '../navigation';

import styles from './index.module.css';

export function Layout<T extends PaginationProps>({
    layoutProps: { navigationDisplay, navigationPosition },
    Navigation,
    navigationProps,
    Pagination,
    paginationProps,
    children,
}: LayoutProps<
    {
        navigationDisplay: 'hover' | 'always' | 'never';
        navigationPosition: 'start' | 'center';
    },
    T,
    NavigationProps
>): ReactNode {
    const navigation = (
        <Navigation
            {...navigationProps}
            position={navigationPosition}
            className={cn(styles.navigation, navigationProps.className)}
        />
    );

    return (
        <div
            className={cn(styles.component, {
                [styles.navigationHover]: navigationDisplay === 'hover',
            })}
        >
            {navigationPosition === 'start' && navigation}
            <div className={styles.wrapper}>
                {children}
                {navigationPosition === 'center' && navigation}
            </div>
            {paginationProps.elements && (
                <Pagination
                    {...paginationProps}
                    className={cn(styles.pagination, paginationProps.className)}
                />
            )}
        </div>
    );
}
