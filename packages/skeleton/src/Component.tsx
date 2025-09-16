import React, { type ReactNode } from 'react';
import cn from 'classnames';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type BorderRadiusSize = 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 36 | 64 | 'pill';

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

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted';

    /**
     * Скругление углов
     * @default 8
     */
    borderRadius?: BorderRadiusSize;
};

export const Skeleton: React.FC<SkeletonProps> = ({
    visible,
    animate = true,
    className,
    dataTestId,
    children,
    style,
    allowBackdropBlur,
    colors = 'default',
    borderRadius = 8,
}) => {
    if (visible) {
        return (
            <div
                className={cn(
                    styles.component,
                    colorStyles[colors].component,
                    {
                        [styles.animate]: animate,
                        [colorStyles[colors].animate]: animate,
                        [styles.allowBackdropBlur]: allowBackdropBlur,
                        [styles[`borderRadius-${borderRadius}`]]: borderRadius !== 8,
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
