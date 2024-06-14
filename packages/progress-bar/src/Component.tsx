import React from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type ProgressBarProps = {
    /**
     * Значение заполненной части 0-100
     */
    value: number;

    /**
     * Css-класс для стилизации
     */
    className?: string;

    /**
     * Цвет заполнения
     */
    view?:
        | 'positive'
        | 'negative'
        | 'attention'
        | 'link'
        | 'tertiary'
        | 'secondary'
        | 'primary'
        | 'accent';

    /**
     * Размер компонента
     * @description s, m deprecated, используйте вместо них 4, 8 соответственно
     */
    size?: 's' | 'm' | 4 | 8;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
};

export const SIZE_TO_CLASSNAME_MAP = {
    s: 'size-4',
    m: 'size-8',
    4: 'size-4',
    8: 'size-8',
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, view = 'positive', size = 8, dataTestId }, ref) => {
        const translateX = Math.max(-100, Math.min(0, value - 100));

        return (
            <div
                role='progressbar'
                aria-valuenow={Math.round(value)}
                aria-valuemin={0}
                aria-valuemax={100}
                className={cn(styles.container, styles[SIZE_TO_CLASSNAME_MAP[size]], className)}
                data-test-id={dataTestId}
                ref={ref}
            >
                <div
                    className={cn(styles.filled, styles[view])}
                    style={{ transform: `translateX(${translateX}%)` }}
                />
            </div>
        );
    },
);

ProgressBar.displayName = 'ProgressBar';
