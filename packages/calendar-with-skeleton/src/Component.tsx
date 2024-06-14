import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { CalendarDesktop, CalendarDesktopProps } from '@alfalab/core-components-calendar/desktop';
import { Skeleton } from '@alfalab/core-components-skeleton';

import styles from './index.module.css';

export type CalendarWithSkeletonProps = CalendarDesktopProps & {
    /**
     * Флаг включения анимации скелета
     */
    animate?: boolean;

    /**
     * Флаг управлением видимостью календаря
     */
    calendarVisible?: boolean;
};

export const CalendarWithSkeleton = forwardRef<HTMLDivElement, CalendarWithSkeletonProps>(
    ({ calendarVisible = true, animate = true, className, ...restProps }, ref) => {
        const skeletonProps = { visible: true, animate };

        return (
            <div
                className={cn(styles.component, className, {
                    [styles.calendarVisible]: calendarVisible,
                })}
            >
                {calendarVisible && <CalendarDesktop ref={ref} responsive={true} {...restProps} />}

                <CSSTransition
                    in={!calendarVisible}
                    timeout={200}
                    unmountOnExit={true}
                    classNames={styles}
                >
                    <div className={styles.skeleton} ref={calendarVisible ? undefined : ref}>
                        <Skeleton {...skeletonProps} className={styles.header} />

                        <Skeleton {...skeletonProps} className={styles.weekDays} />

                        <Skeleton {...skeletonProps} className={styles.row} />
                        <Skeleton {...skeletonProps} className={styles.row} />
                        <Skeleton {...skeletonProps} className={styles.row} />
                        <Skeleton {...skeletonProps} className={styles.row} />
                        <Skeleton {...skeletonProps} className={styles.row} />
                    </div>
                </CSSTransition>
            </div>
        );
    },
);

CalendarWithSkeleton.displayName = 'CalendarWithSkeleton';
