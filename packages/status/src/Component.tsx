import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export const colors = ['green', 'orange', 'red', 'blue', 'grey', 'teal', 'purple'] as const;

export type StatusProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     *  Вид компонента
     * @description soft deprecated, используйте вместо него muted-alt
     */
    view?: 'contrast' | 'soft' | 'muted' | 'muted-alt';

    /**
     * Цветовое оформление иконки
     */
    color?: (typeof colors)[number];

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const Status: FC<StatusProps> = ({
    className,
    view = 'muted-alt',
    color = 'green',
    children,
    dataTestId,
}) => (
    <span
        className={cn(styles.component, styles[color], styles[view], className)}
        data-test-id={dataTestId}
    >
        <span className={styles.ellipsis}>{children}</span>
    </span>
);
