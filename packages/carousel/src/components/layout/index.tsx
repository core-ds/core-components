import React, { type ReactNode } from 'react';
import cn from 'classnames';

import { useCarouselContext } from '../../context';
import { type LayoutProps, type PaginationProps } from '../../types';
import { type CarouselNavigationProps } from '../navigation';

import styles from './index.module.css';

export type CarouselLayoutProps<T extends PaginationProps> = LayoutProps<
    {
        navigationDisplay: 'hover' | 'always' | 'never';
    },
    T,
    CarouselNavigationProps
>;

export function CarouselLayout<T extends PaginationProps>({
    layoutProps: { navigationDisplay },
    Navigation,
    navigationProps,
    Pagination,
    paginationProps,
    children,
}: CarouselLayoutProps<T>): ReactNode {
    const { count, activeIndex } = useCarouselContext();
    const navigationPosition = navigationProps.position;
    const navigation = navigationDisplay !== 'never' && (
        <Navigation
            {...navigationProps}
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
            {count && (
                <Pagination
                    {...paginationProps}
                    activeElement={activeIndex}
                    elements={count}
                    className={cn(styles.pagination, paginationProps.className)}
                />
            )}
        </div>
    );
}
