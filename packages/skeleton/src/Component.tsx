import React, { ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type SkeletonProps = {
    /**
     * Флаг, явно задающий состояние, при котором контент закрывается прелоадером
     */
    visible?: boolean;

    /**
     * Флаг явного включения анимации скелета
     */
    animate?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительные инлайн стили
     */
    style?: React.CSSProperties;

    /**
     * Включает размытие фона
     */
    allowBackdropBlur?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    visible,
    animate = true,
    className,
    dataTestId,
    children,
    style,
    allowBackdropBlur,
}) => {
    if (visible) {
        return (
            <div
                className={cn(
                    styles.component,
                    {
                        [styles.animate]: animate,
                        [styles.allowBackdropBlur]: allowBackdropBlur,
                    },
                    className,
                )}
                style={style}
                data-test-id={dataTestId}
            >
                {children}
            </div>
        );
    }

    return (
        <div data-test-id={dataTestId} className={className} style={style}>
            {children}
        </div>
    );
};
